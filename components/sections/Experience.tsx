import { experience } from "@/lib/content";
import ExperienceStack from "@/components/pixel-perfect/experience-stack";
import ScrollHeadline from "@/components/pixel-perfect/scroll-headline";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-y section-pad border-y border-line bg-bg-elevated/40"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          Experience
        </p>
        <ScrollHeadline className="mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Models, products, and production systems
        </ScrollHeadline>

        <ExperienceStack jobs={experience} />
      </div>
    </section>
  );
}
