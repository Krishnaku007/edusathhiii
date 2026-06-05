import { RoleGuard } from "@/components/auth/role-guard";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={["student"]}>{children}</RoleGuard>;
}
