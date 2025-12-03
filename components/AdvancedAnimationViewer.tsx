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
  getModelTypeForMotion,
  // New educational imports
  getLearningTipsForMotion,
  getClinicalRelevanceForMotion,
  getCommonErrorsForMotion,
  getAntagonistMotion,
  getHighlightedNodesForMotion
} from '../services/animationService';
import { StickFigureAnimation } from './StickFigureAnimation';
import { MapPin, Zap, ExternalLink, Image, BookOpen, Activity } from 'lucide-react';

interface AdvancedAnimationViewerProps {
  muscleName: string;
  muscleId?: string;
  currentTheme: AppTheme;
  onClose: () => void;
  // Context from muscle card
  actionString?: string;
  demonstrationText?: string;
  originString?: string;
  insertionString?: string;
  // Mode
  browserMode?: boolean; // If true, show all animations; if false, show muscle-specific
  initialMotionId?: string;
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
  originString,
  insertionString,
  browserMode = false,
  initialMotionId
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

  // Keep selected motion in sync with browser selection
  useEffect(() => {
    if (!initialMotionId) return;
    const fromBrowser = availableMotions.find(m => m.id === initialMotionId);
    if (fromBrowser) {
      setSelectedMotion(fromBrowser);
    }
  }, [initialMotionId, availableMotions]);

  // Action list parsing - clean up numbered lists and extract meaningful actions
  const actionList = useMemo(() => {
    if (!actionString) return [];
    return actionString
      .split(/[\n;]/)
      .map(s => s.replace(/^\d+\.\s*/, '').trim()) // Remove leading numbers like "1. "
      .filter(s => s.length > 3 && !s.match(/^\d+$/)); // Remove empty and number-only strings
  }, [actionString]);

  // Extract motion keywords from actions for targeted searches
  const extractedMotions = useMemo(() => {
    const motionKeywords = [
      'flexion', 'extension', 'abduction', 'adduction', 'rotation',
      'pronation', 'supination', 'dorsiflexion', 'plantarflexion',
      'elevation', 'depression', 'protraction', 'retraction',
      'inversion', 'eversion', 'circumduction'
    ];
    const found: string[] = [];
    actionList.forEach(action => {
      const lower = action.toLowerCase();
      motionKeywords.forEach(keyword => {
        if (lower.includes(keyword) && !found.includes(keyword)) {
          found.push(keyword);
        }
      });
    });
    return found;
  }, [actionList]);

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

                {/* Learning Resources - Comprehensive Section */}
                <div className="space-y-3">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme.subText} flex items-center gap-2`}>
                    <BookOpen className="w-3 h-3" />
                    Learning Resources
                  </label>
                  
                  {/* Anatomy Images */}
                  <div className={`p-3 rounded-lg ${theme.infoBox} space-y-2`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.subText} flex items-center gap-1`}>
                      <MapPin className="w-3 h-3" /> Anatomy Images
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${muscleName} muscle origin anatomy diagram`)}`, '_blank')}
                        className={`px-2 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-emerald-400 hover:bg-emerald-50/10 transition-all flex items-center justify-center gap-1 ${theme.text}`}
                      >
                        <span className="text-emerald-500">●</span> Origin
                      </button>
                      <button
                        onClick={() => window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${muscleName} muscle insertion anatomy diagram`)}`, '_blank')}
                        className={`px-2 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-rose-400 hover:bg-rose-50/10 transition-all flex items-center justify-center gap-1 ${theme.text}`}
                      >
                        <span className="text-rose-500">●</span> Insertion
                      </button>
                    </div>
                    <button
                      onClick={() => window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${muscleName} muscle anatomy labeled diagram`)}`, '_blank')}
                      className={`w-full px-2 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-brand-400 transition-all flex items-center justify-center gap-2 ${theme.text}`}
                    >
                      <Image className="w-3 h-3" /> Full Anatomy Diagram
                    </button>
                  </div>

                  {/* Motion GIF Searches */}
                  <div className={`p-3 rounded-lg ${theme.infoBox} space-y-2`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.subText} flex items-center gap-1`}>
                      <Activity className="w-3 h-3" /> Motion Animations
                    </p>
                    
                    {/* Current Selected Motion */}
                    <button
                      onClick={() => {
                        const query = generateGifSearchQuery(muscleId || '', muscleName, selectedMotion.id);
                        window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query + ' animation gif')}`, '_blank');
                      }}
                      className={`w-full px-3 py-2 rounded-lg bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-all flex items-center justify-center gap-2`}
                    >
                      <Search className="w-4 h-4" />
                      {selectedMotion.displayName} GIF
                    </button>
                    
                    {/* All Extracted Motions as Buttons */}
                    {extractedMotions.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {extractedMotions.map((motion, i) => (
                          <button
                            key={i}
                            onClick={() => window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${muscleName} ${motion} animation gif`)}`, '_blank')}
                            className={`px-2 py-1 rounded-full border ${theme.border} ${theme.cardBg} text-[10px] font-medium capitalize hover:border-brand-400 hover:bg-brand-50/10 transition-all flex items-center gap-1 ${theme.text}`}
                          >
                            <Zap className="w-2.5 h-2.5 text-amber-500" />
                            {motion}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* All Available Motions for this muscle */}
                    {availableMotions.length > 1 && (
                      <div className="pt-2 border-t border-dashed border-current/20">
                        <p className={`text-[9px] uppercase tracking-wider mb-1 ${theme.subText}`}>All Available Motions</p>
                        <div className="flex flex-wrap gap-1">
                          {availableMotions.filter(m => m.id !== selectedMotion.id).slice(0, 6).map((motion) => (
                            <button
                              key={motion.id}
                              onClick={() => window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${motion.displayName} animation gif anatomy`)}`, '_blank')}
                              className={`px-2 py-1 rounded-full border ${theme.border} ${theme.cardBg} text-[10px] font-medium hover:border-blue-400 transition-all ${theme.text}`}
                            >
                              {motion.displayName}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick External Links */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(`${muscleName} muscle kinesiology`)}`, '_blank')}
                      className={`flex-1 px-2 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-[10px] font-medium hover:border-brand-300 transition-all flex items-center justify-center gap-1 ${theme.text}`}
                    >
                      <ExternalLink className="w-3 h-3" /> Learn More
                    </button>
                    <button
                      onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(`${muscleName} muscle anatomy tutorial`)}`, '_blank')}
                      className={`flex-1 px-2 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-[10px] font-medium hover:border-red-400 transition-all flex items-center justify-center gap-1 ${theme.text}`}
                    >
                      <PlayCircle className="w-3 h-3 text-red-500" /> YouTube
                    </button>
                  </div>
                </div>

                {/* Educational Content Panel - NEW */}
                <div className="space-y-3">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme.subText} flex items-center gap-2`}>
                    <Sparkles className="w-3 h-3" />
                    Study Tips for {selectedMotion.displayName}
                  </label>
                  
                  {/* Learning Tips */}
                  {getLearningTipsForMotion(selectedMotion.id).length > 0 && (
                    <div className={`p-3 rounded-lg ${theme.infoBox} space-y-2`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1`}>
                        💡 Key Learning Points
                      </p>
                      <ul className={`text-xs ${theme.text} space-y-1`}>
                        {getLearningTipsForMotion(selectedMotion.id).map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-500 mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Clinical Relevance */}
                  {getClinicalRelevanceForMotion(selectedMotion.id) && (
                    <div className={`p-3 rounded-lg ${currentTheme === 'midnight' || currentTheme === 'blueprint' ? 'bg-blue-900/30' : 'bg-blue-50'} border border-blue-400/30`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1 mb-1`}>
                        🏥 Clinical Relevance
                      </p>
                      <p className={`text-xs ${theme.text}`}>
                        {getClinicalRelevanceForMotion(selectedMotion.id)}
                      </p>
                    </div>
                  )}

                  {/* Common Errors */}
                  {getCommonErrorsForMotion(selectedMotion.id).length > 0 && (
                    <div className={`p-3 rounded-lg ${currentTheme === 'midnight' || currentTheme === 'blueprint' ? 'bg-amber-900/30' : 'bg-amber-50'} border border-amber-400/30`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1 mb-1`}>
                        ⚠️ Common Mistakes to Avoid
                      </p>
                      <ul className={`text-xs ${theme.text} space-y-1`}>
                        {getCommonErrorsForMotion(selectedMotion.id).map((error, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">✗</span>
                            <span>{error}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Antagonist Motion */}
                  {getAntagonistMotion(selectedMotion.id) && (
                    <div className={`p-3 rounded-lg ${theme.infoBox}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.subText} flex items-center gap-1 mb-1`}>
                        ⚔️ Antagonist Motion
                      </p>
                      <button
                        onClick={() => {
                          const antagonist = getAntagonistMotion(selectedMotion.id);
                          if (antagonist) setSelectedMotion(antagonist);
                        }}
                        className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-sm font-medium hover:border-purple-400 transition-all flex items-center justify-center gap-2 ${theme.text}`}
                      >
                        <RotateCcw className="w-3 h-3" />
                        {getAntagonistMotion(selectedMotion.id)?.displayName}
                      </button>
                    </div>
                  )}

                  {/* Highlighted Muscles */}
                  {getHighlightedNodesForMotion(selectedMotion.id).length > 0 && (
                    <div className={`p-3 rounded-lg ${theme.infoBox}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.subText} flex items-center gap-1 mb-1`}>
                        🔍 Key Muscles Involved
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {getHighlightedNodesForMotion(selectedMotion.id).slice(0, 6).map((muscle, i) => (
                          <span 
                            key={i}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${currentTheme === 'midnight' || currentTheme === 'blueprint' ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'}`}
                          >
                            {muscle.replace(/\.r$/, '').replace(/ muscle/i, '')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
// ANIMATION RIG - Anatomically Accurate Joint Animation System v8.2
// Uses procedural bone animations with correct anatomical planes
// ============================================================================

interface AnimationRigProps {
  scene: THREE.Object3D;
  motion: MotionDefinition;
  playing: boolean;
  onAngleUpdate: (angle: number) => void;
}

// Bone name patterns for different models
const BONE_PATTERNS = {
  // Upper body
  shoulder: ['shoulder', 'clavicle', 'humerus', 'arm_upper', 'upperarm', 'l_arm', 'r_arm'],
  upperArm: ['upperarm', 'upper_arm', 'humerus', 'arm.upper', 'arm_upper'],
  forearm: ['forearm', 'lower_arm', 'radius', 'ulna', 'arm.lower', 'arm_lower'],
  hand: ['hand', 'wrist', 'carpal'],
  elbow: ['elbow', 'forearm', 'lower_arm'],
  
  // Lower body
  hip: ['hip', 'pelvis', 'thigh', 'femur', 'leg_upper', 'upperleg'],
  knee: ['knee', 'shin', 'tibia', 'leg_lower', 'lowerleg', 'calf'],
  ankle: ['ankle', 'foot', 'tarsal'],
  
  // Trunk
  spine: ['spine', 'back', 'torso', 'trunk', 'lumbar', 'thoracic'],
  scapula: ['scapula', 'shoulder_blade', 'clavicle']
};

// Find bones in scene matching patterns
const findBones = (scene: THREE.Object3D, patterns: string[]): THREE.Object3D[] => {
  const bones: THREE.Object3D[] = [];
  scene.traverse((obj) => {
    const name = obj.name.toLowerCase();
    if (patterns.some(p => name.includes(p.toLowerCase()))) {
      bones.push(obj);
    }
  });
  return bones;
};

// Get appropriate bones for a motion
const getBonesForMotion = (scene: THREE.Object3D, motion: MotionDefinition): THREE.Object3D[] => {
  const jointId = motion.joint.id.toLowerCase();
  
  if (jointId.includes('shoulder') || jointId.includes('scapula')) {
    return findBones(scene, [...BONE_PATTERNS.shoulder, ...BONE_PATTERNS.upperArm]);
  }
  if (jointId.includes('elbow')) {
    return findBones(scene, BONE_PATTERNS.forearm);
  }
  if (jointId.includes('forearm')) {
    return findBones(scene, [...BONE_PATTERNS.forearm, ...BONE_PATTERNS.hand]);
  }
  if (jointId.includes('wrist')) {
    return findBones(scene, BONE_PATTERNS.hand);
  }
  if (jointId.includes('hip')) {
    return findBones(scene, [...BONE_PATTERNS.hip, ...BONE_PATTERNS.knee]);
  }
  if (jointId.includes('knee')) {
    return findBones(scene, BONE_PATTERNS.knee);
  }
  if (jointId.includes('ankle')) {
    return findBones(scene, BONE_PATTERNS.ankle);
  }
  if (jointId.includes('spine')) {
    return findBones(scene, BONE_PATTERNS.spine);
  }
  
  return [];
};

const AnimationRig: React.FC<AnimationRigProps> = ({
  scene,
  motion,
  playing,
  onAngleUpdate
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const bonesRef = useRef<THREE.Object3D[]>([]);
  const initialRotationsRef = useRef<Map<string, THREE.Euler>>(new Map());
  const animatedGroupRef = useRef<THREE.Group | null>(null);

  // Initialize: find bones and store initial rotations
  useEffect(() => {
    bonesRef.current = getBonesForMotion(scene, motion);
    initialRotationsRef.current.clear();
    
    bonesRef.current.forEach((bone) => {
      initialRotationsRef.current.set(bone.uuid, bone.rotation.clone());
    });
  }, [scene, motion]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const t = state.clock.getElapsedTime();
    
    // Calculate smooth oscillating angle
    const neutralDeg = motion.joint.neutralDeg || 0;
    const targetDeg = motion.targetDeg;
    const range = Math.abs(targetDeg - neutralDeg);
    
    // Smooth sine wave for natural motion
    const progress = Math.sin(t * (Math.PI / motion.duration));
    const currentAngle = playing 
      ? neutralDeg + (targetDeg - neutralDeg) * Math.abs(progress)
      : neutralDeg;
    
    onAngleUpdate(currentAngle);

    if (playing) {
      const angleRad = THREE.MathUtils.degToRad(currentAngle);
      const axis = motion.joint.axis;
      
      // If we found bones, animate them
      if (bonesRef.current.length > 0) {
        bonesRef.current.forEach((bone, index) => {
          const initial = initialRotationsRef.current.get(bone.uuid);
          if (initial) {
            // Apply animation relative to initial rotation
            // Use different weights for chain of bones
            const weight = 1 / (index + 1);
            bone.rotation.x = initial.x + axis.x * angleRad * weight;
            bone.rotation.y = initial.y + axis.y * angleRad * weight;
            bone.rotation.z = initial.z + axis.z * angleRad * weight;
          }
        });
      }
      
      // Create animated limb visualization if no bones found
      if (bonesRef.current.length === 0 && animatedGroupRef.current) {
        animatedGroupRef.current.rotation.x = axis.x * angleRad;
        animatedGroupRef.current.rotation.y = axis.y * angleRad;
        animatedGroupRef.current.rotation.z = axis.z * angleRad;
      }
    } else {
      // Reset to initial positions when paused
      bonesRef.current.forEach((bone) => {
        const initial = initialRotationsRef.current.get(bone.uuid);
        if (initial) {
          bone.rotation.copy(initial);
        }
      });
    }
  });

  // Determine if we need to show the built-in animated limb
  const showAnimatedLimb = bonesRef.current.length === 0;

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1} />
      
      {/* Fallback animated limb visualization when bones not found */}
      {showAnimatedLimb && (
        <AnimatedLimbOverlay
          motion={motion}
          playing={playing}
          onGroupRef={(ref) => { animatedGroupRef.current = ref; }}
        />
      )}
    </group>
  );
};

// Animated limb overlay for when bones aren't found in models
interface AnimatedLimbOverlayProps {
  motion: MotionDefinition;
  playing: boolean;
  onGroupRef: (ref: THREE.Group | null) => void;
}

const AnimatedLimbOverlay: React.FC<AnimatedLimbOverlayProps> = ({ motion, playing, onGroupRef }) => {
  const limbRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (limbRef.current) {
      onGroupRef(limbRef.current);
    }
    return () => onGroupRef(null);
  }, [onGroupRef]);

  useFrame((state) => {
    if (!limbRef.current || !playing) return;
    
    const t = state.clock.getElapsedTime();
    const neutralDeg = motion.joint.neutralDeg || 0;
    const targetDeg = motion.targetDeg;
    const progress = Math.sin(t * (Math.PI / motion.duration));
    const currentAngle = neutralDeg + (targetDeg - neutralDeg) * Math.abs(progress);
    const angleRad = THREE.MathUtils.degToRad(currentAngle);
    
    const axis = motion.joint.axis;
    limbRef.current.rotation.set(
      axis.x * angleRad,
      axis.y * angleRad,
      axis.z * angleRad
    );
  });

  // Determine visual style based on motion region
  const getVisualization = () => {
    const region = motion.region;
    const jointId = motion.joint.id.toLowerCase();
    
    if (region === 'upper' || region === 'hand') {
      // Arm visualization
      return (
        <group position={[0.8, 1.2, 0]}>
          {/* Fixed upper segment */}
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.06, 0.4, 8, 16]} />
            <meshStandardMaterial color="#64748b" transparent opacity={0.8} />
          </mesh>
          
          {/* Animated segment */}
          <group ref={limbRef} position={[0, -0.25, 0]}>
            <mesh position={[0, -0.25, 0]}>
              <capsuleGeometry args={[0.05, 0.4, 8, 16]} />
              <meshStandardMaterial color="#3b82f6" transparent opacity={0.9} />
            </mesh>
            {/* Hand/end indicator */}
            <mesh position={[0, -0.55, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#60a5fa" />
            </mesh>
          </group>
          
          {/* Joint indicator */}
          <mesh position={[0, -0.25, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
        </group>
      );
    }
    
    if (region === 'lower' || region === 'foot') {
      // Leg visualization
      return (
        <group position={[0.3, 0.8, 0]}>
          {/* Fixed upper segment (thigh) */}
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
            <meshStandardMaterial color="#64748b" transparent opacity={0.8} />
          </mesh>
          
          {/* Animated segment (lower leg) */}
          <group ref={limbRef} position={[0, -0.3, 0]}>
            <mesh position={[0, -0.3, 0]}>
              <capsuleGeometry args={[0.06, 0.5, 8, 16]} />
              <meshStandardMaterial color="#22c55e" transparent opacity={0.9} />
            </mesh>
            {/* Foot indicator */}
            <mesh position={[0.1, -0.65, 0]} rotation={[0, 0, Math.PI / 6]}>
              <boxGeometry args={[0.2, 0.06, 0.1]} />
              <meshStandardMaterial color="#4ade80" />
            </mesh>
          </group>
          
          {/* Joint indicator */}
          <mesh position={[0, -0.3, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
        </group>
      );
    }
    
    // Axial/trunk visualization
    return (
      <group position={[0, 1, 0]}>
        {/* Pelvis base */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.4, 0.15, 0.2]} />
          <meshStandardMaterial color="#64748b" transparent opacity={0.8} />
        </mesh>
        
        {/* Animated spine */}
        <group ref={limbRef} position={[0, 0, 0]}>
          {[0, 0.15, 0.3, 0.45].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <cylinderGeometry args={[0.06 - i * 0.01, 0.06 - i * 0.01, 0.12, 16]} />
              <meshStandardMaterial color={i < 2 ? '#8b5cf6' : '#a78bfa'} transparent opacity={0.9} />
            </mesh>
          ))}
          {/* Head indicator */}
          <mesh position={[0, 0.65, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#c4b5fd" />
          </mesh>
        </group>
      </group>
    );
  };

  return getVisualization();
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
