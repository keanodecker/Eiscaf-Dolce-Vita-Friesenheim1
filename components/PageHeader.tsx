"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-page-header] > *", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="bg-weiss pb-12 pt-40 md:pb-20 md:pt-48"
    >
      <div className="container-page" data-page-header>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.05] md:text-8xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-schokolade/80 md:text-lg">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
