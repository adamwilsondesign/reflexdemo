"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Delta, Glyph, Icon, RX_EASE, Spark, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Use cases · Hero — "the same engine supports research, monitoring, testing, and idea generation".
 * Composition (wide): a board of large task rows, one per job, each running on
 * the same engine. Rows finish one by one; the output of the row that just
 * finished opens in a card cropped at the right edge of the frame.
 */
type Job = { name: string; task: string; out: string; icon: "bell" | "doc" | "graph" | "chart" | "spark" };
const JOBS: Job[] = [
  { name: "Portfolio monitoring", task: "Morning brief, 42 holdings", out: "6 developments", icon: "bell" },
  { name: "Deep research", task: "Amazon: is the thesis intact?", out: "Cited memo", icon: "doc" },
  { name: "Thematic exposure", task: "Industrial automation", out: "48 names", icon: "graph" },
  { name: "Scenario testing", task: "10-year yield +0.5pp", out: "Stress test", icon: "chart" },
  { name: "Idea generation", task: "Second-order names, AI power", out: "3 new ideas", icon: "spark" },
];

// 0 all running · 1..5 job i-1 finishes (output opens) · 6 out
const D = [900, 2600, 2600, 2600, 2600, 3600, 800];

export function JobsBoard({ narrow = false }: { narrow?: boolean }) {
  const { p, ref, cycle } = useTimeline(D, { still: 5 });
  const doneN = p === 6 ? 5 : p; // jobs finished
  const cur = Math.min(Math.max(p - 1, 0), 4);

  return (
    <div ref={ref}>
      <Canvas w={narrow ? 440 : 920} h={narrow ? 410 : 440} focusX={0}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 6 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          <motion.div className={clsx("rx-card rx-card-lift absolute px-5 pb-3 pt-4", narrow ? "left-[12px] top-[16px] w-[416px]" : "left-[60px] top-[30px] w-[540px]")} initial={{ y: 16 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><Spark size={12} className="text-[var(--rx-signal)]" /><span className="rx-serif text-[17px]">Today’s work</span></span>
              <span className="rx-num text-[11px] text-[var(--rx-3)]">{doneN} of 5 done</span>
            </div>
            <div className="mt-3">
              {JOBS.map((j, i) => {
                const done = i < doneN;
                const focus = p >= 1 && p < 6 && i === cur;
                return (
                  <div key={j.name} className="relative flex h-[62px] items-center gap-3.5 border-t border-[var(--rx-line)]">
                    <motion.span className="absolute -inset-x-3 inset-y-1 rounded-[10px]" initial={false} animate={{ backgroundColor: focus ? "rgba(244,243,240,1)" : "rgba(244,243,240,0)" }} transition={{ duration: 0.4 }} />
                    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-white text-[var(--rx-2)] shadow-[0_0_0_1px_rgb(23_32_44/.08),0_1px_2px_rgb(23_32_44/.06)]"><JobIcon name={j.icon} /></span>
                    <span className="relative min-w-0 flex-1">
                      <span className="block text-[11px] text-[var(--rx-3)]">{j.name}</span>
                      <span className="block truncate text-[14px] font-medium leading-5">{j.task}</span>
                    </span>
                    <span className={clsx("relative h-[26px] shrink-0", narrow ? "w-[108px]" : "w-[118px]")}>
                      <motion.span className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-[8px] bg-[var(--rx-well)] text-[11.5px] text-[var(--rx-3)]" initial={false} animate={{ opacity: done ? 0 : 1 }} transition={{ duration: 0.3 }}>
                        <motion.span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-[var(--rx-3)] border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} />Running
                      </motion.span>
                      <motion.span className="absolute inset-0 flex items-center justify-center gap-1 rounded-[8px] bg-[rgb(47_116_87/.1)] text-[11.5px] font-medium text-[#2f7457]" initial={false} animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.92 }} transition={{ duration: 0.35 }}>
                        <Icon name="check" size={12} />{j.out}
                      </motion.span>
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* output, cropped at the frame edge */}
          {!narrow && <div className="absolute left-[636px] top-[70px] h-[330px] w-[340px]">
            <AnimatePresence mode="wait">
              {p >= 1 && p < 6 && (
                <motion.div key={cur} className="rx-card absolute inset-x-0 top-0 p-5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16, transition: { duration: 0.25 } }} transition={{ duration: 0.6, ease: RX_EASE, delay: 0.2 }}>
                  <Output i={cur} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>}
        </motion.div>
      </Canvas>
    </div>
  );
}

function Output({ i }: { i: number }) {
  const label = ["Daily brief", "Research memo", "Theme constituents", "Scenario", "Ideas"][i];
  const title = ["CoreWeave rolls out Nvidia Vera Rubin", "Amazon thesis: weakens", "Industrial automation", "10-year yield up 0.5pp", "Second-order names worth a look"][i];
  const rows: [React.ReactNode, React.ReactNode][] = [
    [[<Name key="a" k="company">NVIDIA</Name>, <span key="b" className="text-[var(--rx-3)]">Supplier</span>], [<Name key="a" k="company">Microsoft Azure</Name>, <span key="b" className="text-[var(--rx-3)]">Cloud</span>], [<Name key="a" k="company">Nebius</Name>, <span key="b" className="text-[var(--rx-3)]">Cloud</span>]],
    [["What’s priced in", <span key="b" className="rx-num">16% AWS growth</span>], ["Counter-argument", "Capex"], ["What breaks it", "Next quarter"]],
    [[<Name key="a" k="company">Rockwell</Name>, "Core"], [<Name key="a" k="company">Teradyne</Name>, "Less obvious"], [<Name key="a" k="company">Harmonic Drive</Name>, "Less obvious"]],
    [["Median stock, 1M", <span key="b" className="rx-num">−1.1%</span>], ["Median stock, 3M", <span key="b" className="rx-num">−2.1%</span>], ["Median stock, 1Y", <span key="b" className="rx-num">+0.6%</span>]],
    [[<Name key="a" k="company">Vertiv</Name>, <Ticker key="b">VRT</Ticker>], [<Name key="a" k="company">Eaton</Name>, <Ticker key="b">ETN</Ticker>], [<Name key="a" k="company">Micron</Name>, <Ticker key="b">MU</Ticker>]],
  ][i] as [React.ReactNode, React.ReactNode][];
  return (
    <>
      <p className="text-[11px] font-medium text-[var(--rx-3)]">{label}</p>
      <p className="rx-serif mt-1 text-[18px] leading-[25px]">{title}</p>
      {i === 0 && <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-[var(--rx-3)]">Company catalyst <Delta v={2.4} /></p>}
      <div className="mt-3">
        {rows.map(([a, b], k) => (
          <motion.div key={k} className="flex h-[40px] items-center justify-between border-t border-[var(--rx-line)] text-[12.5px]" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + k * 0.12, duration: 0.45, ease: RX_EASE }}>
            <span className="font-medium">{a}</span>
            <span className="text-[var(--rx-2)]">{b}</span>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function Name({ children, k }: { children: React.ReactNode; k: "company" }) {
  return <span className="flex items-center gap-2"><Glyph kind={k} size={9} className="text-[var(--rx-3)]" />{children}</span>;
}

function JobIcon({ name }: { name: Job["icon"] }) {
  if (name === "spark") return <Spark size={15} />;
  if (name === "chart") {
    return <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M2.5 13.5h11M4.5 11V8M8 11V4.5M11.5 11V7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
  }
  return <Icon name={name} size={16} />;
}
