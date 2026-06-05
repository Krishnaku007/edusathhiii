import { openDB } from "idb";

const DB_NAME = "edusaathi-offline";

export const offlineDb = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("pending-sync")) {
      db.createObjectStore("pending-sync", { keyPath: "id" });
    }
  },
});

export interface PendingSyncItem {
  id: string;
  collection: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export async function addPendingSync(item: PendingSyncItem) {
  const db = await offlineDb;
  await db.put("pending-sync", item);
}

export async function getPendingSyncItems() {
  const db = await offlineDb;
  return db.getAll("pending-sync") as Promise<PendingSyncItem[]>;
}

export async function removePendingSyncItem(id: string) {
  const db = await offlineDb;
  await db.delete("pending-sync", id);
}
