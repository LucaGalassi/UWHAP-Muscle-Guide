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
    appBg: 'bg-blue-50',
    cardBg: 'bg-white/90 backdrop-blur-sm',
    text: 'text-slate-900',
    subText: 'text-slate-600',
    border: 'border-blue-300',
    accent: 'bg-gradient-to-r from-sky-500 to-blue-500',
    badge: 'bg-blue-100 text-blue-800 border-blue-300 shadow',
    infoBox: 'bg-blue-50 border-blue-300 text-slate-800',
    iconLoc: 'bg-blue-100 text-blue-700',
    iconFunc: 'bg-sky-100 text-sky-700',

    // Sidebar
    sidebarBg: 'bg-white/95 backdrop-blur-sm',
    sidebarBorder: 'border-blue-300',
    sidebarText: 'text-slate-900',
    sidebarSubText: 'text-slate-600',
    sidebarHover: 'hover:bg-blue-50',
    sidebarActive: 'bg-blue-100 text-blue-800 border border-blue-300',
    inputBg: 'bg-blue-50',

    // Blobs
    blobColor1: 'bg-blue-200',
    blobColor2: 'bg-sky-200',
    blobOpacity: 'opacity-30',
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
    ],
    memoryTips: {
      mnemonic: "\"Bi-CEPS, Bi-JOBS\" - Two heads (Bi-ceps) doing two main jobs: Flexion & Supination. Think of opening a bottle: twist the cap (supinate) then pull it out (flex).",
      originTip: "\"Crow's Beak & Socket\" - Short head from Coracoid (crow's beak shape), Long head from Glenoid (the socket). Both on the SCAPULA.",
      insertionTip: "\"Biceps Rides the Radius\" - Inserts on Radial Tuberosity. Remember: both start with 'R' and the biceps pulls the radius to supinate.",
      actionTip: "\"Flex, Spin, Lift\" - Flexes elbow, Supinates forearm (soup bowl), assists shoulder Flexion. Think: holding a bowl of soup while bringing it to your mouth.",
      demonstrationTip: "Show the classic 'flex' pose (elbow flexion), then turn palm up like holding soup (supination). Two moves, two actions."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Brachialis = The BRUTE\" - Pure, powerful flexor. No fancy rotations, just raw strength. The workhorse hiding under the biceps.",
      originTip: "\"Hugging the Humerus\" - Anterior distal half of humerus. It wraps around the front bottom of the upper arm bone.",
      insertionTip: "\"U-lna for U-nique\" - Inserts on Ulna (Coronoid Process). Since it's on the ulna, it can ONLY flex (no rotation possible).",
      actionTip: "\"One Job Wonder\" - Only flexes the elbow. Unlike biceps, it can't supinate because it's attached to the ulna, not radius.",
      demonstrationTip: "Palm DOWN (pronated) to take biceps out of play, then flex. Feel the sides of your lower upper arm bulge - that's the brachialis working."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Beer muscle\" - Best position for flexing is thumbs up, like holding a beer mug. Brachioradialis = Beer-achioradialis!",
      actionTip: "\"Neutral Flexor\" - Strongest when hand is in neutral (handshake) position. It's the bridge muscle between arm and forearm flexors."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"TRI-ceps = THREE heads, ONE job\" - Long, Lateral, Medial heads all work together to extend. Remember: 3 heads, 1 action (extension).",
      originTip: "\"Long from Low, Two from the Bone\" - Long head from scapula (infraglenoid tubercle - below socket), Lateral & Medial heads from humerus.",
      insertionTip: "\"Funny Bone Connection\" - Inserts on Olecranon (that bony point of your elbow). Hit it and you feel the ulnar nerve - the 'funny bone'!",
      actionTip: "\"Opposite of Biceps\" - Triceps Extends, Biceps Flexes. Think of pushing vs pulling.",
      demonstrationTip: "Push-up motion or straighten arm behind you. Feel the horseshoe shape on back of arm harden."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Pass the Taters\" - Pronator Teres. Passing motion (palm down) = pronation. Teres sounds like 'taters' (potatoes)!",
      actionTip: "\"Palm Down = Pronation\" - Remember: ProNation = Palm dowN. You're 'pro' at putting your palm down!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"SUPinator = SOUP bowl\" - Hold a bowl of SOUP, palm UP = SUPination. Don't spill your soup!",
      actionTip: "\"SUP-inate = Palm UP\" - The word itself tells you: SUP = UP. SUPinator turns palm UP to hold SUP (soup)."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"ORbicularis ORIS = ORAL circle\" - Circular muscle around the ORAL opening. Think: O for circular, ORIS for mouth!",
      actionTip: "\"Kiss, Whistle, Pucker\" - All the things you do with pursed lips. Think of making an 'O' shape with your mouth."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"ORbicularis OCULI = OCULAR circle\" - Circular muscle around the EYE (ocular). O for circle, OCULI for eye!",
      actionTip: "\"Wink & Squint\" - This muscle does both! Gentle close = blink, forceful = squint/wink."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Zygo = Yoke (cheekbone), Smile from Cheek\" - The zygomatic bone is your cheekbone. This muscle pulls mouth corners UP to cheek = SMILE!",
      actionTip: "\"Cheek-to-Cheek Smile\" - Pulls mouth corners up toward cheekbones. Big genuine smile = Duchenne smile = Zygomaticus in action!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"FRONT-alis on the FRONT\" - Located on the FRONTal bone = forehead. Makes forehead wrinkles when surprised!",
      actionTip: "\"Surprise Face!\" - Raises eyebrows = surprise expression. Botox's #1 target for those forehead lines!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Platypus PLATYSMA\" - Makes a pouty platypus face! Pulls corners of mouth DOWN and tenses neck skin.",
      actionTip: "\"Grimace & Tense\" - Depression of jaw/mouth corners + neck tensing. Make a 'yuck' face - that's platysma!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"MASSETER = MASSIVE chewer\" - One of the strongest muscles pound-for-pound! Clench jaw = feel the MASSIVE masseter bulge.",
      originTip: "\"Cheek to Jaw\" - From Zygomatic arch (cheekbone) down to mandible angle. Think: from cheek to chew!",
      insertionTip: "\"Angle of the Jaw\" - Feel below your ear at the corner of your jaw - that's where masseter inserts on mandible's ramus and angle.",
      actionTip: "\"CLENCH = Elevate\" - Elevates mandible = closes jaw = CLENCH. The power-biter muscle!",
      demonstrationTip: "Clench teeth hard and feel the bulge at jaw angle. The harder you clench, the more it pops out!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"TEMPORALIS at your TEMPLES\" - Fan-shaped muscle at your temples! Clench and feel it at your temples.",
      actionTip: "\"Close & Pull Back\" - Elevates (closes) AND retracts (pulls back) mandible. Two jobs: bite down and pull jaw back."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"SCM = The muscle name IS the attachment!\" - Sterno (sternum) + Cleido (clavicle) + Mastoid (mastoid process). The name tells you everything!",
      originTip: "\"SC = Sterno-Cleido\" - Origin from Sternum (manubrium) and Clavicle. Two origins at the front of neck base.",
      insertionTip: "\"M = Mastoid\" - Inserts on Mastoid process (behind ear). Feel the bump behind your ear - that's where SCM attaches!",
      actionTip: "\"Opposite Turn, Same Flex\" - Turn RIGHT, LEFT SCM pops out (opposite side). Both together = flex neck (chin to chest).",
      demonstrationTip: "Turn head LEFT → see RIGHT SCM pop out as a diagonal cord on neck. Remember: opposite side muscle does the turning!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Flexor-CARPI-RADIALIS = Flex wrist, tilt to RADIUS (thumb) side\" - CARPI = wrist, RADIALIS = radial/thumb side. Flexes & abducts (radial deviation).",
      originTip: "\"Medial Epicondyle = Flexor Home\" - All wrist flexors originate from medial epicondyle. Think: M for Medial, M for (the middle/inner elbow bump).",
      insertionTip: "\"2nd & 3rd Metacarpals\" - Thumb-side metacarpals. The tendon is where you feel your radial pulse!",
      actionTip: "\"Flex & Thumb-Tilt\" - Flexes wrist AND tilts hand toward thumb (radial deviation/abduction).",
      demonstrationTip: "Flex wrist (palm toward forearm) + tilt toward thumb. Feel the tendon pop up on the thumb-side of your wrist."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Flexor-CARPI-ULNARIS = Flex wrist, tilt to ULNA (pinky) side\" - ULNARIS = ulnar/pinky side. Flexes & adducts (ulnar deviation).",
      originTip: "\"Medial Epicondyle + Ulna\" - Starts at medial epicondyle AND wraps around ulna. Two-headed origin.",
      insertionTip: "\"Pisiform, Hamate, 5th MC\" - Three pinky-side bones! Think: PHP (Pisiform, Hamate, 5th metacarPal).",
      actionTip: "\"Flex & Pinky-Tilt\" - Flexes wrist AND tilts hand toward pinky (ulnar deviation/adduction).",
      demonstrationTip: "Flex wrist + tilt toward pinky. Feel the tendon on the pinky-side of your wrist near the pisiform bone."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Extensor-CARPI-RADIALIS = Extend wrist, tilt to RADIUS (thumb) side\" - Extends & abducts to thumb side.",
      originTip: "\"Lateral Epicondyle = Extensor Home (Tennis Elbow spot)\" - All wrist extensors from lateral epicondyle. L for Lateral, L for 'Let it extend'.",
      insertionTip: "\"2nd & 3rd Metacarpals (dorsal)\" - Same metacarpals as FCR but on the BACK (dorsal) of hand.",
      actionTip: "\"Extend & Thumb-Tilt\" - Extends wrist AND tilts hand toward thumb. Works WITH FCR for thumb-side deviation.",
      demonstrationTip: "Cock your wrist back (extension) + tilt toward thumb. Key muscle for gripping - stabilizes wrist for power grip."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Extensor-CARPI-ULNARIS = Extend wrist, tilt to ULNA (pinky) side\" - Extends & adducts to pinky side.",
      originTip: "\"Lateral Epicondyle\" - Even though it goes to ulnar side, it starts at lateral epicondyle like all extensors.",
      insertionTip: "\"5th Metacarpal (dorsal)\" - Pinky metacarpal, back of hand. Opposite corner from ECR.",
      actionTip: "\"Extend & Pinky-Tilt\" - Extends wrist AND tilts hand toward pinky. Works WITH FCU for pinky-side deviation.",
      demonstrationTip: "Extend wrist + tilt toward pinky. Feel the tendon on the back of wrist near the pinky side."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Extensor DIGITORUM = Extends DIGITS (fingers)\" - DIGITORUM = digits/fingers. Opens the hand and extends all 4 fingers!",
      actionTip: "\"Wave Goodbye\" - Extend fingers to wave. Those visible tendons on the back of your hand = extensor digitorum!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"TIBIALIS ANTERIOR = Front of TIBIA, pulls foot ANTERIOR (up)\" - Located on the ANTERIOR (front) of tibia, pulls foot up (dorsiflexion)!",
      originTip: "\"Upper Half of Shin\" - Proximal 1/2 of tibia's front-outer surface. Feel the muscle belly next to your shin bone.",
      insertionTip: "\"Big Toe Side\" - 1st Metatarsal & Medial Cuneiform = big toe side of foot. Pulls foot up AND in.",
      actionTip: "\"Toe-Up & Turn-In\" - Dorsiflexes (toes up toward shin) + Inverts (sole faces inward). Think: lifting foot to avoid tripping.",
      demonstrationTip: "Pull foot up toward shin (dorsiflexion) + turn sole inward (inversion). Feel the muscle pop out next to your shin bone."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"GASTRO = Belly (of the leg)\" - The muscle that gives your calf its shape! Greek 'gaster' = belly. It's the 'belly' of your leg.",
      originTip: "\"Two Heads from Femur\" - Medial and Lateral condyles of femur (above knee). Crosses the knee joint!",
      insertionTip: "\"Achilles = Heel\" - Via famous Achilles tendon to calcaneus (heel bone). Strongest tendon in the body!",
      actionTip: "\"Tiptoe & Knee Bend\" - Plantarflexes ankle (point toes/tiptoe) + flexes knee (because it crosses both joints).",
      demonstrationTip: "Rise up on tiptoes - that's gastrocnemius power! Feel the two muscle bellies bulge in your calf."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"SOLEUS = SOLE (flat fish)\" - Flat fish-shaped muscle deep to gastrocnemius. SOLEUS rhymes with 'sole-eus' = sole of foot pusher!",
      originTip: "\"Below the Knee\" - From proximal tibia & fibula (NOT femur). Doesn't cross knee = can't flex knee.",
      insertionTip: "\"Same Achilles Tendon\" - Joins gastrocnemius to insert on calcaneus via Achilles. Together = triceps surae.",
      actionTip: "\"Ankle Only\" - Only plantarflexes ankle. No knee action (doesn't cross knee joint like gastrocnemius).",
      demonstrationTip: "Sit with knee bent (slackens gastrocnemius), then point toes. That's pure soleus working!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"EXTENSOR DIGITORUM LONGUS = Long toe Extender\" - Extends the DIGITS (toes) + helps with dorsiflexion. LONGUS = it's the long one!",
      actionTip: "\"Toes Up, Foot Up\" - Extends toes 2-5 AND assists dorsiflexion. Visible tendons fan out on top of foot."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"TRAP-ezius = TRAP-ezoid shaped\" - Diamond/trapezoid shape on your upper back. The 'shrugging' muscle!",
      originTip: "\"Skull to Mid-Back\" - From occipital bone down to T12. Long muscle covering upper back like a cape!",
      insertionTip: "\"Shoulder Blade & Collarbone\" - Scapular spine, acromion, and lateral clavicle. Controls the shoulder blade!",
      actionTip: "\"Three Fibers, Three Jobs\" - Upper = shrug UP, Middle = squeeze BACK (retract), Lower = pull DOWN. Remember: U-M-L = Up-Middle-Low.",
      demonstrationTip: "Shrug shoulders (upper), squeeze shoulder blades together (middle), pull shoulders down (lower). Three demos for three fiber groups!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"DELTOID = DELTA (Δ) triangle\" - Triangle-shaped shoulder cap. Three parts do three things!",
      originTip: "\"Collarbone to Shoulder Blade\" - Lateral clavicle + acromion + scapular spine. Wraps around shoulder joint like a shoulder pad.",
      insertionTip: "\"Deltoid Tuberosity\" - Halfway down the lateral humerus. The muscle 'bump' you can feel on outer arm.",
      actionTip: "\"Front-Side-Back\" - Anterior flexes (forward), Middle abducts (sideways), Posterior extends (backward). Like a compass!",
      demonstrationTip: "Raise arm forward (flex), sideways (abduct), backward (extend). Three separate moves for three deltoid parts!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"PEC MAJOR = Push-up MAJOR\" - The main chest muscle for pushing. Does the heavy lifting!",
      originTip: "\"Collarbone-Breastbone-Ribs\" - Clavicle + Sternum + Ribs 1-6. Wide origin = powerful muscle!",
      insertionTip: "\"Bicipital Groove (Lateral lip)\" - Lateral side of intertubercular sulcus. Remember: Pec MAJOR = Lateral lip (both end in 'al').",
      actionTip: "\"FAM - Flex, Adduct, Medially rotate\" - Brings arm forward (flex), across chest (adduct), and rotates inward.",
      demonstrationTip: "Push-up motion or clap hands together in front. Feel chest harden = pec major engaging!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"LATISSIMUS DORSI = Widest of the Back\" - Latin: latissimus = widest, dorsi = back. Biggest back muscle!",
      originTip: "\"Half the Back\" - From iliac crest up to T7, plus lower ribs. Massive origin = massive muscle!",
      insertionTip: "\"Bicipital Groove (Medial lip)\" - Medial side of intertubercular sulcus. Lat = Medial lip (opposite of pec major!).",
      actionTip: "\"EAM - Extend, Adduct, Medially rotate\" - Pull arm back, across, and rotate in. Think: pull-up motion or handcuff position.",
      demonstrationTip: "Do a pull-up motion (or lat pull-down). Feel the 'wings' on your sides engage. That's the lats!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"SUPRA-spinatus = ABOVE the spine, starts abduction\" - SUPRA = above. Located above scapular spine. Starts the arm lift!",
      actionTip: "\"The Starter\" - Initiates abduction (first 15°), then deltoid takes over. Think: ignition key that starts the car!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"INFRA-spinatus = Below the spine, rotates OUT\" - INFRA = below (infrared is below red). External rotator!",
      actionTip: "\"Door Opening Motion\" - Laterally rotates (externally rotates) the arm. Think: elbow at side, opening a door outward."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"TERES MINOR = Infraspinatus's little helper\" - MINOR = small. Does same job as infraspinatus (lateral rotation). The SITS sidekick!",
      actionTip: "\"Same as Infraspinatus\" - Lateral rotation. Two muscles, same job. Teres minor is the backup external rotator."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"SUB-scapularis = UNDER the scapula, rotates IN\" - SUB = under/below. Only rotator cuff on FRONT. Internal rotator!",
      actionTip: "\"The Odd One Out\" - ONLY rotator cuff that medially rotates. ONLY one on front of scapula. ONLY one on Lesser tubercle. Triple unique!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"RECTUS = Straight, ABDOMINIS = Abdomen\" - Straight muscle down your abdomen = six-pack! Runs straight up and down.",
      originTip: "\"Pubis to Ribs\" - From pubic bone UP to lower ribs. Think: from 'P' (pubis) pulling up to 'R' (ribs).",
      insertionTip: "\"Ribs 5-7 + Xiphoid\" - Attaches to lower ribs and the sword-shaped xiphoid process at bottom of sternum.",
      actionTip: "\"Crunch = Trunk Flexion\" - Brings ribs toward pelvis. The muscle behind sit-ups and crunches!",
      demonstrationTip: "Do a crunch/sit-up. Feel the six-pack ridges harden as you bring chest toward knees."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"EXTERNAL oblique = Hands in Pockets\" - Fibers run like putting hands in front pockets (down and in). Most superficial = EXTERNAL.",
      actionTip: "\"Twist to OPPOSITE\" - Turns trunk to OPPOSITE side. Right external oblique turns you LEFT."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"INTERNAL oblique = Up and In (opposite of external)\" - Fibers perpendicular to external. Deep = INTERNAL.",
      actionTip: "\"Twist to SAME side\" - Turns trunk to SAME side. Right internal oblique turns you RIGHT. Opposite of external!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"TRANSVERSE = Across (horizontal fibers)\" - Fibers run horizontally like a corset/belt. The deepest ab muscle!",
      actionTip: "\"The Corset\" - Compresses abdomen like tightening a corset. Suck in your belly = transverse abdominis!"
    }
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
     ],
     memoryTips: {
       mnemonic: "\"ERECTOR SPINAE = Erects the Spine\" - Makes you stand upright! Antagonist to rectus abdominis (flexion vs extension).",
       actionTip: "\"I Love Spaghetti\" - The three columns: Iliocostalis (lateral), Longissimus (middle), Spinalis (medial). ILS = I Love Spaghetti!"
     }
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
    ],
    memoryTips: {
      mnemonic: "\"ILIACUS fills the ILIAC fossa\" - Named after where it lives! The bowl-shaped fossa on inner pelvis.",
      originTip: "\"Fills the Bowl\" - Iliac Fossa is the 'bowl' of your pelvis. Iliacus fills that concave space.",
      insertionTip: "\"Lesser Trochanter Twins\" - Both Iliacus and Psoas insert on Lesser Trochanter = Iliopsoas!",
      actionTip: "\"Knee to Chest\" - Pure hip flexion. Part of the iliopsoas powerhouse!",
      demonstrationTip: "Lift knee toward chest (marching motion). That's iliacus (with psoas) pulling your thigh up."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"PSOAS = The Filet Mignon\" - In cows, this muscle is the tenderloin/filet mignon. The delicious hip flexor!",
      originTip: "\"Spine to Hip\" - Only muscle connecting spine directly to leg! From T12-L5 down to femur.",
      insertionTip: "\"Lesser Trochanter (with Iliacus)\" - They merge to form iliopsoas and share insertion.",
      actionTip: "\"The Deep Hip Flexor\" - Pulls from spine, through pelvis, to flex hip. Tight psoas = swayback posture!",
      demonstrationTip: "Lift knee to chest. Psoas is deep - you can't palpate it, but it's the engine of hip flexion."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Gluteus MAXIMUS = MAXIMUM size\" - Biggest muscle in the body! The power behind standing up and climbing.",
      originTip: "\"Back of Pelvis\" - From ilium (posterior), sacrum, and coccyx. Covers the whole rear of the hip.",
      insertionTip: "\"Gluteal Tuberosity + IT Band\" - Dual insertion = powerful extension AND lateral stability via IT band.",
      actionTip: "\"Stand Up & Rotate Out\" - Extends hip (stand from sitting, climb stairs) + lateral rotation.",
      demonstrationTip: "Squeeze your glutes / kick leg backward. Glute max does the heavy lifting when you stand up!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Gluteus MEDIUS = MIDDLE glute\" - Between maximus (superficial) and minimus (deep). The hip stabilizer!",
      originTip: "\"Side of Ilium\" - Outer/posterior surface of ilium. Sits on the side of your hip.",
      insertionTip: "\"Greater Trochanter\" - That bony bump on the side of your hip. Injection site landmark!",
      actionTip: "\"Abduct & Stabilize\" - Lifts leg sideways + prevents pelvis drop when walking (Trendelenburg test!).",
      demonstrationTip: "Lift leg out to side (abduction). Feel the muscle on the side of your hip engage."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"PIRIFORMIS = PEAR-shaped\" - Latin 'pirum' = pear. Pear-shaped muscle deep in buttock. Sciatic nerve runs nearby!",
      actionTip: "\"Rotate Out (Lateral)\" - External rotator of hip. When tight, can compress sciatic nerve = 'Piriformis Syndrome'."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"TFL = Tightens Fascia on the Lateral thigh\" - Tensor (tightens) the Fascia Lata (broad band on outer thigh) = IT Band!",
      actionTip: "\"Abduct & Medially Rotate\" - Lifts leg sideways + rotates thigh inward. Connected to IT band = knee stability too."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"SARTORIUS = TAILOR's muscle\" - Latin 'sartor' = tailor. Cross-legged sitting position (how tailors sat) = FABER!",
      originTip: "\"ASIS = Anterior Superior Iliac Spine\" - The bony point on front of hip you can feel. Sartorius starts here!",
      insertionTip: "\"Pes Anserinus (Goose's Foot)\" - Shares insertion with Gracilis & Semitendinosus. 'Say Grace before Tea' = Sartorius, Gracilis, Semitendinosus!",
      actionTip: "\"FABER\" - Flex, ABduct, Externally Rotate (also flexes knee). The cross-legged sitting position!",
      demonstrationTip: "Cross your legs (ankle on opposite knee). That's all 4 actions of sartorius combined - the tailor position!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"GRACILIS = GRACEFUL (slender)\" - Latin for 'slender'. The thin, strap-like muscle of the inner thigh. Most medial!",
      actionTip: "\"Squeeze & Flex\" - Adducts (squeeze legs together) + flexes knee. Part of the Pes Anserinus trio!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"Adductor LONGUS = Longest Adductor\" - Part of the adductor trio (Brevis, Longus, Magnus). Fan-shaped inner thigh muscle.",
      originTip: "\"Pubis to Linea Aspera\" - From pubic bone to the rough line on back of femur. Fan-shaped!",
      insertionTip: "\"Linea Aspera\" - The rough line on posterior femur where multiple thigh muscles attach.",
      actionTip: "\"ADD = Add legs together\" - Adducts (brings legs together) + medially rotates thigh.",
      demonstrationTip: "Squeeze a ball between your knees. Those inner thigh muscles squeezing = adductors!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"RECTUS FEMORIS = Straight thigh muscle\" - Runs STRAIGHT down the front of thigh. The ONLY quad that crosses the hip!",
      originTip: "\"AIIS\" - Anterior Inferior Iliac Spine. Lower than ASIS (where sartorius originates). Think: RF = lower than S on the hip.",
      insertionTip: "\"All quads share insertion\" - Patella → Patellar tendon → Tibial tuberosity. The kneecap is a sesamoid bone in the tendon!",
      actionTip: "\"Two Jobs\" - Extends knee (all quads do) + Flexes hip (only rectus femoris does this). The kicking muscle!",
      demonstrationTip: "Kick a ball (extends knee) or do a straight leg raise (flexes hip). Both actions = rectus femoris!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"VASTUS = Vast/Large, LATERALIS = Lateral/Outer\" - The LARGEST quad on the OUTER side of thigh. Baby injection site!",
      originTip: "\"Greater Trochanter + Linea Aspera\" - Starts high at hip and runs down lateral femur.",
      insertionTip: "\"All quads → Patella → Tibial Tuberosity\" - Same insertion as all quadriceps via common quadriceps tendon.",
      actionTip: "\"One Job: Extend\" - Pure knee extensor. No hip action (doesn't cross hip joint like rectus femoris).",
      demonstrationTip: "Lock out your knee and feel the outer thigh. That bulky muscle = vastus lateralis, the biggest quad."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"VASTUS MEDIALIS = VMO (Vastus Medialis Oblique)\" - The TEARDROP muscle on inner thigh above knee. Key for patellar tracking!",
      originTip: "\"Medial Linea Aspera\" - Inner edge of the rough line on back of femur.",
      insertionTip: "\"Pulls patella medially\" - Attaches to patella and pulls it inward. Prevents lateral patellar tracking.",
      actionTip: "\"Final Lock-Out\" - Extends knee, especially last 15°. Weak VMO = patellofemoral pain (runner's knee)!",
      demonstrationTip: "Fully straighten knee and squeeze. See the teardrop shape pop out just above the inner knee = VMO!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"VASTUS INTERMEDIUS = In the Middle (deep)\" - The hidden quad! Deep to rectus femoris, between medialis and lateralis.",
      originTip: "\"Wraps femur shaft\" - Front and lateral surfaces of femur. The deepest of the four quads.",
      insertionTip: "\"Same as all quads\" - Patella → Tibial tuberosity via common tendon.",
      actionTip: "\"Silent Extender\" - Pure knee extension. Can't feel it but it's working with every knee straightening!",
      demonstrationTip: "Can't palpate directly - hidden under rectus femoris. Just know it's there, deep in the middle!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"BICEPS FEMORIS = Two-headed thigh muscle\" - Like arm's biceps (2 heads) but in the leg! The LATERAL hamstring.",
      originTip: "\"Sit Bones + Femur\" - Long head from ischial tuberosity (sit bone), Short head from femur. Two heads = two origins!",
      insertionTip: "\"FIBULA = LATERAL\" - Goes to fibula head & lateral tibia. Remember: Biceps femoris is LATERAL, inserts LATERAL!",
      actionTip: "\"Flex knee + Extend hip\" - Curl heel to butt (knee flex) + kick leg back (hip extension). All hamstrings do this!",
      demonstrationTip: "Curl heel toward buttock and feel the OUTER tendon behind your knee = biceps femoris (lateral hamstring)."
    }
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
    ],
    memoryTips: {
      mnemonic: "\"SEMI-TENDIN-osus = Half TENDON\" - Has a long, cord-like TENDON (like a whip). Superficial medial hamstring!",
      originTip: "\"Ischial Tuberosity (Sit Bones)\" - All hamstrings (long heads) start from the sit bones!",
      insertionTip: "\"Pes Anserinus\" - Part of the Goose's Foot on medial tibia. 'Say Grace before Tea' = Sartorius, Gracilis, Semitendinosus!",
      actionTip: "\"Same as all hamstrings\" - Flexes knee + extends hip. All hamstrings have these two actions.",
      demonstrationTip: "Curl heel to buttock and feel the INNER cord-like tendon = semitendinosus. Whip-like tendon!"
    }
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
    ],
    memoryTips: {
      mnemonic: "\"SEMI-MEMBRAN-osus = Half MEMBRANE\" - Has a flat, MEMBRANE-like shape. Deep to semitendinosus on medial side!",
      originTip: "\"Ischial Tuberosity\" - Same sit bone origin as other hamstrings.",
      insertionTip: "\"Medial Condyle of Tibia\" - Not part of Pes Anserinus (that's semitendinosus). Goes directly to medial tibial condyle.",
      actionTip: "\"Same as all hamstrings\" - Flexes knee + extends hip. The deep medial hamstring.",
      demonstrationTip: "Curl heel to buttock - semimembranosus is deep, under semitendinosus. You feel semitendinosus on top!"
    }
  },
  "flexor-digitorum-superficialis": {
    origin: "Humerus - Medial Epicondyle & Radius/Ulna - proximal portions",
    insertion: "Middle Phalanges of digits 2-5",
    action: "Flexes fingers at PIP joint (middle knuckle)",
    demonstration: "1. Make a loose fist.\n2. Bend your middle knuckles while keeping fingertips straight if possible.",
    tips: [
      "Superficialis = Superficial (closer to surface).",
      "Tendons split to allow Flexor Digitorum Profundus through.",
      "Acts on the middle (PIP) joint of fingers."
    ],
    clinicalConnection: "",
    relatedMuscles: [
      { id: "extensor-digitorum", name: "Extensor digitorum", relation: "Antagonist (Extension)" }
    ],
    memoryTips: {
      mnemonic: "\"FLEXOR DIGITORUM SUPERFICIALIS = Superficial finger Flexor\" - The SUPERFICIAL one flexes the MIDDLE knuckle (PIP). FDS = Middle!",
      actionTip: "\"Superficial = Stops at Middle\" - FDS (Superficial) = PIP joint (middle). Tendons split to let the deep one through to distal!"
    }
  }
};
