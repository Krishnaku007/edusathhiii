import { QuizPlayer } from "@/components/features/quiz/quiz-player";
import { AppShell } from "@/components/layout/app-shell";

export default function StudentQuizPage() {
  return (
    <AppShell title="Adaptive Quiz Section">
      <QuizPlayer />
    </AppShell>
  );
}
