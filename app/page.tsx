import Hero from "@/components/sections/Hero";
import PinnedGallerySection from "@/components/sections/PinnedGallerySection";
import About from "@/components/sections/About";
import CertificatesSection from "@/components/sections/CertificatesSection";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PinnedGallerySection />
      <About />
      <CertificatesSection />
      <Contact />
    </>
  );
}
