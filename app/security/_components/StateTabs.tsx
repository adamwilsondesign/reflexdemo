"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export type AutoTabItem = {
  title: string;
  body?: React.ReactNode;
  visual: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Local variant of the shared AutoTabs with a configurable visual frame height, so taller
 * coded visuals are not cropped on mobile. Auto-advancing "states" component (from the Figma state boards): a list of items with
 * progress bars on one side, a crossfading visual on the other. Pauses on hover/focus and when off-screen.
 */
export function StateTabs({
  items,
  interval = 6500,
  onDark = false,
  visualFirst = false,
  className,
  visualClassName,
  frameClassName = "aspect-[4/3.2] sm:aspect-[4/3]",
  idPrefix = "state",
}: {
  items: AutoTabItem[];
  interval?: number;
  onDark?: boolean;
  visualFirst?: boolean;
  className?: string;
  visualClassName?: string;
  frameClassName?: string;
  idPrefix?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const running = inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), interval);
    return () => clearTimeout(t);
  }, [active, running, interval, items.length]);

  return (
    <div
      ref={ref}
      className={clsx("grid items-center gap-10 lg:grid-cols-12 lg:gap-16", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={clsx("lg:col-span-5", visualFirst && "lg:order-2")} role="tablist" aria-orientation="vertical">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.title}
              role="tab"
              aria-selected={on}
              id={`${idPrefix}-tab-${i}`}
              onClick={() => setActive(i)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className={clsx(
                "group relative block w-full border-t py-5 text-left transition-colors duration-500 md:py-6",
                onDark ? "border-white/12" : "border-ink/12",
              )}
            >
              <span
                aria-hidden="true"
                className={clsx("absolute -top-px left-0 h-px", onDark ? "bg-paper" : "bg-ink")}
                style={{
                  width: on ? "100%" : "0%",
                  transition: on && running ? `width ${interval}ms linear` : "width 300ms ease",
                }}
              />
              <span className="flex items-start gap-4">
                {it.icon && <span className={clsx("mt-0.5 shrink-0 transition-opacity duration-500", on ? "opacity-100" : "opacity-40")}>{it.icon}</span>}
                <span className="block">
                  <span className={clsx("t-h3 block transition-opacity duration-500", on ? "opacity-100" : "opacity-45 group-hover:opacity-75")}>{it.title}</span>
                  <AnimatePresence initial={false}>
                    {on && it.body && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="block overflow-hidden"
                      >
                        <span className={clsx("t-body block pt-3", onDark ? "text-paper/70" : "text-ink/70")}>{it.body}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className={clsx("relative lg:col-span-7", visualFirst && "lg:order-1", visualClassName)} role="tabpanel" aria-labelledby={`${idPrefix}-tab-${active}`}>
        <div className={clsx("relative w-full", frameClassName)}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.01, filter: "blur(6px)" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {items[active].visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
