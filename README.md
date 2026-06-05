# EduSaathi - AI-Powered Learning Assistant for Rural India

EduSaathi is a production-oriented full-stack platform for Classes 1-12 that provides multilingual AI tutoring, adaptive quizzes, voice interactions, teacher analytics, study planning, and offline-first learning support.

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- ShadCN-style reusable UI components
- Framer Motion
- Recharts

### Backend & Data
- Firebase Authentication (integration ready)
- Firebase Firestore
- Firebase Storage (integration ready)
- Firebase Cloud Functions scaffold

### AI Layer
- Google Gemini API (`gemini-1.5-flash`)
- Gemini Embeddings (`text-embedding-004`)
- RAG pipeline with chunk retrieval from Firestore

### Offline & Device Features
- PWA support via service worker
- IndexedDB queue for offline writes
- Web Speech API (Speech-to-Text + Text-to-Speech)

## Features Implemented

- AI Tutor chat with age-appropriate prompting
- Dynamic multilingual support (English, Hindi, Bhojpuri, Maithili)
- Voice assistant controls (mic + read aloud)
- AI quiz generation (MCQ, T/F, fill, short answer)
- Auto evaluation endpoint with score + feedback
- Homework solver + diagram explanation endpoints
- Study planner generator from exam date
- Student analytics and personalized recommendations UI
- Teacher analytics dashboard with line, bar, pie charts
- Admin management dashboard shell
- RAG indexing and strict query endpoints
- Role-based security rules for Firestore
- Offline sync API + IndexedDB queue architecture

## Release Changelog (main)

### 2026-06-05 - EduSaathi Foundation Release

Commit: d3392c6

Added:
- Full Next.js 15 App Router frontend with mobile-first flows for landing, login, student, teacher, admin, planner, analytics, chat, and quiz pages.
- Firebase integration scaffolding for Auth, Firestore, Storage, and Admin SDK.
- Gemini-based AI APIs for tutor chat, quiz generation, auto-evaluation, study planner, homework solving, and diagram explanation.
- RAG pipeline endpoints for indexing and retrieval using embeddings.
- Offline-first support with service worker, installable manifest, IndexedDB pending-sync queue, and replay API.
- Teacher analytics visualizations using Recharts.
- Role-aware route protection for student, teacher, and admin sections.

Improved:
- Runtime safety when Firebase environment variables are missing locally.
- Validation and linting pipeline (`npm run check`) with clean TypeScript and ESLint output.
- Documentation coverage for architecture, API surface, schema, setup, and deployment.

Security:
- Firestore role-based security rules and index configuration.
- Basic API rate limiting and request validation with Zod.

## Project Structure

```text
.
|-- docs/
|   |-- api-reference.md
|   |-- architecture.md
|   `-- database-schema.md
|-- firestore/
|   |-- firestore.indexes.json
|   `-- firestore.rules
|-- functions/
|   |-- package.json
|   |-- src/index.ts
|   `-- tsconfig.json
|-- public/
|   |-- icon.svg
|   `-- sw.js
|-- src/
|   |-- app/
|   |   |-- (auth)/login/page.tsx
|   |   |-- admin/dashboard/page.tsx
|   |   |-- api/
|   |   |   |-- ai/
|   |   |   |-- offline/sync/route.ts
|   |   |   `-- rag/
|   |   |-- settings/page.tsx
|   |   |-- student/
|   |   |-- teacher/dashboard/page.tsx
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   |-- manifest.ts
|   |   `-- page.tsx
|   |-- components/
|   |-- data/mock.ts
|   |-- lib/
|   |-- providers/
|   `-- types/index.ts
|-- .env.example
|-- firebase.json
|-- next.config.ts
`-- package.json
```

## Firestore Collections

- Users
- Schools
- Chats
- Quizzes
- Progress
- StudyPlans
- Assignments
- Resources
- Achievements
- RagChunks

See [docs/database-schema.md](docs/database-schema.md) for complete schema details.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env.local
```

3. Start development server:
```bash
npm run dev
```

4. Open app:
- http://localhost:3000

## Firebase Setup

1. Create Firebase project.
2. Enable Authentication providers.
3. Create Firestore database.
4. Add `.env.local` values from Firebase project settings.
5. Deploy Firestore rules/indexes:
```bash
firebase deploy --only firestore
```

## Gemini Setup

1. Create API key in Google AI Studio.
2. Add key in `.env.local`:
```bash
GEMINI_API_KEY=your_key
```

## RAG Workflow

1. Upload PDF/text resources and extract plain text.
2. Call `POST /api/rag/index` with source + text.
3. Query using `POST /api/rag/query`.
4. In strict mode, answer is generated only from retrieved chunks.

## PWA + Offline Flow

- Service worker caches shell routes and key assets.
- Offline actions are stored in IndexedDB (`pending-sync`).
- On reconnect, `syncOfflineData()` replays items to `/api/offline/sync`.

## Security Model

- Role-aware Firestore security rules (student/teacher/admin)
- Rate limiting on AI chat endpoint
- Zod request validation on key API routes
- Server-side writes through Firebase Admin where required

## Deployment

### Frontend (Vercel)
1. Import repository into Vercel.
2. Add all env vars from `.env.example`.
3. Deploy with default Next.js settings.

### Backend (Firebase)
1. Install Firebase CLI.
2. Deploy functions/rules/indexes:
```bash
firebase deploy
```

## Portfolio Notes

This repository is structured to demonstrate:
- scalable full-stack architecture
- AI integration patterns (chat, generation, embeddings, RAG)
- offline-first product thinking for low-bandwidth users
- role-based product design (student/teacher/admin)

## Next Production Upgrades

- Replace demo auth context with full Firebase auth session handling.
- Add PDF parsing pipeline and automated indexing job.
- Add observability (Sentry + OpenTelemetry).
- Add end-to-end tests (Playwright) and API integration tests.
- Add robust cloud rate limiting and usage quotas.
