import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateJsonWithGemini } from "@/lib/ai/gemini";
import { quizPrompt } from "@/lib/ai/prompts";
import { QuizQuestion } from "@/types";

const schema = z.object({
  topic: z.string().min(2),
  difficulty: z.enum(["easy", "medium", "hard"]),
  sourceText: z.string().optional(),
});

const fallbackQuestions: QuizQuestion[] = [
  {
    id: "q1",
    type: "mcq",
    question: "What is 1/2 + 1/4?",
    options: ["3/4", "2/6", "1/6", "4/8"],
    correctAnswer: "3/4",
    explanation: "Convert to common denominator and add numerators.",
  },
  {
    id: "q2",
    type: "true_false",
    question: "Photosynthesis happens in chloroplasts.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Chloroplasts contain chlorophyll used in photosynthesis.",
  },
];

export async function POST(request: NextRequest) {
  const parse = schema.safeParse(await request.json());
  if (!parse.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { topic, difficulty, sourceText } = parse.data;

  try {
    const result = await generateJsonWithGemini<{ questions: QuizQuestion[] }>(
      `${quizPrompt}\nGenerate 6 questions for topic: ${topic} at difficulty: ${difficulty}.\nSource: ${sourceText ?? "NCERT aligned general knowledge"}`,
    );

    return NextResponse.json({ questions: result.questions });
  } catch {
    return NextResponse.json({ questions: fallbackQuestions });
  }
}
