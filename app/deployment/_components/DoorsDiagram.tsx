"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, Pill, Sparkline, Stage, series } from "@/components/product/ui";

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

  return (
    <Stage field="lake" className="p-4 sm:p-7 md:p-8">
      <div ref={ref} className="relative">
        <div className="mb-4 flex items-center justify-between text-white/80">
          <span className="t-ui">Two ways in</span>
          <span className="t-ui flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            One foundation
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Door 1 — Platform Access */}
          <motion.div
            animate={{ opacity: door === 0 || reduce ? 1 : 0.62, y: door === 0 && !reduce ? -4 : 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className={clsx("ui-card flex flex-col p-3.5 sm:p-4", door === 0 && "ring-1 ring-white/70")}
          >
            <div className="flex items-center justify-between">
              <span className="t-ui text-ink/50">Platform Access</span>
              <Pill tone="lake">Seats</Pill>
            </div>
            <div className="mt-3 rounded-[10px] border border-ink/8 bg-white/80 p-2.5">
              <div className="flex gap-1" aria-hidden="true">
                {TABS.map((t, i) => (
                  <span
                    key={t}
                    className={clsx(
                      "truncate rounded-md px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.04em] transition-colors duration-500",
                      i === tab ? "bg-ink text-paper" : "text-ink/45",
                    )}
                  >
                    {t === "Knowledge Graph" ? "Graph" : t}
                  </span>
                ))}
              </div>
              <div className="relative mt-2.5 h-[86px] overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={tab}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-0"
                  >
                    {tab === 0 && (
                      <div>
                        <div className="flex items-center gap-2">
                          <AlfredGlyph className="h-3.5 w-3.5 text-lake-700" />
                          <span className="font-display text-[12px] font-semibold text-ink">Who is exposed to HBM supply?</span>
                        </div>
                        <div className="mt-2 space-y-1.5">
                          <div className="h-1.5 w-[92%] rounded-full bg-ink/10" />
                          <div className="h-1.5 w-[78%] rounded-full bg-ink/10" />
                          <div className="h-1.5 w-[64%] rounded-full bg-lake-100" />
                        </div>
                        <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.04em] text-ink/45">6 sources cited</p>
                      </div>
                    )}
                    {tab === 1 && (
                      <svg viewBox="0 0 200 86" className="h-full w-full" aria-hidden="true">
                        {[
                          [100, 43, 40, 18],
                          [100, 43, 160, 16],
                          [100, 43, 36, 70],
                          [100, 43, 168, 68],
                          [160, 16, 186, 44],
                        ].map(([x1, y1, x2, y2], i) => (
                          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5d738c" strokeWidth={1} initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: i * 0.08 }} />
                        ))}
                        {[
                          [100, 43, 7, "#243244"],
                          [40, 18, 4.5, "#5d738c"],
                          [160, 16, 4.5, "#5d738c"],
                          [36, 70, 4.5, "#3e5c50"],
                          [168, 68, 4.5, "#3e5c50"],
                          [186, 44, 3.5, "#8fa3b6"],
                        ].map(([cx, cy, r, f], i) => (
                          <circle key={i} cx={cx as number} cy={cy as number} r={r as number} fill={f as string} />
                        ))}
                      </svg>
                    )}
                    {tab === 2 && (
                      <div>
                        <div className="flex items-center justify-between">
                          <Pill tone="pine" className="!px-2 !py-0.5 !text-[9px]">Catalyst</Pill>
                          <span className="font-mono text-[9.5px] text-ink/40">now</span>
                        </div>
                        <p className="mt-1.5 font-display text-[12px] font-semibold leading-snug text-ink">Memory pricing shift touches 4 holdings</p>
                        <div className="mt-1 h-7 text-pine-500">
                          <Sparkline points={series(30, 7, 0.5, 2)} className="h-full w-full" animate={false} />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <p className="mt-3 text-[11.5px] leading-snug text-ink/60">A maintained environment. Nothing to run.</p>
          </motion.div>

          {/* Door 2 — Build (API, MCP, feeds, embedded) */}
          <motion.div
            animate={{ opacity: door === 1 || reduce ? 1 : 0.62, y: door === 1 && !reduce ? -4 : 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className={clsx("ui-card-dark flex flex-col p-3.5 text-paper sm:p-4", door === 1 && "ring-1 ring-white/40")}
          >
            <div className="flex items-center justify-between">
              <span className="t-ui text-paper/55">Build</span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.05em] text-paper/75">API · MCP</span>
            </div>
            <pre className="mt-3 overflow-hidden rounded-[10px] bg-black/30 p-2.5 font-mono text-[10.5px] leading-[1.7] text-paper/80">
              <span className="text-lake-300">tool</span>(<span className="text-pine-300">&quot;graph.exposure&quot;</span>,{"\n"}
              {"  "}entity: <span className="text-pine-300">&quot;SK Hynix&quot;</span>){"\n"}
              <span className="text-paper/40">→ 38 related · sources attached</span>
            </pre>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-paper/45">Into</span>
              <span className="relative h-6 flex-1 overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={target}
                    initial={reduce ? false : { y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute left-0 top-0 inline-flex h-6 items-center rounded-md border border-white/15 px-2 font-display text-[12px] font-medium text-paper"
                  >
                    {TARGETS[target]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
            <p className="mt-3 text-[11.5px] leading-snug text-paper/60">The same layer, inside the stack you run.</p>
          </motion.div>
        </div>

        {/* Connectors: foundation → active door */}
        <svg viewBox="0 0 400 56" preserveAspectRatio="none" className="hidden h-14 w-full sm:block" aria-hidden="true">
          <path d="M200 56 C 200 28, 100 28, 100 0" fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d="M200 56 C 200 28, 300 28, 300 0" fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {!reduce && (
            <motion.path
              key={door}
              d={door === 0 ? "M200 56 C 200 28, 100 28, 100 0" : "M200 56 C 200 28, 300 28, 300 0"}
              fill="none"
              stroke="#fff"
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          )}
        </svg>
        <div className="h-3 sm:hidden" />

        {/* Shared foundation */}
        <div className="ui-card p-3.5 sm:p-4">
          <div className="flex items-center justify-between">
            <span className="t-ui text-ink/50">Shared foundation</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink/40">Entity-resolved</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {FOUNDATION.map((f, i) => (
              <div key={f} className="relative overflow-hidden rounded-md border border-ink/8 bg-white/80 px-2 py-2 text-center">
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 bg-lake-100"
                    animate={{ opacity: tick % 3 === i ? 0.9 : 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                <span className="relative font-display text-[11.5px] font-semibold text-ink sm:text-[12.5px]">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}
