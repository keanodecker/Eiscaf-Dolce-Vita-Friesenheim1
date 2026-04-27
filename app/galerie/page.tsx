import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Eindrücke aus unserem Eiscafé in Friesenheim — Eis, Süßes und Getränke.",
};

export default function GaleriePage() {
  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title="Bilder, die Lust auf Eis machen."
        intro="Ein Blick in unseren Alltag — von handgemachten Gelati über frische Kuchen bis hin zu eisgekühlten Getränken."
      />
      <section className="bg-weiss pb-24 md:pb-32">
        <div className="container-page">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
