"use client";

import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { CardHeader, Cite, MissingData, Pill, Sparkline, Stage, series } from "@/components/product/ui";

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
      <div className="mx-auto w-full max-w-[520px]">
        <motion.div {...f(0.05)} className="ui-card p-3 sm:p-5">
          <div className="hidden sm:block">
            <CardHeader trail={spec.trail} right={<Pill tone="lake">Illustrative</Pill>} />
          </div>
          <p className="t-ui mb-1.5 text-[10px] text-ink/45 sm:hidden">{spec.trail.join(" / ")} · Illustrative</p>
          <p className="font-display text-[13.5px] font-medium leading-snug text-ink sm:mt-3.5 sm:text-[16px]">{spec.prompt}</p>
        </motion.div>
        <motion.div {...f(0.25)} className="ui-card mt-2 p-3 sm:mt-2.5 sm:p-5">
          <ul className="space-y-1.5 sm:space-y-2">
            {spec.lines.map((l, i) => (
              <motion.li
                key={l.text}
                {...f(0.45 + i * 0.18)}
                className="flex items-start justify-between gap-3 border-b border-ink/6 pb-2 text-[12px] leading-snug text-ink/80 last:border-0 last:pb-0 sm:text-[13px]"
              >
                <span>
                  {l.text}
                  {l.cite && <Cite n={l.cite} />}
                </span>
                {l.tag && (
                  <span className="hidden shrink-0 sm:inline-flex">
                    <Pill tone={l.tone ?? "neutral"} className="!py-0.5 !text-[9.5px]">
                      {l.tag}
                    </Pill>
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
          {spec.spark !== undefined && (
            <motion.div {...f(0.9)} className="mt-3 hidden h-10 text-lake-500 sm:block">
              <Sparkline points={series(36, spec.spark, 0.4)} className="h-full w-full" fill="rgb(93 115 140 / 0.1)" />
            </motion.div>
          )}
          {spec.gap && (
            <motion.div {...f(1)} className="mt-3 hidden sm:block">
              <MissingData label={spec.gap} />
            </motion.div>
          )}
        </motion.div>
        <motion.p {...f(1.1)} className={clsx("t-ui mt-3 hidden items-center gap-2 sm:flex", spec.field === "mist" ? "text-ink/55" : "text-white/75")}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          Output · {spec.output}
        </motion.p>
      </div>
    </Stage>
  );
}
