import { NextRequest, NextResponse } from "next/server";
import { chunkText } from "@/lib/rag/chunk";
import { embedText } from "@/lib/ai/gemini";
import { adminDb } from "@/lib/firebase/admin";
import { FIRESTORE_COLLECTIONS } from "@/lib/constants/app";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { source: string; text: string };

  if (!body.text || !body.source) {
    return NextResponse.json({ error: "source and text are required" }, { status: 400 });
  }

  const chunks = chunkText(body.text, 700);

  if (!adminDb) {
    return NextResponse.json({
      indexed: 0,
      warning: "Firebase admin credentials are missing. Configure server env vars.",
    });
  }

  for (const [index, chunk] of chunks.entries()) {
    const embedding = await embedText(chunk);
    await adminDb.collection(FIRESTORE_COLLECTIONS.ragChunks).add({
      source: body.source,
      text: chunk,
      embedding,
      index,
      createdAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({ indexed: chunks.length });
}
