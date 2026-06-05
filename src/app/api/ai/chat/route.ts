import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/ai/gemini";
import { tutorSystemPrompt } from "@/lib/ai/prompts";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const rate = checkRateLimit(`chat-${ip}`, { limit: 40, windowMs: 60_000 });

  if (!rate.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfter: rate.retryAfter },
      { status: 429 },
    );
  }

  const body = (await request.json()) as {
    message: string;
    language?: string;
    grade?: string;
  };

  if (!body.message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const prompt = `${tutorSystemPrompt(body.language ?? "English", body.grade)}\n\nStudent question: ${body.message}`;
  const answer = await generateWithGemini(prompt);

  return NextResponse.json({ answer });
}
