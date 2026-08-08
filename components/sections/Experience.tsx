import { experience } from "@/lib/content";
import ExperienceStack from "@/components/pixel-perfect/experience-stack";
import ScrollHeadline from "@/components/pixel-perfect/scroll-headline";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-y section-pad border-y-[3px] border-ink"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
          Experience
        </p>
        <ScrollHeadline className="mt-3 max-w-4xl text-5xl font-extrabold uppercase tracking-tighter sm:text-6xl lg:text-7xl">
          Models, products, and production systems
        </ScrollHeadline>

        <ExperienceStack jobs={experience} />
      </div>
    </section>
  );
}
