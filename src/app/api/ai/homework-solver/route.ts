import { NextRequest, NextResponse } from "next/server";
import { analyzeImageWithGemini, generateWithGemini } from "@/lib/ai/gemini";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { imageUrl?: string; questionText?: string };

  if (!body.imageUrl && !body.questionText) {
    return NextResponse.json({ error: "imageUrl or questionText required" }, { status: 400 });
  }

  const prompt = `You are an educational assistant. Solve the homework in simple steps.
Input source: ${body.imageUrl ?? body.questionText}
Return:
1) Interpreted question
2) Step-by-step solution
3) Final answer
4) One practice question`;

  const solution = body.imageUrl
    ? await analyzeImageWithGemini(body.imageUrl, prompt)
    : await generateWithGemini(prompt);

  return NextResponse.json({ solution });
}
