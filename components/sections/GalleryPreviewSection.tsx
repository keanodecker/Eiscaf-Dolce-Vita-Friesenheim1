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

export default function GalleryPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<GalleryCategory>("eis");

  // Auf der Homepage nur die ersten 5 Bilder pro Kategorie
  const filtered = useMemo(
    () => galleryImages.filter((img) => img.category === active).slice(0, 5),
    [active],
  );

  // Initial-Reveal beim Scroll-In: Eyebrow / Headline / Pills
  useGSAP(
    () => {
      gsap.from(
        "[data-gallery-eyebrow], [data-gallery-headline], [data-gallery-pills]",
        {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      // Bilder mit Stagger einblenden, einmalig pro Sektion-Sichtbarkeit
      gsap.from("[data-gallery-tile]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef },
  );

  // Filter-Wechsel: alte Tiles ausblenden → neue mit Stagger einblenden
  useGSAP(
    () => {
      const tiles = gridRef.current?.querySelectorAll<HTMLElement>(
        "[data-gallery-tile]",
      );
      if (!tiles || tiles.length === 0) return;
      gsap.fromTo(
        tiles,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.06,
          clearProps: "transform",
        },
      );
    },
    { dependencies: [active], scope: gridRef },
  );

  return (
    <section
      ref={sectionRef}
      id="galerie-vorschau"
      className="bg-weiss px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p data-gallery-eyebrow className="eyebrow">
            Galerie Vorschau
          </p>
          <h2
            data-gallery-headline
            className="mt-4 font-serif text-5xl leading-tight md:text-7xl"
          >
            Einblicke
          </h2>

          <div
            data-gallery-pills
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {galleryFilters.map((f) => {
              const isActive = active === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-soft-out",
                    isActive
                      ? "bg-mint text-weiss shadow-sm"
                      : "border border-schokolade/20 bg-weiss text-schokolade hover:bg-mint-soft",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  <span aria-hidden="true">{f.emoji}</span> {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 md:grid-cols-5"
        >
          {filtered.map((img) => (
            <figure
              key={img.id}
              data-gallery-tile
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/galerie"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-schokolade px-7 py-3 text-sm font-medium text-schokolade transition-all duration-300 ease-soft-out hover:bg-schokolade hover:text-weiss"
          >
            Zur kompletten Galerie <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
