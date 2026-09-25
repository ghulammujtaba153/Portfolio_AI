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

      <div className="relative mx-auto max-w-6xl">
        <p className="eyebrow">01 · Profile</p>
        <ScrollHeadline className="heading mt-3 max-w-3xl">
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
            className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
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
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-subtle">
              Education
            </p>
            <ul className="mt-6 space-y-0 border-l border-line-strong">
              {education.map((item, i) => (
                <li
                  key={`${item.school}-${item.degree}`}
                  className="relative py-5 pl-6 first:pt-0 last:pb-0"
                >
                  <span
                    aria-hidden
                    className="absolute left-[-4.5px] size-2 rounded-full bg-accent ring-4 ring-bg"
                    style={{ top: i === 0 ? "0.5rem" : "1.35rem" }}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-lg font-medium tracking-tight">
                      {item.degree}
                    </p>
                    {"status" in item && item.status ? (
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent">
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
            transition={{ duration: 0.55, delay: 0.14, ease }}
            className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3"
          >
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-subtle">
                Based in
              </dt>
              <dd className="mt-2 text-sm font-medium">{profile.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-subtle">
                Focus
              </dt>
              <dd className="mt-2 text-sm font-medium">DL · CV · NLP · MLOps</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-subtle">
                Stack
              </dt>
              <dd className="mt-2 text-sm font-medium">
                React Native · FastAPI · PyTorch · AWS
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
          <div className="card p-6">
            <AboutPanel className="max-w-xs sm:max-w-sm" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
