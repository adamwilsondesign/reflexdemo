"use client";

import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { CardHeader, Cite, MissingData, Sparkline, Stage, series } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export type OutputSpec = {
  trail: string[];
  prompt: string;
  lines: { text: string; cite?: number; tag?: string; tone?: "lake" | "pine" | "warn" | "neutral" }[];
  output: string;
  spark?: number;
  gap?: string;
  field?: "lake" | "pine" | "mist" | "ink";
};

/** A coded, illustrative Reflexivity output for one workflow: question → cited lines → what you walk away with. */
export function OutputCard({ spec }: { spec: OutputSpec }) {
  const reduce = useReducedMotion();
  const f = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay: d },
  });
  return (
    <Stage field={spec.field ?? "lake"} className="flex h-full w-full flex-col justify-center p-3 sm:p-8" parallax={false}>
      <div className="mx-auto w-full max-w-[460px]">
        <motion.div {...f(0.05)} className="ui-card p-4">
          <CardHeader trail={spec.trail.slice(-1)} right={<span className="shrink-0 text-[12px] text-[#8f8f8f]">Illustrative</span>} />
          <p className="mt-3 rounded-[10px] bg-[#f9f9f9] px-3 py-2 text-[14px] leading-snug text-[#0d0d0d] sm:text-[15px]">{spec.prompt}</p>
          <ul className="mt-3 divide-y divide-black/10">
            {spec.lines.slice(0, 3).map((l, i) => (
              <motion.li key={l.text} {...f(0.35 + i * 0.18)} className="py-2 text-[13px] leading-snug text-[#5d5d5d]">
                {l.text}
                {l.cite && <Cite n={l.cite} />}
              </motion.li>
            ))}
          </ul>
          {spec.spark !== undefined ? (
            <motion.div {...f(0.9)} className="mt-2 hidden h-10 sm:block">
              <Sparkline points={series(36, spec.spark, 0.4)} className="h-full w-full" />
            </motion.div>
          ) : spec.gap ? (
            <motion.div {...f(0.9)} className="mt-2 hidden sm:block">
              <MissingData label={spec.gap} />
            </motion.div>
          ) : null}
        </motion.div>
        <motion.p {...f(1.1)} className={clsx("mt-3 hidden text-[13px] sm:block", spec.field === "mist" ? "text-[#5d5d5d]" : "text-white/75")}>
          Output: {spec.output}
        </motion.p>
      </div>
    </Stage>
  );
}
