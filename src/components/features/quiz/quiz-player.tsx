"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function QuizPlayer() {
  const [topic, setTopic] = useState("Fractions");
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>("");

  const generateQuiz = async () => {
    const res = await fetch("/api/ai/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, difficulty }),
    });

    const data = (await res.json()) as { questions: QuizQuestion[] };
    setQuestions(data.questions || []);
    setAnswers({});
    setResult("");
  };

  const evaluateQuiz = async () => {
    const res = await fetch("/api/ai/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questions, answers }),
    });

    const data = (await res.json()) as { feedback: string };
    setResult(data.feedback);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Quiz Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic" />
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            options={[
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
          />
          <Button onClick={generateQuiz}>Generate Quiz</Button>
        </div>

        <div className="space-y-3">
          {questions.map((q, index) => (
            <div key={q.id} className="rounded-xl border bg-surface-2 p-3">
              <p className="mb-2 text-sm font-semibold">
                Q{index + 1}. {q.question}
              </p>
              {q.options?.length ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {q.options.map((option) => (
                    <label key={option} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={q.id}
                        value={option}
                        checked={answers[q.id] === option}
                        onChange={(event) =>
                          setAnswers((prev) => ({ ...prev, [q.id]: event.target.value }))
                        }
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : (
                <Input
                  placeholder="Your answer"
                  value={answers[q.id] ?? ""}
                  onChange={(event) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: event.target.value }))
                  }
                />
              )}
            </div>
          ))}
        </div>

        {questions.length > 0 && <Button onClick={evaluateQuiz}>Submit Quiz</Button>}
        {result && <p className="rounded-xl border bg-white p-3 text-sm">{result}</p>}
      </CardContent>
    </Card>
  );
}
