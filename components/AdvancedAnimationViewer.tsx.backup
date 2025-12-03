import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds, Html } from '@react-three/drei';
import { AppTheme } from '../types';
import { THEME_CONFIG } from '../constants';
import { X, PlayCircle, PauseCircle, Compass, Camera, HelpCircle, Info, BookOpen, ListChecks } from 'lucide-react';
import * as THREE from 'three';

interface AdvancedAnimationViewerProps {
  muscleName: string;
  currentTheme: AppTheme;
  defaultMotion?: string; // accept string from popup mapping
  onClose: () => void;
  referenceText?: string;
  actionString?: string;
  demonstrationText?: string;
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

type ModelKey = 'overview' | 'upper' | 'lower' | 'hand' | 'spine';

const MODEL_MOTION_MAP: Record<ModelKey, MotionName[]> = {
  overview: MOTIONS,
  upper: [
    'Elbow Flexion','Elbow Extension',
    'Shoulder Flexion','Shoulder Extension',
    'Shoulder Abduction','Shoulder Adduction',
    'Shoulder Medial Rotation','Shoulder Lateral Rotation',
    'Forearm Pronation','Forearm Supination'
  ],
  lower: [
    'Hip Flexion','Hip Extension',
    'Knee Flexion','Knee Extension',
    'Ankle Dorsiflexion','Ankle Plantarflexion'
  ],
  hand: ['Forearm Pronation','Forearm Supination'],
  spine: MOTIONS
};

const MOTION_MODEL_MAP: Record<MotionName, ModelKey> = {
  'Elbow Flexion': 'upper',
  'Elbow Extension': 'upper',
  'Shoulder Flexion': 'upper',
  'Shoulder Extension': 'upper',
  'Shoulder Abduction': 'upper',
  'Shoulder Adduction': 'upper',
  'Shoulder Medial Rotation': 'upper',
  'Shoulder Lateral Rotation': 'upper',
  'Forearm Pronation': 'upper',
  'Forearm Supination': 'upper',
  'Hip Flexion': 'lower',
  'Hip Extension': 'lower',
  'Knee Flexion': 'lower',
  'Knee Extension': 'lower',
  'Ankle Dorsiflexion': 'lower',
  'Ankle Plantarflexion': 'lower'
};

type CameraPreset = 'Free' | 'Front' | 'Side' | 'Top';

const CAMERA_POSITIONS: Record<Exclude<CameraPreset, 'Free'>, THREE.Vector3Tuple> = {
  Front: [0, 0.8, 3],
  Side: [3, 0.8, 0],
  Top: [0, 3, 0.1]
};

const normalizeModelLabel = (label?: string | null): ModelKey => {
  const lower = (label ?? '').toLowerCase();
  if (lower.includes('upper')) return 'upper';
  if (lower.includes('lower')) return 'lower';
  if (lower.includes('hand')) return 'hand';
  if (lower.includes('vertebra')) return 'spine';
  return 'overview';
};

const getDefaultModelForMotion = (motion: MotionName): ModelKey => MOTION_MODEL_MAP[motion] ?? 'overview';

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

function CameraPresetController({ preset, manual }: { preset: CameraPreset; manual: boolean }) {
  const { camera } = useThree();
  const target = useMemo(() => {
    if (preset === 'Free') return null;
    return new THREE.Vector3(...CAMERA_POSITIONS[preset]);
  }, [preset]);

  useFrame((_, delta) => {
    if (manual || preset === 'Free' || !target) return;
    camera.position.lerp(target, Math.min(1, delta * 3));
    camera.lookAt(0, 0.5, 0);
  });

  return null;
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-blue-500">Loading Model...</p>
      </div>
    </Html>
  );
}

function ArmRig({ motion, playing, angleOut, skeleton }: { motion: MotionName; playing: boolean; angleOut: (deg:number)=>void; skeleton?: any }) {
  const group = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const forearm = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null);
  const hip = useRef<THREE.Group>(null);
  const knee = useRef<THREE.Group>(null);
  const ankle = useRef<THREE.Group>(null);
  const hand = useRef<THREE.Group>(null);
  const originalQuats = useRef<Map<THREE.Object3D, THREE.Quaternion>>(new Map());
  const tempQuat = useRef(new THREE.Quaternion());
  const spec = motionToTargets(motion);
  const axisNorm = useMemo(() => spec.joint.axis.clone().normalize(), [spec.joint.axis]);

  useEffect(() => {
    originalQuats.current.clear();
  }, [skeleton]);

    // Map bones if skeleton is provided
  const skeletonBones = useMemo(() => {
    if (!skeleton?.scene) return null;

    const lookup: { bone: THREE.Object3D; name: string }[] = [];
    skeleton.scene.traverse((node: THREE.Object3D) => {
      // Relaxed check: accept Bones, Meshes, Groups, Object3D
      // We want to animate anything that matches our anatomical names
      if (node.type === 'Bone' || node.type === 'Mesh' || node.type === 'Group' || node.type === 'Object3D') {
        lookup.push({ bone: node, name: node.name.toLowerCase() });
      }
    });
    if (!lookup.length) return null;

    const findAll = (patterns: string[]) => {
      const tokens = patterns.map(p => p.toLowerCase());
      return lookup
        .filter(entry => tokens.some(token => entry.name.includes(token)))
        .map(entry => entry.bone);
    };

    return {
      shoulder: findAll(['humerus', 'brach', 'bicep', 'tricep', 'deltoid', 'teres', 'infra', 'supra', 'subscap', 'latissimus', 'pectoralis', 'scap']),
      elbow: findAll(['ulna', 'radius', 'brachioradialis', 'extensor', 'flexor', 'pronator', 'supinator', 'anconeus', 'palmaris']),
      forearm: findAll(['radius', 'pronator', 'supinator']),
      hip: findAll(['femur', 'thigh', 'quad', 'hamstring', 'adductor', 'sartorius', 'gracilis', 'glute', 'iliacus', 'psoas', 'tensor_fasciae', 'pectineus', 'piriformis', 'gemellus', 'obturator', 'quadratus_femoris']),
      knee: findAll(['tibia', 'fibula', 'shin', 'gastrocnemius', 'soleus', 'plantaris', 'popliteus', 'tibialis', 'fibularis', 'peroneus', 'extensor_digitorum', 'extensor_hallucis', 'flexor_digitorum', 'flexor_hallucis']),
      ankle: findAll(['talus', 'calcaneus', 'foot', 'tarsal', 'metatarsal', 'phalanx', 'toe', 'hallucis', 'digitorum', 'lumbrical', 'interossei', 'abductor', 'adductor', 'flexor_digiti', 'extensor_digiti']),
      hand: findAll(['carpal', 'metacarpal', 'phalanx', 'scaphoid', 'lunate', 'triquetrum', 'pisiform', 'trapezium', 'trapezoid', 'capitate', 'hamate', 'finger', 'thumb', 'palm']),
      torso: findAll(['rib', 'sternum', 'vertebra', 'sacrum', 'coccyx', 'pelvis', 'clavicle', 'scapula', 'manubrium', 'xiphoid']),
      head: findAll(['cervical', 'atlas', 'axis', 'skull', 'mandible', 'maxilla', 'frontal', 'parietal', 'occipital', 'temporal', 'sphenoid', 'ethmoid', 'nasal', 'zygomatic', 'vomer', 'lacrimal', 'palatine'])
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
      if (!originalQuats.current.has(obj)) {
        originalQuats.current.set(obj, obj.quaternion.clone());
      }
      const base = originalQuats.current.get(obj);
      if (!base) return;
      tempQuat.current.setFromAxisAngle(axisNorm, rad);
      obj.quaternion.copy(base).multiply(tempQuat.current);
    };

    // Determine which bones to use (Skeleton or Fallback Refs)
    const currentBones = skeletonBones || {
      shoulder: [shoulder.current].filter(Boolean) as THREE.Object3D[],
      elbow: [elbow.current].filter(Boolean) as THREE.Object3D[],
      forearm: [forearm.current].filter(Boolean) as THREE.Object3D[],
      hip: [hip.current].filter(Boolean) as THREE.Object3D[],
      knee: [knee.current].filter(Boolean) as THREE.Object3D[],
      ankle: [ankle.current].filter(Boolean) as THREE.Object3D[],
      hand: [hand.current].filter(Boolean) as THREE.Object3D[],
      torso: [],
      head: []
    };

    // Smart Group Rotation:
    // 1. Identify the primary bone (first in list).
    // 2. Rotate primary bone.
    // 3. Rotate other bones ONLY if they are not descendants of the primary bone (handles "soup" vs "hierarchy").
    const applyToGroup = (group: any[] | undefined) => {
        if (!group || group.length === 0) return;
        
        // Simplified Logic: Rotate everything unless it's a child of another node IN THE SAME GROUP
        // This handles partial hierarchies better than just checking the primary bone.
        group.forEach(node => {
             // Check if parent is also in this group
             let parentInGroup = false;
             let p = node.parent;
             while(p) {
                 if (group.includes(p)) { parentInGroup = true; break; }
                 p = p.parent;
             }
             
             if (!parentInGroup) {
                 setQuat(node);
             }
        });
    };

    if (spec.joint === JOINTS.ForearmProSup) {
      applyToGroup(currentBones.forearm);
      // Check hand child status
      const forearmPrimary = currentBones.forearm?.[0];
      const handPrimary = currentBones.hand?.[0];
      let handIsChild = false;
      if (forearmPrimary && handPrimary) {
          let p = handPrimary.parent;
          while(p) { if(p === forearmPrimary) { handIsChild = true; break; } p = p.parent; }
      }
      if (!handIsChild) applyToGroup(currentBones.hand);
    }
    else if (spec.joint === JOINTS.ElbowFlexExt) {
      applyToGroup(currentBones.elbow);
      // Check hand child status (Elbow moves forearm and hand)
      const elbowPrimary = currentBones.elbow?.[0];
      const handPrimary = currentBones.hand?.[0];
      let handIsChild = false;
      if (elbowPrimary && handPrimary) {
          let p = handPrimary.parent;
          while(p) { if(p === elbowPrimary) { handIsChild = true; break; } p = p.parent; }
      }
      if (!handIsChild) {
          applyToGroup(currentBones.forearm); // Forearm moves with elbow flexion
          applyToGroup(currentBones.hand);
      }
    }
    else if (spec.joint === JOINTS.HipFlexExt) {
      applyToGroup(currentBones.hip);
      // Hip moves the leg
      const hipPrimary = currentBones.hip?.[0];
      const kneePrimary = currentBones.knee?.[0];
      let kneeIsChild = false;
      if (hipPrimary && kneePrimary) {
          let p = kneePrimary.parent;
          while(p) { if(p === hipPrimary) { kneeIsChild = true; break; } p = p.parent; }
      }
      if (!kneeIsChild) {
          applyToGroup(currentBones.knee);
          applyToGroup(currentBones.ankle);
      }
    }
    else if (spec.joint === JOINTS.KneeFlexExt) {
      applyToGroup(currentBones.knee);
      // Knee moves the foot
      const kneePrimary = currentBones.knee?.[0];
      const anklePrimary = currentBones.ankle?.[0];
      let ankleIsChild = false;
      if (kneePrimary && anklePrimary) {
          let p = anklePrimary.parent;
          while(p) { if(p === kneePrimary) { ankleIsChild = true; break; } p = p.parent; }
      }
      if (!ankleIsChild) applyToGroup(currentBones.ankle);
    }
    else if (spec.joint === JOINTS.AnkleFlexExt) {
      applyToGroup(currentBones.ankle);
    }
    else {
        // Default behavior for other joints (Shoulder, etc)
        // Just rotate the primary group associated with the joint
        if (spec.joint === JOINTS.ShoulderFlexExt || spec.joint === JOINTS.ShoulderAbdAdd || spec.joint === JOINTS.ShoulderMedLatRot) {
             applyToGroup(currentBones.shoulder);
        }
    }
  });

  if (skeleton && skeleton.scene) {
    return (
      <primitive object={skeleton.scene} />
    );
  }

  return (
    <group ref={group} position={[0,0,0]}>
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
      
      {/* Right Arm Hierarchy */}
      <group ref={shoulder} position={[-0.25, 1.5, 0]}>
          <mesh position={[0, -0.3, 0]}> {/* Upper Arm */}
             <cylinderGeometry args={[0.04, 0.04, 0.6]} />
             <meshStandardMaterial color="#64748b" />
          </mesh>
          <group ref={elbow} position={[0, -0.6, 0]}>
              <group ref={forearm}>
                  <mesh position={[0, -0.3, 0]}> {/* Forearm */}
                      <cylinderGeometry args={[0.035, 0.035, 0.6]} />
                      <meshStandardMaterial color="#64748b" />
                  </mesh>
                  <group ref={hand} position={[0, -0.65, 0]}>
                      <mesh position={[0, 0, 0]}> {/* Hand */}
                          <boxGeometry args={[0.1, 0.15, 0.05]} />
                          <meshStandardMaterial color="#cbd5e1" />
                      </mesh>
                  </group>
              </group>
          </group>
      </group>

      {/* Left Arm (Static) */}
      <mesh position={[0.25, 1.5, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6]} />
          <meshStandardMaterial color="#94a3b8" />
      </mesh>

      {/* Right Leg Hierarchy */}
      <group ref={hip} position={[-0.1, 0.8, 0]}>
          <mesh position={[0, -0.4, 0]}> {/* Thigh */}
              <cylinderGeometry args={[0.05, 0.05, 0.8]} />
              <meshStandardMaterial color="#64748b" />
          </mesh>
          <group ref={knee} position={[0, -0.8, 0]}>
              <mesh position={[0, -0.4, 0]}> {/* Shin */}
                  <cylinderGeometry args={[0.04, 0.04, 0.8]} />
                  <meshStandardMaterial color="#64748b" />
              </mesh>
              <group ref={ankle} position={[0, -0.8, 0]}>
                  <mesh position={[0, -0.05, 0.1]}> {/* Foot */}
                      <boxGeometry args={[0.1, 0.05, 0.2]} />
                      <meshStandardMaterial color="#64748b" />
                  </mesh>
              </group>
          </group>
      </group>

      {/* Left Leg (Static) */}
      <mesh position={[0.1, 0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8]} />
          <meshStandardMaterial color="#94a3b8" />
      </mesh>

      <gridHelper args={[4, 4]} />
    </group>
  );
}

type ModelEntry = { label: string; url: string };

export const AdvancedAnimationViewer: React.FC<AdvancedAnimationViewerProps> = ({ muscleName, currentTheme, defaultMotion='Elbow Flexion', onClose, referenceText, actionString, demonstrationText }) => {
  const theme = THEME_CONFIG[currentTheme];
  const [motion, setMotion] = useState<MotionName>(defaultMotion as MotionName);
  const [playing, setPlaying] = useState(true);
  const [angle, setAngle] = useState(0);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('Side');
  const [manualCamera, setManualCamera] = useState(false);
  const [models, setModels] = useState<ModelEntry[]>([]);
  const [selectedModelUrl, setSelectedModelUrl] = useState<string | null>(null);
  const [autoModelSync, setAutoModelSync] = useState(true);
  const [forceBoxRig, setForceBoxRig] = useState(false);
  const initialCameraPosition: THREE.Vector3Tuple = CAMERA_POSITIONS.Side;

  const selectedModel = useMemo(() => models.find(m => m.url === selectedModelUrl) ?? null, [models, selectedModelUrl]);
  const selectedModelKey = normalizeModelLabel(selectedModel?.label);
  const availableMotions = useMemo(() => {
    const mapped = MODEL_MOTION_MAP[selectedModelKey] ?? MOTIONS;
    return mapped.length ? mapped : MOTIONS;
  }, [selectedModelKey]);
  const cameraOptions: { label: string; value: CameraPreset }[] = [
    { label: 'Free', value: 'Free' },
    { label: 'Front', value: 'Front' },
    { label: 'Side', value: 'Side' },
    { label: 'Top', value: 'Top' }
  ];

  const handleModelChange = (url: string | null) => {
    setSelectedModelUrl(url);
    setAutoModelSync(false);
  };

  const handleCameraSelect = (preset: CameraPreset) => {
    setCameraPreset(preset);
    setManualCamera(preset === 'Free');
  };

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
    if (!availableMotions.length) return;
    if (!availableMotions.includes(motion)) {
      setMotion(availableMotions[0]);
    }
  }, [availableMotions, motion]);

  useEffect(() => {
    if (!models.length || !autoModelSync) return;
    const targetKey = getDefaultModelForMotion(motion);
    const found = models.find(m => normalizeModelLabel(m.label) === targetKey);
    if (found) {
      setSelectedModelUrl(found.url);
    }
  }, [motion, models, autoModelSync]);

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
        }
      })
      .catch(() => {
        const fallback = toUrl('models/overview-skeleton.glb');
        setModels([{ label: 'Skeleton (Default Path)', url: fallback }]);
      });
  }, []);

  function GLTFArmRig({ url }: { url: string }) {
    const gltf = useGLTF(url);
    const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
    return <ArmRig motion={motion} playing={playing} angleOut={setAngle} skeleton={{ ...gltf, scene }} />;
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

        <div className="p-5 space-y-4 flex-1 flex flex-col overflow-hidden">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className={`${theme.text} text-base font-semibold`}>{muscleName}</p>
                <p className={`text-sm ${theme.subText}`}>Motion: {motion} • Angle: {angle.toFixed(0)}°</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select value={motion} onChange={(e)=>setMotion(e.target.value as MotionName)} className={`px-4 py-3 rounded-lg border ${theme.border} text-sm ${theme.text} ${theme.inputBg} min-w-[14rem]`}>
                  {availableMotions.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <button onClick={()=>setPlaying(p=>!p)} className={`px-4 py-3 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.text} text-sm font-semibold flex items-center gap-2`}>
                  {playing ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />} {playing ? 'Pause' : 'Play'}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-semibold uppercase ${theme.subText}`}>Model</span>
                <select value={selectedModelUrl ?? ''} onChange={(e)=>handleModelChange(e.target.value || null)} className={`px-4 py-2 rounded-lg border ${theme.border} text-sm ${theme.text} ${theme.inputBg} min-w-[14rem]`}>
                  {models.map(m => <option key={m.url} value={m.url}>{m.label}</option>)}
                  {!models.length && <option value=''>Box Rig (No Model)</option>}
                </select>
                <button onClick={()=>setAutoModelSync(true)} disabled={autoModelSync} className={`px-3 py-2 rounded-lg border ${theme.border} text-xs font-semibold ${autoModelSync ? 'bg-emerald-500 text-white border-emerald-500 cursor-default' : `${theme.inputBg} ${theme.text}`}`}>
                  {autoModelSync ? 'Motion Linked' : 'Link to Motion'}
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-semibold uppercase ${theme.subText}`}>Camera</span>
                <div className={`flex rounded-2xl border ${theme.border} overflow-hidden`}>
                  {cameraOptions.map(opt => {
                    const isActive = cameraPreset === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleCameraSelect(opt.value)}
                        className={`px-3 py-2 text-xs font-semibold ${isActive ? 'bg-blue-500 text-white' : `${theme.inputBg} ${theme.text}`}`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex flex-col gap-4 overflow-hidden">
            <div className="flex gap-4 flex-1 min-h-0 overflow-hidden">
              <div className={`rounded-2xl border ${theme.border} ${theme.inputBg} p-2 flex-1 min-h-0 overflow-hidden`}>
                <Canvas camera={{ position: initialCameraPosition, fov: 45 }} dpr={[1, 2]} frameloop="always">
                  <CameraPresetController preset={cameraPreset} manual={manualCamera} />
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[5,5,5]} intensity={0.8} />
                  <gridHelper args={[10, 20]} />
                  {selectedModelUrl && !forceBoxRig ? (
                    <Suspense fallback={<Loader />}>
                      <Bounds fit clip observe margin={1.2}>
                        <GLTFArmRig url={selectedModelUrl} />
                      </Bounds>
                    </Suspense>
                  ) : (
                    <ArmRig motion={motion} playing={playing} angleOut={setAngle} />
                  )}
                  <OrbitControls
                    enablePan
                    enableZoom
                    enableRotate
                    makeDefault
                    onStart={() => {
                      setManualCamera(true);
                      setCameraPreset('Free');
                    }}
                  />
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
                  </ul>
              </div>

              {(referenceText || demonstrationText || actionList.length > 0) ? (
                <div className={`mb-4 p-4 rounded-xl border ${theme.border} ${theme.cardBg}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <h4 className={`text-sm font-bold ${theme.text}`}>Card Context</h4>
                  </div>
                  {referenceText && (
                    <div className="mb-3">
                      <p className={`text-[10px] font-semibold uppercase tracking-wider ${theme.subText}`}>Action Notes</p>
                      <p className={`text-sm ${theme.text} whitespace-pre-line`}>{referenceText}</p>
                    </div>
                  )}
                  {demonstrationText && (
                    <div className="mb-3">
                      <p className={`text-[10px] font-semibold uppercase tracking-wider ${theme.subText}`}>Demonstration</p>
                      <p className={`text-sm ${theme.text} whitespace-pre-line`}>{demonstrationText}</p>
                    </div>
                  )}
                  {actionList.length > 0 && (
                    <div>
                      <p className={`text-[10px] font-semibold uppercase tracking-wider ${theme.subText} flex items-center gap-1`}>
                        <ListChecks className="w-3.5 h-3.5" /> Motion Cues
                      </p>
                      <ul className={`text-sm ${theme.text} list-disc pl-4 space-y-1 mt-1`}>
                        {actionList.map((action, idx) => (
                          <li key={`${action}-${idx}`}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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

            <div className={`text-xs ${theme.subText} space-y-2 overflow-y-auto pr-1`}>
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
    </div>
  );
};

export default AdvancedAnimationViewer;
