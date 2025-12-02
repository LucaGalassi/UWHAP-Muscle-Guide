import { MUSCLE_DATA, MUSCLE_DETAILS } from '../../constants';
import { QuizQuestion } from '../../types';

// Helper to get distractors that are somewhat related (same group) if possible
const getContextualDistractors = (targetId: string, count: number): string[] => {
  const target = MUSCLE_DATA.find(m => m.id === targetId);
  if (!target) return [];

  // Strategy 1: Prefer muscles in the exact same SubCategory (e.g., both "Forearm")
  let candidates = MUSCLE_DATA.filter(m => m.id !== targetId && m.subCategory === target.subCategory);
  
  // Strategy 2: If not enough, expand to same major Group (A/B)
  if (candidates.length < count) {
     const sameGroup = MUSCLE_DATA.filter(m => m.id !== targetId && m.group === target.group && m.subCategory !== target.subCategory);
     candidates = [...candidates, ...sameGroup];
  }

  // Strategy 3: If still not enough, expand to everything else
  if (candidates.length < count) {
     const others = MUSCLE_DATA.filter(m => m.id !== targetId && m.group !== target.group);
     candidates = [...candidates, ...others];
  }

  // Shuffle the candidate pool properly and take top N
  const shuffled = candidates.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(m => m.id);
};

export const generateQuizQuestion = (muscleId?: string): QuizQuestion => {
  const targetMuscle = muscleId 
    ? MUSCLE_DATA.find(m => m.id === muscleId)!
    : MUSCLE_DATA[Math.floor(Math.random() * MUSCLE_DATA.length)];
  
  const content = MUSCLE_DETAILS[targetMuscle.id];
  
  if (!content) throw new Error("Muscle content not found");

  const types: ('ORIGIN' | 'INSERTION' | 'ACTION' | 'IDENTIFY')[] = ['ORIGIN', 'INSERTION', 'ACTION', 'IDENTIFY'];
  const type = types[Math.floor(Math.random() * types.length)];

  let question = "";
  let correctAnswer = "";
  
  // Get ID list for distractors
  const distractorIds = getContextualDistractors(targetMuscle.id, 3);
  let distractorText: string[] = [];

  switch (type) {
    case 'ORIGIN':
      question = `Where is the origin of the ${targetMuscle.name}?`;
      correctAnswer = content.origin;
      distractorText = distractorIds.map(id => MUSCLE_DETAILS[id]?.origin || "Unknown");
      break;
    case 'INSERTION':
      question = `Where does the ${targetMuscle.name} insert?`;
      correctAnswer = content.insertion;
      distractorText = distractorIds.map(id => MUSCLE_DETAILS[id]?.insertion || "Unknown");
      break;
    case 'ACTION':
      question = `What is the primary action of the ${targetMuscle.name}?`;
      correctAnswer = content.action;
      distractorText = distractorIds.map(id => MUSCLE_DETAILS[id]?.action || "Unknown");
      break;
    case 'IDENTIFY':
      // Pick first line of action for clarity
      const actionClue = content.action.split('\n')[0];
      question = `Which muscle performs this action: "${actionClue}"?`;
      correctAnswer = targetMuscle.name;
      distractorText = distractorIds.map(id => MUSCLE_DATA.find(m => m.id === id)?.name || "Unknown");
      break;
  }

  // Ensure options are unique (dedupe strings in case of similar text content)
  const uniqueOptions = Array.from(new Set([...distractorText, correctAnswer]));
  
  // If deduping reduced count below 4, fill with random filler text or other muscles
  // (Simplified fallback)
  
  const options = uniqueOptions.sort(() => 0.5 - Math.random());

  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    question,
    options,
    correctAnswer,
    muscleId: targetMuscle.id
  };
};