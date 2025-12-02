import { MuscleProgress, ConfidenceRating } from '../types';

// Default starting values
export const INITIAL_EASE = 2.5;
export const INTERVAL_MODIFIER = 1.0; // Can tweak to make app harder/easier

export const createInitialProgress = (muscleId: string): MuscleProgress => ({
  muscleId,
  status: 'NEW',
  interval: 0,
  easeFactor: INITIAL_EASE,
  dueDate: Date.now(),
  lastReviewed: 0,
  streak: 0
});

export const calculateNextReview = (
  current: MuscleProgress, 
  rating: ConfidenceRating
): MuscleProgress => {
  const now = Date.now();
  let { interval, easeFactor, streak, status } = current;

  // Rating values: AGAIN=0, HARD=1, GOOD=2, EASY=3 (conceptually)
  
  if (rating === 'AGAIN') {
    // Reset streak and interval
    return {
      ...current,
      status: 'LEARNING',
      streak: 0,
      interval: 0, // Due immediately (or very soon)
      dueDate: now + (1 * 60 * 1000), // 1 minute
      lastReviewed: now
    };
  }

  // Adjust Ease Factor (SM-2 Algorithm variation)
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  // Where q is quality: Hard=3, Good=4, Easy=5
  let quality = 3; // Hard
  if (rating === 'GOOD') quality = 4;
  if (rating === 'EASY') quality = 5;

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  // Calculate Interval
  if (streak === 0) {
    interval = 1; // 1 day
  } else if (streak === 1) {
    interval = 6; // 6 days
  } else {
    interval = Math.round(interval * easeFactor);
  }

  // Modifiers based on specific rating for fine tuning
  if (rating === 'HARD') {
    interval = Math.max(1, Math.floor(interval * 0.5)); // Reduce interval increase for hard items
    easeFactor = Math.max(1.3, easeFactor - 0.15); // Penalty
  }

  // Convert days to ms
  const dayInMs = 24 * 60 * 60 * 1000;
  
  return {
    ...current,
    status: interval > 21 ? 'MASTERED' : 'REVIEW',
    streak: streak + 1,
    interval,
    easeFactor,
    dueDate: now + (interval * dayInMs),
    lastReviewed: now
  };
};