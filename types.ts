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
}

export interface ApiKeyContextType {
  hasKey: boolean;
  setHasKey: (v: boolean) => void;
}

// Learning Types
export type StudyMode = 'REFERENCE' | 'STUDY';
export type LearningTool = 'FLASHCARDS' | 'QUIZ' | 'SMART_GUIDE' | 'NONE';

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