"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Glyph, Icon, Mono, RX_EASE, Spark, useTimeline, useTyped } from "@/components/visual/kit";

/**
 * Knowledge Graph — "Explore in Reflexivity".
 * Composition: a composer with an @-mention entity menu. The question is typed,
 * the cursor picks TSMC from the Graph's entities, sends, and a compact answer
 * card lands underneath.
 */
const Q = "Which of my holdings depend on ";
const ENT: { k: "company" | "geo" | "theme"; n: string; s: string }[] = [
  { k: "company", n: "TSMC", s: "Company" },
  { k: "geo", n: "Taiwan", s: "Geography" },
  { k: "theme", n: "Advanced packaging", s: "Theme" },
];
const HOLD = [
  { t: "NV", n: "NVIDIA", w: "0.90", c: "#24324a" },
  { t: "AP", n: "Apple", w: "0.88", c: "#5b6068" },
  { t: "AM", n: "AMD", w: "0.84", c: "#3e5c50" },
  { t: "QC", n: "Qualcomm", w: "0.71", c: "#a6503a" },
];

// 0 type · 1 menu · 2 move · 3 pick · 4 finish · 5 send · 6 answer · 7 out
const D = [2300, 800, 900, 450, 900, 600, 3800, 600];

export function EntityComposer() {
  const { p, ref, cycle } = useTimeline(D, { still: 6 });
  const typed = useTyped(Q, p < 7, { speed: 34, delay: 400 });
  const menu = p >= 1 && p <= 3;
  const picked = p >= 4;
  const answered = p >= 6;
  const cursor =
    p <= 1 ? { x: 420, y: 330, visible: false } :
    p <= 3 ? { x: 324, y: 134, visible: true } :
    p <= 5 ? { x: 466, y: 106, visible: true } :
    { x: 520, y: 330, visible: false };

  return (
    <div ref={ref}>
      <Canvas w={560} h={300}>
        <motion.div key={cycle} className="absolute inset-0" animate={{ opacity: p === 7 ? 0 : 1 }} transition={{ duration: 0.5 }}>
          {/* composer */}
          <motion.div className="rx-card rx-card-lift absolute left-[64px] top-[20px] h-[112px] w-[432px] px-4 pt-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: RX_EASE }}>
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#3e5368]"><Spark size={10} />Ask Alfred</p>
            <p className="mt-2 flex h-[24px] items-center whitespace-pre text-[14.5px] text-[var(--rx-ink)]">
              {typed}
              {p >= 1 && !picked && <span className="text-[#3e5368]">@T</span>}
              {picked && (
                <motion.span className="ml-0.5 inline-flex h-[22px] items-center gap-1.5 rounded-[6px] bg-[#e9eef3] px-1.5 text-[13px] font-medium text-[#243244]" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3, ease: RX_EASE }}>
                  <Glyph kind="company" size={9} />TSMC
                </motion.span>
              )}
              {picked && <span>?</span>}
              {!answered && <span className="ml-px inline-block h-[17px] w-px animate-pulse bg-[var(--rx-ink)]" />}
            </p>
            <div className="absolute inset-x-4 bottom-3 flex items-center gap-2 text-[var(--rx-3)]">
              <Icon name="attach" size={14} />
              <span className="flex h-6 items-center gap-1 rounded-[6px] bg-[var(--rx-well)] px-2 text-[11px] text-[var(--rx-2)]"><Icon name="doc" size={11} />My portfolio</span>
              <motion.span className="ml-auto grid h-7 w-7 place-items-center rounded-full text-white" animate={{ backgroundColor: picked ? "#24324a" : "#c9ccd1", scale: p === 5 ? 0.9 : 1 }} transition={{ duration: 0.25 }}>
                <Icon name="send" size={13} />
              </motion.span>
            </div>
          </motion.div>

          {/* @-mention menu */}
          <AnimatePresence>
            {menu && (
              <motion.div className="rx-card absolute left-[268px] top-[86px] z-10 w-[220px] p-1.5" initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ duration: 0.25, ease: RX_EASE }} style={{ transformOrigin: "10% 0%" }}>
                <p className="px-2 pb-1 pt-0.5 text-[10.5px] text-[var(--rx-3)]">Knowledge Graph</p>
                {ENT.map((e, i) => (
                  <span key={e.n} className={clsx("flex h-[30px] items-center gap-2 rounded-[7px] px-2 text-[12px] transition-colors duration-200", i === 0 && p >= 2 ? "bg-[var(--rx-well)] text-[var(--rx-ink)]" : "text-[var(--rx-2)]")}>
                    <Glyph kind={e.k} size={10} />
                    <span className="flex-1 truncate">{e.n}</span>
                    <span className="text-[10.5px] text-[var(--rx-3)]">{e.s}</span>
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* answer */}
          <AnimatePresence>
            {answered && (
              <motion.div className="rx-card absolute left-[72px] top-[148px] w-[416px] px-4 py-3.5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: RX_EASE }}>
                <div className="flex items-baseline justify-between">
                  <p className="rx-serif text-[16px]">Holdings that depend on TSMC</p>
                  <span className="rx-num text-[11px] text-[var(--rx-3)]">4 of 32</span>
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-x-5 gap-y-2">
                  {HOLD.map((h, i) => (
                    <motion.span key={h.t} className="flex items-center gap-2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}>
                      <Mono t={h.t} tone={h.c} size={22} />
                      <span className="flex-1 truncate text-[12px] font-medium">{h.n}</span>
                      <span className="text-[10.5px] text-[var(--rx-3)]">Supplier</span>
                      <span className="rx-num text-[11px] text-[var(--rx-2)]">{h.w}</span>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <Cursor {...cursor} press={p === 3 || p === 5} />
      </Canvas>
    </div>
  );
}
