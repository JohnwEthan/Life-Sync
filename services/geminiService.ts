
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyInsights = async (snapshot: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a single, very short, calm insight for a fitness/wellness app.
      Context: ${JSON.stringify(snapshot)}.
      Rules:
      1. One short sentence.
      2. No medical advice.
      3. Frame as a grounded observation (e.g., "You typically complete strength on days you hit 10k steps").
      4. Avoid exclamation marks.
      5. Sound like an Apple engineer wrote it.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    // The response.text property directly returns the generated text content.
    return response.text;
  } catch (error) {
    console.error("Failed to get insights:", error);
    return "Focus on your spiritual alignment today.";
  }
};
