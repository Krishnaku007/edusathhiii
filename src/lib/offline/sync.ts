import { getPendingSyncItems, removePendingSyncItem } from "@/lib/offline/db";

export async function syncOfflineData() {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return { synced: 0, pending: (await getPendingSyncItems()).length };
  }

  const pending = await getPendingSyncItems();
  let synced = 0;

  for (const item of pending) {
    const res = await fetch("/api/offline/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      await removePendingSyncItem(item.id);
      synced += 1;
    }
  }

  return { synced, pending: pending.length - synced };
}
