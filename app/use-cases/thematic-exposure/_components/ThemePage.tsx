"use client";

import { AnimatePresence, motion } from "motion/react";
import { series } from "@/components/product/ui";
import { MOTION_EASE, Row, useCycle } from "@/components/product/motion";
import { THEME, THEME_VIEWS } from "./data";

const PTS = series(36, 7, 0.35, 1.6);
const MIN = Math.min(...PTS), MAX = Math.max(...PTS);
const LINE = PTS.map((p, i) => `${i ? "L" : "M"}${((i / (PTS.length - 1)) * 100).toFixed(2)},${(38 - ((p - MIN) / (MAX - MIN)) * 36).toFixed(2)}`).join(" ");

/**
 * "See what's driving the theme": the Figma theme page (tailwinds, headwinds, big movers,
 * related themes) as one fixed-height panel. The theme header stays; only the block below changes.
 */
export function ThemePage() {
  const [i, ref, setI] = useCycle(THEME_VIEWS.length, { ms: 5000, finalForReduced: 0 });
  const v = THEME_VIEWS[i];
  return (
    <div ref={ref} className="mx-auto w-full max-w-[440px]">
      <div className="ui-card pui relative w-full overflow-hidden p-4" style={{ height: 320 }}>
        <div className="flex items-center justify-between text-[12px] text-[#8f8f8f]">
          <span>Industry theme</span>
          <span>3M</span>
        </div>
        <p className="mt-1 text-[18px] font-semibold leading-6 text-[#0d0d0d]">{THEME}</p>
        <div className="mt-3 h-12">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
            <path d={LINE} fill="none" stroke="#0d0d0d" strokeOpacity={0.55} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="mt-4 border-t border-black/10 pt-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.6, ease: MOTION_EASE }}
            >
              <p className="text-[14px] font-semibold text-[#0d0d0d]">{v.title}</p>
              <div className="mt-2">
                {v.rows.map((r) => (
                  <Row key={r.label} label={r.label} value={r.value} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
