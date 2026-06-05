import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { QuizQuestion } from "@/types";

const schema = z.object({
  questions: z.array(z.any()),
  answers: z.record(z.string(), z.string()),
});

export async function POST(request: NextRequest) {
  const parse = schema.safeParse(await request.json());

  if (!parse.success) {
    return NextResponse.json({ error: "Invalid evaluation payload" }, { status: 400 });
  }

  const { questions, answers } = parse.data as {
    questions: QuizQuestion[];
    answers: Record<string, string>;
  };

  const total = questions.length;
  const correct = questions.filter((q) => (answers[q.id] ?? "").trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()).length;

  const scorePercent = total > 0 ? Math.round((correct / total) * 100) : 0;

  return NextResponse.json({
    score: correct,
    maxScore: total,
    feedback: `You scored ${correct}/${total} (${scorePercent}%). Review weak topics and retry for mastery.`,
  });
}
