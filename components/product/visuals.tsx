"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, CardHeader, Cite, CodeBlock, MetricRow, MissingData, Pill, SourceRow, Sparkline, Stage, TakeawayList, series } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Always-on: a live stream of Insights arriving ---------- */
const STREAM = [
  { type: "Market catalyst", title: "AI data center power buildout accelerates", touch: "VRT, ETN, CEG", dir: "up" },
  { type: "Earnings recap", title: "Guidance overshadowed a mixed Nike quarter", touch: "NKE, 4 peers", dir: "down" },
  { type: "Company catalyst", title: "Sanofi settles Regeneron dispute in expanded antibody pact", touch: "SNY, REGN", dir: "up" },
  { type: "Scenario pattern", title: "Eli Lilly: recession probability at a new low", touch: "LLY", dir: "up" },
  { type: "Company catalyst", title: "CoreWeave rolls out Nvidia Vera Rubin with Cognition live", touch: "CRWV, NVDA, MSFT", dir: "up" },
] as const;

export function InsightStream({ className, field = "lake" }: { className?: string; field?: "lake" | "pine" | "mist" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [head, setHead] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setHead((h) => h + 1), 2400);
    return () => clearInterval(iv);
  }, [inView, reduce]);
  const visible = [0, 1, 2, 3].map((k) => ({ ...STREAM[(head + 3 - k + STREAM.length * 10) % STREAM.length], key: head - k }));

  return (
    <Stage field={field} className={clsx("h-full w-full p-5 sm:p-8", className)}>
      <div ref={ref} className="mx-auto flex h-full max-w-[460px] flex-col">
        <div className="mb-4 flex items-center justify-between text-white/80">
          <span className="t-ui flex items-center gap-2">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" /><span className="relative h-2 w-2 rounded-full bg-white" /></span>
            Monitoring 42 names · 6 themes
          </span>
          <span className="t-ui">Live</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence initial={false}>
            {visible.map((it, i) => (
              <motion.div
                key={it.key}
                layout
                initial={{ opacity: 0, y: -30, scale: 0.97 }}
                animate={{ opacity: 1 - i * 0.2, y: 0, scale: 1 - i * 0.015 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="ui-card mb-2.5 p-3.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <Pill tone={it.type.includes("Earnings") ? "pine" : "lake"}>{it.type}</Pill>
                  <span className="font-mono text-[10px] text-ink/40">{i === 0 ? "now" : `${i * 7}m ago`}</span>
                </div>
                <p className="mt-2 font-display text-[14px] font-semibold leading-snug text-ink">{it.title}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.04em] text-ink/50">
                  Touches {it.touch} <span className={it.dir === "up" ? "text-pine-500" : "text-[#9a4b3c]"}>{it.dir === "up" ? "▲" : "▼"}</span>
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}

/* ---------- Auditable: answer → source → calculation, with a gap flagged ---------- */
export function AuditTrace({ className, field = "mist", focus = -1 }: { className?: string; field?: "lake" | "pine" | "mist"; focus?: number }) {
  return (
    <Stage field={field} className={clsx("h-full w-full p-5 sm:p-8", className)}>
      <div className="mx-auto flex h-full max-w-[480px] flex-col justify-center gap-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className={clsx("ui-card p-4", focus === -1 || focus === 0 ? "" : "opacity-60")}>
          <div className="flex items-center justify-between">
            <span className="t-ui text-ink/50">Analysis result</span>
            <Pill tone="lake">Source linked</Pill>
          </div>
          <p className="mt-2 text-[13px] text-ink/70">AI infrastructure spend grew in 2024</p>
          <div className="mt-1 flex items-end gap-4">
            <span className="font-display text-[40px] font-semibold leading-none tracking-[-0.03em] text-ink">48%<Cite n={1} /></span>
            <span className="pb-1 font-mono text-[11px] text-ink/50">$142B → $210B</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: focus === -1 || focus === 0 ? 1 : 0.6, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}>
          <SourceRow n={1} title="Amazon Q4 2024 Earnings Release" meta="Filing · p.4 · LSEG" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: focus === -1 || focus === 2 ? 1 : 0.6, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: EASE }}>
          <CodeBlock lines={[`<span style="color:#8fa3b6">growth</span> = (capex_2024 - capex_2023) / capex_2023`, `<span style="color:#8fa3b6">growth</span> = (210 - 142) / 142  <span style="color:#7d978c"># = 0.479</span>`]} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: focus === -1 || focus === 1 ? 1 : 0.6, y: 0 }} transition={{ duration: 0.7, delay: 0.45, ease: EASE }}>
          <MissingData />
        </motion.div>
      </div>
    </Stage>
  );
}

/* ---------- Insight anatomy (headline, 5 takeaways, ripple, Ask Alfred) ---------- */
export function InsightAnatomy({ step = 0, className }: { step?: number; className?: string }) {
  return (
    <Stage field="pine" className={clsx("h-full w-full p-5 sm:p-8", className)}>
      <div className="mx-auto h-full max-w-[460px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="a" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, ease: EASE }} className="ui-card p-5">
              <div className="flex items-center justify-between"><span className="t-ui text-ink/50">Market catalyst</span><Pill tone="pine">Bullish</Pill></div>
              <p className="mt-3 font-display text-[22px] font-semibold leading-tight text-ink">AI data center power buildout accelerates</p>
              <p className="mt-2 text-[12.5px] text-ink/60">Theme · Data center power</p>
              <div className="mt-4 h-16 text-pine-500"><Sparkline points={series(40, 5, 0.6, 2)} className="h-full w-full" fill="rgb(62 92 80 / 0.12)" /></div>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="b" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, ease: EASE }} className="ui-card p-5">
              <div className="flex items-center justify-between"><span className="t-ui text-ink/50">Signal summary</span><Pill>5 takeaways</Pill></div>
              <p className="mt-3 font-display text-[18px] font-semibold text-ink">5 key takeaways</p>
              <div className="mt-3"><TakeawayList active={0} items={["Utility interconnect queues lengthen", "Grid equipment orders strengthen", "Hyperscaler capex guidance rises", "Cooling and power supply tighten", "Key milestones to watch"]} /></div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="c" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, ease: EASE }} className="ui-card p-5">
              <div className="flex items-center justify-between"><span className="t-ui text-ink/50">Graph ripple effects</span><Pill tone="lake">Ranked</Pill></div>
              <ul className="mt-4 space-y-2">
                {[["Vertiv", "Power & cooling", 0.91, "Direct"], ["Eaton", "Electrical equipment", 0.82, "Direct"], ["Constellation", "Generation", 0.71, "2nd order"], ["Quanta Services", "Grid build-out", 0.6, "2nd order"]].map(([n, r, w, h], i) => (
                  <motion.li key={n as string} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="flex items-center gap-3 rounded-md bg-white/70 px-3 py-2">
                    <span className="w-[96px] shrink-0 font-display text-[13px] font-semibold text-ink">{n as string}</span>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink/55">{r as string}</span>
                    <span className="font-mono text-[10px] uppercase text-ink/40">{h as string}</span>
                    <span className="h-1 w-12 overflow-hidden rounded-full bg-ink/8"><motion.span className="block h-full bg-pine-500" initial={{ width: 0 }} animate={{ width: `${(w as number) * 100}%` }} transition={{ delay: 0.3 + i * 0.1, duration: 0.9 }} /></span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="d" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, ease: EASE }} className="ui-card p-5">
              <CardHeader trail={["Research assistant"]} />
              <p className="mt-4 font-display text-[18px] font-semibold text-ink">Ask Alfred</p>
              <div className="mt-3 rounded-lg border border-ink/10 bg-white p-3 text-[13px] text-ink/80">Which of these names has the most exposure to US grid interconnect delays?</div>
              <p className="t-ui mt-4 text-ink/40">Suggested follow-ups</p>
              <ul className="mt-2 space-y-1.5 text-[12.5px] text-ink/70">
                <li className="flex justify-between rounded-md border border-ink/8 px-3 py-2">Compare utility capex plans for 2026 <span>→</span></li>
                <li className="flex justify-between rounded-md border border-ink/8 px-3 py-2">Summarize regional exposure for the cohort <span>→</span></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  );
}

/* ---------- Daily brief (portfolio monitoring) ---------- */
export function DailyBrief({ className }: { className?: string }) {
  return (
    <div className={clsx("ui-card p-5", className)}>
      <div className="flex items-start justify-between">
        <span className="flex items-center gap-2.5">
          <AlfredGlyph className="h-5 w-5 text-lake-700" />
          <span>
            <span className="block font-display text-[16px] font-semibold text-ink">Daily Brief</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">Monday · 07:00 ET</span>
          </span>
        </span>
        <Pill tone="pine">Ready</Pill>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-3">
        <span className="text-[12px] text-ink/60">Your watchlist · 6 companies monitored</span>
        <span className="flex -space-x-1.5">{["N", "A", "M", "C"].map((l) => <span key={l} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#f7f6f4] bg-lake-700 font-display text-[10px] font-semibold text-white">{l}</span>)}</span>
      </div>
      <p className="t-ui mt-4 text-ink/45">Latest developments</p>
      <MetricRow label="NVIDIA · stronger data center revenue, guidance raised" value="+3.1%" delta="▲" />
      <MetricRow label="Netflix · new ad tier metrics ahead of Q2" value="−0.8%" delta="▼" up={false} />
      <MetricRow label="Microsoft · Copilot seat expansion reported" value="+1.2%" delta="▲" />
      <p className="t-ui mt-4 text-ink/45">Upcoming</p>
      <div className="mt-2 flex items-center justify-between rounded-md bg-white/70 px-3 py-2 text-[12px]">
        <span className="font-medium text-ink">NVIDIA · Q1 earnings call</span>
        <span className="font-mono text-[10px] text-ink/50">Preview ready</span>
      </div>
    </div>
  );
}

/* ---------- Scroll story: one worked example from headline to inspected answer ---------- */
export function ScrollStory({
  steps,
  className,
}: {
  steps: { kicker: string; title: string; body: string; visual: React.ReactNode }[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className={clsx("grid gap-10 lg:grid-cols-12 lg:gap-16", className)}>
      <div className="lg:col-span-5">
        {steps.map((s, i) => (
          <StoryStep key={s.title} index={i} onActive={setActive} active={active === i} {...s} />
        ))}
      </div>
      <div className="hidden lg:col-span-7 lg:block">
        <div className="sticky top-[calc(var(--header-h)+48px)] aspect-[4/3.6] w-full">
          <AnimatePresence mode="popLayout">
            <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -20, filter: "blur(6px)" }} transition={{ duration: 0.8, ease: EASE }}>
              {steps[active].visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StoryStep({ kicker, title, body, visual, index, onActive, active }: { kicker: string; title: string; body: string; visual: React.ReactNode; index: number; onActive: (i: number) => void; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => { if (inView) onActive(index); }, [inView, index, onActive]);
  return (
    <div ref={ref} className="flex min-h-[auto] flex-col justify-center py-8 lg:min-h-[72vh] lg:py-0">
      <div className={clsx("transition-opacity duration-700", active ? "opacity-100" : "lg:opacity-30")}>
        <h3 className="t-h2">{title}</h3>
        <p className="t-lead mt-4 text-ink/70">{body}</p>
      </div>
      <div className="mt-8 aspect-[4/3.6] w-full lg:hidden">{visual}</div>
    </div>
  );
}
