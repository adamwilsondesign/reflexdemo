"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { Arrow } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

const MODES: { icon: IconName; kicker: string; title: string; body: string; href: string; link: string }[] = [
  {
    icon: "crosshair",
    kicker: "You ask",
    title: "On-demand research",
    body: "Ask Alfred to investigate a company, analyze a portfolio, or pressure-test a thesis. Get comprehensive, source-backed analysis in minutes.",
    href: "#on-demand",
    link: "See sample questions",
  },
  {
    icon: "signal",
    kicker: "Alfred watches",
    title: "Always-on intelligence",
    body: "Alfred monitors your coverage universe, alerting you to relevant catalysts and their potential implications, even when you haven’t asked.",
    href: "#always-on",
    link: "See what arrives unprompted",
  },
];

const SHARED = ["Knowledge Graph", "Institutional data", "Your watchlists and coverage"];

/** One analyst, two modes: both modes draw on the same context underneath. */
export function TwoModes() {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <div className="grid gap-px overflow-hidden rounded-[16px] bg-white/10 md:grid-cols-2">
        {MODES.map((m, i) => (
          <motion.div
            key={m.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
            className="group flex flex-col bg-lake-900 p-7 md:p-10"
          >
            <div className="flex items-start justify-between">
              <span className="t-ui text-paper/50">{m.kicker}</span>
              <PrecisionIcon name={m.icon} className="h-11 w-11 text-paper transition-transform duration-[1.2s] ease-[var(--ease-out-expo)]" />
            </div>
            <h3 className="t-h2 mt-14 md:mt-20">{m.title}</h3>
            <p className="t-body mt-4 max-w-[460px] text-paper/70">{m.body}</p>
            <Link href={m.href} className="group/l mt-8 inline-flex items-center gap-2 font-display text-[15px] font-medium text-paper">
              <span className="link-underline">{m.link}</span>
              <Arrow />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* connectors */}
      <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="hidden h-[60px] w-full md:block" aria-hidden="true">
        {[250, 750].map((x, i) => (
          <g key={x}>
            <motion.path d={`M${x} 0 C ${x} 40, 500 20, 500 60`} fill="none" stroke="rgba(213,222,230,0.35)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay: 0.4 + i * 0.15 }} />
            {!reduce && (
              <circle r="3" fill="#d5dee6">
                <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${i * 1.4}s`} path={`M${x} 0 C ${x} 40, 500 20, 500 60`} />
              </circle>
            )}
          </g>
        ))}
      </svg>
      <div className="h-6 md:hidden" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        className="rounded-[16px] border border-white/12 bg-white/[0.04] p-6 md:p-8"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="t-ui text-paper/50">Shared underneath both modes</p>
            <p className="mt-2 font-display text-[20px] font-semibold leading-snug md:text-[22px]">Two modes. Same context.</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {SHARED.map((s) => (
              <li key={s} className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.04em] text-paper/75">{s}</li>
            ))}
          </ul>
        </div>
        <p className="t-small mt-5 max-w-[720px] text-paper/60">
          Alfred runs on our proprietary Knowledge Graph and institutional-grade data sources. They are not two products: an alert can open straight into an on-demand follow-up, with the same entities and context in place.
        </p>
      </motion.div>
    </div>
  );
}
