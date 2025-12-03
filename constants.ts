import { MuscleItem, MuscleContent, ThemeConfig, AppTheme } from './types';

// Helper to create IDs
const m = (name: string, group: 'A' | 'B', subCategory?: string): MuscleItem => ({
  id: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  name,
  group,
  subCategory
});

export const THEME_CONFIG: Record<AppTheme, ThemeConfig> = {
  modern: {
    label: 'Modern',
    appBg: 'bg-slate-50',
    cardBg: 'bg-white/80 backdrop-blur-md',
    text: 'text-slate-900',
    subText: 'text-slate-500',
    border: 'border-slate-200',
    accent: 'bg-gradient-to-r from-brand-500 to-blue-600',
    badge: 'bg-white/90 text-brand-700 border-brand-100 shadow-sm',
    infoBox: 'bg-white/60 border-slate-200 text-slate-700',
    iconLoc: 'bg-emerald-100 text-emerald-700',
    iconFunc: 'bg-blue-100 text-blue-700',
    
    // Sidebar
    sidebarBg: 'bg-white/90 backdrop-blur-xl',
    sidebarBorder: 'border-slate-200',
    sidebarText: 'text-slate-900',
    sidebarSubText: 'text-slate-500',
    sidebarHover: 'hover:bg-slate-100',
    sidebarActive: 'bg-brand-50 text-brand-700 border-brand-100',
    inputBg: 'bg-slate-100',

    // Blobs
    blobColor1: 'bg-brand-200',
    blobColor2: 'bg-blue-200',
    blobOpacity: 'opacity-30',
  },
  midnight: {
    label: 'Midnight',
    appBg: 'bg-slate-950',
    cardBg: 'bg-slate-900 shadow-md', // more solid for contrast
    text: 'text-slate-100',
    subText: 'text-slate-200', // brighter for readability
    border: 'border-slate-600', // lighter border
    accent: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    badge: 'bg-slate-800 text-indigo-200 border-slate-600 shadow-lg',
    infoBox: 'bg-slate-800 border-slate-600 text-slate-100',
    iconLoc: 'bg-emerald-900/50 text-emerald-300',
    iconFunc: 'bg-blue-900/50 text-blue-300',

    // Sidebar
    sidebarBg: 'bg-slate-900', // remove heavy translucency
    sidebarBorder: 'border-slate-600',
    sidebarText: 'text-slate-100',
    sidebarSubText: 'text-slate-300',
    sidebarHover: 'hover:bg-slate-800',
    sidebarActive: 'bg-slate-800 text-indigo-200 border border-slate-600',
    inputBg: 'bg-slate-800',

    // Blobs
    blobColor1: 'bg-indigo-900',
    blobColor2: 'bg-purple-900',
    blobOpacity: 'opacity-40',
  },
  blueprint: {
    label: 'Blueprint',
    appBg: 'bg-[#0d1a2f]', // brighter base
    cardBg: 'bg-[#18345e] shadow-md', // solid card for legibility
    text: 'text-slate-50',
    subText: 'text-slate-200',
    border: 'border-blue-400/70', // more visible border
    accent: 'bg-gradient-to-r from-sky-500 to-blue-500',
    badge: 'bg-blue-800/60 text-blue-100 border-blue-400/70 shadow',
    infoBox: 'bg-[#102748] border-blue-400/50 text-slate-100',
    iconLoc: 'bg-blue-500/30 text-blue-100',
    iconFunc: 'bg-blue-400/30 text-blue-100',

    // Sidebar
    sidebarBg: 'bg-[#10223f]', // solid, darker sidebar
    sidebarBorder: 'border-blue-400/70',
    sidebarText: 'text-slate-50',
    sidebarSubText: 'text-slate-200',
    sidebarHover: 'hover:bg-blue-900/30',
    sidebarActive: 'bg-blue-800/70 text-slate-50 border border-blue-300/80',
    inputBg: 'bg-[#142a4c]',

    // Blobs
    blobColor1: 'bg-blue-600',
    blobColor2: 'bg-sky-600',
    blobOpacity: 'opacity-10',
  },
  nature: {
    label: 'Nature',
    appBg: 'bg-[#f5f5f4]', // stone-100
    cardBg: 'bg-white shadow-md', // solid white for contrast
    text: 'text-[#1c1917]', // stone-900 - much darker
    subText: 'text-[#433f3a]', // deeper contrast for readability
    border: 'border-[#cfcac3]', // slightly darker border
    accent: 'bg-gradient-to-r from-emerald-600 to-teal-700',
    badge: 'bg-white text-emerald-800 border-emerald-300 shadow-sm',
    infoBox: 'bg-white/90 border-[#cfcac3] text-[#292524]', // stone-800
    iconLoc: 'bg-[#dcfce7] text-[#166534]', // emerald-100, emerald-700
    iconFunc: 'bg-[#fef3c7] text-[#92400e]', // amber-100, amber-800

    // Sidebar
    sidebarBg: 'bg-white',
    sidebarBorder: 'border-[#cfcac3]',
    sidebarText: 'text-[#1c1917]',
    sidebarSubText: 'text-[#433f3a]',
    sidebarHover: 'hover:bg-[#e7e5e4]/90',
    sidebarActive: 'bg-white shadow-sm border border-[#cfcac3] text-[#166534]',
    inputBg: 'bg-white',

    // Blobs
    blobColor1: 'bg-emerald-200',
    blobColor2: 'bg-amber-200',
    blobOpacity: 'opacity-30',
  }
};

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

// Exact transcriptions with Rich Relationships and Detailed Demonstrations
export const MUSCLE_DETAILS: Record<string, MuscleContent> = {
  // --- Forearm at Elbow Joint ---
  "biceps-brachii": {
    origin: "Scapula - Coracoid Process and superior margin of Glenoid Fossa",
    insertion: "Radius - Radial Tuberosity",
    action: "1. Flexes forearm at elbow\n2. Supinates forearm\n3. Flexes shoulder",
    demonstration: "1. Stand with your arm relaxed by your side.\n2. To demonstrate flexion: Slowly bend your elbow, bringing your hand toward your shoulder. Squeeze the front of your upper arm.\n3. To demonstrate supination: Keep your elbow bent at 90 degrees and rotate your wrist so your palm faces up (like holding a bowl of soup).",
    tips: [
      "Mnemonic: 'Corkscrew Muscle' - it pulls the cork out (supination) and then pulls the cork (flexion).",
      "Short head originates from Coracoid process (Coracoid = Crow's beak).",
      "It crosses two joints: shoulder and elbow."
    ],
    clinicalConnection: "Bicipital Tendonitis: Inflammation of the long head tendon in the bicipital groove of the humerus, common in overhead sports.",
    relatedMuscles: [
      { id: "brachialis", name: "Brachialis", relation: "Synergist (Forearm Flexion)" },
      { id: "triceps-brachii", name: "Triceps brachii", relation: "Antagonist (Extension)" },
      { id: "supinator", name: "Supinator", relation: "Synergist (Supination)" }
    ]
  },
  "brachialis": {
    origin: "Humerus - Anterior Distal Half",
    insertion: "Ulna - Coronoid Process",
    action: "Flexes forearm at elbow (Prime Mover - Principle Flexor of the forearm)",
    demonstration: "1. Pronate your hand (palm facing down) to disengage the biceps slightly.\n2. Flex your elbow, bringing your hand toward your shoulder.\n3. The muscle is located deep to the biceps, but you can feel it bulging on the sides of the lower upper arm.",
    tips: [
      "The 'Workhorse' of the elbow flexors.",
      "It is deep to the biceps brachii.",
      "Since it inserts on the Ulna, it ONLY flexes (it cannot supinate/pronate like the biceps)."
    ],
    clinicalConnection: "Often injured in 'climber's elbow' due to sustained flexion.",
    relatedMuscles: [
      { id: "biceps-brachii", name: "Biceps brachii", relation: "Superficial Synergist" },
      { id: "brachioradialis", name: "Brachioradialis", relation: "Synergist" }
    ]
  },
  "brachioradialis": {
    origin: "Humerus - Distal End, above Lateral Epicondyle",
    insertion: "Radius - Styloid Process",
    action: "Flexes forearm at elbow",
    demonstration: "1. Position your hand in a 'neutral' position (thumbs up, like a handshake).\n2. Flex your elbow against resistance (try pulling up on a table edge).\n3. Observe the prominent ridge popping up on the top/thumb-side of your forearm.",
    tips: [
      "The 'Beer Drinking' muscle - it flexes the elbow best when the hand is in neutral (handshake) position.",
      "Prominent when you flex your elbow against resistance with thumb up.",
      "Runs along the thumb side (radial side) of the forearm."
    ],
    clinicalConnection: "Wartenberg's Syndrome: Compression of the superficial radial nerve which runs under this muscle.",
    relatedMuscles: [
      { id: "brachialis", name: "Brachialis", relation: "Synergist (Flexion)" },
      { id: "extensor-carpi-radialis", name: "Extensor carpi radialis", relation: "Synergist (Abduction)" }
    ]
  },
  "triceps-brachii": {
    origin: "Humerus - two origins on the posterior surface: one proximal and one distal\nScapula - Infraglenoid Tubercle",
    insertion: "Ulna - Olecranon Process",
    action: "Extends forearm at elbow",
    demonstration: "1. Bend your elbow.\n2. Straighten (extend) your arm forcefully behind you.\n3. Feel the back of your upper arm tighten. This is the triceps engaging to straighten the joint.",
    tips: [
      "Tri-ceps means 'Three Heads': Long, Lateral, and Medial.",
      "The Long head crosses the shoulder joint (helps extend shoulder), the others do not.",
      "Insertion is the 'Funny Bone' area (Olecranon)."
    ],
    clinicalConnection: "Triceps Tendonitis: Common in weightlifters (bench press) or throwers.",
    relatedMuscles: [
      { id: "biceps-brachii", name: "Biceps brachii", relation: "Antagonist (Flexion)" }
    ]
  },
  "pronator-teres": {
    origin: "Humerus - Medial Epicondyle & Ulna - Coronoid Process",
    insertion: "Radius - midshaft",
    action: "Pronates forearm",
    demonstration: "1. Start with your palm facing up (supinated).\n2. Rotate your forearm so your palm faces down (pronation).\n3. Imagine throwing a card onto a table.",
    tips: [
      "Shape resembles a diagonal strap across the upper forearm.",
      "Mnemonic: 'Pass the Taters' (Pronator Teres).",
      "Medial Epicondyle = Flexor/Pronator origin."
    ],
    clinicalConnection: "Pronator Teres Syndrome: Compression of the median nerve as it passes between the two heads of this muscle.",
    relatedMuscles: [
      { id: "supinator", name: "Supinator", relation: "Antagonist (Supination)" },
      { id: "biceps-brachii", name: "Biceps brachii", relation: "Antagonist (Supination)" }
    ]
  },
  "supinator": {
    origin: "Humerus - Lateral Epicondyle & Ulna - proximal end",
    insertion: "Radius - proximal 1/3 of anterior shaft",
    action: "Supinates forearm",
    demonstration: "1. Start with your palm facing down.\n2. Rotate your forearm so your palm faces up.\n3. Mnemonic action: Imagine holding a bowl of soup.",
    tips: [
      "Think 'Holding a bowl of Soup' (Supination).",
      "Deep muscle, wraps around the radius.",
      "Antagonist to the Pronator Teres."
    ],
    clinicalConnection: "Radial Tunnel Syndrome: Compression of the deep branch of the radial nerve near this muscle.",
    relatedMuscles: [
      { id: "pronator-teres", name: "Pronator teres", relation: "Antagonist (Pronation)" },
      { id: "biceps-brachii", name: "Biceps brachii", relation: "Synergist (Supination)" }
    ]
  },

  // --- Head, Face, Trunk & Neck ---
  "orbicularis-oris": {
    origin: "Muscle fibers of facial muscles around the lips",
    insertion: "Muscle & Skin at the angles of mouth",
    action: "Closes, purses & protrudes lips - whistling, kissing & some speech movements",
    demonstration: "1. Pucker your lips as if you are going to whistle.\n2. Press lips together tightly.",
    tips: [
      "The 'Kissing Muscle'.",
      "Sphincter muscle (circular fibers).",
      "Oris = Oral/Mouth."
    ],
    clinicalConnection: "Bell's Palsy can cause paralysis of this muscle, leading to drooling and inability to hold food in the mouth.",
    relatedMuscles: [
      { id: "zygomaticus", name: "Zygomaticus", relation: "Antagonist (Smile vs Pucker)" },
      { id: "platysma", name: "Platysma", relation: "Associated Facial Muscle" }
    ]
  },
  "orbicularis-oculi": {
    origin: "Frontal bone, Maxillary bone & ligaments around orbit",
    insertion: "Tissue of eyelid",
    action: "Closes eyelids during squinting",
    demonstration: "1. Close your eyes gently (blinking).\n2. Squeeze your eyes shut tightly (squinting).",
    tips: [
      "Oculi = Ocular/Eye.",
      "The 'Winking' muscle.",
      "Has two parts: Palpebral (gentle closing/blinking) and Orbital (tight squeezing)."
    ],
    clinicalConnection: "Weakness seen in Myasthenia Gravis (ptosis/drooping).",
    relatedMuscles: [
      { id: "frontalis", name: "Frontalis", relation: "Synergist (Expression)" }
    ]
  },
  "zygomaticus": {
    origin: "Zygomatic bone",
    insertion: "Skin & Muscle at corner of mouth",
    action: "Raises corners of mouth during smiling",
    demonstration: "1. Smile broadly, raising the corners of your mouth toward your cheekbones.\n2. Feel the muscle contract over your cheekbones.",
    tips: [
      "The 'Smiling Muscle'.",
      "Runs from the cheekbone (Zygomatic arch) to the mouth corner.",
      "Major and Minor parts, but generally grouped as Zygomaticus."
    ],
    clinicalConnection: "Major muscle involved in genuine (Duchenne) smiling.",
    relatedMuscles: [
      { id: "orbicularis-oris", name: "Orbicularis oris", relation: "Antagonist (Smile vs Pucker)" }
    ]
  },
  "frontalis": {
    origin: "Epicranial aponeurosis",
    insertion: "Skin of eyebrows & top of nose",
    action: "Elevates eyebrows (to show surprise), wrinkles forehead",
    demonstration: "1. Raise your eyebrows high as if surprised.\n2. Feel the horizontal wrinkles form on your forehead.",
    tips: [
      "Frontal belly of the Epicranius (Occipitofrontalis).",
      "Think: 'Surprise!' muscle.",
      "No bony attachment anteriorly, attaches to skin."
    ],
    clinicalConnection: "Often the target for Botox injections to smooth forehead wrinkles.",
    relatedMuscles: [
      { id: "orbicularis-oculi", name: "Orbicularis oculi", relation: "Adjacent Facial Muscle" }
    ]
  },
  "platysma": {
    origin: "Fascia of chest, covering the pectoral muscles & part of the deltoid muscles",
    insertion: "Mandible - lower margin, Skin at corner of mouth",
    action: "Depresses the mandible - 'grimacing'",
    demonstration: "1. Pull the corners of your mouth down.\n2. Tense the skin of your neck (like a lizard).\n3. Observe the vertical bands standing out on your neck.",
    tips: [
      "The 'Shaving Muscle' (tenses skin of neck).",
      "Very superficial, thin sheet of muscle.",
      "Think 'P' for Platysma = 'P' for Pouting/Platypus face."
    ],
    clinicalConnection: "Superficial neck incisions must account for this muscle layer.",
    relatedMuscles: [
      { id: "sternocleidomastoid", name: "Sternocleidomastoid", relation: "Deep to Platysma" },
      { id: "masseter", name: "Masseter", relation: "Synergist (Jaw movement)" }
    ]
  },
  "masseter": {
    origin: "Zygomatic Arch",
    insertion: "Mandible - Ramus and Angle",
    action: "Elevates the mandible (Prime mover of jaw closure)",
    demonstration: "1. Place fingers on the angle of your jaw (below ears).\n2. Clench your teeth firmly.\n3. Feel the muscle bulge out hard.",
    tips: [
      "The 'Chewer'. One of the strongest muscles in the body for its size.",
      "Feel it bulge at the angle of your jaw when you clench teeth.",
      "Vertical fibers for powerful crushing."
    ],
    clinicalConnection: "TMJ (Temporomandibular Joint) disorders often involve spasm or tightness in the Masseter.",
    relatedMuscles: [
      { id: "temporalis", name: "Temporalis", relation: "Synergist (Elevation)" },
      { id: "platysma", name: "Platysma", relation: "Antagonist (Depression)" }
    ]
  },
  "temporalis": {
    origin: "Temporal Fossa",
    insertion: "Mandible - Coronoid Process",
    action: "Elevates & retracts mandible",
    demonstration: "1. Place fingers on your temples.\n2. Clench your teeth.\n3. Feel the muscle tighten under your fingertips.",
    tips: [
      "Fan-shaped muscle covering the temple.",
      "Passes under the Zygomatic arch.",
      "Main function is to close jaw and pull it backward (retraction)."
    ],
    clinicalConnection: "Tension headaches often involve the Temporalis muscle.",
    relatedMuscles: [
      { id: "masseter", name: "Masseter", relation: "Synergist (Elevation)" }
    ]
  },
  "sternocleidomastoid": {
    origin: "Sternum - Manubrium & Clavicle",
    insertion: "Temporal bone - Mastoid Process & Occipital bone",
    action: "1. Flexes Neck\n2. Rotates the head\n3. Elevates (sternum/clavicle)",
    demonstration: "1. To show rotation: Turn your head to the LEFT. The RIGHT SCM will pop out.\n2. To show flexion: Bring your chin to your chest.",
    tips: [
      "Name tells you the attachments: Sterno (Sternum), Cleido (Clavicle), Mastoid (Mastoid process).",
      "The 'Prayer Muscle' (bilateral contraction flexes head down).",
      "Contraction on right side turns face to the left."
    ],
    clinicalConnection: "Torticollis (Wry Neck): A condition where this muscle is shortened/spasmed, causing head tilt.",
    relatedMuscles: [
      { id: "trapezius", name: "Trapezius", relation: "Synergist (Neck Extension/Movement)" },
      { id: "platysma", name: "Platysma", relation: "Superficial to SCM" }
    ]
  },

  // --- Forearm muscles acting on Hand/Fingers ---
  "flexor-carpi-radialis": {
    origin: "Humerus - Medial Epicondyle",
    insertion: "Base of 2nd & 3rd Metacarpals (palmar surface)",
    action: "1. Flexes the wrist\n2. Abducts the hand toward the radius at the wrist",
    demonstration: "1. Flex your wrist (palm towards forearm).\n2. Tilt your hand towards your thumb (radial deviation).",
    tips: [
      "Originates from the 'Common Flexor Tendon' (Medial Epicondyle).",
      "Follows the radius bone to the thumb side.",
      "Radial pulse is felt just lateral to this tendon."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "flexor-carpi-ulnaris", name: "Flexor carpi ulnaris", relation: "Synergist (Flexion) / Antagonist (Deviation)" },
      { id: "extensor-carpi-radialis", name: "Extensor carpi radialis", relation: "Antagonist (Extension) / Synergist (Abduction)" }
    ]
  },
  "flexor-carpi-ulnaris": {
    origin: "Humerus - Medial Epicondyle; Ulna - Olecranon & posterior surface",
    insertion: "Pisiform, Hamate, & Base of 5th Metacarpal",
    action: "1. Flexes the wrist\n2. Adducts the hand toward the ulna at the wrist",
    demonstration: "1. Flex your wrist.\n2. Tilt your hand towards your pinky finger (ulnar deviation).",
    tips: [
      "Most medial of the superficial flexors.",
      "Ulnar nerve runs just underneath it ('funny bone' sensation).",
      "Use pinky finger to trace line from medial elbow to wrist."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "flexor-carpi-radialis", name: "Flexor carpi radialis", relation: "Synergist (Flexion) / Antagonist (Deviation)" },
      { id: "extensor-carpi-ulnaris", name: "Extensor carpi ulnaris", relation: "Antagonist (Extension) / Synergist (Adduction)" }
    ]
  },
  "extensor-carpi-radialis": {
    origin: "Humerus - Lateral Supracondylar Ridge/Epicondyle",
    insertion: "Base of 2nd & 3rd Metacarpals (dorsal surface)",
    action: "1. Extends wrist\n2. Abducts the hand at the wrist",
    demonstration: "1. Extend your wrist (pull hand back).\n2. Tilt hand towards the thumb side.",
    tips: [
      "Lateral Epicondyle = Extensor origin ('Tennis Elbow' site).",
      "Has a 'Longus' and 'Brevis' part.",
      "Essential for power grip (stabilizes wrist so fingers can flex)."
    ],
    clinicalConnection: "Lateral Epicondylitis (Tennis Elbow): Overuse injury involving the origin of wrist extensors.",
    relatedMuscles: [
      { id: "extensor-carpi-ulnaris", name: "Extensor carpi ulnaris", relation: "Synergist (Extension) / Antagonist (Deviation)" },
      { id: "flexor-carpi-radialis", name: "Flexor carpi radialis", relation: "Antagonist (Flexion) / Synergist (Abduction)" }
    ]
  },
  "extensor-carpi-ulnaris": {
    origin: "Humerus - Lateral Epicondyle",
    insertion: "Base of 5th Metacarpal (dorsal/posterior surface)",
    action: "1. Extends wrist\n2. Adducts the hand at the wrist",
    demonstration: "1. Extend your wrist.\n2. Tilt hand towards the pinky side.",
    tips: [
      "Most medial of the superficial extensors.",
      "Performs ulnar deviation along with Flexor Carpi Ulnaris.",
      "Follows the ulna bone on the posterior side."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "extensor-carpi-radialis", name: "Extensor carpi radialis", relation: "Synergist (Extension) / Antagonist (Deviation)" },
      { id: "flexor-carpi-ulnaris", name: "Flexor carpi ulnaris", relation: "Antagonist (Flexion) / Synergist (Adduction)" }
    ]
  },
  "extensor-digitorum": {
    origin: "Humerus - Lateral Epicondyle",
    insertion: "Four tendons onto Distal Phalanges #2-#5",
    action: "Extends fingers",
    demonstration: "1. Open your hand flat.\n2. Lift your fingers up (hyperextend) as if waving.\n3. You can see the tendons moving on the back of your hand.",
    tips: [
      "Look at the back of your hand; these are the tendons you see when you wiggle your fingers.",
      "Notice the 'intertendinous connections' (little bridges between tendons) that make it hard to lift just the ring finger.",
      "Digitorum = Digits/Fingers."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "flexor-digitorum-superficialis", name: "Flexor digitorum superficialis", relation: "Antagonist (Flexion)" }
    ]
  },

  // --- Lower Leg & Foot ---
  "tibialis-anterior": {
    origin: "Tibia - proximal 1/2 of anterolateral surface",
    insertion: "Base of 1st Metatarsal & Medial Cuneiform (plantar surface)",
    action: "1. Dorsiflexes the ankle\n2. Inverts the ankle & foot",
    demonstration: "1. Sit with legs hanging freely.\n2. Pull your toes/foot up towards your shin (Dorsiflexion).\n3. Turn the sole of your foot inward (Inversion).",
    tips: [
      "The 'Shin Splint' muscle.",
      "Primary dorsiflexor (lifts foot up to prevent tripping).",
      "Palpate it just lateral to your sharp shin bone (tibia)."
    ],
    clinicalConnection: "Shin Splints (Medial Tibial Stress Syndrome): Pain along the inner edge of the tibia, often involving this muscle.",
    relatedMuscles: [
      { id: "extensor-digitorum-longus", name: "Extensor digitorum longus", relation: "Synergist (Dorsiflexion)" },
      { id: "gastrocnemius", name: "Gastrocnemius", relation: "Antagonist (Plantarflexion)" }
    ]
  },
  "gastrocnemius": {
    origin: "Femur - Lateral and Medial Condyles",
    insertion: "Calcaneus via the Achilles Tendon",
    action: "1. Plantar flexion of the ankle\n2. Flexes the knee",
    demonstration: "1. Stand up.\n2. Raise your heels off the ground (tiptoes).\n3. Feel the large muscle belly on the back of your calf contract.",
    tips: [
      "The 'Calf' muscle (Belly of the leg).",
      "Crosses two joints (knee and ankle).",
      "Active in explosive movements (jumping, sprinting)."
    ],
    clinicalConnection: "Achilles Tendon Rupture: A 'pop' felt in the back of the ankle.",
    relatedMuscles: [
      { id: "soleus", name: "Soleus", relation: "Synergist (Plantarflexion)" },
      { id: "tibialis-anterior", name: "Tibialis anterior", relation: "Antagonist (Dorsiflexion)" }
    ]
  },
  "soleus": {
    origin: "Tibia - proximal shaft & Fibula - proximal shaft",
    insertion: "Calcaneus via the Achilles Tendon",
    action: "Plantar flexion of the ankle",
    demonstration: "1. Sit in a chair with knees bent at 90 degrees.\n2. Raise your heels off the ground.\n3. Because the knee is bent, the gastrocnemius is slack, isolating the Soleus.",
    tips: [
      "Shaped like a 'Sole' (flat fish).",
      "Deep to the Gastrocnemius.",
      "Does NOT cross the knee joint - isolate it by bending the knee (slackens the gastrocnemius) and pointing toes."
    ],
    clinicalConnection: "Important for posture (prevents you from falling forward while standing).",
    relatedMuscles: [
      { id: "gastrocnemius", name: "Gastrocnemius", relation: "Synergist (Plantarflexion)" }
    ]
  },
  "extensor-digitorum-longus": {
    origin: "Tibia - Lateral Condyle; Fibula - proximal 3/4; Interosseous Membrane",
    insertion: "Middle and Distal Phalanges #2-#5, dorsal surface",
    action: "1. Extends toes\n2. Dorsiflexes foot",
    demonstration: "1. Lift your four smaller toes up towards your shin.\n2. Feel the tendons activate on top of your foot.",
    tips: [
      "Lateral to the Tibialis Anterior.",
      "Split into 4 tendons on top of the foot.",
      "Works with Tibialis Anterior to dorsiflex."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "tibialis-anterior", name: "Tibialis anterior", relation: "Synergist (Dorsiflexion)" }
    ]
  },

  // --- Shoulder & Upper Arm ---
  "trapezius": {
    origin: "Occipital bone & Ligamentum Nuchae & Spinous Processes C7-T12",
    insertion: "Scapula - Spine and Acromion Process & Clavicle - lateral 3rd",
    action: "1. Extends head at neck\n2. Adducts scapulae\n3. & 4. Elevates & depresses scapula",
    demonstration: "1. Upper Fibers: Shrug your shoulders up toward your ears.\n2. Middle Fibers: Pull your shoulder blades together (retraction).\n3. Lower Fibers: Pull your shoulder blades down.",
    tips: [
      "Shaped like a 'Trapezoid' (diamond shape on back).",
      "Three distinct fiber sets: Upper (elevates/shrugs), Middle (retracts/squeezes), Lower (depresses).",
      "Major stabilizer of the shoulder girdle."
    ],
    clinicalConnection: "Upper traps often carry 'stress tension'.",
    relatedMuscles: [
      { id: "sternocleidomastoid", name: "Sternocleidomastoid", relation: "Synergist (Head Extension)" },
      { id: "latissimus-dorsi", name: "Latissimus dorsi", relation: "Posterior Back Muscle" }
    ]
  },
  "deltoid": {
    origin: "Clavicle - Lateral 3rd & Scapula - Acromion Process & Spine",
    insertion: "Humerus - Deltoid Tuberosity",
    action: "1. Flexes the shoulder\n2. Extends the shoulder\n3. Abducts the shoulder",
    demonstration: "1. Anterior: Raise arm forward.\n2. Middle: Raise arm to the side (flap wings).\n3. Posterior: Extend arm backward.",
    tips: [
      "Shaped like the Greek letter Delta (triangle).",
      "Ant/Mid/Post fibers act like 3 different muscles.",
      "Abduction > 15 degrees (Supraspinatus starts the motion, Deltoid takes over)."
    ],
    clinicalConnection: "Common site for intramuscular injections (vaccines).",
    relatedMuscles: [
      { id: "supraspinatus", name: "Supraspinatus", relation: "Synergist (Abduction)" },
      { id: "pectoralis-major", name: "Pectoralis major", relation: "Synergist (Flexion) / Antagonist (Extension)" }
    ]
  },
  "pectoralis-major": {
    origin: "Clavicle, Sternum, Costal cartilages #1-#6",
    insertion: "Humerus - Lateral margin of Intertubercular Sulcus",
    action: "1. Flexes shoulder\n2. Adducts shoulder\n3. Medially rotates shoulder",
    demonstration: "1. Hold arms out to sides.\n2. Clap hands together in front of your chest (Adduction).\n3. Push palms together to feel the chest muscles harden.",
    tips: [
      "The 'Push-up' muscle.",
      "Has a Clavicular head (upper chest) and Sternocostal head (lower chest).",
      "Insertion mnemonic: 'Lady between two majors' - Pect Major inserts on lateral lip of bicipital groove."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "deltoid", name: "Deltoid", relation: "Synergist (Flexion)" },
      { id: "latissimus-dorsi", name: "Latissimus dorsi", relation: "Antagonist (Flexion) / Synergist (Adduction)" }
    ]
  },
  "latissimus-dorsi": {
    origin: "Ilium - Iliac Crest, T7-S5 Vertebrae - Spinous Processes, Ribs #8-#12",
    insertion: "Humerus - medial margin of Intertubercular Sulcus",
    action: "1. Extends shoulder\n2. Adducts shoulder\n3. Medially rotates shoulder",
    demonstration: "1. Reach high above your head.\n2. Pull your arms down and back as if doing a pull-up.\n3. Feel the wide muscle on the sides of your back engage.",
    tips: [
      "Latissimus Dorsi = 'Widest of the Back'.",
      "The 'Handcuff Muscle' (Extension, Adduction, Medial Rotation - motion to put arms behind back).",
      "The 'Swimmer's Muscle' (pulling water stroke)."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "pectoralis-major", name: "Pectoralis major", relation: "Antagonist (Flexion) / Synergist (Adduction)" },
      { id: "teres-minor", name: "Teres major", relation: "Synergist" }
    ]
  },
  "supraspinatus": {
    origin: "Scapula - supraspinous fossa",
    insertion: "Humerus - Greater Tubercle",
    action: "Abducts arm/shoulder",
    demonstration: "1. Let arm hang by side.\n2. Initiate lifting the arm to the side (first 15 degrees only).\n3. This muscle starts the motion before the deltoid kicks in.",
    tips: [
      "Part of Rotator Cuff (SITS).",
      "Initiates abduction (first 0-15 degrees).",
      "Located 'Supra' (above) the spine of scapula."
    ],
    clinicalConnection: "Most commonly torn Rotator Cuff muscle. Impingement syndrome occurs here.",
    relatedMuscles: [
      { id: "deltoid", name: "Deltoid", relation: "Synergist (Abduction)" },
      { id: "infraspinatus", name: "Infraspinatus", relation: "Rotator Cuff Partner" }
    ]
  },
  "infraspinatus": {
    origin: "Scapula - infraspinous fossa",
    insertion: "Humerus - Greater Tubercle",
    action: "Laterally rotates arm/shoulder",
    demonstration: "1. Keep elbow tucked into side, bent at 90 degrees.\n2. Rotate hand outward (away from body).\n3. Feel the muscle on the back of the shoulder blade.",
    tips: [
      "Part of Rotator Cuff (SITS).",
      "Located 'Infra' (below) the spine of scapula.",
      "Primary external rotator."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "teres-minor", name: "Teres minor", relation: "Synergist (Lateral Rotation)" },
      { id: "subscapularis", name: "Subscapularis", relation: "Antagonist (Medial Rotation)" }
    ]
  },
  "teres-minor": {
    origin: "Scapula - lateral border",
    insertion: "Humerus - Greater Tubercle",
    action: "Laterally rotates arm/shoulder",
    demonstration: "1. Same action as Infraspinatus: Elbow at side, rotate hand outward.",
    tips: [
      "Part of Rotator Cuff (SITS).",
      "The 'Little Brother' to the Infraspinatus (does same action).",
      "Axillary nerve runs right below it."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "infraspinatus", name: "Infraspinatus", relation: "Synergist (Lateral Rotation)" },
      { id: "teres-major", name: "Teres major", relation: "Similar name, different action" }
    ]
  },
  "subscapularis": {
    origin: "Scapula - subscapular fossa",
    insertion: "Humerus - Lesser Tubercle",
    action: "Medially rotates arm/shoulder",
    demonstration: "1. Place hand behind your back (internally rotate).\n2. Try to lift your hand off your back against resistance.",
    tips: [
      "Part of Rotator Cuff (SITS).",
      "The ONLY Rotator Cuff muscle on the ANTERIOR (front) of scapula.",
      "The ONLY Rotator Cuff muscle that inserts on Lesser Tubercle."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "infraspinatus", name: "Infraspinatus", relation: "Antagonist (Lateral Rotation)" },
      { id: "pectoralis-major", name: "Pectoralis major", relation: "Synergist (Medial Rotation)" }
    ]
  },

  // --- Trunk Movement ---
  "rectus-abdominis": {
    origin: "Pubis bone - Pubic Crest and Pubic Symphysis",
    insertion: "Costal Cartilage of ribs #5-#7 & Xiphoid Process",
    action: "Flexes vertebral column & trunk",
    demonstration: "1. Perform a 'crunch' motion, bringing rib cage toward pelvis.\n2. Feel the ridges of the 'six-pack' contract.",
    tips: [
      "The 'Six Pack' muscle.",
      "Fibers run vertically (Rectus = Straight).",
      "Separated by tendinous intersections (giving the 6-pack look) and linea alba down middle."
    ],
    clinicalConnection: "Diastasis Recti: Separation of left/right sides, common after pregnancy.",
    relatedMuscles: [
      { id: "external-oblique", name: "External oblique", relation: "Synergist (Flexion)" },
      { id: "erector-spinae", name: "Erector spinae", relation: "Antagonist (Extension)" }
    ]
  },
  "external-oblique": {
    origin: "Ribs #5-#12",
    insertion: "Linea Alba, Pubic Crest & Iliac Crest",
    action: "1. Flexes vertebral column & trunk\n2. Rotates trunk\n3. Compresses abdominal wall",
    demonstration: "1. Twist your torso to the opposite side.\n2. Feel the muscle on the side of your ribs contract.",
    tips: [
      "Fibers run 'Hands in Pockets' direction (Down and In).",
      "Largest and most superficial of lateral abs.",
      "Rotation: Turns trunk to OPPOSITE side."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "internal-oblique", name: "Internal oblique", relation: "Synergist (Rotation/Flexion)" },
      { id: "rectus-abdominis", name: "Rectus abdominis", relation: "Synergist (Flexion)" }
    ]
  },
  "internal-oblique": {
    origin: "Inguinal Ligament, Iliac Crest & Lumbar Fascia",
    insertion: "Linea Alba, Pubic Crest, Ribs #8-#12",
    action: "1. Flexes vertebral column & trunk\n2. Rotates trunk\n3. Compresses abdominal wall",
    demonstration: "1. Twist your torso to the SAME side.\n2. Located deep to the external oblique.",
    tips: [
      "Fibers run Perpendicular to External Oblique (Up and In).",
      "Rotation: Turns trunk to SAME side.",
      "Middle layer of lateral abdominal wall."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "external-oblique", name: "External oblique", relation: "Synergist (Rotation/Flexion)" }
    ]
  },
  "transverse-abdominis": {
    origin: "Inguinal Ligament, Iliac Crest & Cartilages #6-#12",
    insertion: "Linea Alba, Pubic Crest",
    action: "Compresses abdomen",
    demonstration: "1. Exhale completely.\n2. 'Suck in' your stomach/navel towards your spine.",
    tips: [
      "The 'Corset Muscle'.",
      "Deepest abdominal layer.",
      "Fibers run horizontally (Transverse). Essential for core stability and forced expiration (coughing/sneezing)."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "rectus-abdominis", name: "Rectus abdominis", relation: "Core Stabilizer" }
    ]
  },
  "erector-spinae": {
     origin: "Iliac Crest, Sacrum, Lumbar spinous processes",
     insertion: "Ribs and cervical vertebrae",
     action: "Extends vertebral column",
     demonstration: "1. Lie face down.\n2. Lift your chest off the floor (Supermans).\n3. Feel the cords running parallel to your spine.",
     tips: [
         "Mnemonic: 'I Love Spaghetti' (Lateral to Medial columns): Iliocostalis, Longissimus, Spinalis.",
         "Main antagonist to Rectus Abdominis.",
         "Maintains posture."
     ],
     clinicalConnection: "Common source of lower back pain/spasms.",
     relatedMuscles: [
         { id: "rectus-abdominis", name: "Rectus abdominis", relation: "Antagonist (Flexion)" }
     ]
  },

  // --- Hip ---
  "iliacus": {
    origin: "Ilium - Iliac Fossa",
    insertion: "Femur - Lesser Trochanter",
    action: "Flexes the hip/thigh",
    demonstration: "1. Lift your knee towards your chest (Hip Flexion).",
    tips: [
      "Fills the 'bowl' of the pelvis.",
      "Joins with Psoas Major to form 'Iliopsoas'.",
      "Primary hip flexor."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "psoas-major", name: "Psoas major", relation: "Synergist (Hip Flexion)" },
      { id: "rectus-femoris", name: "Rectus femoris", relation: "Synergist (Hip Flexion)" }
    ]
  },
  "psoas-major": {
    origin: "T12-L5 Bodies & Vertebrae",
    insertion: "Femur - Lesser Trochanter",
    action: "Flexes the hip/thigh",
    demonstration: "1. Lift your knee towards your chest.",
    tips: [
      "Filet Mignon of the human body (anatomically analogous).",
      "Originates from the spine, passes through pelvis to leg.",
      "Tightness can cause lordosis (swayback) and lower back pain."
    ],
    clinicalConnection: "Psoas Abscess: Infection spreading from lumbar vertebrae.",
    relatedMuscles: [
      { id: "iliacus", name: "Iliacus", relation: "Synergist (Hip Flexion)" }
    ]
  },
  "gluteus-maximus": {
    origin: "Ilium - posterior gluteal line, Sacrum, Coccyx",
    insertion: "Femur - Gluteal Tuberosity & Iliotibial Tract",
    action: "1. Extends the hip/thigh\n2. Laterally rotates the hip/thigh",
    demonstration: "1. Stand and kick your leg backward.\n2. Squeeze your buttocks.",
    tips: [
      "Largest muscle in the body by volume.",
      "Powerful extensor (climbing stairs, standing from chair).",
      "Inactive during standing, active during running/climbing."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "biceps-femoris", name: "Biceps femoris", relation: "Synergist (Extension)" },
      { id: "iliacus", name: "Iliacus", relation: "Antagonist (Flexion)" }
    ]
  },
  "gluteus-medius": {
    origin: "Ilium - posterior surface",
    insertion: "Femur - Greater Trochanter",
    action: "1. Abducts the hip/thigh\n2. Medially rotates the hip/thigh",
    demonstration: "1. Stand and lift your leg out to the side (Abduction).\n2. Palpate the side of your hip.",
    tips: [
      "The 'Hip Stabilizer'.",
      "Prevents pelvis from dropping when walking (Trendelenburg sign).",
      "Injection site: Upper Outer Quadrant (to avoid Sciatic nerve)."
    ],
    clinicalConnection: "Trendelenburg Gait: Dropping of pelvis on unsupported side due to weak Glute Medius.",
    relatedMuscles: [
      { id: "tensor-fasciae-latae", name: "Tensor fasciae latae", relation: "Synergist (Abduction)" },
      { id: "adductor-longus", name: "Adductor longus", relation: "Antagonist (Adduction)" }
    ]
  },
  "piriformis": {
    origin: "Sacrum (anterior)",
    insertion: "Femur - Greater Trochanter",
    action: "1. Abducts the hip/thigh\n2. Laterally rotates the hip/thigh",
    demonstration: "1. Sit with legs crossed (ankle on opposite knee).\n2. This stretches the piriformis deep in the buttock.",
    tips: [
      "Pear-shaped muscle.",
      "Key landmark: Sciatic nerve usually runs just below it.",
      "External rotator of hip."
    ],
    clinicalConnection: "Piriformis Syndrome: Tightness compresses Sciatic nerve, mimicking Sciatica.",
    relatedMuscles: [
      { id: "gluteus-maximus", name: "Gluteus maximus", relation: "Synergist (Lateral Rotation)" }
    ]
  },
  "tensor-fasciae-latae": {
    origin: "Ilium - anterior aspect of Iliac Crest & ASIS",
    insertion: "Tibia - via the Iliotibial Tract",
    action: "1. Abducts the hip/thigh\n2. Rotates hip/thigh medially",
    demonstration: "1. Stand on one leg.\n2. Feel the muscle tense on the outer hip near your pocket.",
    tips: [
      "TFL = 'Tensor' (tightener) of 'Fascia Lata' (side thigh fascia).",
      "Connects to the IT Band.",
      "Helps lock the knee in extension."
    ],
    clinicalConnection: "IT Band Syndrome: Friction/pain at lateral knee, often linked to TFL tightness.",
    relatedMuscles: [
      { id: "gluteus-medius", name: "Gluteus medius", relation: "Synergist (Abduction)" }
    ]
  },
  "sartorius": {
    origin: "Ilium - Anterior Superior Iliac Spine (ASIS)",
    insertion: "Tibia - medial surface of proximal tibia",
    action: "1. Flexes the hip/thigh\n2. Flexes the knee\n3. Externally rotates the hip/thigh\n4. Abducts the hip/thigh",
    demonstration: "1. Sit down and cross one leg over the other so your ankle rests on your knee (Tailor sit).\n2. This combines Flexion, Abduction, and External Rotation (FABER).",
    tips: [
      "Longest muscle in the body.",
      "The 'Tailor's Muscle' (Latin 'Sartor' = Tailor) - positions leg to sit cross-legged.",
      "Crosses from lateral hip to medial knee (S-shape)."
    ],
    clinicalConnection: "Part of the 'Pes Anserinus' (Goose's Foot) insertion on tibia.",
    relatedMuscles: [
      { id: "gracilis", name: "Gracilis", relation: "Pes Anserinus Group" },
      { id: "semitendinosus", name: "Semitendinosus", relation: "Pes Anserinus Group" }
    ]
  },
  "gracilis": {
    origin: "Pubis - near Pubic Symphysis",
    insertion: "Tibia - medial surface of proximal tibia",
    action: "1. Adducts the hip/thigh\n2. Medially rotates the hip/thigh\n3. Flexes the knee",
    demonstration: "1. Stand and squeeze legs together.\n2. Feel the cord-like tendon on the very inner thigh.",
    tips: [
      "The 'Groin' muscle strap.",
      "Most medial muscle of the thigh.",
      "Part of Pes Anserinus insertion."
    ],
    clinicalConnection: "Groin Pull: Often involves the adductor muscles like Gracilis.",
    relatedMuscles: [
      { id: "adductor-longus", name: "Adductor longus", relation: "Synergist (Adduction)" },
      { id: "sartorius", name: "Sartorius", relation: "Pes Anserinus Group" }
    ]
  },
  "adductor-longus": {
    origin: "Pubis - near Pubic Symphysis",
    insertion: "Femur - Linea Aspera",
    action: "1. Adducts the hip/thigh\n2. Medially rotates the hip/thigh",
    demonstration: "1. Squeeze your knees together against resistance (like a ball).",
    tips: [
      "Fan-shaped muscle in the inner thigh.",
      "Palpable tendon near the pubic bone.",
      "Part of the Adductor Group (Brevis, Longus, Magnus)."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "gracilis", name: "Gracilis", relation: "Synergist (Adduction)" },
      { id: "gluteus-medius", name: "Gluteus medius", relation: "Antagonist (Abduction)" }
    ]
  },

  // --- Anterior Thigh (Quadriceps) ---
  "rectus-femoris": {
    origin: "Ilium - Anterior Inferior Iliac Spine (AIIS)",
    insertion: "Patella & Tibia - Tibial Tuberosity (via Patellar tendon)",
    action: "1. Extends the knee\n2. Flexes the hip",
    demonstration: "1. Kick your leg out straight (knee extension).\n2. Lift your straight leg up towards the ceiling (hip flexion).",
    tips: [
      "The ONLY Quad muscle that crosses the hip joint.",
      "Rectus = Straight (runs straight down thigh).",
      "The 'Kicking Muscle'."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "vastus-lateralis", name: "Vastus lateralis", relation: "Synergist (Knee Extension)" },
      { id: "iliacus", name: "Iliacus", relation: "Synergist (Hip Flexion)" }
    ]
  },
  "vastus-lateralis": {
    origin: "Femur - greater trochanter & Linea Aspera",
    insertion: "Patella & Tibia - Tibial Tuberosity",
    action: "Extends the leg at the knee",
    demonstration: "1. Straighten your knee.\n2. Feel the large muscle on the outer part of your thigh.",
    tips: [
      "Largest head of the Quadriceps.",
      "Lateral side of thigh.",
      "Site for infant vaccinations."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "rectus-femoris", name: "Rectus femoris", relation: "Synergist (Knee Extension)" },
      { id: "biceps-femoris", name: "Biceps femoris", relation: "Antagonist (Knee Flexion)" }
    ]
  },
  "vastus-medialis": {
    origin: "Femur - medial edge of Linea Aspera",
    insertion: "Patella & Tibia - Tibial Tuberosity",
    action: "Extends the leg at the knee",
    demonstration: "1. Straighten your knee completely.\n2. Feel the teardrop-shaped muscle on the inner thigh, just above the knee.",
    tips: [
      "The 'Teardrop' muscle just above the knee.",
      "Important for patellar tracking (pulls patella medially).",
      "Active in the last 15 degrees of extension."
    ],
    clinicalConnection: "Weakness causes Patellofemoral Pain Syndrome (runner's knee).",
    relatedMuscles: [
      { id: "vastus-lateralis", name: "Vastus lateralis", relation: "Synergist (Knee Extension)" }
    ]
  },
  "vastus-intermedius": {
    origin: "Femur - anterior and lateral shaft",
    insertion: "Patella & Tibia - Tibial Tuberosity",
    action: "Extends the leg at the knee",
    demonstration: "1. Straighten knee.\n2. Cannot be felt directly as it is deep to Rectus Femoris.",
    tips: [
      "Hidden deep to the Rectus Femoris.",
      "Wraps around the femur shaft.",
      "Pure knee extensor."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "rectus-femoris", name: "Rectus femoris", relation: "Synergist (Knee Extension)" }
    ]
  },

  // --- Posterior Thigh (Hamstrings) ---
  "biceps-femoris": {
    origin: "Ischium - Ischial Tuberosity & Femur - Linea Aspera",
    insertion: "Fibula - Head & Tibia - Lateral Condyle",
    action: "1. Flexes the knee\n2. Extends the hip",
    demonstration: "1. Stand and curl your heel towards your buttock (knee flexion).\n2. Feel the tendon on the OUTER back of the knee.",
    tips: [
      "Lateral Hamstring.",
      "Two heads (Long and Short). Short head only flexes knee.",
      "Ischial Tuberosity origin = 'Sit Bones'."
    ],
    clinicalConnection: "Hamstring strains often occur here during sprinting deceleration.",
    relatedMuscles: [
      { id: "semitendinosus", name: "Semitendinosus", relation: "Synergist" },
      { id: "rectus-femoris", name: "Rectus femoris", relation: "Antagonist (Knee Extension/Hip Flexion)" }
    ]
  },
  "semitendinosus": {
    origin: "Ischium - Ischial Tuberosity",
    insertion: "Tibia - Medial surface of proximal shaft",
    action: "1. Flexes the knee\n2. Extends the hip",
    demonstration: "1. Curl heel to buttock.\n2. Feel the distinct cord-like tendon on the INNER back of the knee.",
    tips: [
      "Medial Hamstring.",
      "Semi-TENDIN-osus = Long Tendon (looks like a whip).",
      "Sits on top of Semimembranosus."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "biceps-femoris", name: "Biceps femoris", relation: "Synergist" },
      { id: "sartorius", name: "Sartorius", relation: "Pes Anserinus Group" }
    ]
  },
  "semimembranosus": {
    origin: "Ischium - Ischial Tuberosity",
    insertion: "Tibia - Medial Condyle",
    action: "1. Flexes the knee\n2. Extends the hip",
    demonstration: "1. Curl heel to buttock.\n2. Located deep to Semitendinosus on the medial side.",
    tips: [
      "Medial Hamstring.",
      "Semi-MEMBRAN-osus = Wide Membrane (flat shape).",
      "Deep to Semitendinosus."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "semitendinosus", name: "Semitendinosus", relation: "Synergist" }
    ]
  }
};
