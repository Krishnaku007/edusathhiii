"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface PlanDay {
  day: number;
  title: string;
  tasks: string[];
}

export default function StudyPlannerPage() {
  const [examDate, setExamDate] = useState("");
  const [plan, setPlan] = useState<PlanDay[]>([]);

  const generatePlan = async () => {
    const res = await fetch("/api/ai/study-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examDate }),
    });

    const data = (await res.json()) as { plan: PlanDay[] };
    setPlan(data.plan || []);
  };

  return (
    <AppShell title="AI Study Planner">
      <Card>
        <CardHeader>
          <CardTitle>Generate Personalized Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Input type="date" value={examDate} onChange={(event) => setExamDate(event.target.value)} />
            <Button onClick={generatePlan}>Generate</Button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {plan.map((entry) => (
              <article key={entry.day} className="rounded-xl border bg-surface-2 p-3">
                <h3 className="font-semibold">
                  Day {entry.day}: {entry.title}
                </h3>
                <ul className="mt-2 list-disc pl-5 text-sm">
                  {entry.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
