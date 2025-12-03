import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { X, PlayCircle, PauseCircle, Camera, Info, Search, Sparkles, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { AppTheme } from '../types';
import { THEME_CONFIG } from '../constants';
import {
  MotionDefinition,
  MOTIONS,
  getMotionsForMuscle,
  generateGifSearchQuery,
  getModelTypeForMotion
} from '../services/animationService';
import { StickFigureAnimation } from './StickFigureAnimation';

interface AdvancedAnimationViewerProps {
  muscleName: string;
  muscleId?: string;
  currentTheme: AppTheme;
  onClose: () => void;
  // Context from muscle card
  actionString?: string;
  demonstrationText?: string;
  // Mode
  browserMode?: boolean; // If true, show all animations; if false, show muscle-specific
}

type ViewMode = '3D' | 'STICK' | 'BOTH';
type CameraPreset = 'free' | 'front' | 'side' | 'top' | 'perspective';

interface CameraConfig {
  position: [number, number, number];
  target: [number, number, number];
}

const CAMERA_PRESETS: Record<Exclude<CameraPreset, 'free'>, CameraConfig> = {
  front: { position: [0, 1, 4], target: [0, 1, 0] },
  side: { position: [4, 1, 0], target: [0, 1, 0] },
  top: { position: [0, 4, 0.5], target: [0, 0, 0] },
  perspective: { position: [2.5, 1.5, 2.5], target: [0, 1, 0] }
};

const AdvancedAnimationViewer: React.FC<AdvancedAnimationViewerProps> = ({
  muscleName,
  muscleId,
  currentTheme,
  onClose,
  actionString,
  demonstrationText,
  browserMode = false
}) => {
  const theme = THEME_CONFIG[currentTheme];

  // Get available motions
  const availableMotions = useMemo(() => {
    if (browserMode || !muscleId) {
      return Object.values(MOTIONS);
    }
    const motions = getMotionsForMuscle(muscleId);
    return motions.length > 0 ? motions : Object.values(MOTIONS).slice(0, 8); // Fallback
  }, [muscleId, browserMode]);

  const [selectedMotion, setSelectedMotion] = useState<MotionDefinition>(availableMotions[0]);
  const [playing, setPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('3D');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('perspective');
  const [manualCameraControl, setManualCameraControl] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [model3DFailed, setModel3DFailed] = useState(false);

  // Auto-fallback to stick figure if 3D fails
  useEffect(() => {
    if (model3DFailed && viewMode === '3D') {
      setViewMode('STICK');
    }
  }, [model3DFailed, viewMode]);

  // Action list parsing
  const actionList = useMemo(() => {
    if (!actionString) return [];
    return actionString
      .split(/[;,\.]/)
      .map(s => s.trim())
      .filter(s => s.length > 3);
  }, [actionString]);

  // Filter motions by region
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const filteredMotions = useMemo(() => {
    if (regionFilter === 'all') return availableMotions;
    return availableMotions.filter(m => m.region === regionFilter);
  }, [availableMotions, regionFilter]);

  const handleCameraPresetChange = (preset: CameraPreset) => {
    setCameraPreset(preset);
    if (preset === 'free') {
      setManualCameraControl(true);
    } else {
      setManualCameraControl(false);
    }
  };

  const handleResetCamera = () => {
    setCameraPreset('perspective');
    setManualCameraControl(false);
  };

  const handleOrbitStart = () => {
    // User started dragging - enable manual control
    if (cameraPreset !== 'free') {
      setManualCameraControl(true);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
      currentTheme === 'midnight' || currentTheme === 'blueprint' 
        ? 'bg-black/80' 
        : 'bg-black/60'
    } backdrop-blur-sm`}>
      <div 
        className={`w-full max-w-[95vw] h-[92vh] rounded-2xl border ${theme.border} ${theme.cardBg} shadow-2xl overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className={`px-5 py-4 border-b ${theme.border} flex items-center justify-between flex-shrink-0`}>
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-brand-500" />
            <div>
              <h3 className={`font-bold ${theme.text} text-lg`}>
                {browserMode ? 'Animation Browser' : `${muscleName} - Animations`}
              </h3>
              <p className={`text-xs ${theme.subText}`}>
                {selectedMotion.displayName} • {Math.round(currentAngle)}°
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowControls(!showControls)}
              className={`p-2 rounded-lg ${theme.inputBg} ${theme.text} hover:bg-opacity-80 transition-colors`}
              title={showControls ? 'Hide controls' : 'Show controls'}
            >
              {showControls ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button 
              onClick={onClose} 
              className={`p-2 rounded-lg ${theme.inputBg} ${theme.subText} hover:bg-opacity-80 transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left: Controls Sidebar - Scrollable */}
          {showControls && (
            <aside className={`w-80 border-r ${theme.border} ${theme.sidebarBg} flex flex-col overflow-hidden`}>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {/* Playback Controls */}
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme.subText} mb-2 block`}>
                    Playback
                  </label>
                  <button
                    onClick={() => setPlaying(!playing)}
                    className={`w-full px-4 py-3 rounded-lg border ${theme.border} ${playing ? 'bg-brand-500 text-white border-brand-500' : `${theme.inputBg} ${theme.text}`} font-semibold flex items-center justify-center gap-2 transition-all`}
                  >
                    {playing ? (
                      <>
                        <PauseCircle className="w-5 h-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-5 h-5" />
                        Play
                      </>
                    )}
                  </button>
                </div>

                {/* View Mode Toggle */}
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme.subText} mb-2 block`}>
                    View Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['3D', 'STICK', 'BOTH'] as ViewMode[]).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                          viewMode === mode
                            ? 'bg-brand-500 text-white'
                            : `${theme.inputBg} ${theme.text} hover:bg-opacity-80`
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Camera Presets */}
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme.subText} mb-2 flex items-center justify-between`}>
                    Camera View
                    <button
                      onClick={handleResetCamera}
                      className={`text-xs px-2 py-1 rounded ${theme.inputBg} hover:bg-opacity-80 flex items-center gap-1`}
                      title="Reset camera"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['free', 'front', 'side', 'top', 'perspective'] as CameraPreset[]).map(preset => (
                      <button
                        key={preset}
                        onClick={() => handleCameraPresetChange(preset)}
                        className={`px-2 py-2 rounded-lg text-xs font-semibold transition-all capitalize ${
                          cameraPreset === preset && !manualCameraControl
                            ? 'bg-blue-500 text-white'
                            : `${theme.inputBg} ${theme.text} hover:bg-opacity-80`
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  {manualCameraControl && (
                    <p className={`text-[10px] ${theme.subText} mt-2 flex items-center gap-1`}>
                      <Info className="w-3 h-3" />
                      Manual control active (drag to rotate/pan, scroll to zoom)
                    </p>
                  )}
                </div>

                {/* Region Filter (Browser Mode) */}
                {browserMode && (
                  <div>
                    <label className={`text-xs font-bold uppercase tracking-wider ${theme.subText} mb-2 block`}>
                      Filter by Region
                    </label>
                    <select
                      value={regionFilter}
                      onChange={(e) => setRegionFilter(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.text} text-sm`}
                    >
                      <option value="all">All Regions</option>
                      <option value="upper">Upper Body</option>
                      <option value="lower">Lower Body</option>
                      <option value="axial">Trunk/Spine</option>
                      <option value="hand">Hand/Wrist</option>
                      <option value="foot">Foot/Ankle</option>
                    </select>
                  </div>
                )}

                {/* STUDY REQUIREMENTS - TOP PRIORITY SECTION */}
                {!browserMode && (actionString || demonstrationText) && (
                  <div className={`p-5 rounded-xl border-2 border-blue-500/50 ${currentTheme === 'midnight' || currentTheme === 'blueprint' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                        <Info className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`text-base font-bold ${theme.text}`}>📚 Study Requirements</h4>
                        <p className={`text-xs ${theme.subText}`}>Learn these for your exam</p>
                      </div>
                    </div>
                    {actionString && (
                      <div className={`mb-4 p-3 rounded-lg ${currentTheme === 'midnight' || currentTheme === 'blueprint' ? 'bg-slate-800' : 'bg-white'} border ${theme.border}`}>
                        <p className="text-xs font-bold uppercase text-blue-600 mb-2 flex items-center gap-1">🎯 Required Actions</p>
                        <p className={`text-sm ${theme.text} leading-relaxed font-medium`}>{actionString}</p>
                      </div>
                    )}
                    {demonstrationText && (
                      <div className={`p-3 rounded-lg ${currentTheme === 'midnight' || currentTheme === 'blueprint' ? 'bg-slate-800' : 'bg-white'} border ${theme.border}`}>
                        <p className="text-xs font-bold uppercase text-emerald-600 mb-2 flex items-center gap-1">🏋️ Demonstration</p>
                        <p className={`text-sm ${theme.text} leading-relaxed font-medium`}>{demonstrationText}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Motion Selector */}
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme.subText} mb-2 block`}>
                    Select Motion ({filteredMotions.length})
                  </label>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {filteredMotions.map(motion => (
                      <button
                        key={motion.id}
                        onClick={() => setSelectedMotion(motion)}
                        className={`w-full text-left px-3 py-2 rounded-lg border ${theme.border} transition-all ${
                          selectedMotion.id === motion.id
                            ? 'bg-brand-500 text-white border-brand-500'
                            : `${theme.cardBg} ${theme.text} hover:border-brand-300`
                        }`}
                      >
                        <div className="font-semibold text-sm">{motion.displayName}</div>
                        <div className={`text-xs ${selectedMotion.id === motion.id ? 'text-white opacity-90' : theme.subText}`}>
                          {motion.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* GIF Search Buttons */}
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme.subText} mb-2 block`}>
                    External Resources
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        const query = generateGifSearchQuery(muscleId || '', muscleName, selectedMotion.id);
                        window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query + ' gif')}`, '_blank');
                      }}
                      className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.text} text-sm hover:border-brand-300 transition-all flex items-center gap-2`}
                    >
                      <Search className="w-4 h-4" />
                      Search GIF: {selectedMotion.name}
                    </button>
                    
                    {actionList.slice(0, 3).map((action, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${muscleName} ${action} animation gif`)}`, '_blank');
                        }}
                        className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.text} text-xs hover:border-brand-300 transition-all flex items-center gap-2`}
                      >
                        <Camera className="w-3 h-3" />
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Beta Notice */}
                <div className={`p-3 rounded-lg ${theme.infoBox} text-xs ${theme.subText} space-y-1`}>
                  <p className="font-semibold">⚠️ Beta Feature</p>
                  <p>
                    3D animations are educational approximations. Joint axes, ranges, and coupling are simplified. 
                    Always verify with authoritative anatomical resources.
                  </p>
                </div>
              </div>
            </aside>
          )}

          {/* Right: Visualization Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* View Tabs */}
            {viewMode === 'BOTH' && (
              <div className={`border-b ${theme.border} flex`}>
                <div className={`flex-1 px-4 py-2 text-center text-sm font-semibold ${theme.text} ${theme.cardBg}`}>
                  3D Model
                </div>
                <div className={`flex-1 px-4 py-2 text-center text-sm font-semibold ${theme.text} ${theme.cardBg} border-l ${theme.border}`}>
                  Stick Figure
                </div>
              </div>
            )}

            {/* Visualization Content */}
            <div className="flex-1 overflow-hidden">
              {viewMode === '3D' && (
                <div className="w-full h-full relative">
                  <Animation3DView
                    motion={selectedMotion}
                    playing={playing}
                    cameraPreset={cameraPreset}
                    manualControl={manualCameraControl}
                    onAngleUpdate={setCurrentAngle}
                    onOrbitStart={handleOrbitStart}
                    onLoadError={() => setModel3DFailed(true)}
                    theme={theme}
                    currentTheme={currentTheme}
                  />
                </div>
              )}

              {viewMode === 'STICK' && (
                <div className={`w-full h-full flex items-center justify-center relative ${
                  currentTheme === 'midnight' || currentTheme === 'blueprint'
                    ? 'bg-gradient-to-br from-slate-900 to-slate-800'
                    : 'bg-gradient-to-br from-slate-50 to-slate-100'
                }`}>
                  <StickFigureAnimation
                    motion={selectedMotion}
                    playing={playing}
                    currentTheme={currentTheme}
                  />
                </div>
              )}

              {viewMode === 'BOTH' && (
                <div className="w-full h-full grid grid-cols-2 divide-x">
                  <div className="relative">
                    <Animation3DView
                      motion={selectedMotion}
                      playing={playing}
                      cameraPreset={cameraPreset}
                      manualControl={manualCameraControl}
                      onAngleUpdate={setCurrentAngle}
                      onOrbitStart={handleOrbitStart}
                      onLoadError={() => setModel3DFailed(true)}
                      theme={theme}
                      currentTheme={currentTheme}
                    />
                  </div>
                  <div className={`relative flex items-center justify-center ${
                    currentTheme === 'midnight' || currentTheme === 'blueprint'
                      ? 'bg-gradient-to-br from-slate-900 to-slate-800'
                      : 'bg-gradient-to-br from-slate-50 to-slate-100'
                  }`}>
                    <StickFigureAnimation
                      motion={selectedMotion}
                      playing={playing}
                      currentTheme={currentTheme}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Instructions Overlay (bottom) */}
            <div className={`px-4 py-3 border-t ${theme.border} ${theme.sidebarBg} text-xs ${theme.subText} flex items-center justify-between flex-shrink-0`}>
              <div className="flex items-center gap-4">
                <span>🖱️ <strong>Left-drag:</strong> Rotate</span>
                <span>🖱️ <strong>Right-drag:</strong> Pan</span>
                <span>🖱️ <strong>Scroll:</strong> Zoom</span>
              </div>
              <span className="opacity-75">
                Joint: {selectedMotion.joint.name} • Range: {selectedMotion.joint.minDeg}° to {selectedMotion.joint.maxDeg}°
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3D ANIMATION VIEW COMPONENT
// ============================================================================

interface Animation3DViewProps {
  motion: MotionDefinition;
  playing: boolean;
  cameraPreset: CameraPreset;
  manualControl: boolean;
  onAngleUpdate: (angle: number) => void;
  onOrbitStart: () => void;
  onLoadError: () => void;
  theme: any;
  currentTheme: AppTheme;
}

const Animation3DView: React.FC<Animation3DViewProps> = ({
  motion,
  playing,
  cameraPreset,
  manualControl,
  onAngleUpdate,
  onOrbitStart,
  onLoadError,
  theme,
  currentTheme
}) => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load model manifest and select appropriate model
    const base = (import.meta as any).env?.BASE_URL || '/';
    const toUrl = (p: string) => base + (p.startsWith('/') ? p.slice(1) : p);
    
    fetch(toUrl('models/manifest.json'))
      .then(r => r.ok ? r.json() : Promise.reject('Manifest not found'))
      .then((json) => {
        if (Array.isArray(json.models)) {
          const modelType = getModelTypeForMotion(motion);
          
          // Match model labels to model type with case-insensitive comparison
          let model;
          if (modelType === 'upper') {
            model = json.models.find((m: any) => 
              m.label.toLowerCase().includes('upper')
            );
          } else if (modelType === 'lower') {
            model = json.models.find((m: any) => 
              m.label.toLowerCase().includes('lower')
            );
          } else if (modelType === 'overview') {
            model = json.models.find((m: any) => 
              m.label.toLowerCase().includes('overview')
            );
          }
          
          // Fallback to first model if no match
          if (!model) {
            model = json.models[0];
          }
          
          if (model) {
            setModelUrl(toUrl(model.url));
          }
        }
      })
      .catch(() => {
        onLoadError();
      });
  }, [motion, onLoadError]);

  // Theme-aware background colors for canvas
  const getCanvasBackground = () => {
    const themeColors: Record<AppTheme, string> = {
      modern: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)', // slate-50 to slate-200
      midnight: 'linear-gradient(to bottom, #0f172a, #1e293b)', // slate-950 to slate-800
      blueprint: 'linear-gradient(to bottom, #0f172a, #1e3a5f)', // dark blue gradient
      nature: 'linear-gradient(to bottom, #fafaf9, #e7e5e4)', // stone-50 to stone-200
    };
    return themeColors[currentTheme] || themeColors.modern;
  };

  return (
    <Canvas
      camera={{ position: [2.5, 1.5, 2.5], fov: 50 }}
      style={{ background: getCanvasBackground() }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />
      <pointLight position={[0, 3, 0]} intensity={0.3} />

      <Suspense fallback={<Loader />}>
        {modelUrl ? (
          <AnimatedModel
            url={modelUrl}
            motion={motion}
            playing={playing}
            onAngleUpdate={onAngleUpdate}
            onLoadError={onLoadError}
          />
        ) : (
          <FallbackRig motion={motion} playing={playing} onAngleUpdate={onAngleUpdate} />
        )}
      </Suspense>

      <CameraController
        preset={cameraPreset}
        manualControl={manualControl}
      />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        onStart={onOrbitStart}
        makeDefault
      />

      <gridHelper args={[10, 10, '#cbd5e1', '#e2e8f0']} position={[0, -0.01, 0]} />
    </Canvas>
  );
};

// ============================================================================
// ANIMATED MODEL (GLTF)
// ============================================================================

interface AnimatedModelProps {
  url: string;
  motion: MotionDefinition;
  playing: boolean;
  onAngleUpdate: (angle: number) => void;
  onLoadError: () => void;
}

const AnimatedModel: React.FC<AnimatedModelProps> = ({
  url,
  motion,
  playing,
  onAngleUpdate,
  onLoadError
}) => {
  try {
    const gltf = useGLTF(url);
    const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

    return (
      <AnimationRig
        scene={scene}
        motion={motion}
        playing={playing}
        onAngleUpdate={onAngleUpdate}
      />
    );
  } catch (error) {
    onLoadError();
    return null;
  }
};

// ============================================================================
// ANIMATION RIG - Simplified for full anatomical models
// Instead of trying to find specific bones, just rotate the entire model
// to showcase the anatomy. The stick figure provides motion demonstration.
// ============================================================================

interface AnimationRigProps {
  scene: THREE.Object3D;
  motion: MotionDefinition;
  playing: boolean;
  onAngleUpdate: (angle: number) => void;
}

const AnimationRig: React.FC<AnimationRigProps> = ({
  scene,
  motion,
  playing,
  onAngleUpdate
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const baseRotation = useRef<THREE.Euler | null>(null);

  // Store base rotation on first render
  useEffect(() => {
    if (groupRef.current && !baseRotation.current) {
      baseRotation.current = groupRef.current.rotation.clone();
    }
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const t = state.clock.getElapsedTime();
    
    // Calculate animation angle for display
    const range = (motion.joint.maxDeg - motion.joint.minDeg) / 2;
    const mid = (motion.joint.maxDeg + motion.joint.minDeg) / 2;
    const currentAngle = playing 
      ? mid + range * Math.sin(t * (1 / motion.duration) * Math.PI * 2)
      : mid;
    
    onAngleUpdate(currentAngle);

    // Gently rotate the entire model for showcase (not bone-specific animation)
    // This provides a nice 3D view of the anatomy without random parts flying around
    if (playing) {
      // Slow gentle rotation to showcase the model
      groupRef.current.rotation.y = t * 0.3; // Slow turntable rotation
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1} />
    </group>
  );
};

// ============================================================================
// FALLBACK RIG (Simple Boxes)
// ============================================================================

interface FallbackRigProps {
  motion: MotionDefinition;
  playing: boolean;
  onAngleUpdate: (angle: number) => void;
}

const FallbackRig: React.FC<FallbackRigProps> = ({ motion, playing, onAngleUpdate }) => {
  const limbRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!limbRef.current) return;
    
    const t = state.clock.getElapsedTime();
    const range = (motion.joint.maxDeg - motion.joint.minDeg) / 2;
    const mid = (motion.joint.maxDeg + motion.joint.minDeg) / 2;
    const angle = playing 
      ? mid + range * Math.sin(t * (1 / motion.duration) * Math.PI * 2)
      : mid;
    
    onAngleUpdate(angle);

    const rad = THREE.MathUtils.degToRad(angle);
    const axis = motion.joint.axis;

    limbRef.current.rotation.set(
      axis.x * rad,
      axis.y * rad,
      axis.z * rad
    );
  });

  return (
    <group position={[0, 1, 0]}>
      {/* Fixed segment */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      
      {/* Rotating segment */}
      <group ref={limbRef} position={[0, -0.4, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.18, 0.8, 0.18]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </group>
    </group>
  );
};

// ============================================================================
// CAMERA CONTROLLER
// ============================================================================

interface CameraControllerProps {
  preset: CameraPreset;
  manualControl: boolean;
}

const CameraController: React.FC<CameraControllerProps> = ({ preset, manualControl }) => {
  const { camera } = useThree();

  useFrame((_, delta) => {
    if (manualControl || preset === 'free') return;

    const config = CAMERA_PRESETS[preset as Exclude<CameraPreset, 'free'>];
    if (!config) return;

    const targetPos = new THREE.Vector3(...config.position);
    const targetLookAt = new THREE.Vector3(...config.target);

    camera.position.lerp(targetPos, Math.min(1, delta * 3));
    camera.lookAt(targetLookAt);
  });

  return null;
};

// ============================================================================
// LOADER
// ============================================================================

const Loader = () => (
  <Html center>
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-bold text-blue-600">Loading Model...</p>
    </div>
  </Html>
);

export default AdvancedAnimationViewer;
