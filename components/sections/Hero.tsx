"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/siteConfig";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // BENVENUTI Badge: kurzer Reveal vorab
      gsap.from("[data-hero-eyebrow]", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
      });

      // Headline: Buchstaben einzeln nach oben "fliegen"
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
          delay: 0.3,
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

      // Sehr langsames "Atmen" der dekorativen Blobs – ruhig, fast nicht wahrnehmbar
      gsap.to("[data-hero-blob]", {
        scale: 1.08,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 1.5, from: "random" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-creme-soft"
    >
      {/* Dezente Pastell-Blobs als Hintergrund-Akzent */}
      <div
        data-hero-blob
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-mint-soft opacity-70 blur-3xl"
      />
      <div
        data-hero-blob
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-1/4 h-[24rem] w-[24rem] rounded-full bg-rot-soft opacity-60 blur-3xl"
      />
      <div
        data-hero-blob
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-2/3 h-72 w-72 -translate-x-1/2 rounded-full bg-mint-soft opacity-40 blur-3xl"
      />

      {/* Inhalt */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center text-schokolade">
        <span
          data-hero-eyebrow
          className="inline-block rounded-full bg-mint px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-weiss shadow-sm"
        >
          Benvenuti
        </span>

        <h1
          data-hero-headline
          className="mt-8 overflow-hidden font-serif text-7xl leading-[0.95] tracking-tight text-schokolade md:text-[10rem]"
        >
          Dolce Vita
        </h1>

        <p
          data-hero-sub
          className="mt-6 max-w-xl font-sans text-base text-schokolade/70 md:text-lg"
        >
          {siteConfig.tagline} — 100% Bio-Milch, frisch, regional und mit ganz viel Liebe gemacht.
        </p>

        <a
          data-hero-badge
          href={siteConfig.rating.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-3 rounded-full border border-schokolade/10 bg-weiss/80 px-5 py-3 text-sm text-schokolade shadow-sm backdrop-blur-md transition-all duration-300 ease-soft-out hover:scale-[1.03] hover:bg-weiss"
        >
          <span className="text-amber-500" aria-hidden="true">
            ★★★★★
          </span>
          <span className="font-sans">
            {siteConfig.rating.stars.toString().replace(".", ",")} / 5 · {siteConfig.rating.count} Bewertungen auf Google
          </span>
        </a>
      </div>

      {/* Scroll-Indikator */}
      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-xs uppercase tracking-[0.3em] text-schokolade/50"
      >
        <p>Mehr entdecken</p>
        <div className="mx-auto mt-3 h-8 w-px bg-schokolade/30">
          <div className="h-3 w-px animate-pulse bg-schokolade/70" />
        </div>
      </div>
    </section>
  );
}
