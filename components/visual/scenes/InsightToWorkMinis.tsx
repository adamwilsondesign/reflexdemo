"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Glyph, Icon, RX_EASE, Spark, useTimeline, useTyped } from "@/components/visual/kit";

/**
 * Insights · Push mode meets build mode — three small scenes.
 * Open in Alfred: a composer with the Insight attached as context.
 * Refresh on a schedule: a cadence radio list, picked by the cursor.
 * Keep it on a workspace: a pinboard where the new Insight drops in.
 */

/* ---------- Open in Alfred ---------- */
const ASK = "Which of these names is most exposed to grid interconnect delays?";
// 0 attach · 1 type · 2 hold · 3 out
const ASK_D = [900, 3000, 2800, 600];

export function MiniOpenInAlfred() {
  const { p, ref, cycle } = useTimeline(ASK_D, { still: 2 });
  const typed = useTyped(ASK, p === 1, { speed: 30, delay: 200 });
  return (
    <div ref={ref}>
      <Canvas w={340} h={200} minScale={0.9}>
        <motion.div key={cycle} className="rx-card rx-card-lift absolute left-[14px] top-[24px] w-[312px] p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: p === 3 ? 0 : 1, y: 0 }} transition={{ duration: 0.6, ease: RX_EASE }}>
          <motion.span className="flex w-fit items-center gap-1.5 rounded-[7px] bg-[var(--rx-well)] py-1 pl-2 pr-2.5 text-[11px] text-[var(--rx-2)]" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.4, ease: RX_EASE }}>
            <Glyph kind="driver" size={10} />AI data center power buildout
          </motion.span>
          <p className="mt-2.5 h-[40px] text-[13px] leading-[20px]">
            {p === 1 ? typed : p >= 2 ? ASK : ""}
            {p <= 1 && <span className="ml-0.5 inline-block h-[13px] w-px translate-y-[2px] animate-pulse bg-[var(--rx-ink)]" />}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] text-[var(--rx-3)]"><Spark size={10} />Context attached</span>
            <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[var(--rx-ink)] text-white"><Icon name="send" size={13} /></span>
          </div>
        </motion.div>
      </Canvas>
    </div>
  );
}

/* ---------- Refresh on a schedule ---------- */
const CAD = [["Daily", "Every morning, 07:00"], ["Weekdays", "Mon–Fri, 07:00"], ["Weekly", "Mondays, 07:00"]];
const RADIO = (i: number) => ({ x: 38, y: 84 + i * 40 });
// 0 in · 1 move · 2 press · 3 hold
const CAD_D = [1100, 900, 400, 4200];

export function MiniCadence() {
  const { p, ref, cycle } = useTimeline(CAD_D, { still: 3 });
  const sel = p >= 2 ? 1 : 0;
  return (
    <div ref={ref}>
      <Canvas w={340} h={200} minScale={0.9}>
        <motion.div key={cycle} className="rx-card rx-card-lift absolute left-[14px] top-[20px] w-[312px] px-4 pb-3 pt-3.5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: RX_EASE }}>
          <p className="flex h-[30px] items-start justify-between text-[12.5px] font-semibold">Refresh “Data center power”
            {p >= 3 && <motion.span className="flex items-center gap-1 text-[10.5px] font-medium text-[var(--rx-up)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Icon name="check" size={11} />Saved</motion.span>}
          </p>
          {CAD.map(([k, sub], i) => (
            <div key={k} className={clsx("-mx-1.5 flex h-[40px] items-center gap-2.5 rounded-[8px] px-1.5 transition-colors duration-300", i === sel ? "bg-[var(--rx-well)]" : "")}>
              <span className={clsx("grid h-[15px] w-[15px] place-items-center rounded-full transition-colors duration-300", i === sel ? "bg-[var(--rx-ink)]" : "ring-1 ring-inset ring-[#c9cbcf]")}>
                {i === sel && <span className="h-[5px] w-[5px] rounded-full bg-white" />}
              </span>
              <span className="flex-1 text-[12.5px] font-medium">{k}</span>
              <span className="text-[11px] text-[var(--rx-3)]">{sub}</span>
            </div>
          ))}
        </motion.div>
        <Cursor {...(p === 0 ? { x: 300, y: 220, visible: false } : { ...RADIO(1), visible: p < 3 })} press={p === 2} />
      </Canvas>
    </div>
  );
}

/* ---------- Keep it on a workspace ---------- */
const TILES = [
  { t: "Sanofi settles Regeneron dispute", k: "Company catalyst" },
  { t: "Guidance overshadows a mixed Nike quarter", k: "Earnings recap" },
  { t: "Eli Lilly: recession odds at a new low", k: "Scenario pattern" },
];
// 0 board · 1 drop · 2 hold · 3 out
const PIN_D = [1200, 900, 3800, 600];

export function MiniPinboard() {
  const { p, ref, cycle } = useTimeline(PIN_D, { still: 2 });
  return (
    <div ref={ref}>
      <Canvas w={340} h={200} minScale={0.9}>
        <motion.div key={cycle} className="rx-card absolute left-[14px] top-[14px] w-[312px] p-3.5" initial={{ opacity: 0 }} animate={{ opacity: p === 3 ? 0 : 1 }} transition={{ duration: 0.5 }}>
          <p className="flex items-center justify-between text-[12.5px] font-semibold">Healthcare &amp; consumer book<span className="text-[10.5px] font-normal text-[var(--rx-3)]">{p >= 1 ? 4 : 3} pinned</span></p>
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <AnimatePresence>
              {p >= 1 && (
                <motion.div key="new" className="relative rounded-[9px] bg-white p-2.5 ring-1 ring-inset ring-[var(--rx-line)]" initial={{ opacity: 0, y: -16, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55, ease: RX_EASE }} style={{ boxShadow: "0 8px 18px -8px rgb(23 32 44 / .25)" }}>
                  <span className="absolute -left-px top-2.5 h-4 w-[2px] rounded-full bg-[var(--rx-signal)]" />
                  <p className="text-[10px] text-[var(--rx-3)]">Market catalyst</p>
                  <p className="mt-0.5 line-clamp-2 text-[11.5px] font-medium leading-[15px]">AI data center power buildout</p>
                </motion.div>
              )}
            </AnimatePresence>
            {TILES.map((x) => (
              <motion.div key={x.t} layout className="rounded-[9px] bg-[var(--rx-well)] p-2.5" transition={{ duration: 0.55, ease: RX_EASE }}>
                <p className="text-[10px] text-[var(--rx-3)]">{x.k}</p>
                <p className="mt-0.5 line-clamp-2 text-[11.5px] font-medium leading-[15px]">{x.t}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Canvas>
    </div>
  );
}
