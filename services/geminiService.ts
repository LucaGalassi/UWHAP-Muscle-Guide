import { GoogleGenAI, Type } from "@google/genai";
import { MuscleContent, MuscleItem } from "../types";
import { MUSCLE_DETAILS, MUSCLE_DATA } from "../constants";

export const fetchMuscleDetails = async (muscle: MuscleItem, apiKey?: string): Promise<MuscleContent> => {
  // 1. Check static dictionary first (Fastest & Verified Data)
  const content = MUSCLE_DETAILS[muscle.id];
  if (content) {
    // Simulate network delay for consistent UX
    await new Promise(resolve => setTimeout(resolve, 300));
    return content;
  }

  // 2. Use Gemini to fetch details only if API key is provided and muscle not in static data
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      // Create a context string of available muscles for the AI to reference for linking
      const availableMuscles = MUSCLE_DATA.map(m => `${m.name} (id: ${m.id})`).join(', ');

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: `You are an expert anatomy tutor. Provide structured educational content for the muscle: "${muscle.name}".
        
        Context:
        - Group: ${muscle.group}
        - SubCategory: ${muscle.subCategory || 'General'}
        
        Requirements:
        - Origin, Insertion, Action: Be precise, academic, yet clear.
        - Demonstration: Provide a detailed, step-by-step walkthrough on how a student can find and demonstrate this muscle on their own body or a skeleton.
        - Tips: 2-3 brief study tips or mnemonics.
        - Clinical Connection: A brief clinical relevance (e.g., common injury or medical condition).
        - Related Muscles: List up to 3 related muscles (synergists/antagonists). You MUST use IDs from this list: [${availableMuscles}].
        
        Return the response in JSON format matching the schema.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              origin: { type: Type.STRING },
              insertion: { type: Type.STRING },
              action: { type: Type.STRING },
              demonstration: { type: Type.STRING },
              tips: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              clinicalConnection: { type: Type.STRING },
              relatedMuscles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    relation: { type: Type.STRING }
                  },
                },
              },
            },
          },
        }
      });

      if (response.text) {
        return JSON.parse(response.text) as MuscleContent;
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      // Fallthrough to fallback
    }
  }

  // 3. Fallback for muscles not in static dict and if API fails/missing
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