"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Zeigt einen Hinweis-Banner solange die Saison noch nicht eröffnet ist.
 * Blendet sich automatisch ab `siteConfig.seasonOpenDate` aus.
 */
export default function SeasonBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const open = new Date(siteConfig.seasonOpenDate + "T00:00:00");
    const now = new Date();
    setShow(now < open);
  }, []);

  if (!show) return null;

  const openDate = new Date(siteConfig.seasonOpenDate + "T00:00:00");
  const formatted = openDate.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-x-0 top-0 z-[60] bg-rot-soft text-schokolade backdrop-blur-md">
      <div className="container-page flex items-center justify-center gap-2 py-2 text-center text-xs font-medium md:text-sm">
        <span aria-hidden="true">🍦</span>
        <span>
          Saisoneröffnung am {formatted} – wir freuen uns auf euch!
        </span>
      </div>
    </div>
  );
}
