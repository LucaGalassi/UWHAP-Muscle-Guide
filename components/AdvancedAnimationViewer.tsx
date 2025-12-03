import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds, Html } from '@react-three/drei';
import { AppTheme } from '../types';
import { THEME_CONFIG } from '../constants';
import { X, PlayCircle, PauseCircle, Compass, Camera, HelpCircle, Info } from 'lucide-react';
import * as THREE from 'three';

interface AdvancedAnimationViewerProps {
  muscleName: string;
  currentTheme: AppTheme;
  defaultMotion?: string; // accept string from popup mapping
  onClose: () => void;
  referenceText?: string;
  actionString?: string;
}

type MotionName =
  | 'Elbow Flexion' | 'Elbow Extension'
  | 'Shoulder Abduction' | 'Shoulder Adduction'
  | 'Shoulder Medial Rotation' | 'Shoulder Lateral Rotation'
  | 'Shoulder Flexion' | 'Shoulder Extension'
  | 'Forearm Pronation' | 'Forearm Supination'
  | 'Hip Flexion' | 'Hip Extension'
  | 'Knee Flexion' | 'Knee Extension'
  | 'Ankle Dorsiflexion' | 'Ankle Plantarflexion';

const MOTIONS: MotionName[] = [
  'Elbow Flexion','Elbow Extension',
  'Shoulder Flexion','Shoulder Extension',
  'Shoulder Abduction','Shoulder Adduction',
  'Shoulder Medial Rotation','Shoulder Lateral Rotation',
  'Forearm Pronation','Forearm Supination',
  'Hip Flexion','Hip Extension',
  'Knee Flexion','Knee Extension',
  'Ankle Dorsiflexion','Ankle Plantarflexion'
];

interface JointSpec {
  name: string;
  axis: THREE.Vector3; // local axis of rotation
  minDeg: number;
  maxDeg: number;
}

// Define a minimal articulated arm (shoulder->elbow->forearm->hand) with hip option
const JOINTS: Record<string, JointSpec> = {
  ShoulderFlexExt: { name: 'Shoulder Flex/Ext', axis: new THREE.Vector3(1,0,0), minDeg: -40, maxDeg: 100 },
  ShoulderAbdAdd: { name: 'Shoulder Abd/Add', axis: new THREE.Vector3(0,0,1), minDeg: -10, maxDeg: 90 },
  ShoulderMedLatRot: { name: 'Shoulder Med/Lat Rot', axis: new THREE.Vector3(0,1,0), minDeg: -40, maxDeg: 40 },
  ElbowFlexExt: { name: 'Elbow Flex/Ext', axis: new THREE.Vector3(1,0,0), minDeg: 0, maxDeg: 145 },
  ForearmProSup: { name: 'Forearm Pro/Sup', axis: new THREE.Vector3(0,0,1), minDeg: -90, maxDeg: 90 },
  HipFlexExt: { name: 'Hip Flex/Ext', axis: new THREE.Vector3(1,0,0), minDeg: -10, maxDeg: 120 },
  KneeFlexExt: { name: 'Knee Flex/Ext', axis: new THREE.Vector3(1,0,0), minDeg: 0, maxDeg: 130 },
  AnkleFlexExt: { name: 'Ankle Flex/Ext', axis: new THREE.Vector3(1,0,0), minDeg: -20, maxDeg: 45 },
};

function motionToTargets(motion: MotionName) {
  switch (motion) {
    case 'Elbow Flexion': return { joint: JOINTS.ElbowFlexExt, targetDeg: 120 };
    case 'Elbow Extension': return { joint: JOINTS.ElbowFlexExt, targetDeg: 10 };
    case 'Shoulder Flexion': return { joint: JOINTS.ShoulderFlexExt, targetDeg: 80 };
    case 'Shoulder Extension': return { joint: JOINTS.ShoulderFlexExt, targetDeg: -20 };
    case 'Shoulder Abduction': return { joint: JOINTS.ShoulderAbdAdd, targetDeg: 80 };
    case 'Shoulder Adduction': return { joint: JOINTS.ShoulderAbdAdd, targetDeg: 0 };
    case 'Shoulder Medial Rotation': return { joint: JOINTS.ShoulderMedLatRot, targetDeg: -30 };
    case 'Shoulder Lateral Rotation': return { joint: JOINTS.ShoulderMedLatRot, targetDeg: 30 };
    case 'Forearm Pronation': return { joint: JOINTS.ForearmProSup, targetDeg: 80 };
    case 'Forearm Supination': return { joint: JOINTS.ForearmProSup, targetDeg: -80 };
    case 'Hip Flexion': return { joint: JOINTS.HipFlexExt, targetDeg: 100 };
    case 'Hip Extension': return { joint: JOINTS.HipFlexExt, targetDeg: 0 };
    case 'Knee Flexion': return { joint: JOINTS.KneeFlexExt, targetDeg: 120 };
    case 'Knee Extension': return { joint: JOINTS.KneeFlexExt, targetDeg: 0 };
    case 'Ankle Dorsiflexion': return { joint: JOINTS.AnkleFlexExt, targetDeg: -20 };
    case 'Ankle Plantarflexion': return { joint: JOINTS.AnkleFlexExt, targetDeg: 45 };
    default: return { joint: JOINTS.ElbowFlexExt, targetDeg: 60 };
  }
}

function AxisHelper({ axis, length=0.6 }: { axis: THREE.Vector3; length?: number }) {
  const dir = axis.clone().normalize();
  const color = axis.x ? 'red' : axis.y ? 'green' : 'blue';
  return (
    <mesh>
      <cylinderGeometry args={[0.005, 0.005, length, 8]} />
      <meshBasicMaterial color={color} />
      <group rotation={[0,0,0]} position={[dir.x*length/2, dir.y*length/2, dir.z*length/2]}>
        <coneGeometry args={[0.03, 0.08, 8]} />
      </group>
    </mesh>
  );
}

function CameraController({ position }: { position: number[] }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(position[0], position[1], position[2]);
    camera.lookAt(0, 0, 0);
  }, [position, camera]);
  return null;
}

function StickFigureFallback() {
    return (
        <group>
            {/* Head */}
            <mesh position={[0, 1.7, 0]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial color="#cbd5e1" />
            </mesh>
            {/* Torso */}
            <mesh position={[0, 1.2, 0]}>
                <boxGeometry args={[0.3, 0.8, 0.2]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>
            {/* Arms */}
            <mesh position={[-0.25, 1.5, 0]} rotation={[0, 0, -0.2]}>
                <cylinderGeometry args={[0.04, 0.04, 0.6]} />
                <meshStandardMaterial color="#64748b" />
            </mesh>
            <mesh position={[0.25, 1.5, 0]} rotation={[0, 0, 0.2]}>
                <cylinderGeometry args={[0.04, 0.04, 0.6]} />
                <meshStandardMaterial color="#64748b" />
            </mesh>
            {/* Legs */}
            <mesh position={[-0.1, 0.4, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.8]} />
                <meshStandardMaterial color="#64748b" />
            </mesh>
            <mesh position={[0.1, 0.4, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.8]} />
                <meshStandardMaterial color="#64748b" />
            </mesh>
            <gridHelper args={[4, 4]} />
        </group>
    )
}

function ArmRig({ motion, playing, angleOut, skeleton }: { motion: MotionName; playing: boolean; angleOut: (deg:number)=>void; skeleton?: any }) {
  const group = useRef<THREE.Group>(null);
  const spec = motionToTargets(motion);
  const axisNorm = useMemo(() => spec.joint.axis.clone().normalize(), [spec.joint.axis]);

    // Map bones if skeleton is provided
  const bones = useMemo(() => {
    if (!skeleton?.nodes) return {};
    
    // DEBUG: Log all available bone names
    console.log("Available GLTF Nodes:", Object.keys(skeleton.nodes));

    const findAll = (patterns: string[]) => {
      const keys = Object.keys(skeleton.nodes);
      const lower = keys.map(k => ({ k, l: k.toLowerCase() }));
      const results: any[] = [];
      
      for (const p of patterns) {
        const pl = p.toLowerCase();
        // Find ALL matches that contain the pattern
        const matches = lower.filter(({ l }) => l.includes(pl));
        matches.forEach(m => {
            if (!results.includes((skeleton.nodes as any)[m.k])) {
                results.push((skeleton.nodes as any)[m.k]);
            }
        });
      }
      return results;
    };

    // Group definitions based on user provided tags
    return {
      shoulder: findAll(['Humerus', 'Brachialis', 'Biceps', 'Triceps', 'Coracobrachialis', 'Brachial', 'Axillary', 'Deltoid', 'Teres', 'Infraspinatus', 'Supraspinatus', 'Subscapularis', 'Latissimus', 'Pectoralis']),
      elbow: findAll(['Ulna', 'Radius', 'Forearm', 'Brachioradialis', 'Extensor', 'Flexor', 'Pronator', 'Supinator', 'Anconeus', 'Palmaris']),
      forearm: findAll(['Radius', 'Pronator', 'Supinator']), // Rotation only affects radius + attached muscles
      hip: findAll(['Femur', 'Thigh', 'Quadriceps', 'Hamstring', 'Adductor', 'Sartorius', 'Gracilis', 'Gluteus', 'Iliacus', 'Psoas', 'Tensor_fasciae', 'Pectineus', 'Piriformis', 'Gemellus', 'Obturator', 'Quadratus_femoris']),
      knee: findAll(['Tibia', 'Fibula', 'Shin', 'Calf', 'Gastrocnemius', 'Soleus', 'Plantaris', 'Popliteus', 'Tibialis', 'Fibularis', 'Peroneus', 'Extensor_digitorum_longus', 'Extensor_hallucis', 'Flexor_digitorum', 'Flexor_hallucis']),
      ankle: findAll(['Talus', 'Calcaneus', 'Foot', 'Tarsal', 'Metatarsal', 'Phalanx', 'Toe', 'Hallucis', 'Digitorum', 'Lumbrical', 'Interossei', 'Abductor', 'Adductor', 'Flexor_digiti', 'Extensor_digiti']),
      hand: findAll(['Carpal', 'Metacarpal', 'Phalanx', 'Scaphoid', 'Lunate', 'Triquetrum', 'Pisiform', 'Trapezium', 'Trapezoid', 'Capitate', 'Hamate', 'Finger', 'Thumb', 'Palm', 'Hand']),
      
      // Ambient Motion Groups
      torso: findAll(['Rib', 'Sternum', 'Vertebra', 'Sacrum', 'Coccyx', 'Pelvis', 'Clavicle', 'Scapula', 'Manubrium', 'Xiphoid']),
      head: findAll(['Cervical', 'Atlas', 'Axis', 'Skull', 'Mandible', 'Maxilla', 'Frontal', 'Parietal', 'Occipital', 'Temporal', 'Sphenoid', 'Ethmoid', 'Nasal', 'Zygomatic', 'Vomer', 'Lacrimal', 'Palatine']),
    };
  }, [skeleton]);

  useFrame((state) => {
    // Auto-oscillate smoothly within joint range when playing
    const range = (spec.joint.maxDeg - spec.joint.minDeg) / 2;
    const mid = (spec.joint.maxDeg + spec.joint.minDeg) / 2;
    const t = state.clock.getElapsedTime();
    const value = playing ? (mid + range * Math.sin(t * 0.8)) : mid;
    angleOut(value);
    const rad = THREE.MathUtils.degToRad(value);

    const setQuat = (obj?: THREE.Object3D | null) => {
      if (!obj) return;
      obj.quaternion.setFromAxisAngle(axisNorm, rad);
    };

    // Smart Group Rotation:
    // 1. Identify the primary bone (first in list).
    // 2. Rotate primary bone.
    // 3. Rotate other bones ONLY if they are not descendants of the primary bone (handles "soup" vs "hierarchy").
    const applyToGroup = (group: any[] | undefined) => {
        if (!group || group.length === 0) return;
        
        const primary = group[0];
        setQuat(primary);

        for (let i = 1; i < group.length; i++) {
            const node = group[i];
            // Check if node is a descendant of primary
            let isChild = false;
            let p = node.parent;
            while (p) {
                if (p === primary) { isChild = true; break; }
                p = p.parent;
            }
            
            if (!isChild) {
                setQuat(node);
            }
        }
    };

    if (spec.joint === JOINTS.ShoulderAbdAdd || spec.joint === JOINTS.ShoulderMedLatRot || spec.joint === JOINTS.ShoulderFlexExt) {
      applyToGroup(bones.shoulder);
      // Shoulder moves the arm, so we must also move the child groups if they aren't parented
      // In a proper hierarchy, moving shoulder moves elbow. In a soup, we must move elbow manually.
      // We can use the same logic: check if elbow primary is child of shoulder primary.
      const shoulderPrimary = bones.shoulder?.[0];
      const elbowPrimary = bones.elbow?.[0];
      
      let elbowIsChild = false;
      if (shoulderPrimary && elbowPrimary) {
          let p = elbowPrimary.parent;
          while(p) { if(p === shoulderPrimary) { elbowIsChild = true; break; } p = p.parent; }
      }

      if (!elbowIsChild) {
          applyToGroup(bones.elbow); 
          applyToGroup(bones.forearm);
          applyToGroup(bones.hand);
      }
    }
    if (spec.joint === JOINTS.ForearmProSup) {
      applyToGroup(bones.forearm);
      // Check hand child status
      const forearmPrimary = bones.forearm?.[0];
      const handPrimary = bones.hand?.[0];
      let handIsChild = false;
      if (forearmPrimary && handPrimary) {
          let p = handPrimary.parent;
          while(p) { if(p === forearmPrimary) { handIsChild = true; break; } p = p.parent; }
      }
      if (!handIsChild) applyToGroup(bones.hand);
    }
    if (spec.joint === JOINTS.ElbowFlexExt) {
      applyToGroup(bones.elbow);
      // Check hand child status (Elbow moves forearm and hand)
      const elbowPrimary = bones.elbow?.[0];
      const handPrimary = bones.hand?.[0];
      let handIsChild = false;
      if (elbowPrimary && handPrimary) {
          let p = handPrimary.parent;
          while(p) { if(p === elbowPrimary) { handIsChild = true; break; } p = p.parent; }
      }
      if (!handIsChild) {
          applyToGroup(bones.forearm); // Forearm moves with elbow flexion
          applyToGroup(bones.hand);
      }
    }
    if (spec.joint === JOINTS.HipFlexExt) {
      applyToGroup(bones.hip);
      // Hip moves the leg
      const hipPrimary = bones.hip?.[0];
      const kneePrimary = bones.knee?.[0];
      let kneeIsChild = false;
      if (hipPrimary && kneePrimary) {
          let p = kneePrimary.parent;
          while(p) { if(p === hipPrimary) { kneeIsChild = true; break; } p = p.parent; }
      }
      if (!kneeIsChild) {
          applyToGroup(bones.knee);
          applyToGroup(bones.ankle);
      }
    }
    if (spec.joint === JOINTS.KneeFlexExt) {
      applyToGroup(bones.knee);
      // Knee moves the foot
      const kneePrimary = bones.knee?.[0];
      const anklePrimary = bones.ankle?.[0];
      let ankleIsChild = false;
      if (kneePrimary && anklePrimary) {
          let p = anklePrimary.parent;
          while(p) { if(p === kneePrimary) { ankleIsChild = true; break; } p = p.parent; }
      }
      if (!ankleIsChild) applyToGroup(bones.ankle);
    }
    if (spec.joint === JOINTS.AnkleFlexExt) {
      applyToGroup(bones.ankle);
    }
    
    // "Flying Around" / Breathing Effect for Torso/Head
    if (playing) {
       bones.torso?.forEach((node: any, i: number) => {
           node.position.y += Math.sin(t * 0.5 + i) * 0.0002; // Subtle float
           node.rotation.z += Math.sin(t * 0.3 + i) * 0.0005; // Subtle twist
       });
       bones.head?.forEach((node: any, i: number) => {
           node.rotation.y = Math.sin(t * 0.2) * 0.02; // Slow look around
       });
    }
  });

  if (skeleton && skeleton.scene) {
    return (
      <primitive object={skeleton.scene} />
    );
  }

  return <StickFigureFallback />;
}

type ModelEntry = { label: string; url: string };

export const AdvancedAnimationViewer: React.FC<AdvancedAnimationViewerProps> = ({ muscleName, currentTheme, defaultMotion='Elbow Flexion', onClose, referenceText, actionString }) => {
  const theme = THEME_CONFIG[currentTheme];
  const [motion, setMotion] = useState<MotionName>(defaultMotion as MotionName);
  const [playing, setPlaying] = useState(true);
  const [angle, setAngle] = useState(0);
  const [cameraPreset, setCameraPreset] = useState<'Front'|'Side'|'Top'>('Side');
  const [models, setModels] = useState<ModelEntry[]>([]);
  const [selectedModelUrl, setSelectedModelUrl] = useState<string | null>(null);
  const [forceBoxRig, setForceBoxRig] = useState(false);

  const cameraPosition = useMemo(() => {
    switch (cameraPreset) {
      case 'Front': return [0, 0.5, 2.5];
      case 'Top': return [0, 2.5, 0.1];
      case 'Side':
      default: return [2.5, 0.5, 0];
    }
  }, [cameraPreset]);

  // Heuristic default motion by muscle name for easier auto-selection
  useEffect(() => {
    if (!defaultMotion && muscleName) {
      const name = muscleName.toLowerCase();
      const pick: MotionName = name.includes('bicep') ? 'Elbow Flexion'
        : name.includes('tricep') ? 'Elbow Extension'
        : name.includes('forearm') ? 'Forearm Supination'
        : name.includes('hip') ? 'Hip Flexion'
        : name.includes('quad') ? 'Knee Extension'
        : name.includes('hamstring') ? 'Knee Flexion'
        : name.includes('calf') || name.includes('gastro') ? 'Ankle Plantarflexion'
        : name.includes('tibialis') ? 'Ankle Dorsiflexion'
        : 'Shoulder Flexion';
      setMotion(pick);
    } else if (defaultMotion) {
      // Ensure defaultMotion is valid, otherwise fallback
      if (MOTIONS.includes(defaultMotion as MotionName)) {
        setMotion(defaultMotion as MotionName);
      } else {
        // Try to find a close match
        const match = MOTIONS.find(m => m.includes(defaultMotion) || defaultMotion.includes(m));
        if (match) setMotion(match);
      }
    }
    setPlaying(true);
  }, [muscleName, defaultMotion]);

  useEffect(() => {
    const base = (import.meta as any).env?.BASE_URL || '/';
    const toUrl = (p: string) => base + (p.startsWith('/') ? p.slice(1) : p);
    fetch(toUrl('models/manifest.json'))
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((json) => {
        if (Array.isArray(json.models)) {
          // map model URLs to respect base path and filter out unwanted models
          const mapped = json.models
            .filter((m: any) => !m.label.toLowerCase().includes('cervical'))
            .map((m: any) => ({ label: m.label, url: toUrl(m.url) }));
          setModels(mapped);
          if (mapped.length && !selectedModelUrl) setSelectedModelUrl(mapped[0].url);
        }
      })
      .catch(() => {
        const fallback = toUrl('models/overview-skeleton.glb');
        setModels([{ label: 'Skeleton (Default Path)', url: fallback }]);
        if (!selectedModelUrl) setSelectedModelUrl(fallback);
      });
  }, []);

  function GLTFArmRig({ url }: { url: string }) {
    const gltf = useGLTF(url);
    return <ArmRig motion={motion} playing={playing} angleOut={setAngle} skeleton={gltf} />;
  }

  const actionList = useMemo(() => {
    if (!actionString) return [];
    // Split by common delimiters and clean up
    return actionString.split(/[;,\.]/).map(s => s.trim()).filter(s => s.length > 3);
  }, [actionString]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-[95vw] h-[90vh] rounded-2xl border ${theme.border} ${theme.cardBg} shadow-2xl overflow-hidden flex flex-col`}>
        <div className={`px-5 py-4 border-b ${theme.border} flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            <h3 className={`font-bold ${theme.text}`}>Advanced 3D Animation Viewer (Beta)</h3>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full hover:bg-slate-100 ${theme.subText}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`${theme.text} text-base font-semibold`}>{muscleName}</p>
              <p className={`text-sm ${theme.subText}`}>Motion: {motion} • Angle: {angle.toFixed(0)}°</p>
            </div>
            <div className="flex items-center gap-2">
              <select value={selectedModelUrl ?? ''} onChange={(e)=> setSelectedModelUrl(e.target.value || null)} className={`px-4 py-3 rounded-lg border ${theme.border} text-base ${theme.text} ${theme.inputBg} min-w-[16rem]`}>
                {models.map(m => <option key={m.url} value={m.url}>{m.label}</option>)}
                {!models.length && <option value=''>Box Rig (No Model)</option>}
              </select>
              <select value={motion} onChange={(e)=>setMotion(e.target.value as MotionName)} className={`px-4 py-3 rounded-lg border ${theme.border} text-base ${theme.text} ${theme.inputBg} min-w-[16rem]`}>
                {MOTIONS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <button onClick={()=>setPlaying(p=>!p)} className={`px-4 py-3 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.text} text-base font-semibold`}>
                {playing ? <PauseCircle className="w-4 h-4 inline-block mr-1" /> : <PlayCircle className="w-4 h-4 inline-block mr-1" />} {playing ? 'Pause' : 'Play'}
              </button>
              <select value={cameraPreset} onChange={(e)=>setCameraPreset(e.target.value as any)} className={`px-4 py-3 rounded-lg border ${theme.border} text-base ${theme.text} ${theme.inputBg}`}>
                <option value="Front">Front</option>
                <option value="Side">Side</option>
                <option value="Top">Top</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 flex-1 min-h-0">
            <div className={`rounded-2xl border ${theme.border} ${theme.inputBg} p-2 flex-1 min-h-0`}>
              <Canvas camera={{ position: cameraPosition as any, fov: 45 }} dpr={[1, 2]} frameloop="always">
                <CameraController position={cameraPosition} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[5,5,5]} intensity={0.8} />
                <gridHelper args={[10, 20]} />
                {selectedModelUrl && !forceBoxRig ? (
                  <Suspense fallback={null}>
                    <Bounds fit clip observe margin={1.2}>
                      <GLTFArmRig url={selectedModelUrl} />
                    </Bounds>
                  </Suspense>
                ) : (
                  <ArmRig motion={motion} playing={playing} angleOut={setAngle} />
                )}
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} makeDefault />
              </Canvas>
            </div>
            <aside className={`w-80 rounded-2xl border ${theme.border} ${theme.inputBg} p-4 flex flex-col overflow-y-auto`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme.cardBg} border ${theme.border}`}>
                    <span className="text-sm">💪</span>
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${theme.text}`}>{muscleName}</p>
                    <p className={`text-xs ${theme.subText}`}>{motion}</p>
                  </div>
                </div>
              </div>
              
              {/* Alert Box */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-xs text-yellow-800 font-medium">
                  ⚠️ Note: 3D animations are approximations. Verify with textbook resources.
                </p>
              </div>

              <div className="mb-4">
                 <label className="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer">
                    <input type="checkbox" checked={forceBoxRig} onChange={(e) => setForceBoxRig(e.target.checked)} className="rounded text-brand-600 focus:ring-brand-500" />
                    Force Box Rig (Debug)
                 </label>
                 <p className="text-[10px] text-slate-400 mt-1">Use this if the 3D model is not animating correctly.</p>
              </div>

              {/* Instructions / Plain Words Demo */}
              <div className={`mb-4 p-3 rounded-lg border ${theme.border} ${theme.cardBg}`}>
                  <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-blue-500" />
                      <h4 className={`text-sm font-bold ${theme.text}`}>How to use</h4>
                  </div>
                  <ul className={`text-xs ${theme.subText} space-y-1 list-disc pl-4`}>
                      <li><strong>Select Motion:</strong> Choose an action (e.g., Flexion) from the dropdown.</li>
                      <li><strong>Rotate View:</strong> Click and drag to rotate the camera.</li>
                      <li><strong>Zoom:</strong> Scroll to zoom in/out.</li>
                      <li><strong>Pan:</strong> Right-click and drag to move the camera.</li>
                      <li><strong>Change Model:</strong> Use the dropdown to switch between Skeleton, Upper Limb, etc.</li>
                  </ul>
              </div>

              {referenceText ? (
                <div className={`text-sm ${theme.subText} whitespace-pre-line mb-4`}>
                  <strong>Action:</strong> {referenceText}
                </div>
              ) : (
                <div className={`text-sm ${theme.subText} mb-4`}>
                  No precise action reference provided.
                </div>
              )}

              <div className="space-y-2">
                <p className={`text-xs font-semibold ${theme.text} uppercase tracking-wider`}>Search Animations</p>
                
                {/* Current Motion Search */}
                <button
                  onClick={() => window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(muscleName + ' ' + motion + ' animation gif')}`, '_blank')}
                  className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-sm ${theme.text} hover:bg-slate-50 text-left flex items-center gap-2`}
                >
                  <Camera className="w-4 h-4" />
                  Search GIF for "{motion}"
                </button>

                {/* Action List Searches */}
                {actionList.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(muscleName + ' ' + action + ' animation gif')}`, '_blank')}
                    className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-sm ${theme.text} hover:bg-slate-50 text-left flex items-center gap-2`}
                  >
                    <Camera className="w-4 h-4" />
                    Search GIF for "{action}"
                  </button>
                ))}
              </div>
            </aside>
          </div>

          <div className={`text-xs ${theme.subText} space-y-2`}>
            <p>
              Axes legend — X: Med/Lat Rotation, Y: Pro/Supination, Z: Abd/Add, Flex/Ext
            </p>
            <p>
              Beta: 3D animations are approximations for educational visualization. Joint axes, ranges, and coupling are simplified and may not reflect exact biomechanics. If a GLTF skeleton is placed at <code>public/models/overview-skeleton.glb</code> it will be loaded and bones will be driven when available.
            </p>
            <p>
              Next steps: load rigged GLTF skeletons, map joints to bones, constrain rotations per anatomical axes, and annotate with dynamic labels/angles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnimationViewer;
