"use client";

import { useEffect, useState } from "react";
import { getTodayStatus, getTodayLabel, TodayStatus } from "@/lib/openingStatus";

export default function TodayBadge() {
  const [status, setStatus] = useState<TodayStatus | null>(null);

  useEffect(() => {
    setStatus(getTodayStatus());
    // einmal pro Minute aktualisieren, falls die Seite lange offen bleibt
    const id = setInterval(() => setStatus(getTodayStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    return <span className="inline-block h-7" aria-hidden="true" />;
  }

  const isOpen = status.state === "open";
  const isRest = status.state === "rest-day";
  const dotColor = isOpen
    ? "bg-emerald-500"
    : isRest
      ? "bg-rose-400"
      : "bg-amber-400";

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium text-schokolade backdrop-blur-md">
      <span className={`relative flex h-2 w-2`}>
        {isOpen ? (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dotColor} opacity-60`} />
        ) : null}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`} />
      </span>
      {getTodayLabel(status)}
    </span>
  );
}
