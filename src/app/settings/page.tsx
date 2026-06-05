"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { SUPPORTED_LANGUAGES } from "@/lib/constants/app";
import { useAuth } from "@/providers/auth-provider";

export default function SettingsPage() {
  const { user, setLanguage, setRole } = useAuth();

  return (
    <AppShell title="Settings">
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold">Preferred Language</p>
            <Select
              value={user?.preferredLanguage ?? "en"}
              onChange={(event) => setLanguage(event.target.value as keyof typeof SUPPORTED_LANGUAGES)}
              options={Object.entries(SUPPORTED_LANGUAGES).map(([value, label]) => ({ value, label }))}
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">Role</p>
            <Select
              value={user?.role ?? "student"}
              onChange={(event) => setRole(event.target.value as "student" | "teacher" | "admin")}
              options={[
                { value: "student", label: "Student" },
                { value: "teacher", label: "Teacher" },
                { value: "admin", label: "Admin" },
              ]}
            />
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
