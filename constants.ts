import { MuscleItem, MuscleContent } from './types';

// Helper to create IDs
const m = (name: string, group: 'A' | 'B', subCategory?: string): MuscleItem => ({
  id: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  name,
  group,
  subCategory
});

export const MUSCLE_DATA: MuscleItem[] = [
  // GROUP A
  m('Masseter', 'A', 'Head & Neck'),
  m('Sternocleidomastoid', 'A', 'Head & Neck'),
  
  m('Rectus abdominis', 'A', 'Torso'),
  m('Pectoralis major', 'A', 'Torso'),
  m('Trapezius', 'A', 'Torso'),
  m('Latissimus dorsi', 'A', 'Torso'),
  
  m('Deltoid', 'A', 'Upper Limb'),
  m('Biceps brachii', 'A', 'Upper Limb'),
  m('Brachialis', 'A', 'Upper Limb'),
  m('Triceps brachii', 'A', 'Upper Limb'),
  
  // Forearm Group A
  m('Flexor carpi ulnaris', 'A', 'Forearm'),
  m('Flexor carpi radialis', 'A', 'Forearm'),
  m('Extensor carpi ulnaris', 'A', 'Forearm'),
  m('Extensor carpi radialis', 'A', 'Forearm'),

  m('Iliacus', 'A', 'Hip & Thigh'),
  m('Psoas major', 'A', 'Hip & Thigh'),
  m('Gluteus maximus', 'A', 'Hip & Thigh'),
  m('Gluteus medius', 'A', 'Hip & Thigh'),
  m('Sartorius', 'A', 'Hip & Thigh'),
  m('Adductor longus', 'A', 'Hip & Thigh'),

  // Quadriceps
  m('Rectus femoris', 'A', 'Quadriceps'),
  m('Vastus lateralis', 'A', 'Quadriceps'),
  m('Vastus medialis', 'A', 'Quadriceps'),
  m('Vastus intermedius', 'A', 'Quadriceps'),

  // Hamstrings
  m('Biceps femoris', 'A', 'Hamstrings'),
  m('Semitendinosus', 'A', 'Hamstrings'),
  m('Semimembranosus', 'A', 'Hamstrings'),

  m('Gastrocnemius', 'A', 'Lower Leg'),
  m('Soleus', 'A', 'Lower Leg'),
  m('Tibialis anterior', 'A', 'Lower Leg'),

  // GROUP B
  m('Frontalis', 'B', 'Head & Neck'),
  m('Orbicularis oculi', 'B', 'Head & Neck'),
  m('Orbicularis oris', 'B', 'Head & Neck'),
  m('Temporalis', 'B', 'Head & Neck'),
  m('Zygomaticus', 'B', 'Head & Neck'),
  m('Platysma', 'B', 'Head & Neck'),

  m('Erector spinae', 'B', 'Torso'),
  m('External oblique', 'B', 'Torso'),
  m('Internal oblique', 'B', 'Torso'),
  m('Transverse abdominis', 'B', 'Torso'),

  // Rotator Cuff
  m('Supraspinatus', 'B', 'Rotator Cuff'),
  m('Infraspinatus', 'B', 'Rotator Cuff'),
  m('Teres minor', 'B', 'Rotator Cuff'),
  m('Subscapularis', 'B', 'Rotator Cuff'),

  m('Brachioradialis', 'B', 'Upper Limb'),
  m('Pronator teres', 'B', 'Upper Limb'),
  m('Supinator', 'B', 'Upper Limb'),
  m('Extensor digitorum', 'B', 'Upper Limb'),
  m('Flexor digitorum superficialis', 'B', 'Upper Limb'),

  m('Gracilis', 'B', 'Hip & Thigh'),
  m('Tensor fasciae latae', 'B', 'Hip & Thigh'),
  m('Piriformis', 'B', 'Hip & Thigh'),

  m('Extensor digitorum longus', 'B', 'Lower Leg'),
];

export const GROUP_A_REQUIREMENTS = [
  "Identify on a diagram/model",
  "State action (own words + technical terms)",
  "Demonstrate: Point to Origin & Insertion",
  "Demonstrate: Perform the action"
];

export const GROUP_B_REQUIREMENTS = [
  "Identify on a diagram/model",
  "State action (own words + technical terms)"
];

// Exact transcriptions from the provided Lab Manual images
export const MUSCLE_DETAILS: Record<string, MuscleContent> = {
  // --- Forearm at Elbow Joint ---
  "biceps-brachii": {
    origin: "Scapula - Coracoid Process and superior margin of Glenoid Fossa",
    insertion: "Radius - Radial Tuberosity",
    action: "1. Flexes forearm at elbow\n2. Supinates forearm\n3. Flexes shoulder",
    demonstration: "Flex elbow and supinate (turn palm up).",
    tips: [],
    clinicalNote: "",
    similarMuscles: ["Brachialis"]
  },
  "brachialis": {
    origin: "Humerus - Anterior Distal Half",
    insertion: "Ulna - Coronoid Process",
    action: "Flexes forearm at elbow (Prime Mover - Principle Flexor of the forearm)",
    demonstration: "Flex elbow (palm down/pronated).",
    tips: [],
    clinicalNote: "",
    similarMuscles: ["Biceps brachii"]
  },
  "brachioradialis": {
    origin: "Humerus - Distal End, above Lateral Epicondyle",
    insertion: "Radius - Styloid Process",
    action: "Flexes forearm at elbow",
    demonstration: "Flex elbow with thumb up (neutral position).",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "triceps-brachii": {
    origin: "Humerus - two origins on the posterior surface: one proximal and one distal\nScapula - Infraglenoid Tubercle",
    insertion: "Ulna - Olecranon Process",
    action: "Extends forearm at elbow",
    demonstration: "Extend arm straight back.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "pronator-teres": {
    origin: "Humerus - Medial Epicondyle & Ulna - Coronoid Process",
    insertion: "Radius - midshaft",
    action: "Pronates forearm",
    demonstration: "Turn palm face down.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "supinator": {
    origin: "Humerus - Lateral Epicondyle & Ulna - proximal end",
    insertion: "Radius - proximal 1/3 of anterior shaft",
    action: "Supinates forearm",
    demonstration: "Turn palm face up.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },

  // --- Head, Face, Trunk & Neck ---
  "orbicularis-oris": {
    origin: "Muscle fibers of facial muscles around the lips",
    insertion: "Muscle & Skin at the angles of mouth",
    action: "Closes, purses & protrudes lips - whistling, kissing & some speech movements",
    demonstration: "Pucker lips.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "orbicularis-oculi": {
    origin: "Frontal bone, Maxillary bone & ligaments around orbit",
    insertion: "Tissue of eyelid",
    action: "Closes eyelids during squinting",
    demonstration: "Blink or squint tightly.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "zygomaticus": {
    origin: "Zygomatic bone",
    insertion: "Skin & Muscle at corner of mouth",
    action: "Raises corners of mouth during smiling",
    demonstration: "Smile.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "frontalis": {
    origin: "Epicranial aponeurosis",
    insertion: "Skin of eyebrows & top of nose",
    action: "Elevates eyebrows (to show surprise), wrinkles forehead",
    demonstration: "Raise eyebrows.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "platysma": {
    origin: "Fascia of chest, covering the pectoral muscles & part of the deltoid muscles",
    insertion: "Mandible - lower margin, Skin at corner of mouth",
    action: "Depresses the mandible - 'grimacing'",
    demonstration: "Tense neck skin, grimace.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "masseter": {
    origin: "Zygomatic Arch",
    insertion: "Mandible - Ramus and Angle",
    action: "Elevates the mandible (Prime mover of jaw closure)",
    demonstration: "Clench teeth.",
    tips: [],
    clinicalNote: "",
    similarMuscles: ["Temporalis"]
  },
  "temporalis": {
    origin: "Temporal Fossa",
    insertion: "Mandible - Coronoid Process",
    action: "Elevates & retracts mandible",
    demonstration: "Clench teeth and feel temples.",
    tips: [],
    clinicalNote: "",
    similarMuscles: ["Masseter"]
  },
  "sternocleidomastoid": {
    origin: "Sternum - Manubrium & Clavicle",
    insertion: "Temporal bone - Mastoid Process & Occipital bone",
    action: "1. Flexes Neck\n2. Rotates the head\n3. Elevates (sternum/clavicle)",
    demonstration: "Turn head side to side, flex neck.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },

  // --- Forearm muscles acting on Hand/Fingers ---
  "flexor-carpi-radialis": {
    origin: "Humerus - Medial Epicondyle",
    insertion: "Base of 2nd & 3rd Metacarpals (palmar surface)",
    action: "1. Flexes the wrist\n2. Abducts the hand toward the radius at the wrist",
    demonstration: "Flex wrist and deviate towards thumb.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "flexor-carpi-ulnaris": {
    origin: "Humerus - Medial Epicondyle; Ulna - Olecranon & posterior surface",
    insertion: "Pisiform, Hamate, & Base of 5th Metacarpal",
    action: "1. Flexes the wrist\n2. Adducts the hand toward the ulna at the wrist",
    demonstration: "Flex wrist and deviate towards pinky.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "extensor-carpi-radialis": {
    origin: "Humerus - Lateral Supracondylar Ridge/Epicondyle",
    insertion: "Base of 2nd & 3rd Metacarpals (dorsal surface)",
    action: "1. Extends wrist\n2. Abducts the hand at the wrist",
    demonstration: "Extend wrist.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "extensor-carpi-ulnaris": {
    origin: "Humerus - Lateral Epicondyle",
    insertion: "Base of 5th Metacarpal (dorsal/posterior surface)",
    action: "1. Extends wrist\n2. Adducts the hand at the wrist",
    demonstration: "Extend wrist and deviate towards pinky.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "extensor-digitorum": {
    origin: "Humerus - Lateral Epicondyle",
    insertion: "Four tendons onto Distal Phalanges #2-#5",
    action: "Extends fingers",
    demonstration: "Open hand wide, extend fingers.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },

  // --- Lower Leg & Foot ---
  "tibialis-anterior": {
    origin: "Tibia - proximal 1/2 of anterolateral surface",
    insertion: "Base of 1st Metatarsal & Medial Cuneiform (plantar surface)",
    action: "1. Dorsiflexes the ankle\n2. Inverts the ankle & foot",
    demonstration: "Pull toes up towards shin.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "gastrocnemius": {
    origin: "Femur - Lateral and Medial Condyles",
    insertion: "Calcaneus via the Achilles Tendon",
    action: "1. Plantar flexion of the ankle\n2. Flexes the knee",
    demonstration: "Stand on toes.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "soleus": {
    origin: "Tibia - proximal shaft & Fibula - proximal shaft",
    insertion: "Calcaneus via the Achilles Tendon",
    action: "Plantar flexion of the ankle",
    demonstration: "Calf raise with knees bent.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "extensor-digitorum-longus": {
    origin: "Tibia - Lateral Condyle; Fibula - proximal 3/4; Interosseous Membrane",
    insertion: "Middle and Distal Phalanges #2-#5, dorsal surface",
    action: "1. Extends toes\n2. Dorsiflexes foot",
    demonstration: "Lift toes up.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },

  // --- Shoulder & Upper Arm ---
  "trapezius": {
    origin: "Occipital bone & Ligamentum Nuchae & Spinous Processes C7-T12",
    insertion: "Scapula - Spine and Acromion Process & Clavicle - lateral 3rd",
    action: "1. Extends head at neck\n2. Adducts scapulae\n3. & 4. Elevates & depresses scapula",
    demonstration: "Shrug shoulders, squeeze shoulder blades.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "deltoid": {
    origin: "Clavicle - Lateral 3rd & Scapula - Acromion Process & Spine",
    insertion: "Humerus - Deltoid Tuberosity",
    action: "1. Flexes the shoulder\n2. Extends the shoulder\n3. Abducts the shoulder",
    demonstration: "Raise arm forward, backward, and to side.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "pectoralis-major": {
    origin: "Clavicle, Sternum, Costal cartilages #1-#6",
    insertion: "Humerus - Lateral margin of Intertubercular Sulcus",
    action: "1. Flexes shoulder\n2. Adducts shoulder\n3. Medially rotates shoulder",
    demonstration: "Clap hands in front of chest.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "latissimus-dorsi": {
    origin: "Ilium - Iliac Crest, T7-S5 Vertebrae - Spinous Processes, Ribs #8-#12",
    insertion: "Humerus - medial margin of Intertubercular Sulcus",
    action: "1. Extends shoulder\n2. Adducts shoulder\n3. Medially rotates shoulder",
    demonstration: "Pull-down motion.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "rhomboid-major": { // Added for completeness based on image if user selects generic rhomboids or adds it
    origin: "T2-T5 Vertebrae - Spinous Processes",
    insertion: "Scapula - Medial Border",
    action: "1. Stabilizes scapula\n2. Assists in scapula retraction\n3. Depresses glenoid cavity downward",
    demonstration: "Squeeze shoulder blades back.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "supraspinatus": {
    origin: "Scapula - supraspinous fossa",
    insertion: "Humerus - Greater Tubercle",
    action: "Abducts arm/shoulder",
    demonstration: "Start raising arm to side.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "infraspinatus": {
    origin: "Scapula - infraspinous fossa",
    insertion: "Humerus - Greater Tubercle",
    action: "Laterally rotates arm/shoulder",
    demonstration: "Rotate arm outward.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "teres-minor": {
    origin: "Scapula - lateral border",
    insertion: "Humerus - Greater Tubercle",
    action: "Laterally rotates arm/shoulder",
    demonstration: "Rotate arm outward.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "subscapularis": {
    origin: "Scapula - subscapular fossa",
    insertion: "Humerus - Lesser Tubercle",
    action: "Medially rotates arm/shoulder",
    demonstration: "Rotate arm inward (hand behind back).",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },

  // --- Trunk Movement ---
  "rectus-abdominis": {
    origin: "Pubis bone - Pubic Crest and Pubic Symphysis",
    insertion: "Costal Cartilage of ribs #5-#7 & Xiphoid Process",
    action: "Flexes vertebral column & trunk",
    demonstration: "Crunch/Sit-up.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "external-oblique": {
    origin: "Ribs #5-#12",
    insertion: "Linea Alba, Pubic Crest & Iliac Crest",
    action: "1. Flexes vertebral column & trunk\n2. Rotates trunk\n3. Compresses abdominal wall",
    demonstration: "Twist trunk.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "internal-oblique": {
    origin: "Inguinal Ligament, Iliac Crest & Lumbar Fascia",
    insertion: "Linea Alba, Pubic Crest, Ribs #8-#12",
    action: "1. Flexes vertebral column & trunk\n2. Rotates trunk\n3. Compresses abdominal wall",
    demonstration: "Twist trunk.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "transverse-abdominis": {
    origin: "Inguinal Ligament, Iliac Crest & Cartilages #6-#12",
    insertion: "Linea Alba, Pubic Crest",
    action: "Compresses abdomen",
    demonstration: "Suck in stomach.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },

  // --- Hip ---
  "iliacus": {
    origin: "Ilium - Iliac Fossa",
    insertion: "Femur - Lesser Trochanter",
    action: "Flexes the hip/thigh",
    demonstration: "Lift leg.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "psoas-major": {
    origin: "T12-L5 Bodies & Vertebrae",
    insertion: "Femur - Lesser Trochanter",
    action: "Flexes the hip/thigh",
    demonstration: "Lift leg.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "gluteus-maximus": {
    origin: "Ilium - posterior gluteal line, Sacrum, Coccyx",
    insertion: "Femur - Gluteal Tuberosity & Iliotibial Tract",
    action: "1. Extends the hip/thigh\n2. Laterally rotates the hip/thigh",
    demonstration: "Extend leg back.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "gluteus-medius": {
    origin: "Ilium - posterior surface",
    insertion: "Femur - Greater Trochanter",
    action: "1. Abducts the hip/thigh\n2. Medially rotates the hip/thigh",
    demonstration: "Lift leg to side.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "piriformis": {
    origin: "Sacrum (anterior)",
    insertion: "Femur - Greater Trochanter",
    action: "1. Abducts the hip/thigh\n2. Laterally rotates the hip/thigh",
    demonstration: "",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "tensor-fasciae-latae": {
    origin: "Ilium - anterior aspect of Iliac Crest & ASIS",
    insertion: "Tibia - via the Iliotibial Tract",
    action: "1. Abducts the hip/thigh\n2. Rotates hip/thigh medially",
    demonstration: "",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "sartorius": {
    origin: "Ilium - Anterior Superior Iliac Spine (ASIS)",
    insertion: "Tibia - medial surface of proximal tibia",
    action: "1. Flexes the hip/thigh\n2. Flexes the knee\n3. Externally rotates the hip/thigh\n4. Abducts the hip/thigh",
    demonstration: "Cross legs (tailor sit).",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "gracilis": {
    origin: "Pubis - near Pubic Symphysis",
    insertion: "Tibia - medial surface of proximal tibia",
    action: "1. Adducts the hip/thigh\n2. Medially rotates the hip/thigh\n3. Flexes the knee",
    demonstration: "Squeeze legs together.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "adductor-longus": {
    origin: "Pubis - near Pubic Symphysis",
    insertion: "Femur - Linea Aspera",
    action: "1. Adducts the hip/thigh\n2. Medially rotates the hip/thigh",
    demonstration: "Squeeze legs together.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },

  // --- Anterior Thigh (Quadriceps) ---
  "rectus-femoris": {
    origin: "Ilium - Anterior Inferior Iliac Spine (AIIS)",
    insertion: "Patella & Tibia - Tibial Tuberosity (via Patellar tendon)",
    action: "1. Extends the knee\n2. Flexes the hip",
    demonstration: "Kick leg out and lift thigh.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "vastus-lateralis": {
    origin: "Femur - greater trochanter & Linea Aspera",
    insertion: "Patella & Tibia - Tibial Tuberosity",
    action: "Extends the leg at the knee",
    demonstration: "Extend knee.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "vastus-medialis": {
    origin: "Femur - medial edge of Linea Aspera",
    insertion: "Patella & Tibia - Tibial Tuberosity",
    action: "Extends the leg at the knee",
    demonstration: "Extend knee.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "vastus-intermedius": {
    origin: "Femur - anterior and lateral shaft",
    insertion: "Patella & Tibia - Tibial Tuberosity",
    action: "Extends the leg at the knee",
    demonstration: "Extend knee.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },

  // --- Posterior Thigh (Hamstrings) ---
  "biceps-femoris": {
    origin: "Ischium - Ischial Tuberosity & Femur - Linea Aspera",
    insertion: "Fibula - Head & Tibia - Lateral Condyle",
    action: "1. Flexes the knee\n2. Extends the hip",
    demonstration: "Kick butt.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "semitendinosus": {
    origin: "Ischium - Ischial Tuberosity",
    insertion: "Tibia - Medial surface of proximal shaft",
    action: "1. Flexes the knee\n2. Extends the hip",
    demonstration: "Kick butt.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  },
  "semimembranosus": {
    origin: "Ischium - Ischial Tuberosity",
    insertion: "Tibia - Medial Condyle",
    action: "1. Flexes the knee\n2. Extends the hip",
    demonstration: "Kick butt.",
    tips: [],
    clinicalNote: "",
    similarMuscles: []
  }
};