import Hero from "@/components/sections/Hero";
import GalleryPreviewSection from "@/components/sections/GalleryPreviewSection";
import About from "@/components/sections/About";
import CertificatesSection from "@/components/sections/CertificatesSection";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GalleryPreviewSection />
      <About />
      <CertificatesSection />
      <Contact />
    </>
  );
}
