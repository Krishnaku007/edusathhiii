import { NextRequest, NextResponse } from "next/server";
import { analyzeImageWithGemini } from "@/lib/ai/gemini";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { imageUrl: string; language?: string };

  if (!body.imageUrl) {
    return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
  }

  const explanation = await analyzeImageWithGemini(
    body.imageUrl,
    `Explain this educational diagram in ${body.language ?? "English"} using simple student-friendly bullet points. Mention what each visible part likely represents.`,
  );

  return NextResponse.json({ explanation });
}
