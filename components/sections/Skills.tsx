import { skillGroups } from "@/lib/content";
import SkillLogo from "@/components/skills/SkillLogo";

export default function Skills() {
  return (
    <section id="skills" className="section-y relative border-y border-line bg-bg-panel/40">
      <div className="section-pad relative mx-auto max-w-6xl">
        <p className="eyebrow">04 · Skills</p>
        <h2 className="heading mt-3 max-w-3xl">Tools I ship with</h2>
        <p className="mt-4 max-w-xl text-base text-muted">
          Model work, APIs, mobile, and infra — the stack behind featured builds
          and client delivery.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.label} className="card p-5">
              <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
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
