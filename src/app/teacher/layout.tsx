import { RoleGuard } from "@/components/auth/role-guard";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={["teacher", "admin"]}>{children}</RoleGuard>;
}
