"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import type { AppUser, SupportedLanguage, UserRole } from "@/types";
import { auth, db } from "@/lib/firebase/client";
import { FIRESTORE_COLLECTIONS } from "@/lib/constants/app";

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (payload: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
  }) => Promise<void>;
  logOut: () => Promise<void>;
  setLanguage: (language: SupportedLanguage) => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toAppUser(firebaseUser: User, docData?: Partial<AppUser>): AppUser {
  return {
    uid: firebaseUser.uid,
    name: docData?.name ?? firebaseUser.displayName ?? "EduSaathi Learner",
    email: firebaseUser.email ?? docData?.email ?? "",
    role: docData?.role ?? "student",
    grade: docData?.grade,
    schoolId: docData?.schoolId,
    preferredLanguage: docData?.preferredLanguage ?? "en",
    createdAt: docData?.createdAt ?? new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const hydrateUser = useCallback(async (firebaseUser: User) => {
    if (!db) {
      setUser(null);
      return;
    }

    const ref = doc(db, FIRESTORE_COLLECTIONS.users, firebaseUser.uid);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      setUser(toAppUser(firebaseUser, snapshot.data() as Partial<AppUser>));
      return;
    }

    const newUser = toAppUser(firebaseUser);
    await setDoc(ref, {
      ...newUser,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    setUser(newUser);
  }, []);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          return;
        }

        await hydrateUser(firebaseUser);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [hydrateUser]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase web config is missing. Add NEXT_PUBLIC_FIREBASE_* variables.");
    }

    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUp = useCallback(
    async ({ email, password, name, role }: { email: string; password: string; name: string; role: UserRole }) => {
      if (!auth || !db) {
        throw new Error("Firebase web config is missing. Add NEXT_PUBLIC_FIREBASE_* variables.");
      }

      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });

      const ref = doc(db, FIRESTORE_COLLECTIONS.users, credential.user.uid);
      await setDoc(ref, {
        uid: credential.user.uid,
        name,
        email,
        role,
        preferredLanguage: "en",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    },
    [],
  );

  const logOut = useCallback(async () => {
    if (!auth) {
      return;
    }

    await signOut(auth);
  }, []);

  const setLanguage = useCallback(
    (language: SupportedLanguage) => {
      setUser((prev) => {
        if (!prev) {
          return prev;
        }

        if (!db) {
          return prev;
        }

        void updateDoc(doc(db, FIRESTORE_COLLECTIONS.users, prev.uid), {
          preferredLanguage: language,
          updatedAt: serverTimestamp(),
        });

        return { ...prev, preferredLanguage: language };
      });
    },
    [],
  );

  const setRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev) {
        return prev;
      }

      if (!db) {
        return prev;
      }

      void updateDoc(doc(db, FIRESTORE_COLLECTIONS.users, prev.uid), {
        role,
        updatedAt: serverTimestamp(),
      });

      return { ...prev, role };
    });
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      signIn,
      signUp,
      logOut,
      setLanguage,
      setRole,
    }),
    [loading, logOut, setLanguage, setRole, signIn, signUp, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
