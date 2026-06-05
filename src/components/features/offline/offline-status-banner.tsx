"use client";

import { useEffect, useState } from "react";

export function OfflineStatusBanner() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (online) {
    return null;
  }

  return (
    <div className="w-full bg-danger px-3 py-2 text-center text-sm font-semibold text-white">
      You are offline. EduSaathi will save actions locally and sync when internet returns.
    </div>
  );
}
