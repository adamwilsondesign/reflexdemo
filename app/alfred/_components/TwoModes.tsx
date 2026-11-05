"use client";

import { motion, useReducedMotion } from "motion/react";
import type { IconName } from "@/components/ui/PrecisionIcon";
import { FeatureGrid } from "@/components/ui/Blocks";

const EASE = [0.16, 1, 0.3, 1] as const;

const MODES: { icon: IconName; title: string; body: string; href: string; link: string }[] = [
  {
    icon: "crosshair",
    title: "On-demand research",
    body: "Ask Alfred to investigate a company, analyze a portfolio, or pressure-test a thesis. Get comprehensive, source-backed analysis in minutes.",
    href: "#on-demand",
    link: "See sample questions",
  },
  {
    icon: "signal",
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
      <FeatureGrid onDark cols={2} items={MODES.map(({ icon, title, body, href, link }) => ({ icon, title, body, href, linkLabel: link }))} />

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
            <p className="font-display text-[20px] font-semibold leading-snug md:text-[22px]">Two modes. Same context.</p>
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
