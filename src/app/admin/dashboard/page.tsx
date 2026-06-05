import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <AppShell title="Admin Console">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Manage Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">Create, update, suspend, and role-assign users.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">Track onboarded schools and classroom configurations.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">Approve uploads, notes, and NCERT chapter resources.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
