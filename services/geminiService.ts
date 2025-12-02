import { MuscleContent, MuscleItem } from "../types";
import { MUSCLE_DETAILS } from "../constants";

export const fetchMuscleDetails = async (muscle: MuscleItem): Promise<MuscleContent> => {
  // Simulate network delay for better UX feel (optional, but nice)
  await new Promise(resolve => setTimeout(resolve, 300));

  const content = MUSCLE_DETAILS[muscle.id];

  if (content) {
    return content;
  }

  // Fallback for muscles not fully populated in the static dictionary
  return {
    origin: `Consult textbook for ${muscle.name} origin.`,
    insertion: `Consult textbook for ${muscle.name} insertion.`,
    action: `Action of ${muscle.name}. Refer to Group ${muscle.group} requirements.`,
    demonstration: `Identify ${muscle.name} on the model and perform its primary action.`,
    tips: [
      `Focus on the ${muscle.subCategory} region.`,
      "Remember to identify if it is superficial or deep.",
      "Check the interactive diagram."
    ],
    clinicalNote: "Clinical relevance to be added.",
    similarMuscles: []
  };
};