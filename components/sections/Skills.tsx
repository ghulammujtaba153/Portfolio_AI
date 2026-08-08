import { skillGroups } from "@/lib/content";
import BarWaveAnimation from "@/components/pixel-perfect/bar-wave-animation";
import SkillLogo from "@/components/skills/SkillLogo";
import BrutalAccent from "@/components/sections/BrutalAccent";

export default function Skills() {
  return (
    <section id="skills" className="section-y relative overflow-hidden border-y-[3px] border-ink">
      <BrutalAccent side="left" />
      <div className="section-pad relative mx-auto max-w-6xl">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
          Skills
        </p>
        <h2 className="mt-3 max-w-4xl text-5xl font-extrabold uppercase tracking-tighter sm:text-6xl lg:text-7xl">
          Stack for end-to-end AI engineering
        </h2>
        <BarWaveAnimation className="mt-8" />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="border-b-[3px] border-ink pb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
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
