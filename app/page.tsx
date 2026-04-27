import Hero from "@/components/sections/Hero";
import GalleryPreview from "@/components/sections/GalleryPreview";
import About from "@/components/sections/About";
import CertificatesSection from "@/components/sections/CertificatesSection";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GalleryPreview />
      <About />
      <CertificatesSection />
      <Contact />
    </>
  );
}
