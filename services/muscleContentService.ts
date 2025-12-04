import { MuscleContent, MuscleItem } from "../types";
import { MUSCLE_DETAILS } from "../constants";

export const fetchMuscleDetails = async (muscle: MuscleItem): Promise<MuscleContent> => {
  // Check static dictionary first (Fast & Verified Data)
  const content = MUSCLE_DETAILS[muscle.id];
  if (content) {
    // Simulate network delay for consistent UX
    await new Promise(resolve => setTimeout(resolve, 300));
    return content;
  }

  // Fallback for muscles not in static dictionary
  return {
    origin: `Consult textbook for ${muscle.name} origin.`,
    insertion: `Consult textbook for ${muscle.name} insertion.`,
    action: `Action of ${muscle.name}. Refer to Group ${muscle.group} requirements.`,
    demonstration: `Identify ${muscle.name} on the model and perform its primary action.`,
    tips: [
      `Focus on the ${muscle.subCategory || 'muscle'} region.`,
      "Remember to identify if it is superficial or deep.",
      "Check the interactive diagram."
    ],
    clinicalConnection: "Clinical relevance to be added.",
    relatedMuscles: []
  };
};