"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CertItem {
  badge: string;
  badgeVariant: "mint" | "rot";
  title: string;
  text: string;
  image: string;
  alt: string;
  /** Hintergrund-Klasse für die Bild-Hälfte (subtiler Farbakzent) */
  imageBg: string;
  cta?: { label: string; href: string };
}

const items: CertItem[] = [
  {
    badge: "🥛 Zertifiziert",
    badgeVariant: "mint",
    title: "100% Biomilch",
    text: "Wir verarbeiten ausschließlich zertifizierte Biomilch aus der Region. Unsere Partner-Höfe arbeiten nach strengen Bio-Richtlinien – für puren Geschmack und gutes Gewissen in jeder Kugel.",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80",
    alt: "Glückliche Kühe auf einer grünen Weide",
    imageBg: "bg-mint-soft",
    cta: { label: "Zur Speisekarte", href: "/speisekarte" },
  },
  {
    badge: "🌿 Nachhaltig",
    badgeVariant: "mint",
    title: "Nachhaltig & Regional",
    text: "Von der Verpackung bis zur Zutat – wir denken bei jedem Detail an unsere Umwelt. Kurze Lieferwege, biologisch abbaubare Materialien und Partner aus der Region rund um Friesenheim.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80",
    alt: "Sonnendurchfluteter Wald, Symbol für Nachhaltigkeit",
    imageBg: "bg-mint-soft",
  },
  {
    badge: "✅ Ausgezeichnet",
    badgeVariant: "rot",
    title: "Ausgezeichnete Hygiene",
    text: "Regelmäßige unabhängige Prüfungen bestätigen unsere höchsten Sauberkeitsstandards. Mehrfach zertifiziert – damit du dich auf jeden Löffel verlassen kannst.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80",
    alt: "Saubere Profiküche, Symbol für höchste Hygienestandards",
    imageBg: "bg-rot-soft",
  },
];

export default function CertificatesSection() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-cert-section]", root.current);
      const mm = gsap.matchMedia();

      // Reduced Motion: keine Animation, alles direkt sichtbar
      mm.add("(prefers-reduced-motion: reduce)", () => {
        sections.forEach((section) => {
          const img = section.querySelector<HTMLElement>("[data-cert-img]");
          const text = section.querySelector<HTMLElement>("[data-cert-text]");
          gsap.set([img, text], { x: 0, opacity: 1 });
        });
      });

      // Desktop: Scrub-Animation mit langem End-Punkt
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        sections.forEach((section, i) => {
          const isMirrored = i === 1;
          const img = section.querySelector<HTMLElement>("[data-cert-img]");
          const text = section.querySelector<HTMLElement>("[data-cert-text]");

          gsap.fromTo(
            img,
            { x: isMirrored ? 100 : -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "top 25%",
                scrub: 1.5,
              },
            },
          );

          gsap.fromTo(
            text,
            { x: isMirrored ? -100 : 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "top 25%",
                scrub: 1.5,
              },
            },
          );
        });
      });

      // Mobile: einmaliger Reveal, kein Scrub
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        sections.forEach((section, i) => {
          const isMirrored = i === 1;
          const img = section.querySelector<HTMLElement>("[data-cert-img]");
          const text = section.querySelector<HTMLElement>("[data-cert-text]");

          gsap.fromTo(
            img,
            { x: isMirrored ? 60 : -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true,
              },
            },
          );

          gsap.fromTo(
            text,
            { x: isMirrored ? -60 : 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-weiss">
      {items.map((item, i) => {
        const mirrored = i === 1;
        return (
          <section
            key={item.title}
            data-cert-section
            className={[
              "relative flex min-h-[80vh] w-full flex-col bg-weiss md:flex-row",
              mirrored ? "md:flex-row-reverse" : "",
            ].join(" ")}
          >
            {/* Bild-Hälfte mit farbigem Hintergrund + abgerundetem Bild */}
            <div
              className={[
                "flex w-full items-center justify-center p-6 md:w-1/2 md:p-10",
                item.imageBg,
              ].join(" ")}
            >
              <div
                data-cert-img
                className="relative h-full min-h-[400px] w-full overflow-hidden rounded-3xl shadow-xl will-change-transform md:min-h-[500px]"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>

            {/* Text-Hälfte */}
            <div
              data-cert-text
              className="flex w-full flex-col justify-center bg-weiss px-8 py-16 will-change-transform md:w-1/2 md:px-16 lg:px-24"
            >
              <span
                className={[
                  "inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-wider",
                  item.badgeVariant === "rot"
                    ? "bg-rot-soft text-rot"
                    : "bg-mint-soft text-mint",
                ].join(" ")}
              >
                {item.badge}
              </span>

              <h2
                className="mb-4 mt-6 font-serif font-medium leading-tight text-schokolade"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                {item.title}
              </h2>

              <p className="mb-8 max-w-prose text-base leading-relaxed text-schokolade/80 md:text-lg">
                {item.text}
              </p>

              {item.cta ? (
                <Link
                  href={item.cta.href}
                  className="inline-flex w-fit items-center justify-center rounded-full border border-schokolade px-6 py-3 text-sm font-medium text-schokolade transition-all duration-300 ease-soft-out hover:bg-schokolade hover:text-weiss"
                >
                  {item.cta.label}
                </Link>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}
