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
        <div className="relative z-10">
          <div style={{ background: "var(--mist)" }}>
            <Hero />
          </div>
          <div style={{ background: "var(--ivory)" }}>
            <About />
          </div>
          <div style={{ background: "var(--linen)" }}>
            <Experience />
          </div>
          <div style={{ background: "var(--snow)" }}>
            <Projects />
          </div>
          <div style={{ background: "var(--cream)" }}>
            <Skills />
          </div>
        </div>

        <div
          className="sticky bottom-0 z-0"
          style={{ background: "var(--bg-elevated)" }}
        >
          <Contact />
          <SiteFooter />
        </div>
      </main>
    </>
  );
}
