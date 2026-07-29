"use client";

import { useCallback, useState } from "react";
import {
  featuredProjects,
  otherProjects,
  type Project,
} from "@/lib/content";
import OrbitCarousel from "@/components/pixel-perfect/orbit-carousel";
import GlassButton from "@/components/pixel-perfect/glass-button";
import ScrollHeadline from "@/components/pixel-perfect/scroll-headline";
import LineHoverTitle from "@/components/pixel-perfect/line-hover-title";

export default function Projects() {
  const [active, setActive] = useState<Project>(featuredProjects[0]);
  const onActiveChange = useCallback((project: Project) => {
    setActive(project);
  }, []);

  return (
    <section id="projects" className="section-y section-pad overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          Projects
        </p>
        <ScrollHeadline className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Featured systems in orbit
        </ScrollHeadline>
        <p className="mt-3 max-w-xl text-muted">
          Drag to scrub. Idle drift keeps the deck alive — front card is the
          active brief below.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-6xl">
        <OrbitCarousel items={featuredProjects} onActiveChange={onActiveChange} />
      </div>

      <div className="section-pad mx-auto mt-2 max-w-6xl">
        <div className="border border-line bg-bg-elevated/50 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {active.year}
                {active.company ? ` · ${active.company}` : ""}
              </p>
              <h3 className="mt-2 text-3xl font-semibold">{active.title}</h3>
            </div>
            {active.href ? (
              <GlassButton href={active.href} variant="cyan">
                Open project
              </GlassButton>
            ) : (
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Link soon
              </span>
            )}
          </div>
          <p className="mt-4 max-w-3xl text-muted">{active.summary}</p>
          <p className="mt-4 font-mono text-xs text-accent-strong/90">
            {active.tools.join(" · ")}
          </p>
        </div>

        <div className="mt-14">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            More work
          </h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {otherProjects.map((project) => (
              <li
                key={project.slug}
                className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <LineHoverTitle href={project.href}>
                    {project.title}
                  </LineHoverTitle>
                  <p className="mt-1 max-w-2xl text-sm text-muted">
                    {project.summary}
                  </p>
                </div>
                <div className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {project.year}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
