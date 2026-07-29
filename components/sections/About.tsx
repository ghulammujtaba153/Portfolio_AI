import { education, profile } from "@/lib/content";
import AboutPanel from "@/components/sections/AboutPanel";
import FlipTextReveal from "@/components/pixel-perfect/flip-text-reveal";

export default function About() {
  return (
    <section id="about" className="section-y section-pad relative">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
            Profile
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Building AI systems that ship
          </h2>
          <div className="mt-8">
            <AboutPanel />
          </div>
        </div>

        <div className="space-y-8">
          <FlipTextReveal text={profile.summary} />
          <div className="border-t border-line pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Education
            </p>
            <ul className="mt-4 space-y-5">
              {education.map((item) => (
                <li key={`${item.school}-${item.degree}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-lg font-medium">{item.degree}</p>
                    {"status" in item && item.status ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                        {item.status}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-muted">
                    {item.school} · {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
