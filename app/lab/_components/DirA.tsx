"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, CiteChip, Cursor, Delta, Glyph, Icon, Mono, RX_EASE, Spark, Ticker, useTimeline, useTyped } from "@/components/visual/kit";

/**
 * Direction A — "Focal card".
 * One card in focus. A cursor sends the prompt, the composer docks, the answer
 * card resolves its working steps into a ranked list, then the cursor opens the
 * evidence path behind one name.
 */
const PROMPT = "Map AAPL’s ecosystem and find the hidden beneficiaries.";

const ROWS = [
  { t: "CRUS", name: "Cirrus Logic", path: "Customer · audio and haptics", m: 1.84, tone: "#3e5368", cite: 1 },
  { t: "AMKR", name: "Amkor Technology", path: "Advanced packaging · Arizona", m: 2.31, tone: "#243244", cite: 2 },
  { t: "GLW", name: "Corning", path: "Supplier · cover glass", m: 0.62, tone: "#3e5c50", cite: 3 },
  { t: "JBL", name: "Jabil", path: "Supplier · assembly", m: -0.41, tone: "#5b6068", cite: 4 },
];

const STEPS = ["Mapped 214 suppliers, customers and partners", "Followed three hops through the Knowledge Graph", "Ranked by strength of revenue linkage"];

// phase: 0 in · 1 type · 2 move · 3 press · 4 working · 5 answer · 6 inspect · 7 out
const D = [700, 3300, 1000, 450, 2600, 2600, 4200, 700];

export function DirA() {
  const { p, ref, cycle } = useTimeline(D, { still: 6 });
  const typed = useTyped(PROMPT, p >= 1, { speed: 34 });
  const docked = p >= 4 && p < 7;
  const out = p === 7;

  const cursor =
    p <= 1 ? { x: 600, y: 470, visible: false } :
    p <= 3 ? { x: 461, y: 244, visible: true } :
    p <= 5 ? { x: 520, y: 330, visible: false } :
    p === 6 ? { x: 214, y: 270, visible: true } : { x: 600, y: 470, visible: false };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <motion.div key={cycle} className="absolute inset-0" animate={{ opacity: out ? 0 : 1 }} transition={{ duration: 0.6 }}>
          {/* context: cropped, quiet, fading off the frame */}
          <div className="rx-card absolute left-[372px] top-[-36px] w-[250px] p-4 opacity-60" style={{ maskImage: "linear-gradient(200deg, #000 30%, transparent 85%)" }}>
            <p className="text-[11px] font-medium text-[var(--rx-3)]">Watchlist · Hardware</p>
            {[["AAPL", 0.84], ["AVGO", 1.12], ["QCOM", -0.3]].map(([t, m]) => (
              <div key={t as string} className="mt-2.5 flex items-center justify-between"><Ticker>{t}</Ticker><Delta v={m as number} /></div>
            ))}
          </div>
          <div className="rx-card absolute left-[-40px] top-[392px] w-[230px] p-4 opacity-60" style={{ maskImage: "linear-gradient(20deg, #000 25%, transparent 80%)" }}>
            <p className="text-[11px] font-medium text-[var(--rx-3)]">Theme · Advanced packaging</p>
            <svg viewBox="0 0 200 40" className="mt-2 h-10 w-full"><path d="M0 32 C30 30 40 22 70 24 S120 10 150 12 S185 4 200 6" fill="none" stroke="var(--rx-up)" strokeWidth="1.5" /></svg>
          </div>

          {/* composer → docked question */}
          <motion.div
            className="rx-card absolute left-[70px] w-[420px] overflow-hidden"
            initial={{ opacity: 0, y: 186 }}
            animate={{ opacity: 1, y: docked ? 26 : 176 }}
            transition={{ duration: 0.9, ease: RX_EASE }}
          >
            <motion.div layout className="px-4 pt-3.5" transition={{ duration: 0.6, ease: RX_EASE }}>
              <div className="flex items-start gap-2.5">
                <AnimatePresence initial={false}>
                  {docked && (
                    <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 22 }} exit={{ opacity: 0, width: 0 }} className="mt-px grid h-[22px] shrink-0 place-items-center overflow-hidden rounded-full bg-[var(--rx-well)] text-[9.5px] font-semibold text-[var(--rx-2)]">AW</motion.span>
                  )}
                </AnimatePresence>
                <p className={clsx("min-h-[22px] leading-[22px] transition-all duration-500", docked ? "pb-3.5 text-[13px] text-[var(--rx-2)]" : "text-[15px] text-[var(--rx-ink)]")}>
                  {typed || <span className="text-[var(--rx-3)]">Ask Alfred anything…</span>}
                  {p === 1 && typed.length < PROMPT.length && <span className="ml-px inline-block h-[15px] w-[1.5px] translate-y-[2px] animate-pulse bg-[var(--rx-ink)]" />}
                </p>
              </div>
            </motion.div>
            <AnimatePresence initial={false}>
              {!docked && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: RX_EASE }}>
                  <div className="flex items-center justify-between px-3 pb-3 pt-5">
                    <div className="flex items-center gap-1 text-[var(--rx-3)]">
                      <span className="grid h-7 w-7 place-items-center rounded-[8px]"><Icon name="attach" /></span>
                      <span className="grid h-7 w-7 place-items-center rounded-[8px]"><Icon name="globe" /></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 items-center gap-1 rounded-[8px] bg-[var(--rx-well)] px-2.5 text-[11.5px] font-medium text-[var(--rx-2)]">Deep research <Icon name="chev" size={12} /></span>
                      <motion.span
                        className="grid h-7 w-7 place-items-center rounded-[8px] text-white"
                        animate={{ scale: p === 3 ? 0.88 : 1, backgroundColor: typed.length === PROMPT.length ? "#17191c" : "#c9cbcf" }}
                        transition={{ duration: 0.18 }}
                      >
                        <Icon name="send" />
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* answer */}
          <AnimatePresence>
            {docked && (
              <motion.div
                className="rx-card rx-card-lift absolute left-[54px] top-[96px] w-[452px] p-[18px]"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.8, ease: RX_EASE, delay: 0.25 }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[12px] font-semibold"><Spark className="text-[var(--rx-signal)]" />Alfred <span className="font-normal text-[var(--rx-3)]">· Deep research</span></span>
                  <span className="flex items-center gap-1 text-[11px] text-[var(--rx-3)]"><Icon name="doc" size={12} />{p >= 5 ? "4 sources" : "Working"}</span>
                </div>

                <motion.div layout transition={{ duration: 0.6, ease: RX_EASE }}>
                  {p === 4 ? (
                    <div className="mt-4 space-y-2.5">
                      {STEPS.map((s, i) => (
                        <motion.div key={s} className="flex items-center gap-2.5 text-[12.5px] text-[var(--rx-2)]" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.6, duration: 0.5, ease: RX_EASE }}>
                          <motion.span className="grid h-4 w-4 place-items-center rounded-full" initial={{ backgroundColor: "#eceae5", color: "rgba(0,0,0,0)" }} animate={{ backgroundColor: "#17191c", color: "#ffffff" }} transition={{ delay: 0.9 + i * 0.6, duration: 0.3 }}>
                            <Icon name="check" size={10} />
                          </motion.span>
                          {s}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="rx-serif mt-3 text-[19px] leading-[26px] text-[var(--rx-ink)]">Four less obvious names exposed to Apple</p>
                      <p className="mt-1 text-[11.5px] text-[var(--rx-3)]">214 entities mapped · 3 hops · ranked by revenue linkage</p>
                      <div className="mt-3">
                        {ROWS.map((r, i) => {
                          const hot = p === 6 && i === 1;
                          return (
                            <motion.div
                              key={r.t}
                              className="relative -mx-2 flex h-[46px] items-center gap-3 rounded-[10px] px-2"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: p === 6 && i !== 1 ? 0.45 : 1, y: 0, backgroundColor: hot ? "#f4f3f0" : "rgba(244,243,240,0)" }}
                              transition={{ duration: 0.55, ease: RX_EASE, delay: p === 5 ? 0.15 + i * 0.22 : 0 }}
                            >
                              <span className="rx-num w-3 text-[11px] text-[var(--rx-3)]">{i + 1}</span>
                              <Mono t={r.t.slice(0, 2)} tone={r.tone} />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[13px] font-medium leading-4">{r.name}<CiteChip n={r.cite} active={hot} /></span>
                                <span className="block truncate text-[11.5px] leading-4 text-[var(--rx-3)]">{r.path}</span>
                              </span>
                              <Ticker>{r.t}</Ticker>
                              <Delta v={r.m} className="w-[52px] text-right" />
                            </motion.div>
                          );
                        })}
                      </div>
                      <p className="mt-2 flex items-center gap-2 border-t border-[var(--rx-line)] pt-3 text-[11.5px] text-[var(--rx-2)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--rx-signal)]" />
                        Jabil’s Apple revenue split isn’t disclosed. Flagged, not estimated.
                      </p>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* evidence popover */}
          <AnimatePresence>
            {p === 6 && (
              <motion.div
                className="rx-card rx-card-lift absolute left-[236px] top-[304px] z-40 w-[268px] p-4"
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.45, ease: RX_EASE, delay: 0.9 }}
                style={{ transformOrigin: "20% 0%" }}
              >
                <p className="text-[11px] font-medium text-[var(--rx-3)]">Why Amkor</p>
                <PathTrace delay={1.2} />
                <p className="mt-3 text-[12px] leading-[17px] text-[var(--rx-2)]">Apple named Amkor as the packaging partner for chips made in Arizona.<CiteChip n={2} active /></p>
              </motion.div>
            )}
          </AnimatePresence>

          <Cursor {...cursor} press={p === 3} />
        </motion.div>
      </Canvas>
    </div>
  );
}

/** AAPL ○ — pill — ○ AMKR, the amber path drawing through. */
function PathTrace({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative mt-3 h-[30px]">
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 236 30" preserveAspectRatio="none">
        <line x1="10" y1="15" x2="226" y2="15" stroke="var(--rx-line)" strokeWidth="1.5" />
        <motion.line x1="10" y1="15" x2="226" y2="15" stroke="var(--rx-signal)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: 1.1, ease: RX_EASE }} />
      </svg>
      <div className="relative flex h-full items-center justify-between">
        <span className="flex items-center gap-1.5 bg-white pr-1.5 text-[11.5px] font-medium"><Glyph kind="company" active />AAPL</span>
        <span className="flex h-[22px] items-center gap-1.5 rounded-full border border-[var(--rx-signal)] bg-white px-2.5 text-[11px] text-[var(--rx-ink)]">Advanced packaging</span>
        <motion.span className="flex items-center gap-1.5 bg-white pl-1.5 text-[11.5px] font-medium" initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ delay: delay + 1 }}>AMKR<Glyph kind="company" active /></motion.span>
      </div>
    </div>
  );
}
