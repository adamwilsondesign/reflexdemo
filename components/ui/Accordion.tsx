"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import clsx from "clsx";

export function Accordion({ items, onDark = false, defaultOpen = 0 }: { items: { q: string; a: React.ReactNode }[]; onDark?: boolean; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();
  return (
    <div className={clsx("border-b", onDark ? "border-white/12" : "border-ink/12")}>
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.q} className={clsx("border-t", onDark ? "border-white/12" : "border-ink/12")}>
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="t-h3">{it.q}</span>
                <span className="relative h-4 w-4 shrink-0" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                  <span className={clsx("absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]", on && "scale-y-0")} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${id}-${i}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className={clsx("t-body max-w-[720px] pb-8", onDark ? "text-paper/70" : "text-ink/70")}>{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
