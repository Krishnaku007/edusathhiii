import { LearningProgress } from "@/types";

export const mockProgress: LearningProgress = {
  userId: "demo-student",
  topicsStudied: ["Fractions", "Photosynthesis", "Electric Circuits", "Soil Types"],
  timeSpentMinutes: 860,
  accuracyPercentage: 72,
  streakDays: 9,
  weakSubjects: ["Mathematics", "Science"],
  updatedAt: new Date().toISOString(),
};

export const teacherSeries = [
  { week: "W1", avgScore: 58, engagement: 61 },
  { week: "W2", avgScore: 63, engagement: 65 },
  { week: "W3", avgScore: 67, engagement: 71 },
  { week: "W4", avgScore: 74, engagement: 79 },
];

export const topicMastery = [
  { topic: "Fractions", mastery: 49 },
  { topic: "Plant Biology", mastery: 76 },
  { topic: "Geography Maps", mastery: 67 },
  { topic: "Grammar", mastery: 58 },
];

export const classMix = [
  { name: "Strong", value: 34 },
  { name: "Average", value: 45 },
  { name: "Needs Support", value: 21 },
];
