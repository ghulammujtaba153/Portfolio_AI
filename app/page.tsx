import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Sliding cover — reveals sticky contact underneath (Pixel Perfect footer-reveal) */}
        <div className="relative z-10 bg-bg">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
        </div>

        <div className="sticky bottom-0 z-0 bg-bg-elevated">
          <Contact />
          <SiteFooter />
        </div>
      </main>
    </>
  );
}
