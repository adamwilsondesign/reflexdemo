"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, CiteChip, Cursor, Icon, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Insights · One event, read for the way you invest.
 * Composition: an event strip over one brief with a "Read as" select. The cursor
 * switches the reader from a consumer PM to a special-situations analyst; the
 * frame, the takeaways and the source all change, the event does not.
 */
const LENS = [
  {
    who: "Consumer PM",
    frame: "Category read",
    points: ["Brands could be put up for sale across the category", "Margin gaps versus peers screen the next target", "Watch pricing and shelf-space responses"],
    src: "Newswire report · Dow Jones",
  },
  {
    who: "Special situations",
    frame: "Deal-mechanics read",
    points: ["Stake size, filing type and stated intent", "Board nomination window and next annual meeting", "This investor’s prior campaigns and outcomes"],
    src: "Beneficial-ownership filing",
  },
];
const OPTS = ["Consumer PM", "Special situations", "Credit analyst"];

const SELECT = { x: 492, y: 137 };
const OPT = (i: number) => ({ x: 480, y: 183 + i * 34 });

// 0 consumer · 1 move · 2 open · 3 hover · 4 pick · 5 special · 6 out
const D = [3800, 800, 900, 600, 400, 4400, 700];

export function LensSwitch() {
  const { p, ref, cycle } = useTimeline(D, { still: 5 });
  const l = p >= 4 ? 1 : 0;
  const L = LENS[l];
  const menu = p >= 2 && p <= 4;
  const cursor = p === 0 ? { x: 560, y: 470, visible: false } : p <= 2 ? { ...SELECT, visible: true } : p <= 4 ? { ...OPT(1), visible: true } : { x: 520, y: 330, visible: false };

  return (
    <div ref={ref}>
      <Canvas w={640} h={410} focusX={0.35}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 6 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          {/* event */}
          <div className="rx-card absolute left-[40px] top-[26px] flex w-[560px] items-center gap-3 px-4 py-3">
            <span className="rounded-[6px] bg-[var(--rx-well)] px-2 py-1 text-[10.5px] font-medium text-[var(--rx-2)]">Event</span>
            <p className="flex-1 truncate text-[13px] font-medium">An activist investor discloses a stake in a consumer brands company</p>
          </div>

          {/* brief */}
          <div className="rx-card rx-card-lift absolute left-[40px] top-[102px] w-[560px] px-6 pb-5 pt-5">
            <div className="flex h-[30px] items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#3e5368]"><Spark size={10} />Insight</span>
              <span className="flex items-center gap-2 text-[11.5px] text-[var(--rx-3)]">
                Read as
                <motion.span className="flex h-[30px] w-[172px] items-center gap-2 whitespace-nowrap rounded-[8px] px-2.5 text-[12px] font-medium text-[var(--rx-ink)]" animate={{ backgroundColor: menu ? "#f4f3f0" : "rgba(255,255,255,1)", scale: p === 2 ? 0.96 : 1 }} transition={{ duration: 0.2 }} style={{ boxShadow: "inset 0 0 0 1px rgb(23 25 28 / .1)" }}>
                  <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-[var(--rx-well)] text-[8.5px] font-semibold text-[var(--rx-2)]">{l ? "SS" : "PM"}</span>
                  {L.who}
                  <span className="ml-auto text-[var(--rx-3)]"><Icon name="chev" size={11} /></span>
                </motion.span>
              </span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.45, ease: RX_EASE }}>
                <span className="mt-4 inline-flex rounded-full bg-[rgb(62_83_104/.1)] px-2.5 py-1 text-[11px] font-medium text-[#3e5368]">{L.frame}</span>
                <div className="mt-3">
                  {L.points.map((t, i) => (
                    <p key={t} className="flex h-[40px] items-center gap-3 border-t border-[var(--rx-line)] text-[13px]">
                      <span className="rx-num w-3 text-[11px] text-[var(--rx-3)]">{i + 1}</span>{t}
                    </p>
                  ))}
                </div>
                <p className="mt-1 flex items-center gap-2 border-t border-[var(--rx-line)] pt-3 text-[11.5px] text-[var(--rx-2)]">
                  <Icon name="doc" size={13} />{L.src}<CiteChip n={1} active={l === 1} />
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* select menu */}
          <AnimatePresence>
            {menu && (
              <motion.div className="rx-card absolute left-[404px] top-[160px] z-20 w-[172px] p-1.5" initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ duration: 0.25, ease: RX_EASE }} style={{ transformOrigin: "70% 0%" }}>
                {OPTS.map((o, i) => (
                  <span key={o} className={clsx("flex h-[34px] items-center gap-2 rounded-[7px] px-2.5 text-[12px]", i === 1 && p >= 3 ? "bg-[var(--rx-well)] text-[var(--rx-ink)]" : "text-[var(--rx-2)]")}>
                    {o}
                    {i === (p >= 4 ? 1 : 0) && <span className="ml-auto text-[var(--rx-ink)]"><Icon name="check" size={12} /></span>}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <Cursor {...cursor} press={p === 2 || p === 4} />
        </motion.div>
      </Canvas>
    </div>
  );
}
