export type MuscleGroup = 'A' | 'B';

export interface MuscleItem {
  id: string;
  name: string;
  group: MuscleGroup;
  subCategory?: string; // e.g., "Forearm", "Quadriceps"
}

export interface RelatedMuscle {
  id: string;
  name: string;
  relation: string; // e.g., "Antagonist", "Synergist", "Deep to..."
}

export interface MuscleContent {
  origin: string;
  insertion: string;
  action: string;
  demonstration: string;
  tips: string[];
  clinicalConnection: string; // Renamed from clinicalNote
  relatedMuscles: RelatedMuscle[];
  memoryTips?: {
    mnemonic?: string; // Main mnemonic for the muscle
    originTip?: string; // Memory tip for origin (Group A only)
    insertionTip?: string; // Memory tip for insertion (Group A only)
    actionTip?: string; // Memory tip for action
    demonstrationTip?: string; // Memory tip for demonstration (Group A only)
  };
}

// Learning Types
export type StudyMode = 'REFERENCE' | 'STUDY';
export type LearningTool = 'FLASHCARDS' | 'QUIZ' | 'SMART_GUIDE' | 'LIGHTNING' | 'NONE';

export interface QuizQuestion {
  id: string;
  type: 'ORIGIN' | 'INSERTION' | 'ACTION' | 'IDENTIFY';
  question: string;
  options: string[]; // 4 options
  correctAnswer: string;
  muscleId: string; // The subject of the question
}

// Spaced Repetition System (SRS) Data
export interface MuscleProgress {
  muscleId: string;
  status: 'NEW' | 'LEARNING' | 'REVIEW' | 'MASTERED';
  interval: number; // Days until next review
  easeFactor: number; // Multiplier for interval
  dueDate: number; // Timestamp
  lastReviewed: number; // Timestamp
  streak: number;
}

export type ConfidenceRating = 'AGAIN' | 'HARD' | 'GOOD' | 'EASY';

// Theming
export type AppTheme = 'modern' | 'midnight' | 'blueprint' | 'nature';

export interface ThemeConfig {
  label: string;
  appBg: string; // Global background
  cardBg: string; // Flashcard front/back background
  text: string;
  subText: string;
  border: string;
  accent: string;
  badge: string;
  infoBox: string;
  iconLoc: string;
  iconFunc: string;
  
  // Sidebar Specifics
  sidebarBg: string;
  sidebarBorder: string;
  sidebarText: string;
  sidebarSubText: string;
  sidebarHover: string;
  sidebarActive: string; // For selected items
  inputBg: string; // For search bars and toggle backgrounds
  
  // Background Blobs
  blobColor1: string;
  blobColor2: string;
  blobOpacity: string;
}