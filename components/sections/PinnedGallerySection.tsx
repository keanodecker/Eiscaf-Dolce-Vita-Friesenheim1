"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  galleryImages,
  galleryFilters,
  GalleryCategory,
} from "@/data/galleryImages";

export default function PinnedGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<GalleryCategory>("eis");

  const filtered = useMemo(
    () => galleryImages.filter((i) => i.category === active),
    [active],
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // === Desktop (≥768px) + keine reduced-motion: Pin-Scroll ===
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const section = sectionRef.current;
          if (!track || !section) return;

          // Cards sichtbar machen, Track auf Anfang setzen
          const cards = track.querySelectorAll<HTMLElement>("[data-gallery-card]");
          gsap.set(track, { x: 0 });
          gsap.fromTo(
            cards,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.04 },
          );

          const getDistance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth + 64);

          if (getDistance() <= 0) return;

          gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getDistance()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressRef.current) {
                  progressRef.current.style.transform = `scaleX(${self.progress})`;
                }
                if (counterRef.current) {
                  const total = filtered.length;
                  const idx = Math.min(
                    total,
                    Math.max(1, Math.ceil(self.progress * total) || 1),
                  );
                  counterRef.current.textContent = String(idx);
                }
              },
            },
          });

          ScrollTrigger.refresh();
        },
      );

      // === Mobile + reduced-motion: nativer Horizontal-Scroll, kein Pin ===
      mm.add(
        "(max-width: 767px), (prefers-reduced-motion: reduce)",
        () => {
          const track = trackRef.current;
          if (!track) return;
          // Track-Position resetten falls Desktop-Tween was übrig gelassen hat
          gsap.set(track, { x: 0 });
          const cards = track.querySelectorAll<HTMLElement>("[data-gallery-card]");
          gsap.fromTo(
            cards,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.04 },
          );
        },
      );
    },
    { scope: sectionRef, dependencies: [active] },
  );

  return (
    <section
      ref={sectionRef}
      id="galerie-vorschau"
      className="relative bg-weiss md:h-screen md:overflow-hidden"
    >
      {/* Header: in-flow auf Mobile, absolute Overlay auf Desktop */}
      <div className="relative z-20 bg-weiss pb-6 pt-24 md:absolute md:inset-x-0 md:top-0 md:bg-weiss/95 md:pb-8 md:pt-28 md:backdrop-blur-sm">
        <div className="container-page text-center">
          <p className="eyebrow">Galerie Vorschau</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
            Einblicke
          </h2>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
                      : "bg-weiss text-schokolade/80 ring-1 ring-schokolade/10 hover:bg-mint-soft",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  <span aria-hidden="true">{f.emoji}</span> {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Track-Wrapper: in-flow auf Mobile, absolute zentriert auf Desktop */}
      <div className="relative md:absolute md:inset-0 md:flex md:items-center md:pt-44">
        <div
          ref={trackRef}
          className={[
            "flex items-center gap-6 pb-12 md:gap-8 md:pb-0",
            "px-6 overflow-x-auto [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden",
            "md:px-16 md:overflow-visible md:[scroll-snap-type:none] md:will-change-transform",
          ].join(" ")}
          data-lenis-prevent
        >
          {filtered.map((img) => (
            <article
              key={img.id}
              data-gallery-card
              tabIndex={0}
              className="group relative h-[400px] w-[70vw] flex-shrink-0 overflow-hidden rounded-3xl shadow-lg outline-none transition-shadow duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-mint sm:w-[55vw] md:h-[60vh] md:w-[24vw] [scroll-snap-align:start]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 70vw, 24vw"
                className="object-cover transition-transform duration-700 ease-soft-out group-hover:scale-105"
              />
            </article>
          ))}
        </div>
      </div>

      {/* Progress-Bar (nur Desktop) */}
      <div className="pointer-events-none absolute inset-x-16 bottom-8 z-10 hidden h-0.5 overflow-hidden rounded-full bg-mint/20 md:block">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-mint"
        />
      </div>

      {/* Counter (nur Desktop) */}
      <div className="pointer-events-none absolute right-8 top-32 z-30 hidden text-xs font-medium uppercase tracking-wider text-schokolade/60 md:flex md:items-center md:gap-1">
        <span ref={counterRef}>1</span>
        <span>/</span>
        <span>{filtered.length}</span>
      </div>
    </section>
  );
}
