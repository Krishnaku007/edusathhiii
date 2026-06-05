import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockProgress } from "@/data/mock";

export default function StudentDashboardPage() {
  return (
    <AppShell title="Student Dashboard">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Daily Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-brand">{mockProgress.streakDays} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Studied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-brand">{Math.floor(mockProgress.timeSpentMinutes / 60)} hrs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-brand">{mockProgress.accuracyPercentage}%</p>
            <Progress className="mt-3" value={mockProgress.accuracyPercentage} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="rounded-xl border bg-surface-2 p-3">You need more practice in Fractions.</p>
          <p className="rounded-xl border bg-surface-2 p-3">
            Revise Photosynthesis before attempting advanced questions.
          </p>
          <div className="flex flex-wrap gap-2">
            {mockProgress.weakSubjects.map((topic) => (
              <Badge key={topic}>{topic}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link className="rounded-xl border bg-surface p-4 font-semibold" href="/student/chat">
          Open AI Chat
        </Link>
        <Link className="rounded-xl border bg-surface p-4 font-semibold" href="/student/quiz">
          Take Quiz
        </Link>
        <Link className="rounded-xl border bg-surface p-4 font-semibold" href="/student/homework">
          Solve Homework
        </Link>
        <Link className="rounded-xl border bg-surface p-4 font-semibold" href="/student/planner">
          Generate Planner
        </Link>
      </div>
    </AppShell>
  );
}
