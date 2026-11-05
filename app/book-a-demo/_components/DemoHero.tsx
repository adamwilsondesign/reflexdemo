"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitText } from "@/components/ui/SplitText";
import { Arrow } from "@/components/ui/Button";
import { DataSourceLogos } from "@/components/ui/LogoStrip";
import { TESTIMONIALS } from "@/components/ui/Blocks";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { DemoForm, LockIcon } from "./DemoForm";
import { WhatYoullSee } from "./WalkthroughPreview";

const EASE = [0.16, 1, 0.3, 1] as const;

const FACTS: { icon: IconName; k: string; v: string }[] = [
  { icon: "eye", k: "Led by", v: "A Reflexivity product specialist" },
  { icon: "loop", k: "Length", v: "Typically 30 minutes" },
  { icon: "path", k: "Next step", v: "We follow up within one business day to schedule" },
  { icon: "triad", k: "Designed for", v: "Hedge funds, asset managers, financial institutions, wealth managers and RIAs" },
];

export function DemoHero() {
  const reduce = useReducedMotion();
  const f = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: d },
  });
  const quote = TESTIMONIALS[0];

  return (
    <section data-tone="dark" className="relative isolate overflow-clip bg-lake-900 pb-16 pt-[calc(var(--header-h)+40px)] text-paper md:pb-24 md:pt-[calc(var(--header-h)+64px)]">
      <div className="pointer-events-none absolute inset-0 -z-20 field-ink opacity-40" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark"
        style={{ maskImage: "radial-gradient(90% 70% at 25% 10%, #000 25%, transparent 75%)", WebkitMaskImage: "radial-gradient(90% 70% at 25% 10%, #000 25%, transparent 75%)" }}
      />
      <AmbientGraph />

      <div className="container-x grid gap-x-12 gap-y-10 lg:grid-cols-12 xl:gap-x-16">
        {/* Intro: always first */}
        <div className="lg:col-span-6 lg:row-start-1">
          <motion.div {...f(0.05)}>
            <Eyebrow trail={[{ label: "Home", href: "/" }, { label: "Request a Demo" }]} className="text-paper" />
          </motion.div>
          <SplitText
            as="h1"
            text="Trial Reflexivity against your own portfolio, watchlist, or research workflow."
            trigger="mount"
            delay={0.1}
            stagger={0.045}
            className="t-h1 mt-6 max-w-[640px] lg:text-[clamp(2.4rem,1.4rem+2.2vw,3.5rem)]"
          />
          <motion.p {...f(0.5)} className="t-lead mt-6 max-w-[560px] text-paper/72">
            Request a live walkthrough tailored to your process. Bring a question, watchlist, or example, or we&rsquo;ll provide one, and we&rsquo;ll run it in the platform with you.
          </motion.p>
          <motion.p {...f(0.62)} className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-[14px] text-paper/80">
            <LockIcon className="h-3.5 w-3.5 shrink-0 text-pine-300" />
            You don&rsquo;t need to share confidential holdings.
          </motion.p>
        </div>

        {/* Form: right column on desktop (sticky), straight after the intro on mobile */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1"
        >
          <div className="lg:sticky lg:top-[calc(var(--header-h)+20px)]">
            <DemoForm />
          </div>
        </motion.div>

        {/* Supporting detail beside the form */}
        <motion.div {...f(0.75)} className="lg:col-span-6 lg:row-start-2">
          <h2 className="t-ui text-paper/55">What you&rsquo;ll see</h2>
          <div className="mt-4">
            <WhatYoullSee />
          </div>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-[14px] bg-white/10 sm:grid-cols-2">
            {FACTS.map((x) => (
              <div key={x.k} className="flex gap-3.5 bg-lake-900 p-5">
                <PrecisionIcon name={x.icon} className="mt-0.5 h-6 w-6 shrink-0 text-lake-300" />
                <div>
                  <dt className="t-ui text-paper/50">{x.k}</dt>
                  <dd className="mt-1.5 font-display text-[15px] font-medium leading-snug text-paper">{x.v}</dd>
                </div>
              </div>
            ))}
          </dl>

          <figure className="mt-10 border-l border-white/20 pl-5">
            <blockquote className="font-display text-[17px] font-medium leading-[1.5] tracking-[-0.005em] text-paper/90 md:text-[18px]">&ldquo;{quote.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-display text-[13px] font-semibold">
                {quote.name.split(" ").map((s) => s[0]).join("")}
              </span>
              <span className="text-[14px]">
                <span className="block font-display font-semibold">{quote.name}</span>
                <span className="block text-paper/55">{quote.org}</span>
              </span>
            </figcaption>
          </figure>

          <Link href="/security" className="group mt-10 flex items-center justify-between gap-4 rounded-[12px] border border-white/12 bg-white/[0.03] px-5 py-4 transition-colors duration-500 hover:border-white/30 hover:bg-white/[0.06]">
            <span className="flex items-center gap-3.5">
              <PrecisionIcon name="cube" className="h-7 w-7 shrink-0 text-paper/80" />
              <span>
                <span className="block font-display text-[15px] font-semibold">Security review?</span>
                <span className="block text-[14px] text-paper/60">Controls, data handling and deployment, in one place.</span>
              </span>
            </span>
            <Arrow />
          </Link>
        </motion.div>
      </div>

      <motion.div {...f(0.9)} className="container-x mt-16 md:mt-24">
        <div className="flex flex-col gap-6 border-t border-white/12 pt-9 md:flex-row md:items-center md:gap-10">
          <p className="t-ui shrink-0 text-paper/50">Data and content sources</p>
          <DataSourceLogos onDark className="w-full min-w-0" />
        </div>
      </motion.div>
    </section>
  );
}

/** Very faint relationship lines drifting behind the hero. Calm by design: it never competes with the form. */
function AmbientGraph() {
  const reduce = useReducedMotion();
  const pts = [
    [62, 12], [78, 22], [92, 10], [70, 40], [88, 46], [58, 30], [96, 30],
  ];
  const links = [[0, 1], [1, 2], [1, 3], [3, 4], [0, 5], [5, 3], [2, 6], [4, 6]];
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full opacity-40 lg:block" aria-hidden="true">
      {links.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={pts[a][0]}
          y1={pts[a][1]}
          x2={pts[b][0]}
          y2={pts[b][1]}
          stroke="#8fa3b6"
          strokeWidth={0.6}
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.2, delay: 0.6 + i * 0.15, ease: EASE }}
        />
      ))}
      {pts.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={0.28}
          fill="#d5dee6"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? { opacity: 0.8 } : { opacity: [0.35, 0.9, 0.35] }}
          transition={reduce ? undefined : { duration: 6, delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
