"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/siteConfig";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headline = root.current?.querySelector<HTMLElement>("[data-hero-headline]");
      if (headline) {
        const text = headline.textContent ?? "";
        headline.textContent = "";
        const letters = [...text].map((char) => {
          const span = document.createElement("span");
          span.className = "inline-block";
          span.style.whiteSpace = char === " " ? "pre" : "normal";
          span.textContent = char;
          headline.appendChild(span);
          return span;
        });

        gsap.from(letters, {
          yPercent: 120,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.04,
          delay: 0.2,
        });
      }

      gsap.from("[data-hero-sub]", {
        y: 24,
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: "power3.out",
      });

      gsap.from("[data-hero-badge]", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
      });

      gsap.from("[data-hero-scroll]", {
        opacity: 0,
        duration: 1,
        delay: 1.4,
        ease: "power2.out",
      });

      // Ken-Burns-Zoom auf dem Hintergrundbild
      gsap.fromTo(
        "[data-hero-image]",
        { scale: 1.05 },
        {
          scale: 1.18,
          duration: 18,
          ease: "none",
          repeat: -1,
          yoyo: true,
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* PLATZHALTER - durch echtes Hero-Bild ersetzen */}
      <div data-hero-image className="absolute inset-0 h-full w-full">
        <Image
          src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=2400&q=80"
          alt="Sonniger Tag vor dem Eiscafé Dolce Vita in Friesenheim"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <p className="eyebrow text-white/80">Benvenuti</p>
        <h1
          data-hero-headline
          className="mt-4 overflow-hidden font-serif text-7xl leading-[0.95] tracking-tight md:text-[10rem]"
        >
          Dolce Vita
        </h1>
        <p
          data-hero-sub
          className="mt-6 max-w-xl font-sans text-base text-white/85 md:text-lg"
        >
          {siteConfig.tagline} — 100% Bio-Milch, frisch, regional und mit ganz viel Liebe gemacht.
        </p>

        <a
          data-hero-badge
          href={siteConfig.rating.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-white/15 px-5 py-3 text-sm text-white backdrop-blur-md transition-all duration-300 ease-soft-out hover:scale-[1.03] hover:bg-white/25"
        >
          <span className="text-amber-300" aria-hidden="true">
            ★★★★★
          </span>
          <span className="font-sans">
            {siteConfig.rating.stars.toString().replace(".", ",")} / 5 · {siteConfig.rating.count} Bewertungen auf Google
          </span>
        </a>
      </div>

      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-xs uppercase tracking-[0.3em] text-white/70"
      >
        <p>Mehr entdecken</p>
        <div className="mx-auto mt-3 h-8 w-px bg-white/40">
          <div className="h-3 w-px animate-pulse bg-white" />
        </div>
      </div>
    </section>
  );
}
