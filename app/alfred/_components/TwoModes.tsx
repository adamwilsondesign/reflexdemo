"use client";

import { motion, useReducedMotion } from "motion/react";
import type { IconName } from "@/components/ui/PrecisionIcon";
import { FeatureGrid } from "@/components/ui/Blocks";

const EASE = [0.16, 1, 0.3, 1] as const;

const MODES: { icon: IconName; title: string; body: string; href: string; linkLabel: string }[] = [
  {
    icon: "crosshair",
    title: "On-demand research",
    body: "Ask Alfred to investigate a company, analyze a portfolio, or pressure-test a thesis. Get comprehensive, source-backed analysis in minutes.",
    href: "#on-demand",
    linkLabel: "See sample questions",
  },
  {
    icon: "signal",
    title: "Always-on intelligence",
    body: "Alfred monitors your coverage universe, alerting you to relevant catalysts and their potential implications, even when you haven’t asked.",
    href: "#always-on",
    linkLabel: "See what arrives unprompted",
  },
];

/**
 * Connector: two drops from the card centres (25% / 75%), a bar joining them, one drop to the shared box.
 * Plain hairline boxes (no SVG path scaling), so every segment always renders in full.
 */
function Connector() {
  const reduce = useReducedMotion();
  const draw = (axis: "x" | "y", delay: number) => ({
    initial: reduce ? false : axis === "x" ? { scaleX: 0 } : { scaleY: 0 },
    whileInView: axis === "x" ? { scaleX: 1 } : { scaleY: 1 },
    viewport: { once: true, amount: 1 },
    transition: { duration: 0.6, ease: EASE, delay },
  });
  return (
    <div className="relative hidden h-12 md:block" aria-hidden="true">
      <motion.span {...draw("y", 0.2)} className="absolute left-1/4 top-0 h-6 w-px origin-top bg-white/40" />
      <motion.span {...draw("y", 0.2)} className="absolute left-3/4 top-0 h-6 w-px origin-top bg-white/40" />
      <motion.span {...draw("x", 0.7)} className="absolute left-1/4 top-6 h-px w-1/2 origin-center bg-white/40" />
      <motion.span {...draw("y", 1.2)} className="absolute left-1/2 top-6 h-6 w-px origin-top bg-white/40" />
    </div>
  );
}

/** One analyst, two modes: both modes draw on the same context underneath. */
export function TwoModes() {
  const reduce = useReducedMotion();
  return (
    <div>
      <FeatureGrid onDark cols={2} items={MODES} />
      <Connector />
      <div className="h-6 md:hidden" />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        className="border border-white/15 p-6 text-center md:p-8"
      >
        <p className="t-h3">Two modes. Same context.</p>
        <p className="t-small mx-auto mt-2 max-w-[560px] text-paper/70">
          Alfred runs on our proprietary Knowledge Graph and institutional-grade data sources.
        </p>
      </motion.div>
    </div>
  );
}
