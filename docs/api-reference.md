# API Reference

## POST /api/ai/chat
Request: { message, language, grade }
Response: { answer }

## POST /api/ai/quiz
Request: { topic, difficulty, sourceText? }
Response: { questions[] }

## POST /api/ai/evaluate
Request: { questions[], answers }
Response: { score, maxScore, feedback }

## POST /api/ai/study-plan
Request: { examDate }
Response: { plan[] }

## POST /api/ai/homework-solver
Request: { imageUrl? , questionText? }
Response: { solution }

## POST /api/ai/diagram-explain
Request: { imageUrl, language? }
Response: { explanation }

## POST /api/rag/index
Request: { source, text }
Response: { indexed }

## POST /api/rag/query
Request: { query, strictMode? }
Response: { answer, sources[] }

## POST /api/offline/sync
Request: { id, collection, payload }
Response: { ok }
