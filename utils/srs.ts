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
  rating: ConfidenceRating,
  examDate?: number // Optional exam date timestamp
): MuscleProgress => {
  const now = Date.now();
  let { interval, easeFactor, streak, status } = current;

  // Rating values: AGAIN=0, HARD=1, GOOD=2, EASY=3 (conceptually)
  
  if (rating === 'AGAIN') {
    // Reset streak and interval - set to 1 minute in both interval and dueDate
    const oneMinuteInDays = 1 / (24 * 60); // ~0.0007 days
    return {
      ...current,
      status: 'LEARNING',
      streak: 0,
      interval: oneMinuteInDays, // Consistent with dueDate
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

  // Exam date awareness: Cap intervals to ensure review before exam
  if (examDate) {
    const daysUntilExam = (examDate - now) / (24 * 60 * 60 * 1000);
    if (daysUntilExam > 0 && interval > 0) {
      // Ensure we review at least once before exam
      // Cap interval to 40% of remaining time to allow multiple reviews
      const maxInterval = Math.max(1, Math.floor(daysUntilExam * 0.4));
      interval = Math.min(interval, maxInterval);
    }
  }

  // Convert days to ms with overflow protection
  const dayInMs = 24 * 60 * 60 * 1000;
  const maxInterval = 365; // Cap at 1 year to prevent overflow
  const safeInterval = Math.min(interval, maxInterval);
  
  return {
    ...current,
    status: safeInterval > 21 ? 'MASTERED' : 'REVIEW',
    streak: streak + 1,
    interval: safeInterval,
    easeFactor,
    dueDate: now + (safeInterval * dayInMs),
    lastReviewed: now
  };
};