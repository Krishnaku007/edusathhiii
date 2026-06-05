import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function StudentAnalyticsPage() {
  return (
    <AppShell title="Learning Analytics">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Topic Completion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="mb-1 text-sm">Fractions</p>
              <Progress value={62} />
            </div>
            <div>
              <p className="mb-1 text-sm">Photosynthesis</p>
              <Progress value={78} />
            </div>
            <div>
              <p className="mb-1 text-sm">Grammar</p>
              <Progress value={54} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="rounded-xl border bg-surface-2 p-3">You perform best in Science.</p>
            <p className="rounded-xl border bg-surface-2 p-3">Evening study sessions produce better results.</p>
            <p className="rounded-xl border bg-surface-2 p-3">You should review Fractions twice this week.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
