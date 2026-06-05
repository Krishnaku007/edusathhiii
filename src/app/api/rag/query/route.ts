import { NextRequest, NextResponse } from "next/server";
import { embedText, generateWithGemini } from "@/lib/ai/gemini";
import { retrieveTopChunks } from "@/lib/rag/retriever";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { query: string; strictMode?: boolean };

  if (!body.query) {
    return NextResponse.json({ error: "query is required" }, { status: 400 });
  }

  const queryEmbedding = await embedText(body.query);
  const chunks = await retrieveTopChunks(queryEmbedding, 4);

  if (!chunks.length) {
    return NextResponse.json({
      answer:
        "No matching educational resource found in RAG store. Upload NCERT/teacher notes first.",
      sources: [],
    });
  }

  const context = chunks.map((chunk, idx) => `[${idx + 1}] ${chunk.text}`).join("\n\n");

  const answer = await generateWithGemini(
    `Answer only using the context below. If answer not present, say 'Not found in resources'.\n\nContext:\n${context}\n\nQuestion: ${body.query}`,
  );

  return NextResponse.json({
    answer,
    sources: chunks.map((chunk) => chunk.source),
    strictMode: body.strictMode ?? true,
  });
}
