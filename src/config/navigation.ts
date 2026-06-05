import type { Route } from "next";

export interface NavItem {
  href: Route;
  label: string;
}

export const STUDENT_NAV: NavItem[] = [
  { href: "/student/dashboard", label: "Dashboard" },
  { href: "/student/chat", label: "AI Chat" },
  { href: "/student/quiz", label: "Quizzes" },
  { href: "/student/homework", label: "Homework" },
  { href: "/student/analytics", label: "Analytics" },
  { href: "/student/planner", label: "Planner" },
  { href: "/settings", label: "Settings" },
];

export function routeByRole(role: "student" | "teacher" | "admin") {
  if (role === "teacher") {
    return "/teacher/dashboard";
  }

  if (role === "admin") {
    return "/admin/dashboard";
  }

  return "/student/dashboard";
}
