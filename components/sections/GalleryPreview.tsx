"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  galleryImages,
  galleryFilters,
  GalleryCategory,
} from "@/data/galleryImages";

export default function GalleryPreview() {
  const root = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<GalleryCategory>("eis");

  const filtered = useMemo(
    () => galleryImages.filter((img) => img.category === active).slice(0, 9),
    [active],
  );

  // Initial-Reveal beim Scroll-In
  useGSAP(
    () => {
      gsap.from("[data-gallery-eyebrow], [data-gallery-headline], [data-gallery-pills]", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });

      gsap.from("[data-gallery-card]", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: root },
  );

  // Filter-Wechsel: alle Karten fade-out → ersetzen → fade-in mit Stagger
  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-gallery-card]");
      if (!cards || cards.length === 0) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.04,
        },
      );
    },
    { dependencies: [active], scope: gridRef },
  );

  return (
    <section ref={root} id="galerie-vorschau" className="bg-weiss py-24 md:py-32">
      <div className="container-page">
        <p data-gallery-eyebrow className="eyebrow text-center">
          Galerie Vorschau
        </p>
        <h2
          data-gallery-headline
          className="mt-4 text-center font-serif text-5xl leading-tight md:text-7xl"
        >
          Einblicke
        </h2>

        <div
          data-gallery-pills
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
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
      </div>

      {/* Horizontaler Slider mit Snap & Drag-Cursor – außerhalb container-page für edge-to-edge */}
      <div
        ref={gridRef}
        className="mt-12 flex cursor-grab gap-4 overflow-x-auto px-6 pb-4 active:cursor-grabbing md:gap-6 md:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden"
        data-lenis-prevent
      >
        {filtered.map((img) => (
          <article
            key={img.id}
            data-gallery-card
            className="group relative aspect-[4/5] h-[400px] flex-shrink-0 overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl [scroll-snap-align:start]"
            style={{ width: "min(78vw, 320px)" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 78vw, 320px"
              className="object-cover transition-transform duration-700 ease-soft-out group-hover:scale-105"
            />
          </article>
        ))}
      </div>

      <div className="container-page mt-12 text-center">
        <Link href="/galerie" className="btn-primary">
          Zur kompletten Galerie
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
