import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    id: string;
    collection: string;
    payload: Record<string, unknown>;
  };

  if (!body.collection || !body.id) {
    return NextResponse.json({ error: "Invalid sync payload" }, { status: 400 });
  }

  if (!adminDb) {
    return NextResponse.json({ error: "Server DB unavailable" }, { status: 503 });
  }

  await adminDb.collection(body.collection).doc(body.id).set(
    {
      ...body.payload,
      syncedAt: new Date().toISOString(),
    },
    { merge: true },
  );

  return NextResponse.json({ ok: true });
}
