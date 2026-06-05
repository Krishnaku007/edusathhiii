"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

const nav = [
  { href: "/student/dashboard", label: "Dashboard" },
  { href: "/student/chat", label: "AI Chat" },
  { href: "/student/quiz", label: "Quizzes" },
  { href: "/student/homework", label: "Homework" },
  { href: "/student/analytics", label: "Analytics" },
  { href: "/student/planner", label: "Planner" },
  { href: "/settings", label: "Settings" },
];

export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  if (loading) {
    return <div className="p-8 text-sm font-semibold text-muted">Loading session...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 gap-4 px-3 py-4 sm:px-6 lg:px-8">
      <aside className="hidden w-56 shrink-0 rounded-2xl border bg-surface p-4 lg:block">
        <p className="mb-4 text-sm font-bold text-brand">EduSaathi</p>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm transition",
                pathname === item.href ? "bg-brand text-white" : "hover:bg-surface-2",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="w-full">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-surface px-4 py-3">
          <div>
            <h1 className="text-xl font-black">{title}</h1>
            <p className="text-xs text-muted">
              {user.name} · {user.email}
            </p>
          </div>
          <Button
            onClick={async () => {
              await logOut();
              router.push("/login");
            }}
            size="sm"
            variant="outline"
          >
            Sign out
          </Button>
        </header>
        {children}
      </section>
    </div>
  );
}
