# EduSaathi Architecture

## Frontend
- Next.js 15 App Router
- TypeScript strict mode
- Tailwind CSS + reusable UI primitives (ShadCN-style component pattern)
- Framer Motion for landing animations
- Recharts for teacher analytics

## Backend
- API routes under src/app/api
- Firebase Auth + Firestore + Storage integration points
- Firebase Admin for secure server writes and RAG chunk indexing

## AI Layer
- Gemini chat for tutor, solver, planner
- Gemini embeddings for RAG retrieval
- Strict RAG mode endpoint that answers only from indexed chunks

## Offline + PWA
- Service worker (public/sw.js)
- IndexedDB queue for write operations
- /api/offline/sync for replaying offline writes

## Security
- Zod request validation on key routes
- In-memory rate limiter for chat endpoint
- Firestore RBAC rules for student/teacher/admin access

## Deployment
- Frontend: Vercel
- Backend/DB: Firebase
