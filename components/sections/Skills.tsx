import { skillGroups } from "@/lib/content";
import BarWaveAnimation from "@/components/pixel-perfect/bar-wave-animation";
import SkillLogo from "@/components/skills/SkillLogo";

export default function Skills() {
  return (
    <section id="skills" className="section-y border-y border-line bg-bg-elevated/30">
      <div className="section-pad mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          Skills
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Stack for end-to-end AI engineering
        </h2>
        <BarWaveAnimation className="mt-8" />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {group.label}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-muted"
                  >
                    <SkillLogo name={item} size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
