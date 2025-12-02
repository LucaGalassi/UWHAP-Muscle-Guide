import { MUSCLE_DATA, MUSCLE_DETAILS } from '../../constants';
import { QuizQuestion } from '../../types';

const getRandomMuscles = (count: number, excludeId: string) => {
  const others = MUSCLE_DATA.filter(m => m.id !== excludeId);
  const shuffled = others.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
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
  let distractors: string[] = [];

  switch (type) {
    case 'ORIGIN':
      question = `Where is the origin of the ${targetMuscle.name}?`;
      correctAnswer = content.origin;
      distractors = getRandomMuscles(3, targetMuscle.id).map(m => MUSCLE_DETAILS[m.id]?.origin || "Unknown");
      break;
    case 'INSERTION':
      question = `Where does the ${targetMuscle.name} insert?`;
      correctAnswer = content.insertion;
      distractors = getRandomMuscles(3, targetMuscle.id).map(m => MUSCLE_DETAILS[m.id]?.insertion || "Unknown");
      break;
    case 'ACTION':
      question = `What is the primary action of the ${targetMuscle.name}?`;
      correctAnswer = content.action;
      distractors = getRandomMuscles(3, targetMuscle.id).map(m => MUSCLE_DETAILS[m.id]?.action || "Unknown");
      break;
    case 'IDENTIFY':
      question = `Which muscle performs: ${content.action.split('\n')[0]}?`;
      correctAnswer = targetMuscle.name;
      distractors = getRandomMuscles(3, targetMuscle.id).map(m => m.name);
      break;
  }

  const options = [...distractors, correctAnswer].sort(() => 0.5 - Math.random());

  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    question,
    options,
    correctAnswer,
    muscleId: targetMuscle.id
  };
};