"use client";

import { motion, useReducedMotion } from "motion/react";
import { education, profile } from "@/lib/content";
import AboutPanel from "@/components/sections/AboutPanel";
import ScrollHeadline from "@/components/pixel-perfect/scroll-headline";

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="section-y section-pad relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-[20%] h-[50vmin] w-[50vmin] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          Profile
        </p>
        <ScrollHeadline className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Building intelligence end to end
        </ScrollHeadline>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
        <div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease }}
            className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mt-12"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Education
            </p>
            <ul className="mt-6 space-y-0 border-l border-line">
              {education.map((item, i) => (
                <li
                  key={`${item.school}-${item.degree}`}
                  className="relative py-5 pl-6 first:pt-0 last:pb-0"
                >
                  <span
                    aria-hidden
                    className="absolute left-[-3.5px] size-1.5 rounded-full bg-accent"
                    style={{ top: i === 0 ? "0.5rem" : "1.35rem" }}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-lg font-medium tracking-tight">
                      {item.degree}
                    </p>
                    {"status" in item && item.status ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                        {item.status}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-muted">
                    {item.school} · {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.dl
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.12, ease }}
            className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3"
          >
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Based in
              </dt>
              <dd className="mt-2 text-sm font-medium">{profile.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Focus
              </dt>
              <dd className="mt-2 text-sm font-medium">DL · CV · NLP · MLOps</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Stack
              </dt>
              <dd className="mt-2 text-sm font-medium">
                React · FastAPI · PyTorch · AWS
              </dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease }}
          className="lg:sticky lg:top-28 lg:justify-self-end"
        >
          <AboutPanel className="max-w-xs sm:max-w-sm" />
        </motion.div>
      </div>
    </section>
  );
}
