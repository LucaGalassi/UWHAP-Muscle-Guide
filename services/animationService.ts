import * as THREE from 'three';

/**
 * Animation Service
 * Comprehensive animation database with joint definitions, motion parameters,
 * and muscle-to-animation mappings for deep integration throughout the app.
 */

// ============================================================================
// JOINT DEFINITIONS
// ============================================================================

export interface JointSpec {
  id: string;
  name: string;
  axis: THREE.Vector3; // Local axis of rotation
  minDeg: number;
  maxDeg: number;
  neutralDeg: number; // Resting anatomical position
  region: 'upper' | 'lower' | 'axial' | 'hand' | 'foot';
}

export const JOINTS: Record<string, JointSpec> = {
  // Shoulder Complex
  shoulderFlexExt: {
    id: 'shoulderFlexExt',
    name: 'Shoulder Flexion/Extension',
    axis: new THREE.Vector3(1, 0, 0),
    minDeg: -60,
    maxDeg: 180,
    neutralDeg: 0,
    region: 'upper'
  },
  shoulderAbdAdd: {
    id: 'shoulderAbdAdd',
    name: 'Shoulder Abduction/Adduction',
    axis: new THREE.Vector3(0, 0, 1),
    minDeg: -30,
    maxDeg: 180,
    neutralDeg: 0,
    region: 'upper'
  },
  shoulderRotation: {
    id: 'shoulderRotation',
    name: 'Shoulder Medial/Lateral Rotation',
    axis: new THREE.Vector3(0, 1, 0),
    minDeg: -90,
    maxDeg: 90,
    neutralDeg: 0,
    region: 'upper'
  },
  shoulderHorizAbdAdd: {
    id: 'shoulderHorizAbdAdd',
    name: 'Shoulder Horizontal Abd/Add',
    axis: new THREE.Vector3(0, 1, 0),
    minDeg: -30,
    maxDeg: 135,
    neutralDeg: 90,
    region: 'upper'
  },

  // Elbow
  elbowFlexExt: {
    id: 'elbowFlexExt',
    name: 'Elbow Flexion/Extension',
    axis: new THREE.Vector3(1, 0, 0),
    minDeg: 0,
    maxDeg: 150,
    neutralDeg: 0,
    region: 'upper'
  },

  // Forearm
  forearmProSup: {
    id: 'forearmProSup',
    name: 'Forearm Pronation/Supination',
    axis: new THREE.Vector3(0, 0, 1),
    minDeg: -90,
    maxDeg: 90,
    neutralDeg: 0,
    region: 'upper'
  },

  // Wrist
  wristFlexExt: {
    id: 'wristFlexExt',
    name: 'Wrist Flexion/Extension',
    axis: new THREE.Vector3(1, 0, 0),
    minDeg: -80,
    maxDeg: 70,
    neutralDeg: 0,
    region: 'hand'
  },
  wristDeviation: {
    id: 'wristDeviation',
    name: 'Wrist Radial/Ulnar Deviation',
    axis: new THREE.Vector3(0, 0, 1),
    minDeg: -30,
    maxDeg: 20,
    neutralDeg: 0,
    region: 'hand'
  },

  // Hip
  hipFlexExt: {
    id: 'hipFlexExt',
    name: 'Hip Flexion/Extension',
    axis: new THREE.Vector3(1, 0, 0),
    minDeg: -30,
    maxDeg: 125,
    neutralDeg: 0,
    region: 'lower'
  },
  hipAbdAdd: {
    id: 'hipAbdAdd',
    name: 'Hip Abduction/Adduction',
    axis: new THREE.Vector3(0, 0, 1),
    minDeg: -30,
    maxDeg: 45,
    neutralDeg: 0,
    region: 'lower'
  },
  hipRotation: {
    id: 'hipRotation',
    name: 'Hip Medial/Lateral Rotation',
    axis: new THREE.Vector3(0, 1, 0),
    minDeg: -45,
    maxDeg: 45,
    neutralDeg: 0,
    region: 'lower'
  },

  // Knee
  kneeFlexExt: {
    id: 'kneeFlexExt',
    name: 'Knee Flexion/Extension',
    axis: new THREE.Vector3(1, 0, 0),
    minDeg: 0,
    maxDeg: 140,
    neutralDeg: 0,
    region: 'lower'
  },

  // Ankle
  ankleFlexExt: {
    id: 'ankleFlexExt',
    name: 'Ankle Dorsiflexion/Plantarflexion',
    axis: new THREE.Vector3(1, 0, 0),
    minDeg: -50,
    maxDeg: 20,
    neutralDeg: 0,
    region: 'foot'
  },
  ankleInvEv: {
    id: 'ankleInvEv',
    name: 'Ankle Inversion/Eversion',
    axis: new THREE.Vector3(0, 0, 1),
    minDeg: -35,
    maxDeg: 15,
    neutralDeg: 0,
    region: 'foot'
  },

  // Spine/Trunk
  spineFlexExt: {
    id: 'spineFlexExt',
    name: 'Spine Flexion/Extension',
    axis: new THREE.Vector3(1, 0, 0),
    minDeg: -30,
    maxDeg: 85,
    neutralDeg: 0,
    region: 'axial'
  },
  spineLateralFlex: {
    id: 'spineLateralFlex',
    name: 'Spine Lateral Flexion',
    axis: new THREE.Vector3(0, 0, 1),
    minDeg: -40,
    maxDeg: 40,
    neutralDeg: 0,
    region: 'axial'
  },
  spineRotation: {
    id: 'spineRotation',
    name: 'Spine Rotation',
    axis: new THREE.Vector3(0, 1, 0),
    minDeg: -45,
    maxDeg: 45,
    neutralDeg: 0,
    region: 'axial'
  },

  // Scapula
  scapulaElevDep: {
    id: 'scapulaElevDep',
    name: 'Scapular Elevation/Depression',
    axis: new THREE.Vector3(0, 1, 0),
    minDeg: -10,
    maxDeg: 10,
    neutralDeg: 0,
    region: 'upper'
  },
  scapulaProRet: {
    id: 'scapulaProRet',
    name: 'Scapular Protraction/Retraction',
    axis: new THREE.Vector3(1, 0, 0),
    minDeg: -15,
    maxDeg: 15,
    neutralDeg: 0,
    region: 'upper'
  },
  scapulaRotation: {
    id: 'scapulaRotation',
    name: 'Scapular Upward/Downward Rotation',
    axis: new THREE.Vector3(0, 0, 1),
    minDeg: -30,
    maxDeg: 60,
    neutralDeg: 0,
    region: 'upper'
  }
};

// ============================================================================
// MOTION DEFINITIONS
// ============================================================================

export interface MotionDefinition {
  id: string;
  name: string;
  displayName: string;
  joint: JointSpec;
  targetDeg: number;
  duration: number; // seconds for full motion cycle
  description: string;
  region: 'upper' | 'lower' | 'axial' | 'hand' | 'foot';
  keywords: string[]; // For search/filtering
}

export const MOTIONS: Record<string, MotionDefinition> = {
  // Shoulder
  shoulderFlexion: {
    id: 'shoulderFlexion',
    name: 'Shoulder Flexion',
    displayName: 'Shoulder Flexion',
    joint: JOINTS.shoulderFlexExt,
    targetDeg: 180,
    duration: 3.0,
    description: 'Raising arm forward and upward',
    region: 'upper',
    keywords: ['shoulder', 'flex', 'raise', 'forward', 'anterior']
  },
  shoulderExtension: {
    id: 'shoulderExtension',
    name: 'Shoulder Extension',
    displayName: 'Shoulder Extension',
    joint: JOINTS.shoulderFlexExt,
    targetDeg: -60,
    duration: 2.5,
    description: 'Moving arm backward from neutral',
    region: 'upper',
    keywords: ['shoulder', 'extend', 'back', 'posterior']
  },
  shoulderAbduction: {
    id: 'shoulderAbduction',
    name: 'Shoulder Abduction',
    displayName: 'Shoulder Abduction',
    joint: JOINTS.shoulderAbdAdd,
    targetDeg: 180,
    duration: 3.0,
    description: 'Raising arm laterally away from body',
    region: 'upper',
    keywords: ['shoulder', 'abduct', 'lateral', 'raise', 'side']
  },
  shoulderAdduction: {
    id: 'shoulderAdduction',
    name: 'Shoulder Adduction',
    displayName: 'Shoulder Adduction',
    joint: JOINTS.shoulderAbdAdd,
    targetDeg: -30,
    duration: 2.0,
    description: 'Lowering arm toward body midline',
    region: 'upper',
    keywords: ['shoulder', 'adduct', 'medial', 'lower']
  },
  shoulderMedialRotation: {
    id: 'shoulderMedialRotation',
    name: 'Shoulder Medial Rotation',
    displayName: 'Shoulder Medial Rotation',
    joint: JOINTS.shoulderRotation,
    targetDeg: -90,
    duration: 2.0,
    description: 'Internal rotation of humerus',
    region: 'upper',
    keywords: ['shoulder', 'medial', 'internal', 'rotation']
  },
  shoulderLateralRotation: {
    id: 'shoulderLateralRotation',
    name: 'Shoulder Lateral Rotation',
    displayName: 'Shoulder Lateral Rotation',
    joint: JOINTS.shoulderRotation,
    targetDeg: 90,
    duration: 2.0,
    description: 'External rotation of humerus',
    region: 'upper',
    keywords: ['shoulder', 'lateral', 'external', 'rotation']
  },
  shoulderHorizAbduction: {
    id: 'shoulderHorizAbduction',
    name: 'Shoulder Horizontal Abduction',
    displayName: 'Shoulder Horizontal Abduction',
    joint: JOINTS.shoulderHorizAbdAdd,
    targetDeg: 135,
    duration: 2.0,
    description: 'Moving arm horizontally backward (arm at 90°)',
    region: 'upper',
    keywords: ['shoulder', 'horizontal', 'abduction', 'transverse']
  },
  shoulderHorizAdduction: {
    id: 'shoulderHorizAdduction',
    name: 'Shoulder Horizontal Adduction',
    displayName: 'Shoulder Horizontal Adduction',
    joint: JOINTS.shoulderHorizAbdAdd,
    targetDeg: -30,
    duration: 2.0,
    description: 'Moving arm horizontally forward (arm at 90°)',
    region: 'upper',
    keywords: ['shoulder', 'horizontal', 'adduction', 'transverse']
  },

  // Elbow
  elbowFlexion: {
    id: 'elbowFlexion',
    name: 'Elbow Flexion',
    displayName: 'Elbow Flexion',
    joint: JOINTS.elbowFlexExt,
    targetDeg: 145,
    duration: 2.0,
    description: 'Bending elbow to decrease angle',
    region: 'upper',
    keywords: ['elbow', 'flex', 'bend', 'curl']
  },
  elbowExtension: {
    id: 'elbowExtension',
    name: 'Elbow Extension',
    displayName: 'Elbow Extension',
    joint: JOINTS.elbowFlexExt,
    targetDeg: 0,
    duration: 2.0,
    description: 'Straightening elbow',
    region: 'upper',
    keywords: ['elbow', 'extend', 'straight']
  },

  // Forearm
  forearmPronation: {
    id: 'forearmPronation',
    name: 'Forearm Pronation',
    displayName: 'Forearm Pronation',
    joint: JOINTS.forearmProSup,
    targetDeg: 90,
    duration: 1.5,
    description: 'Rotating forearm palm-down',
    region: 'upper',
    keywords: ['forearm', 'pronation', 'palm', 'down']
  },
  forearmSupination: {
    id: 'forearmSupination',
    name: 'Forearm Supination',
    displayName: 'Forearm Supination',
    joint: JOINTS.forearmProSup,
    targetDeg: -90,
    duration: 1.5,
    description: 'Rotating forearm palm-up',
    region: 'upper',
    keywords: ['forearm', 'supination', 'palm', 'up']
  },

  // Wrist
  wristFlexion: {
    id: 'wristFlexion',
    name: 'Wrist Flexion',
    displayName: 'Wrist Flexion',
    joint: JOINTS.wristFlexExt,
    targetDeg: -80,
    duration: 1.5,
    description: 'Bending wrist toward palm',
    region: 'hand',
    keywords: ['wrist', 'flex', 'palmar', 'volar']
  },
  wristExtension: {
    id: 'wristExtension',
    name: 'Wrist Extension',
    displayName: 'Wrist Extension',
    joint: JOINTS.wristFlexExt,
    targetDeg: 70,
    duration: 1.5,
    description: 'Bending wrist toward back of hand',
    region: 'hand',
    keywords: ['wrist', 'extend', 'dorsal']
  },
  wristRadialDeviation: {
    id: 'wristRadialDeviation',
    name: 'Wrist Radial Deviation',
    displayName: 'Radial Deviation',
    joint: JOINTS.wristDeviation,
    targetDeg: 20,
    duration: 1.5,
    description: 'Tilting wrist toward thumb',
    region: 'hand',
    keywords: ['wrist', 'radial', 'abduction', 'thumb']
  },
  wristUlnarDeviation: {
    id: 'wristUlnarDeviation',
    name: 'Wrist Ulnar Deviation',
    displayName: 'Ulnar Deviation',
    joint: JOINTS.wristDeviation,
    targetDeg: -30,
    duration: 1.5,
    description: 'Tilting wrist toward pinky',
    region: 'hand',
    keywords: ['wrist', 'ulnar', 'adduction', 'pinky']
  },

  // Hip
  hipFlexion: {
    id: 'hipFlexion',
    name: 'Hip Flexion',
    displayName: 'Hip Flexion',
    joint: JOINTS.hipFlexExt,
    targetDeg: 125,
    duration: 2.5,
    description: 'Bringing thigh toward torso',
    region: 'lower',
    keywords: ['hip', 'flex', 'thigh', 'raise']
  },
  hipExtension: {
    id: 'hipExtension',
    name: 'Hip Extension',
    displayName: 'Hip Extension',
    joint: JOINTS.hipFlexExt,
    targetDeg: -30,
    duration: 2.5,
    description: 'Moving thigh backward',
    region: 'lower',
    keywords: ['hip', 'extend', 'thigh', 'back']
  },
  hipAbduction: {
    id: 'hipAbduction',
    name: 'Hip Abduction',
    displayName: 'Hip Abduction',
    joint: JOINTS.hipAbdAdd,
    targetDeg: 45,
    duration: 2.0,
    description: 'Moving thigh laterally away from midline',
    region: 'lower',
    keywords: ['hip', 'abduct', 'lateral', 'side']
  },
  hipAdduction: {
    id: 'hipAdduction',
    name: 'Hip Adduction',
    displayName: 'Hip Adduction',
    joint: JOINTS.hipAbdAdd,
    targetDeg: -30,
    duration: 2.0,
    description: 'Moving thigh toward midline',
    region: 'lower',
    keywords: ['hip', 'adduct', 'medial']
  },
  hipMedialRotation: {
    id: 'hipMedialRotation',
    name: 'Hip Medial Rotation',
    displayName: 'Hip Medial Rotation',
    joint: JOINTS.hipRotation,
    targetDeg: -45,
    duration: 2.0,
    description: 'Internal rotation of femur',
    region: 'lower',
    keywords: ['hip', 'medial', 'internal', 'rotation']
  },
  hipLateralRotation: {
    id: 'hipLateralRotation',
    name: 'Hip Lateral Rotation',
    displayName: 'Hip Lateral Rotation',
    joint: JOINTS.hipRotation,
    targetDeg: 45,
    duration: 2.0,
    description: 'External rotation of femur',
    region: 'lower',
    keywords: ['hip', 'lateral', 'external', 'rotation']
  },

  // Knee
  kneeFlexion: {
    id: 'kneeFlexion',
    name: 'Knee Flexion',
    displayName: 'Knee Flexion',
    joint: JOINTS.kneeFlexExt,
    targetDeg: 140,
    duration: 2.0,
    description: 'Bending knee',
    region: 'lower',
    keywords: ['knee', 'flex', 'bend']
  },
  kneeExtension: {
    id: 'kneeExtension',
    name: 'Knee Extension',
    displayName: 'Knee Extension',
    joint: JOINTS.kneeFlexExt,
    targetDeg: 0,
    duration: 2.0,
    description: 'Straightening knee',
    region: 'lower',
    keywords: ['knee', 'extend', 'straight']
  },

  // Ankle
  ankleDorsiflexion: {
    id: 'ankleDorsiflexion',
    name: 'Ankle Dorsiflexion',
    displayName: 'Ankle Dorsiflexion',
    joint: JOINTS.ankleFlexExt,
    targetDeg: 20,
    duration: 1.5,
    description: 'Pulling foot upward',
    region: 'foot',
    keywords: ['ankle', 'dorsiflexion', 'foot', 'up']
  },
  anklePlantarflexion: {
    id: 'anklePlantarflexion',
    name: 'Ankle Plantarflexion',
    displayName: 'Ankle Plantarflexion',
    joint: JOINTS.ankleFlexExt,
    targetDeg: -50,
    duration: 1.5,
    description: 'Pointing foot downward',
    region: 'foot',
    keywords: ['ankle', 'plantarflexion', 'foot', 'down', 'point']
  },
  ankleInversion: {
    id: 'ankleInversion',
    name: 'Ankle Inversion',
    displayName: 'Ankle Inversion',
    joint: JOINTS.ankleInvEv,
    targetDeg: -35,
    duration: 1.5,
    description: 'Tilting sole of foot medially',
    region: 'foot',
    keywords: ['ankle', 'inversion', 'medial', 'sole']
  },
  ankleEversion: {
    id: 'ankleEversion',
    name: 'Ankle Eversion',
    displayName: 'Ankle Eversion',
    joint: JOINTS.ankleInvEv,
    targetDeg: 15,
    duration: 1.5,
    description: 'Tilting sole of foot laterally',
    region: 'foot',
    keywords: ['ankle', 'eversion', 'lateral', 'sole']
  },

  // Spine/Trunk
  spineFlexion: {
    id: 'spineFlexion',
    name: 'Spine Flexion',
    displayName: 'Trunk Flexion',
    joint: JOINTS.spineFlexExt,
    targetDeg: 85,
    duration: 2.5,
    description: 'Bending trunk forward',
    region: 'axial',
    keywords: ['spine', 'trunk', 'flex', 'forward', 'bend']
  },
  spineExtension: {
    id: 'spineExtension',
    name: 'Spine Extension',
    displayName: 'Trunk Extension',
    joint: JOINTS.spineFlexExt,
    targetDeg: -30,
    duration: 2.5,
    description: 'Bending trunk backward',
    region: 'axial',
    keywords: ['spine', 'trunk', 'extend', 'backward', 'arch']
  },
  spineLateralFlexionRight: {
    id: 'spineLateralFlexionRight',
    name: 'Spine Lateral Flexion Right',
    displayName: 'Trunk Lateral Flexion (R)',
    joint: JOINTS.spineLateralFlex,
    targetDeg: 40,
    duration: 2.0,
    description: 'Bending trunk to the right side',
    region: 'axial',
    keywords: ['spine', 'trunk', 'lateral', 'side', 'bend', 'right']
  },
  spineLateralFlexionLeft: {
    id: 'spineLateralFlexionLeft',
    name: 'Spine Lateral Flexion Left',
    displayName: 'Trunk Lateral Flexion (L)',
    joint: JOINTS.spineLateralFlex,
    targetDeg: -40,
    duration: 2.0,
    description: 'Bending trunk to the left side',
    region: 'axial',
    keywords: ['spine', 'trunk', 'lateral', 'side', 'bend', 'left']
  },
  spineRotationRight: {
    id: 'spineRotationRight',
    name: 'Spine Rotation Right',
    displayName: 'Trunk Rotation (R)',
    joint: JOINTS.spineRotation,
    targetDeg: 45,
    duration: 2.0,
    description: 'Rotating trunk to the right',
    region: 'axial',
    keywords: ['spine', 'trunk', 'rotation', 'twist', 'right']
  },
  spineRotationLeft: {
    id: 'spineRotationLeft',
    name: 'Spine Rotation Left',
    displayName: 'Trunk Rotation (L)',
    joint: JOINTS.spineRotation,
    targetDeg: -45,
    duration: 2.0,
    description: 'Rotating trunk to the left',
    region: 'axial',
    keywords: ['spine', 'trunk', 'rotation', 'twist', 'left']
  },

  // Scapula
  scapulaElevation: {
    id: 'scapulaElevation',
    name: 'Scapula Elevation',
    displayName: 'Scapular Elevation',
    joint: JOINTS.scapulaElevDep,
    targetDeg: 10,
    duration: 1.5,
    description: 'Shrugging shoulders upward',
    region: 'upper',
    keywords: ['scapula', 'elevation', 'shrug', 'raise']
  },
  scapulaDepression: {
    id: 'scapulaDepression',
    name: 'Scapula Depression',
    displayName: 'Scapular Depression',
    joint: JOINTS.scapulaElevDep,
    targetDeg: -10,
    duration: 1.5,
    description: 'Lowering shoulders downward',
    region: 'upper',
    keywords: ['scapula', 'depression', 'lower']
  },
  scapulaProtraction: {
    id: 'scapulaProtraction',
    name: 'Scapula Protraction',
    displayName: 'Scapular Protraction',
    joint: JOINTS.scapulaProRet,
    targetDeg: 15,
    duration: 1.5,
    description: 'Moving scapula forward/away from spine',
    region: 'upper',
    keywords: ['scapula', 'protraction', 'forward', 'abduction']
  },
  scapulaRetraction: {
    id: 'scapulaRetraction',
    name: 'Scapula Retraction',
    displayName: 'Scapular Retraction',
    joint: JOINTS.scapulaProRet,
    targetDeg: -15,
    duration: 1.5,
    description: 'Moving scapula toward spine',
    region: 'upper',
    keywords: ['scapula', 'retraction', 'backward', 'adduction']
  },
  scapulaUpwardRotation: {
    id: 'scapulaUpwardRotation',
    name: 'Scapula Upward Rotation',
    displayName: 'Scapular Upward Rotation',
    joint: JOINTS.scapulaRotation,
    targetDeg: 60,
    duration: 2.0,
    description: 'Rotating scapula during arm elevation',
    region: 'upper',
    keywords: ['scapula', 'upward', 'rotation']
  },
  scapulaDownwardRotation: {
    id: 'scapulaDownwardRotation',
    name: 'Scapula Downward Rotation',
    displayName: 'Scapular Downward Rotation',
    joint: JOINTS.scapulaRotation,
    targetDeg: -30,
    duration: 2.0,
    description: 'Rotating scapula during arm lowering',
    region: 'upper',
    keywords: ['scapula', 'downward', 'rotation']
  }
};

// ============================================================================
// MUSCLE-TO-MOTION MAPPING
// ============================================================================

export interface MuscleAnimationMap {
  muscleId: string;
  primaryMotions: string[]; // Motion IDs
  secondaryMotions: string[]; // Supporting motions
  gifSearchTerms: string[]; // Additional terms for GIF search
}

/**
 * Maps muscles to their primary and secondary motions.
 * This is used to automatically select relevant animations and generate
 * accurate search queries.
 */
export const MUSCLE_ANIMATION_MAPS: Record<string, MuscleAnimationMap> = {
  // SHOULDER/ARM
  'deltoid': {
    muscleId: 'deltoid',
    primaryMotions: ['shoulderAbduction', 'shoulderFlexion', 'shoulderExtension'],
    secondaryMotions: ['shoulderMedialRotation', 'shoulderLateralRotation'],
    gifSearchTerms: ['shoulder raise', 'lateral raise', 'deltoid contraction']
  },
  'pectoralis-major': {
    muscleId: 'pectoralis-major',
    primaryMotions: ['shoulderFlexion', 'shoulderHorizAdduction', 'shoulderMedialRotation'],
    secondaryMotions: ['shoulderAdduction'],
    gifSearchTerms: ['bench press', 'chest fly', 'pec contraction']
  },
  'latissimus-dorsi': {
    muscleId: 'latissimus-dorsi',
    primaryMotions: ['shoulderExtension', 'shoulderAdduction', 'shoulderMedialRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['pull-up', 'lat pulldown', 'rowing']
  },
  'trapezius': {
    muscleId: 'trapezius',
    primaryMotions: ['scapulaElevation', 'scapulaRetraction', 'scapulaDepression'],
    secondaryMotions: ['scapulaUpwardRotation'],
    gifSearchTerms: ['shrug', 'scapular retraction', 'shoulder blade']
  },
  'rhomboid-major': {
    muscleId: 'rhomboid-major',
    primaryMotions: ['scapulaRetraction', 'scapulaDownwardRotation'],
    secondaryMotions: ['scapulaElevation'],
    gifSearchTerms: ['scapular retraction', 'row', 'rhomboid squeeze']
  },
  'rhomboid-minor': {
    muscleId: 'rhomboid-minor',
    primaryMotions: ['scapulaRetraction', 'scapulaElevation'],
    secondaryMotions: [],
    gifSearchTerms: ['scapular retraction', 'rhomboid']
  },
  'serratus-anterior': {
    muscleId: 'serratus-anterior',
    primaryMotions: ['scapulaProtraction', 'scapulaUpwardRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['protraction', 'serratus', 'punching motion']
  },
  'levator-scapulae': {
    muscleId: 'levator-scapulae',
    primaryMotions: ['scapulaElevation'],
    secondaryMotions: ['scapulaDownwardRotation'],
    gifSearchTerms: ['shoulder shrug', 'neck']
  },
  'supraspinatus': {
    muscleId: 'supraspinatus',
    primaryMotions: ['shoulderAbduction'],
    secondaryMotions: [],
    gifSearchTerms: ['rotator cuff', 'abduction', 'supraspinatus']
  },
  'infraspinatus': {
    muscleId: 'infraspinatus',
    primaryMotions: ['shoulderLateralRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['rotator cuff', 'external rotation']
  },
  'teres-minor': {
    muscleId: 'teres-minor',
    primaryMotions: ['shoulderLateralRotation'],
    secondaryMotions: ['shoulderAdduction'],
    gifSearchTerms: ['rotator cuff', 'external rotation']
  },
  'subscapularis': {
    muscleId: 'subscapularis',
    primaryMotions: ['shoulderMedialRotation'],
    secondaryMotions: ['shoulderAdduction'],
    gifSearchTerms: ['rotator cuff', 'internal rotation']
  },
  'teres-major': {
    muscleId: 'teres-major',
    primaryMotions: ['shoulderExtension', 'shoulderAdduction', 'shoulderMedialRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['shoulder extension', 'adduction']
  },
  'biceps-brachii': {
    muscleId: 'biceps-brachii',
    primaryMotions: ['elbowFlexion', 'forearmSupination'],
    secondaryMotions: ['shoulderFlexion'],
    gifSearchTerms: ['bicep curl', 'elbow flexion']
  },
  'brachialis': {
    muscleId: 'brachialis',
    primaryMotions: ['elbowFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['elbow flexion', 'hammer curl']
  },
  'brachioradialis': {
    muscleId: 'brachioradialis',
    primaryMotions: ['elbowFlexion'],
    secondaryMotions: ['forearmPronation', 'forearmSupination'],
    gifSearchTerms: ['elbow flexion', 'forearm']
  },
  'triceps-brachii': {
    muscleId: 'triceps-brachii',
    primaryMotions: ['elbowExtension'],
    secondaryMotions: ['shoulderExtension'],
    gifSearchTerms: ['tricep extension', 'elbow extension']
  },
  'coracobrachialis': {
    muscleId: 'coracobrachialis',
    primaryMotions: ['shoulderFlexion', 'shoulderAdduction'],
    secondaryMotions: [],
    gifSearchTerms: ['shoulder flexion']
  },
  'anconeus': {
    muscleId: 'anconeus',
    primaryMotions: ['elbowExtension'],
    secondaryMotions: [],
    gifSearchTerms: ['elbow extension']
  },

  // FOREARM/WRIST
  'pronator-teres': {
    muscleId: 'pronator-teres',
    primaryMotions: ['forearmPronation'],
    secondaryMotions: ['elbowFlexion'],
    gifSearchTerms: ['forearm pronation']
  },
  'pronator-quadratus': {
    muscleId: 'pronator-quadratus',
    primaryMotions: ['forearmPronation'],
    secondaryMotions: [],
    gifSearchTerms: ['forearm pronation']
  },
  'supinator': {
    muscleId: 'supinator',
    primaryMotions: ['forearmSupination'],
    secondaryMotions: [],
    gifSearchTerms: ['forearm supination']
  },
  'flexor-carpi-radialis': {
    muscleId: 'flexor-carpi-radialis',
    primaryMotions: ['wristFlexion', 'wristRadialDeviation'],
    secondaryMotions: [],
    gifSearchTerms: ['wrist flexion', 'radial deviation']
  },
  'flexor-carpi-ulnaris': {
    muscleId: 'flexor-carpi-ulnaris',
    primaryMotions: ['wristFlexion', 'wristUlnarDeviation'],
    secondaryMotions: [],
    gifSearchTerms: ['wrist flexion', 'ulnar deviation']
  },
  'extensor-carpi-radialis-longus': {
    muscleId: 'extensor-carpi-radialis-longus',
    primaryMotions: ['wristExtension', 'wristRadialDeviation'],
    secondaryMotions: [],
    gifSearchTerms: ['wrist extension', 'radial deviation']
  },
  'extensor-carpi-ulnaris': {
    muscleId: 'extensor-carpi-ulnaris',
    primaryMotions: ['wristExtension', 'wristUlnarDeviation'],
    secondaryMotions: [],
    gifSearchTerms: ['wrist extension', 'ulnar deviation']
  },
  'palmaris-longus': {
    muscleId: 'palmaris-longus',
    primaryMotions: ['wristFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['wrist flexion']
  },

  // HIP/THIGH
  'iliopsoas': {
    muscleId: 'iliopsoas',
    primaryMotions: ['hipFlexion'],
    secondaryMotions: ['hipLateralRotation'],
    gifSearchTerms: ['hip flexion', 'leg raise']
  },
  'gluteus-maximus': {
    muscleId: 'gluteus-maximus',
    primaryMotions: ['hipExtension', 'hipLateralRotation'],
    secondaryMotions: ['hipAbduction'],
    gifSearchTerms: ['hip extension', 'glute squeeze']
  },
  'gluteus-medius': {
    muscleId: 'gluteus-medius',
    primaryMotions: ['hipAbduction', 'hipMedialRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['hip abduction', 'lateral raise']
  },
  'gluteus-minimus': {
    muscleId: 'gluteus-minimus',
    primaryMotions: ['hipAbduction', 'hipMedialRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['hip abduction', 'medial rotation']
  },
  'tensor-fasciae-latae': {
    muscleId: 'tensor-fasciae-latae',
    primaryMotions: ['hipFlexion', 'hipAbduction', 'hipMedialRotation'],
    secondaryMotions: [],
    gifSearchTerms: ['hip flexion', 'abduction', 'TFL']
  },
  'sartorius': {
    muscleId: 'sartorius',
    primaryMotions: ['hipFlexion', 'hipAbduction', 'hipLateralRotation', 'kneeFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['hip flexion', 'knee flexion', 'crossed leg']
  },
  'rectus-femoris': {
    muscleId: 'rectus-femoris',
    primaryMotions: ['hipFlexion', 'kneeExtension'],
    secondaryMotions: [],
    gifSearchTerms: ['quadriceps', 'knee extension', 'hip flexion']
  },
  'vastus-lateralis': {
    muscleId: 'vastus-lateralis',
    primaryMotions: ['kneeExtension'],
    secondaryMotions: [],
    gifSearchTerms: ['quadriceps', 'knee extension']
  },
  'vastus-medialis': {
    muscleId: 'vastus-medialis',
    primaryMotions: ['kneeExtension'],
    secondaryMotions: [],
    gifSearchTerms: ['quadriceps', 'knee extension', 'VMO']
  },
  'vastus-intermedius': {
    muscleId: 'vastus-intermedius',
    primaryMotions: ['kneeExtension'],
    secondaryMotions: [],
    gifSearchTerms: ['quadriceps', 'knee extension']
  },
  'biceps-femoris': {
    muscleId: 'biceps-femoris',
    primaryMotions: ['kneeFlexion', 'hipExtension'],
    secondaryMotions: ['hipLateralRotation'],
    gifSearchTerms: ['hamstring', 'knee flexion']
  },
  'semitendinosus': {
    muscleId: 'semitendinosus',
    primaryMotions: ['kneeFlexion', 'hipExtension'],
    secondaryMotions: ['hipMedialRotation'],
    gifSearchTerms: ['hamstring', 'knee flexion']
  },
  'semimembranosus': {
    muscleId: 'semimembranosus',
    primaryMotions: ['kneeFlexion', 'hipExtension'],
    secondaryMotions: ['hipMedialRotation'],
    gifSearchTerms: ['hamstring', 'knee flexion']
  },
  'adductor-longus': {
    muscleId: 'adductor-longus',
    primaryMotions: ['hipAdduction'],
    secondaryMotions: ['hipFlexion'],
    gifSearchTerms: ['hip adduction', 'adductor']
  },
  'adductor-brevis': {
    muscleId: 'adductor-brevis',
    primaryMotions: ['hipAdduction'],
    secondaryMotions: ['hipFlexion'],
    gifSearchTerms: ['hip adduction', 'adductor']
  },
  'adductor-magnus': {
    muscleId: 'adductor-magnus',
    primaryMotions: ['hipAdduction'],
    secondaryMotions: ['hipExtension'],
    gifSearchTerms: ['hip adduction', 'adductor']
  },
  'gracilis': {
    muscleId: 'gracilis',
    primaryMotions: ['hipAdduction', 'kneeFlexion'],
    secondaryMotions: ['hipFlexion'],
    gifSearchTerms: ['hip adduction', 'knee flexion']
  },
  'pectineus': {
    muscleId: 'pectineus',
    primaryMotions: ['hipFlexion', 'hipAdduction'],
    secondaryMotions: [],
    gifSearchTerms: ['hip flexion', 'adduction']
  },

  // LEG/ANKLE
  'gastrocnemius': {
    muscleId: 'gastrocnemius',
    primaryMotions: ['anklePlantarflexion', 'kneeFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['calf raise', 'plantarflexion']
  },
  'soleus': {
    muscleId: 'soleus',
    primaryMotions: ['anklePlantarflexion'],
    secondaryMotions: [],
    gifSearchTerms: ['calf raise', 'plantarflexion', 'soleus']
  },
  'tibialis-anterior': {
    muscleId: 'tibialis-anterior',
    primaryMotions: ['ankleDorsiflexion', 'ankleInversion'],
    secondaryMotions: [],
    gifSearchTerms: ['dorsiflexion', 'ankle flex']
  },
  'tibialis-posterior': {
    muscleId: 'tibialis-posterior',
    primaryMotions: ['anklePlantarflexion', 'ankleInversion'],
    secondaryMotions: [],
    gifSearchTerms: ['plantarflexion', 'inversion']
  },
  'fibularis-longus': {
    muscleId: 'fibularis-longus',
    primaryMotions: ['anklePlantarflexion', 'ankleEversion'],
    secondaryMotions: [],
    gifSearchTerms: ['plantarflexion', 'eversion', 'peroneus']
  },
  'fibularis-brevis': {
    muscleId: 'fibularis-brevis',
    primaryMotions: ['anklePlantarflexion', 'ankleEversion'],
    secondaryMotions: [],
    gifSearchTerms: ['plantarflexion', 'eversion', 'peroneus']
  },

  // TRUNK/SPINE
  'rectus-abdominis': {
    muscleId: 'rectus-abdominis',
    primaryMotions: ['spineFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['crunch', 'sit-up', 'trunk flexion']
  },
  'external-oblique': {
    muscleId: 'external-oblique',
    primaryMotions: ['spineFlexion', 'spineRotationLeft', 'spineLateralFlexionLeft'],
    secondaryMotions: [],
    gifSearchTerms: ['trunk rotation', 'oblique twist']
  },
  'internal-oblique': {
    muscleId: 'internal-oblique',
    primaryMotions: ['spineFlexion', 'spineRotationRight', 'spineLateralFlexionRight'],
    secondaryMotions: [],
    gifSearchTerms: ['trunk rotation', 'oblique']
  },
  'transversus-abdominis': {
    muscleId: 'transversus-abdominis',
    primaryMotions: ['spineFlexion'],
    secondaryMotions: [],
    gifSearchTerms: ['core compression', 'abdominal brace']
  },
  'erector-spinae': {
    muscleId: 'erector-spinae',
    primaryMotions: ['spineExtension'],
    secondaryMotions: ['spineLateralFlexionRight', 'spineLateralFlexionLeft'],
    gifSearchTerms: ['back extension', 'spine extension']
  },
  'quadratus-lumborum': {
    muscleId: 'quadratus-lumborum',
    primaryMotions: ['spineLateralFlexionRight', 'spineLateralFlexionLeft'],
    secondaryMotions: ['spineExtension'],
    gifSearchTerms: ['lateral flexion', 'side bend']
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all motions for a specific muscle by ID
 */
export function getMotionsForMuscle(muscleId: string): MotionDefinition[] {
  const map = MUSCLE_ANIMATION_MAPS[muscleId];
  if (!map) return [];
  
  const allMotionIds = [...map.primaryMotions, ...map.secondaryMotions];
  return allMotionIds
    .map(id => MOTIONS[id])
    .filter(Boolean);
}

/**
 * Get primary motions only
 */
export function getPrimaryMotionsForMuscle(muscleId: string): MotionDefinition[] {
  const map = MUSCLE_ANIMATION_MAPS[muscleId];
  if (!map) return [];
  
  return map.primaryMotions
    .map(id => MOTIONS[id])
    .filter(Boolean);
}

/**
 * Generate GIF search query for a muscle
 */
export function generateGifSearchQuery(muscleId: string, muscleName: string, motionId?: string): string {
  const map = MUSCLE_ANIMATION_MAPS[muscleId];
  if (!map) return `${muscleName} muscle animation`;
  
  if (motionId) {
    const motion = MOTIONS[motionId];
    if (motion) {
      return `${muscleName} muscle ${motion.name} animation`;
    }
  }
  
  // Use first primary motion and additional search terms
  const primaryMotion = MOTIONS[map.primaryMotions[0]];
  const searchTerm = map.gifSearchTerms[0] || primaryMotion?.name || 'contraction';
  return `${muscleName} muscle ${searchTerm} animation`;
}

/**
 * Get all motions grouped by region
 */
export function getMotionsByRegion(region?: 'upper' | 'lower' | 'axial' | 'hand' | 'foot'): MotionDefinition[] {
  const allMotions = Object.values(MOTIONS);
  if (!region) return allMotions;
  return allMotions.filter(m => m.region === region);
}

/**
 * Search motions by keyword
 */
export function searchMotions(query: string): MotionDefinition[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(MOTIONS).filter(motion => 
    motion.name.toLowerCase().includes(lowerQuery) ||
    motion.description.toLowerCase().includes(lowerQuery) ||
    motion.keywords.some(kw => kw.includes(lowerQuery))
  );
}

/**
 * Get the best matching motion for a text action description
 */
export function matchActionToMotion(actionText: string): MotionDefinition | null {
  const lowerAction = actionText.toLowerCase();
  
  // Direct matches on motion names
  for (const motion of Object.values(MOTIONS)) {
    if (lowerAction.includes(motion.name.toLowerCase())) {
      return motion;
    }
  }
  
  // Keyword matches
  for (const motion of Object.values(MOTIONS)) {
    for (const keyword of motion.keywords) {
      if (lowerAction.includes(keyword)) {
        return motion;
      }
    }
  }
  
  return null;
}

/**
 * Get model type (upper/lower/overview) for a motion
 */
export function getModelTypeForMotion(motion: MotionDefinition): 'upper' | 'lower' | 'overview' {
  if (motion.region === 'upper' || motion.region === 'hand') return 'upper';
  if (motion.region === 'lower' || motion.region === 'foot') return 'lower';
  return 'overview';
}
