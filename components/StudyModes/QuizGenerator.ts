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

  // Group A: Can ask ORIGIN, INSERTION, ACTION, IDENTIFY
  // Group B: Can only ask ACTION, IDENTIFY (no origin/insertion requirements)
  const groupATypes: ('ORIGIN' | 'INSERTION' | 'ACTION' | 'IDENTIFY')[] = ['ORIGIN', 'INSERTION', 'ACTION', 'IDENTIFY'];
  const groupBTypes: ('ACTION' | 'IDENTIFY')[] = ['ACTION', 'IDENTIFY'];
  
  const availableTypes = targetMuscle.group === 'A' ? groupATypes : groupBTypes;
  const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];

  let question = "";
  let correctAnswer = "";
  
  // Get ID list for distractors
  const distractorIds = getContextualDistractors(targetMuscle.id, 3);
  let distractorText: string[] = [];

  switch (type) {
    case 'ORIGIN':
      question = `Where is the origin of the ${targetMuscle.name}?`;
      correctAnswer = content.origin;
      distractorText = distractorIds.map(id => MUSCLE_DETAILS[id]?.origin).filter(t => t && !t.includes('Unknown')) as string[];
      break;
    case 'INSERTION':
      question = `Where does the ${targetMuscle.name} insert?`;
      correctAnswer = content.insertion;
      distractorText = distractorIds.map(id => MUSCLE_DETAILS[id]?.insertion).filter(t => t && !t.includes('Unknown')) as string[];
      break;
    case 'ACTION':
      question = `What is the primary action of the ${targetMuscle.name}?`;
      correctAnswer = content.action;
      distractorText = distractorIds.map(id => MUSCLE_DETAILS[id]?.action).filter(t => t && !t.includes('Unknown')) as string[];
      break;
    case 'IDENTIFY':
      // Pick first line of action for clarity
      const actionClue = content.action.split('\n')[0];
      question = `Which muscle performs this action: "${actionClue}"?`;
      correctAnswer = targetMuscle.name;
      distractorText = distractorIds.map(id => MUSCLE_DATA.find(m => m.id === id)?.name).filter(Boolean) as string[];
      break;
  }

  // Ensure options are unique (dedupe strings in case of similar text content)
  let uniqueOptions = Array.from(new Set([...distractorText, correctAnswer]));
  
  // If deduping reduced count below 4, add fallback options
  if (uniqueOptions.length < 4) {
    const remainingMuscles = MUSCLE_DATA.filter(m => 
      m.id !== targetMuscle.id && 
      !distractorIds.includes(m.id)
    );
    
    // Add additional options based on question type
    for (let i = uniqueOptions.length; i < 4 && remainingMuscles.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * remainingMuscles.length);
      const randomMuscle = remainingMuscles.splice(randomIndex, 1)[0];
      
      let newOption = '';
      switch (type) {
        case 'ORIGIN':
          newOption = MUSCLE_DETAILS[randomMuscle.id]?.origin || '';
          break;
        case 'INSERTION':
          newOption = MUSCLE_DETAILS[randomMuscle.id]?.insertion || '';
          break;
        case 'ACTION':
          newOption = MUSCLE_DETAILS[randomMuscle.id]?.action || '';
          break;
        case 'IDENTIFY':
          newOption = randomMuscle.name;
          break;
      }
      
      if (newOption && !uniqueOptions.includes(newOption) && !newOption.includes('Unknown')) {
        uniqueOptions.push(newOption);
      } else {
        // Retry if we got an invalid option or duplicate
        i--;
      }
    }
  }
  
  // Shuffle and ensure we have exactly 4 options
  const options = uniqueOptions.slice(0, 4).sort(() => 0.5 - Math.random());

  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    question,
    options,
    correctAnswer,
    muscleId: targetMuscle.id
  };
};