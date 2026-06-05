import { adminDb } from "@/lib/firebase/admin";
import { FIRESTORE_COLLECTIONS } from "@/lib/constants/app";
import { cosineSimilarity } from "@/lib/rag/chunk";

interface RagChunk {
  id: string;
  text: string;
  source: string;
  embedding: number[];
}

export async function retrieveTopChunks(queryEmbedding: number[], topK = 4) {
  if (!adminDb || queryEmbedding.length === 0) {
    return [] as RagChunk[];
  }

  const snapshot = await adminDb.collection(FIRESTORE_COLLECTIONS.ragChunks).limit(200).get();

  const scored = snapshot.docs
    .map((doc) => {
      const data = doc.data() as Omit<RagChunk, "id">;
      return {
        id: doc.id,
        ...data,
        score: cosineSimilarity(queryEmbedding, data.embedding || []),
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}
