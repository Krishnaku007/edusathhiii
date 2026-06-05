"use client";

import { ChatWindow } from "@/components/features/chat/chat-window";
import { AppShell } from "@/components/layout/app-shell";
import { Select } from "@/components/ui/select";
import { useAuth } from "@/providers/auth-provider";
import { SUPPORTED_LANGUAGES } from "@/lib/constants/app";

export default function StudentChatPage() {
  const { user, setLanguage } = useAuth();

  return (
    <AppShell title="AI Tutor Chat">
      <div className="mb-4 max-w-xs">
        <Select
          value={user?.preferredLanguage ?? "en"}
          onChange={(event) => setLanguage(event.target.value as keyof typeof SUPPORTED_LANGUAGES)}
          options={Object.entries(SUPPORTED_LANGUAGES).map(([value, label]) => ({ value, label }))}
        />
      </div>
      <ChatWindow language={user?.preferredLanguage ?? "en"} />
    </AppShell>
  );
}
