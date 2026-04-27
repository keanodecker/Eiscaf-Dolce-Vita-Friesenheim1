"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-about-image]", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });
      gsap.from("[data-about-text] > *", {
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-creme-soft py-24 md:py-32">
      <div className="container-page grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <div
          data-about-image
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lg md:aspect-square"
        >
          {/* PLATZHALTER - durch echtes Bild von Inhaber/Team/Laden ersetzen */}
          <Image
            src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1600&q=80"
            alt="Gemütliches Eiscafé-Interieur mit warmer Atmosphäre"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div data-about-text>
          <p className="eyebrow">Über uns</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
            Familientradition trifft auf echte Leidenschaft.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-schokolade/80">
            {/* PLATZHALTER - vom Kunden mit echtem Text füllen */}
            Seit Jahren das Herz von Friesenheim: Bei uns kommen nur die besten Zutaten in
            die Kugel. Bio-Milch, regional, frisch — gemacht mit der Hand und dem Gefühl
            für das, was Eis wirklich besonders macht.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-schokolade/80">
            Komm vorbei, setz dich auf einen Plausch und lass dich verwöhnen — wie auf
            einer kleinen Reise nach Italien, mitten im Schwarzwald.
          </p>
          <Link href="/ueber-uns" className="btn-ghost mt-8">
            Mehr über uns <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
