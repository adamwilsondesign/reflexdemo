"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CodeBlock, Stage } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;
const TABS = ["Alfred", "Knowledge Graph", "Insights"] as const;
const TARGETS = ["Claude", "ChatGPT", "Research portal", "Internal models"] as const;
const FOUNDATION = ["Knowledge Graph", "Integrated data", "Audit trail"] as const;

/**
 * Hero visual: two doors into one foundation. The active door alternates while in view;
 * a pulse travels from the shared foundation up into whichever door is lit.
 */
export function DoorsDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [door, setDoor] = useState<0 | 1>(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const iv = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(iv);
  }, [inView, reduce]);

  useEffect(() => {
    if (reduce) return;
    if (tick > 0 && tick % 3 === 0) setDoor((d) => (d === 0 ? 1 : 0));
  }, [tick, reduce]);

  const tab = tick % TABS.length;
  const target = tick % TARGETS.length;

  const door1 = [
    "Who is exposed to HBM supply?",
    "SK Hynix · 38 related companies",
    "Memory pricing shift touches 4 holdings",
  ][tab];

  return (
    <Stage field="lake" className="p-4 sm:p-7 md:p-8">
      <div ref={ref} className="relative">
        <div className="mb-4 flex items-center justify-between text-[13px] text-white/80">
          <span>Two ways in</span>
          <span>One foundation</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Door 1: Platform Access */}
          <motion.div
            animate={{ opacity: door === 0 || reduce ? 1 : 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
            className={clsx("ui-card flex flex-col p-4", door === 0 && "border-black/30")}
          >
            <p className="text-[14px] font-semibold text-[#0d0d0d]">Platform Access</p>
            <div className="mt-3 flex gap-3 border-b border-black/10 text-[13px]" aria-hidden="true">
              {TABS.map((t, i) => (
                <span key={t} className={clsx("-mb-px truncate border-b pb-1.5 transition-colors duration-500", i === tab ? "border-[#0d0d0d] font-medium text-[#0d0d0d]" : "border-transparent text-[#8f8f8f]")}>
                  {t === "Knowledge Graph" ? "Graph" : t}
                </span>
              ))}
            </div>
            <div className="relative mt-3 h-[40px] overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.p
                  key={tab}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0 text-[14px] leading-snug text-[#0d0d0d]"
                >
                  {door1}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="mt-2 text-[13px] text-[#8f8f8f]">A maintained environment. Nothing to run.</p>
          </motion.div>

          {/* Door 2: Build (API, MCP, feeds, embedded) */}
          <motion.div
            animate={{ opacity: door === 1 || reduce ? 1 : 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
            className={clsx("ui-card flex flex-col p-4", door === 1 && "border-black/30")}
          >
            <p className="text-[14px] font-semibold text-[#0d0d0d]">Build</p>
            <CodeBlock className="mt-3" lines={['graph.exposure("SK Hynix")']} />
            <div className="mt-3 flex h-6 items-center gap-2 text-[13px]">
              <span className="text-[#8f8f8f]">Into</span>
              <span className="relative h-6 flex-1 overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={target}
                    initial={reduce ? false : { y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute left-0 top-0 inline-flex h-6 items-center font-medium text-[#0d0d0d]"
                  >
                    {TARGETS[target]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
            <p className="mt-2 text-[13px] text-[#8f8f8f]">The same layer, inside the stack you run.</p>
          </motion.div>
        </div>

        {/* Connectors: foundation to active door */}
        <svg viewBox="0 0 400 56" preserveAspectRatio="none" className="hidden h-14 w-full sm:block" aria-hidden="true">
          <path d="M200 56 C 200 28, 100 28, 100 0" fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d="M200 56 C 200 28, 300 28, 300 0" fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {!reduce && (
            <motion.path
              key={door}
              d={door === 0 ? "M200 56 C 200 28, 100 28, 100 0" : "M200 56 C 200 28, 300 28, 300 0"}
              fill="none"
              stroke="#fff"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          )}
        </svg>
        <div className="h-3 sm:hidden" />

        {/* Shared foundation */}
        <div className="ui-card p-4">
          <p className="text-[14px] font-semibold text-[#0d0d0d]">Shared foundation</p>
          <div className="mt-2 grid grid-cols-3 divide-x divide-black/10 border-t border-black/10 pt-2">
            {FOUNDATION.map((f, i) => (
              <span key={f} className={clsx("flex items-center gap-1.5 px-2 text-[12px] transition-colors duration-500 first:pl-0 sm:text-[13px]", !reduce && tick % 3 === i ? "font-medium text-[#0d0d0d]" : "text-[#5d5d5d]")}>
                <span className={clsx("h-1.5 w-1.5 shrink-0 rounded-full transition-opacity duration-500", !reduce && tick % 3 === i ? "bg-[#0d0d0d]" : "bg-transparent")} />
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}
