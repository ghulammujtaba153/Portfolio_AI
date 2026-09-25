import { experience } from "@/lib/content";
import ExperienceStack from "@/components/pixel-perfect/experience-stack";
import ScrollHeadline from "@/components/pixel-perfect/scroll-headline";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-y section-pad border-y border-line bg-bg-panel/40"
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">02 · Experience</p>
        <ScrollHeadline className="heading mt-3 max-w-3xl">
          Product work and client delivery
        </ScrollHeadline>

        <ExperienceStack jobs={experience} />
      </div>
    </section>
  );
}
