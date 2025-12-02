export type MuscleGroup = 'A' | 'B';

export interface MuscleItem {
  id: string;
  name: string;
  group: MuscleGroup;
  subCategory?: string; // e.g., "Forearm", "Quadriceps"
}

export interface MuscleContent {
  origin: string;
  insertion: string;
  action: string;
  demonstration: string;
  tips: string[];
  clinicalNote: string;
  similarMuscles: string[];
}

export interface ApiKeyContextType {
  hasKey: boolean;
  setHasKey: (v: boolean) => void;
}
