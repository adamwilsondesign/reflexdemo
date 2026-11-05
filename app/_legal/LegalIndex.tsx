"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero visual for legal pages: the document's own section index, rendered as a product card,
 * with a slow reading cursor that walks the sections. Calm, and paused off-screen.
 */
export function LegalIndex({ title, kicker, sections, icon = "stack", footer }: { title: string; kicker: string; sections: string[]; icon?: IconName; footer: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const shown = sections.slice(0, 7);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setI((x) => (x + 1) % shown.length), 1800);
    return () => clearInterval(iv);
  }, [inView, reduce, shown.length]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[460px]" aria-hidden="true">
      <div className="ui-card overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-ink/8 px-5 py-4">
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-ink/5">
              <PrecisionIcon name={icon} className="h-5 w-5 text-lake-700" />
            </span>
            <span>
              <span className="block font-display text-[14px] font-semibold leading-tight text-ink">{title}</span>
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">{kicker}</span>
            </span>
          </span>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-ink/[0.06] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-ink/60">{sections.length} sections</span>
        </div>
        <ol className="relative px-3 py-3">
          {!reduce && (
            <motion.span
              className="absolute inset-x-3 h-[44px] rounded-[8px] bg-lake-100/70"
              animate={{ y: i * 44 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ top: 12 }}
            />
          )}
          {shown.map((s, k) => (
            <motion.li
              key={s}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + k * 0.07, ease: EASE }}
              className="relative flex h-[44px] items-center gap-3 px-3"
            >
              <span className={clsx("w-5 font-mono text-[10.5px] transition-colors duration-500", k === i && !reduce ? "text-lake-700" : "text-ink/35")}>§{k + 1}</span>
              <span className={clsx("min-w-0 flex-1 truncate font-display text-[13.5px] transition-colors duration-500", k === i && !reduce ? "font-medium text-ink" : "text-ink/70")}>{s}</span>
              <span className="hidden h-1 w-14 shrink-0 overflow-hidden rounded-full bg-ink/8 sm:block">
                <span className="block h-full rounded-full bg-ink/20" style={{ width: `${45 + ((k * 37) % 50)}%` }} />
              </span>
            </motion.li>
          ))}
          {sections.length > shown.length && (
            <li className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/40">+ {sections.length - shown.length} more</li>
          )}
        </ol>
        <div className="border-t border-ink/8 bg-white/50 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/50">{footer}</div>
      </div>
    </div>
  );
}
