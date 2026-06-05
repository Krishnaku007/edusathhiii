# Project Organization Guide

This repository follows a domain-first structure so new code is easy to find, review, and debug.

## Core Folder Map

- `src/app`: Next.js App Router pages, layouts, API routes.
- `src/components`: UI and feature components.
- `src/config`: centralized app configuration (navigation, theme constants).
- `src/lib`: integrations and pure utilities (Firebase, AI, RAG, offline, security).
- `src/providers`: React context and app-level providers.
- `src/types`: shared TypeScript domain types.
- `src/data`: mock/demo datasets for charts and local development.

## Search-Friendly Rules

- Keep reusable primitives in `src/components/ui`.
- Keep route-independent feature widgets in `src/components/features`.
- Keep constants/config in `src/config` and avoid hardcoded route arrays in components.
- Export folder public APIs through local `index.ts` files.
- Keep API logic split by capability in `src/app/api/{domain}`.

## Debugging Conventions

- Routing/role issues: start at `src/components/auth/role-guard.tsx`.
- Session/auth issues: start at `src/providers/auth-provider.tsx`.
- Firebase config issues: start at `src/lib/firebase/client.ts`.
- AI output issues: start at `src/lib/ai/*` and `src/app/api/ai/*`.
- RAG retrieval issues: start at `src/lib/rag/*` and `src/app/api/rag/*`.

## Theme System

- Global tokens and utility classes live in `src/app/globals.css`.
- JS theme constants live in `src/config/theme.ts`.
- Use semantic tokens (`brand`, `surface`, `muted`, `danger`) instead of raw hex values in components.
