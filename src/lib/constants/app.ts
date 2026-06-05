import { SupportedLanguage } from "@/types";

export const APP_NAME = "EduSaathi";

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, string> = {
  en: "English",
  hi: "Hindi",
  bho: "Bhojpuri",
  mai: "Maithili",
};

export const FIRESTORE_COLLECTIONS = {
  users: "Users",
  schools: "Schools",
  chats: "Chats",
  quizzes: "Quizzes",
  progress: "Progress",
  studyPlans: "StudyPlans",
  assignments: "Assignments",
  resources: "Resources",
  achievements: "Achievements",
  ragChunks: "RagChunks",
} as const;
