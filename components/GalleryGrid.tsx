"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  galleryImages,
  galleryFilters,
  GalleryCategory,
} from "@/data/galleryImages";

export default function GalleryGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<GalleryCategory>("eis");

  const filtered = useMemo(
    () => galleryImages.filter((img) => img.category === active),
    [active],
  );

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-gallery-tile]");
      if (!cards || cards.length === 0) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.05,
        },
      );
    },
    { dependencies: [active], scope: gridRef },
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {galleryFilters.map((f) => {
          const isActive = active === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              className={[
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-300 ease-soft-out",
                isActive
                  ? "bg-mint text-schokolade"
                  : "bg-mint-soft text-schokolade/80 hover:bg-mint hover:text-schokolade",
              ].join(" ")}
              aria-pressed={isActive}
            >
              <span aria-hidden="true">{f.emoji}</span> {f.label}
            </button>
          );
        })}
      </div>

      <div
        ref={gridRef}
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
      >
        {filtered.map((img) => (
          <figure
            key={img.id}
            data-gallery-tile
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-soft-out group-hover:scale-105"
            />
          </figure>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-sm text-schokolade/60">
          Bald gibts hier mehr zu sehen.
        </p>
      ) : null}
    </>
  );
}
