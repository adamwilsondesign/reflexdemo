"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import type { IconName } from "@/components/ui/PrecisionIcon";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero visual for legal pages: the document's own section index, rendered as a product card,
 * with a slow reading cursor that walks the sections. Calm, and paused off-screen.
 */
export function LegalIndex({ title, kicker, sections, footer }: { title: string; kicker: string; sections: string[]; icon?: IconName; footer: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const shown = sections.slice(0, 4);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setI((x) => (x + 1) % shown.length), 1800);
    return () => clearInterval(iv);
  }, [inView, reduce, shown.length]);

  return (
    <div ref={ref} className="pui relative mx-auto w-full max-w-[420px]" aria-hidden="true">
      <div className="ui-card p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="min-w-0">
            <span className="block text-[16px] font-semibold leading-snug text-[#0d0d0d]">{title}</span>
            <span className="mt-0.5 block text-[12px] text-[#8f8f8f]">{kicker}</span>
          </span>
          <span className="shrink-0 whitespace-nowrap text-[12px] text-[#8f8f8f]">{sections.length} sections</span>
        </div>
        <ol className="mt-4 divide-y divide-black/10 border-t border-black/10">
          {shown.map((s, k) => {
            const on = k === i && !reduce;
            return (
              <motion.li
                key={s}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 + k * 0.07, ease: EASE }}
                className="flex items-center gap-4 py-4 text-[13px]"
              >
                <span className="w-4 tabular-nums text-[#8f8f8f]">{k + 1}</span>
                <span className={clsx("min-w-0 flex-1 truncate transition-colors duration-500", on ? "font-medium text-[#0d0d0d]" : "text-[#5d5d5d]")}>{s}</span>
                <span className={clsx("h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d0d0d] transition-opacity duration-500", on ? "opacity-100" : "opacity-0")} />
              </motion.li>
            );
          })}
        </ol>
        <p className="mt-1 text-[12px] text-[#8f8f8f]">
          {sections.length > shown.length && <>{sections.length - shown.length} more sections · </>}
          {footer}
        </p>
      </div>
    </div>
  );
}
