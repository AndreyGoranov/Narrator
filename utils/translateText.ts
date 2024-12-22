import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

export const translateText = async (
  text: string,
  targetLang: string
): Promise<string> => {
  const systemPrompt = `You are a translation assistant. Try translating the following text to ${targetLang}. Only return the translated text without explanations.`;

  const response = await openai.chat.completions.create({
    model: "o1-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: text },
    ],
    // max_tokens: 1000,
  });

  const translatedText = response.choices[0]?.message?.content?.trim();

  if (!translatedText) {
    throw new Error("Failed to translate text");
  }

  return translatedText;
};
