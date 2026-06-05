"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types";
import { useAuth } from "@/providers/auth-provider";

function dashboardForRole(role: UserRole) {
  if (role === "teacher") {
    return "/teacher/dashboard";
  }

  if (role === "admin") {
    return "/admin/dashboard";
  }

  return "/student/dashboard";
}

export function RoleGuard({
  allowedRoles,
  children,
}: {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.replace(dashboardForRole(user.role));
    }
  }, [allowedRoles, loading, router, user]);

  if (loading) {
    return <div className="p-8 text-sm font-semibold text-muted">Checking access...</div>;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
