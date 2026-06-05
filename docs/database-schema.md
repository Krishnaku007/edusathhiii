# EduSaathi Firestore Data Model

## Collections

### Users
- uid: string
- name: string
- email: string
- role: student | teacher | admin
- grade: string
- preferredLanguage: en | hi | bho | mai
- schoolId: string
- createdAt: string (ISO)

### Schools
- name: string
- district: string
- state: string
- board: string
- createdAt: string

### Chats
- userId: string
- messages: array<{ role, content, createdAt, language }>
- language: string
- mode: standard | rag
- createdAt: string

### Quizzes
- userId: string
- topic: string
- difficulty: easy | medium | hard
- questions: array
- answers: map
- score: number
- maxScore: number
- createdAt: string

### Progress
- userId: string
- topicsStudied: string[]
- timeSpentMinutes: number
- streakDays: number
- accuracyPercentage: number
- weakSubjects: string[]
- updatedAt: string

### StudyPlans
- userId: string
- examDate: string
- plan: array<{ day, title, tasks[] }>
- createdAt: string

### Assignments
- teacherId: string
- classId: string
- topic: string
- dueDate: string
- createdAt: string

### Resources
- uploadedBy: string
- sourceType: ncert | notes | worksheet
- fileUrl: string
- textContent: string
- createdAt: string

### Achievements
- userId: string
- xp: number
- badges: string[]
- weeklyChallengeStatus: string
- updatedAt: string

### RagChunks
- source: string
- text: string
- embedding: number[]
- index: number
- createdAt: string
