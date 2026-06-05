export type UserRole = "student" | "teacher" | "admin";

export type SupportedLanguage = "en" | "hi" | "bho" | "mai";

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  grade?: string;
  schoolId?: string;
  preferredLanguage: SupportedLanguage;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  language: SupportedLanguage;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "true_false" | "fill_blank" | "short_answer";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizResult {
  score: number;
  maxScore: number;
  feedback: string;
  weakTopics: string[];
}

export interface LearningProgress {
  userId: string;
  topicsStudied: string[];
  timeSpentMinutes: number;
  accuracyPercentage: number;
  streakDays: number;
  weakSubjects: string[];
  updatedAt: string;
}

export interface StudyPlanDay {
  day: number;
  title: string;
  tasks: string[];
}
