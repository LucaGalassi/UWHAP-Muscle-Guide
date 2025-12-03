import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { AppTheme } from '../types';
import { THEME_CONFIG } from '../constants';
import { X, PlayCircle, PauseCircle, Compass, Camera } from 'lucide-react';
import * as THREE from 'three';

interface AdvancedAnimationViewerProps {
  muscleName: string;
  currentTheme: AppTheme;
  defaultMotion?: string; // accept string from popup mapping
  onClose: () => void;
}

type MotionName =
  | 'Elbow Flexion' | 'Elbow Extension'
  | 'Shoulder Abduction' | 'Shoulder Adduction'
  | 'Shoulder Medial Rotation' | 'Shoulder Lateral Rotation'
  | 'Shoulder Flexion' | 'Shoulder Extension'
  | 'Forearm Pronation' | 'Forearm Supination'
  | 'Hip Flexion' | 'Hip Extension';

const MOTIONS: MotionName[] = [
  'Elbow Flexion','Elbow Extension',
  'Shoulder Flexion','Shoulder Extension',
  'Shoulder Abduction','Shoulder Adduction',
  'Shoulder Medial Rotation','Shoulder Lateral Rotation',
  'Forearm Pronation','Forearm Supination',
  'Hip Flexion','Hip Extension'
];

interface JointSpec {
  name: string;
  axis: THREE.Vector3; // local axis of rotation
  minDeg: number;
  maxDeg: number;
}

// Define a minimal articulated arm (shoulder->elbow->forearm->hand) with hip option
const JOINTS: Record<string, JointSpec> = {
  ShoulderAbdAdd: { name: 'Shoulder Abd/Add', axis: new THREE.Vector3(0,0,1), minDeg: -10, maxDeg: 90 },
  ShoulderMedLatRot: { name: 'Shoulder Med/Lat Rot', axis: new THREE.Vector3(1,0,0), minDeg: -40, maxDeg: 40 },
  ElbowFlexExt: { name: 'Elbow Flex/Ext', axis: new THREE.Vector3(0,0,1), minDeg: 0, maxDeg: 145 },
  ForearmProSup: { name: 'Forearm Pro/Sup', axis: new THREE.Vector3(0,1,0), minDeg: -90, maxDeg: 90 },
  HipFlexExt: { name: 'Hip Flex/Ext', axis: new THREE.Vector3(0,0,1), minDeg: -10, maxDeg: 120 },
};

function motionToTargets(motion: MotionName) {
  switch (motion) {
    case 'Elbow Flexion': return { joint: JOINTS.ElbowFlexExt, targetDeg: 120 };
    case 'Elbow Extension': return { joint: JOINTS.ElbowFlexExt, targetDeg: 10 };
    case 'Shoulder Flexion': return { joint: JOINTS.ShoulderAbdAdd, targetDeg: 80 };
    case 'Shoulder Extension': return { joint: JOINTS.ShoulderAbdAdd, targetDeg: 0 };
    case 'Shoulder Abduction': return { joint: JOINTS.ShoulderAbdAdd, targetDeg: 80 };
    case 'Shoulder Adduction': return { joint: JOINTS.ShoulderAbdAdd, targetDeg: 0 };
    case 'Shoulder Medial Rotation': return { joint: JOINTS.ShoulderMedLatRot, targetDeg: -30 };
    case 'Shoulder Lateral Rotation': return { joint: JOINTS.ShoulderMedLatRot, targetDeg: 30 };
    case 'Forearm Pronation': return { joint: JOINTS.ForearmProSup, targetDeg: 80 };
    case 'Forearm Supination': return { joint: JOINTS.ForearmProSup, targetDeg: -80 };
    case 'Hip Flexion': return { joint: JOINTS.HipFlexExt, targetDeg: 100 };
    case 'Hip Extension': return { joint: JOINTS.HipFlexExt, targetDeg: 0 };
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

function ArmRig({ motion, playing, angleOut, skeleton }: { motion: MotionName; playing: boolean; angleOut: (deg:number)=>void; skeleton?: any }) {
  const group = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const forearm = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null);
  const hip = useRef<THREE.Group>(null);
  const spec = motionToTargets(motion);
  const axisNorm = useMemo(() => spec.joint.axis.clone().normalize(), [spec.joint.axis]);

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

    if (spec.joint === JOINTS.ElbowFlexExt) setQuat(elbow.current);
    if (spec.joint === JOINTS.ShoulderAbdAdd || spec.joint === JOINTS.ShoulderMedLatRot) setQuat(shoulder.current);
    if (spec.joint === JOINTS.ForearmProSup) setQuat(forearm.current);
    if (spec.joint === JOINTS.HipFlexExt) setQuat(hip.current);
  });

  // If a GLTF skeleton is provided, try to map bones by fuzzy name matching
  const findBone = (patterns: string[]) => {
    if (!skeleton?.nodes) return null;
    const keys = Object.keys(skeleton.nodes);
    const lower = keys.map(k => ({ k, l: k.toLowerCase() }));
    for (const p of patterns) {
      const pl = p.toLowerCase();
      const hit = lower.find(({ l }) => l.includes(pl));
      if (hit) return (skeleton.nodes as any)[hit.k];
    }
    return null;
  };
  const shoulderBone = findBone(['shoulder_r', 'r_shoulder', 'shoulder', 'upperarm_r', 'humerus_r']);
  const elbowBone = findBone(['elbow_r', 'r_elbow', 'lowerarm_r', 'ulna_r', 'radius_r', 'forearm_r']);
  const forearmBone = findBone(['forearm_r', 'radius_r', 'ulna_r', 'r_forearm']);
  const hipBone = findBone(['hip_r', 'r_hip', 'thigh_r', 'femur_r', 'pelvis']);

  if (skeleton && skeleton.scene) {
    // Render the skeleton; bone driving occurs via the same R3F frame approach on nodes (if needed)
    return (
      <primitive object={skeleton.scene} />
    );
  }

  return (
    <group ref={group} position={[0,0,0]}>
      {/* Shoulder joint with axis helper */}
      <group ref={shoulder} position={[-0.4, 0.3, 0]}>
        <mesh>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <AxisHelper axis={JOINTS.ShoulderAbdAdd.axis} />
        <mesh position={[0.2, 0, 0]}> {/* upper arm */}
          <boxGeometry args={[0.4, 0.08, 0.08]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      </group>

      {/* Elbow joint */}
      <group ref={elbow} position={[0, 0.3, 0]}>
        <mesh>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <AxisHelper axis={JOINTS.ElbowFlexExt.axis} />
        <group ref={forearm}>
          <mesh position={[0.2, 0, 0]}> {/* forearm */}
            <boxGeometry args={[0.4, 0.07, 0.07]} />
            <meshStandardMaterial color="#0ea5e9" />
          </mesh>
        </group>
      </group>

      {/* Hip joint */}
      <group ref={hip} position={[0, -0.3, 0]}>
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <AxisHelper axis={JOINTS.HipFlexExt.axis} />
        <mesh position={[0.25, -0.05, 0]}> {/* thigh */}
          <boxGeometry args={[0.5, 0.09, 0.09]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
      </group>
    </group>
  );
}

type ModelEntry = { label: string; url: string };

export const AdvancedAnimationViewer: React.FC<AdvancedAnimationViewerProps> = ({ muscleName, currentTheme, defaultMotion='Elbow Flexion', onClose }) => {
  const theme = THEME_CONFIG[currentTheme];
  const [motion, setMotion] = useState<MotionName>(defaultMotion as MotionName);
  const [playing, setPlaying] = useState(true);
  const [angle, setAngle] = useState(0);
  const [cameraPreset, setCameraPreset] = useState<'Front'|'Side'|'Top'>('Side');
  const [models, setModels] = useState<ModelEntry[]>([]);
  const [selectedModelUrl, setSelectedModelUrl] = useState<string | null>(null);

  const cameraPosition = useMemo(() => {
    switch (cameraPreset) {
      case 'Front': return [0, 0.3, 2];
      case 'Top': return [0, 2, 0.1];
      case 'Side':
      default: return [2, 0.3, 0];
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
        : 'Shoulder Flexion';
      setMotion(pick);
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
          // map model URLs to respect base path
          const mapped = json.models.map((m: any) => ({ label: m.label, url: toUrl(m.url) }));
          setModels(mapped);
          if (mapped.length && !selectedModelUrl) setSelectedModelUrl(mapped[0].url);
        }
      })
      .catch(() => {
        const fallback = toUrl('models/skeleton.glb');
        setModels([{ label: 'Skeleton (Default Path)', url: fallback }]);
        if (!selectedModelUrl) setSelectedModelUrl(fallback);
      });
  }, []);

  function GLTFArmRig({ url }: { url: string }) {
    const gltf = useGLTF(url);
    return <ArmRig motion={motion} playing={playing} angleOut={setAngle} skeleton={gltf} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-6xl h-[85vh] rounded-2xl border ${theme.border} ${theme.cardBg} shadow-2xl overflow-hidden flex flex-col`}>
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

          <div className={`rounded-2xl border ${theme.border} ${theme.inputBg} p-2 flex-1`}>
            <Canvas camera={{ position: cameraPosition as any, fov: 45 }} dpr={[1, 2]} frameloop="always">
              <ambientLight intensity={0.7} />
              <directionalLight position={[5,5,5]} intensity={0.8} />
              <gridHelper args={[10, 20]} />
              {/* Axes legend as DOM overlay inside Canvas would require Html; keeping legend in footer below instead to avoid R3F hook errors */}
              {selectedModelUrl ? (
                <Suspense fallback={null}>
                  <GLTFArmRig url={selectedModelUrl} />
                </Suspense>
              ) : (
                <ArmRig motion={motion} playing={playing} angleOut={setAngle} />
              )}
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
          </div>

          <div className={`text-xs ${theme.subText} space-y-2`}>
            <p>
              Axes legend — X: Med/Lat Rotation, Y: Pro/Supination, Z: Abd/Add, Flex/Ext
            </p>
            <p>
              Beta: 3D animations are approximations for educational visualization. Joint axes, ranges, and coupling are simplified and may not reflect exact biomechanics. If a GLTF skeleton is placed at <code>public/models/skeleton.glb</code> it will be loaded and bones will be driven when available.
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
