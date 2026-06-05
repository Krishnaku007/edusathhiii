import { GoogleGenerativeAI } from "@google/generative-ai";

const key = process.env.GEMINI_API_KEY;
const client = key ? new GoogleGenerativeAI(key) : null;

export async function generateWithGemini(prompt: string) {
  if (!client) {
    return "Gemini API key is not configured. Please add GEMINI_API_KEY.";
  }

  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateJsonWithGemini<T>(prompt: string): Promise<T> {
  const text = await generateWithGemini(prompt);
  const sanitized = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(sanitized) as T;
}

export async function embedText(text: string): Promise<number[]> {
  if (!client) {
    return [];
  }

  const model = client.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

export async function analyzeImageWithGemini(imageUrl: string, prompt: string) {
  if (!client) {
    return "Gemini API key is not configured. Please add GEMINI_API_KEY.";
  }

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch image for analysis");
  }

  const contentType = response.headers.get("content-type") ?? "image/jpeg";
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([
    {
      inlineData: {
        data: base64,
        mimeType: contentType,
      },
    },
    {
      text: prompt,
    },
  ]);

  return result.response.text();
}
