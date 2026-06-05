import { TeacherOverviewCharts } from "@/components/charts/teacher-overview-charts";
import { AppShell } from "@/components/layout/app-shell";

export default function TeacherDashboardPage() {
  return (
    <AppShell title="Teacher Dashboard">
      <TeacherOverviewCharts />
    </AppShell>
  );
}
