"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function StudentHomeworkPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [solution, setSolution] = useState("");

  const solveHomework = async () => {
    const res = await fetch("/api/ai/homework-solver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });

    const data = (await res.json()) as { solution: string };
    setSolution(data.solution);
  };

  return (
    <AppShell title="Homework Solver + Diagram Explainer">
      <Card>
        <CardHeader>
          <CardTitle>Upload Homework Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="Paste image URL from Firebase Storage"
          />
          <Button onClick={solveHomework}>Analyze with Gemini Vision</Button>
          <Textarea value={solution} readOnly placeholder="Step-by-step solution appears here" />
        </CardContent>
      </Card>
    </AppShell>
  );
}
