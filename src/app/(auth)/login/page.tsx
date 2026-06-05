"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth, db } from "@/lib/firebase/client";
import { FIRESTORE_COLLECTIONS } from "@/lib/constants/app";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAuth } from "@/providers/auth-provider";

export default function LoginPage() {
  const [name, setName] = useState("Ravi Kumar");
  const [email, setEmail] = useState("student@edusaathi.demo");
  const [password, setPassword] = useState("password123");
  const [role, setRole] = useState("student");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const routeByRole = (selectedRole: string) => {
    if (selectedRole === "teacher") {
      router.push("/teacher/dashboard");
      return;
    }

    if (selectedRole === "admin") {
      router.push("/admin/dashboard");
      return;
    }

    router.push("/student/dashboard");
  };

  const handleAuth = async () => {
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        await signUp({
          name,
          email,
          password,
          role: role as "student" | "teacher" | "admin",
        });
        routeByRole(role);
      } else {
        await signIn(email, password);
        const uid = auth?.currentUser?.uid;

        if (!uid || !db) {
          routeByRole("student");
          return;
        }

        const snapshot = await getDoc(doc(db, FIRESTORE_COLLECTIONS.users, uid));
        const actualRole = snapshot.exists()
          ? ((snapshot.data().role as "student" | "teacher" | "admin" | undefined) ?? "student")
          : "student";

        routeByRole(actualRole);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 items-center px-4 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{mode === "signin" ? "Login to EduSaathi" : "Create EduSaathi Account"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === "signup" && (
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
          )}
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {mode === "signup" && (
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: "student", label: "Student" },
                { value: "teacher", label: "Teacher" },
                { value: "admin", label: "Admin" },
              ]}
            />
          )}
          {error && <p className="rounded-xl border border-danger/30 bg-danger/10 p-2 text-xs text-danger">{error}</p>}
          <Button className="w-full" onClick={handleAuth} disabled={loading}>
            {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
          <button
            className="text-xs font-semibold text-brand"
            onClick={() => setMode((prev) => (prev === "signin" ? "signup" : "signin"))}
            type="button"
          >
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </CardContent>
      </Card>
    </main>
  );
}
