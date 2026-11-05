"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CardHeader, Cite, CodeBlock, MetricRow, MissingData, SourceRow, Sparkline, Stage, TakeawayList, series } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Always-on: Insights arriving, one line each ---------- */
const STREAM = [
  { type: "Market catalyst", title: "AI data center power buildout accelerates", touch: "VRT, ETN, CEG" },
  { type: "Earnings recap", title: "Guidance overshadowed a mixed Nike quarter", touch: "NKE" },
  { type: "Company catalyst", title: "Sanofi settles Regeneron dispute", touch: "SNY, REGN" },
  { type: "Scenario pattern", title: "Eli Lilly: recession probability at a new low", touch: "LLY" },
  { type: "Company catalyst", title: "CoreWeave rolls out Nvidia Vera Rubin", touch: "CRWV, NVDA" },
] as const;

export function InsightStream({ className, field = "lake" }: { className?: string; field?: "lake" | "pine" | "mist" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [head, setHead] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setHead((h) => h + 1), 2600);
    return () => clearInterval(iv);
  }, [inView, reduce]);
  const visible = [0, 1, 2].map((k) => ({ ...STREAM[(head + 2 - k + STREAM.length * 10) % STREAM.length], key: head - k }));

  return (
    <Stage field={field} className={clsx("flex h-full w-full items-center p-5 sm:p-8", className)}>
      <div ref={ref} className="ui-card mx-auto w-full max-w-[420px] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold">Insights</span>
          <span className="flex items-center gap-1.5 text-[12px] text-[#8f8f8f]"><span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" />Monitoring 42 names</span>
        </div>
        <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
          <AnimatePresence initial={false}>
            {visible.map((it, i) => (
              <motion.li key={it.key} layout initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1 - i * 0.25, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="py-2.5">
                <div className="flex items-center justify-between gap-3 text-[12px] text-[#8f8f8f]">
                  <span>{it.type}</span>
                  <span>{i === 0 ? "now" : `${i * 7}m`}</span>
                </div>
                <p className="mt-0.5 text-[14px] font-medium leading-snug text-[#0d0d0d]">{it.title}</p>
                <p className="mt-0.5 text-[12px] text-[#5d5d5d]">{it.touch}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </Stage>
  );
}

/* ---------- Auditable: one answer, its source, its calculation, one gap ---------- */
export function AuditTrace({ className, field = "mist", focus = -1 }: { className?: string; field?: "lake" | "pine" | "mist"; focus?: number }) {
  const dim = (k: number) => (focus === -1 || focus === k ? "opacity-100" : "opacity-40");
  return (
    <Stage field={field} className={clsx("flex h-full w-full items-center p-5 sm:p-8", className)}>
      <div className="ui-card mx-auto w-full max-w-[420px] p-4">
        <p className="text-[13px] text-[#8f8f8f]">AI infrastructure spend, 2024</p>
        <p className={clsx("mt-1 text-[24px] font-semibold leading-tight transition-opacity", dim(0))}>
          +48%<Cite n={1} />
        </p>
        <div className="mt-3 space-y-2">
          <div className={clsx("transition-opacity", dim(0))}><SourceRow n={1} title="Amazon Q4 2024 earnings release" meta="Filing, p.4" /></div>
          <div className={clsx("transition-opacity", dim(2))}><CodeBlock lines={["growth = (210 - 142) / 142  # 0.479"]} /></div>
          <div className={clsx("transition-opacity", dim(1))}><MissingData label="Regional breakdown" reason="Not disclosed" /></div>
        </div>
      </div>
    </Stage>
  );
}

/* ---------- Insight anatomy (headline, takeaways, ripple, Ask Alfred) ---------- */
export function InsightAnatomy({ step = 0, className }: { step?: number; className?: string }) {
  return (
    <Stage field="pine" className={clsx("flex h-full w-full items-center p-5 sm:p-8", className)}>
      <div className="mx-auto w-full max-w-[420px]">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45, ease: EASE }} className="ui-card p-4">
            {step === 0 && (
              <>
                <p className="text-[12px] text-[#8f8f8f]">Market catalyst · Data center power</p>
                <p className="mt-1 text-[18px] font-semibold leading-snug">AI data center power buildout accelerates</p>
                <div className="mt-3 h-12"><Sparkline points={series(36, 5, 0.6, 2)} className="h-full w-full" /></div>
              </>
            )}
            {step === 1 && (
              <>
                <p className="text-[14px] font-semibold">Top 5 takeaways</p>
                <div className="mt-2"><TakeawayList active={0} items={["Interconnect queues lengthen", "Grid equipment orders strengthen", "Hyperscaler capex guidance rises", "Cooling supply tightens", "Milestones to watch"]} /></div>
              </>
            )}
            {step === 2 && (
              <>
                <p className="text-[14px] font-semibold">Connected companies</p>
                <div className="mt-2 divide-y divide-black/10">
                  {[["Vertiv", "Direct"], ["Eaton", "Direct"], ["Constellation", "2nd order"], ["Quanta Services", "2nd order"]].map(([n, h]) => (
                    <div key={n} className="flex items-center justify-between py-2 text-[13px]"><span className="text-[#0d0d0d]">{n}</span><span className="text-[#8f8f8f]">{h}</span></div>
                  ))}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <CardHeader trail={["Follow-up"]} />
                <p className="mt-3 rounded-[10px] bg-[#f9f9f9] px-3 py-2 text-[14px]">Which of these names is most exposed to grid interconnect delays?</p>
                <p className="mt-2 text-[13px] text-[#8f8f8f]">Compare utility capex plans for 2026 →</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Stage>
  );
}

/* ---------- Daily brief (portfolio monitoring) ---------- */
export function DailyBrief({ className }: { className?: string }) {
  return (
    <div className={clsx("ui-card p-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-semibold">Daily brief</span>
        <span className="text-[12px] text-[#8f8f8f]">Mon 07:00</span>
      </div>
      <p className="mt-1 text-[13px] text-[#5d5d5d]">6 companies on your watchlist</p>
      <div className="mt-3">
        <MetricRow label="NVIDIA · guidance raised" value="+3.1%" delta="▲" />
        <MetricRow label="Netflix · ad tier metrics" value="−0.8%" delta="▼" up={false} />
        <MetricRow label="Microsoft · Copilot seats" value="+1.2%" delta="▲" />
      </div>
      <p className="mt-3 text-[13px] text-[#8f8f8f]">Upcoming: NVIDIA Q1 call, preview ready</p>
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
        <div className="sticky top-[calc(var(--header-live)+48px)] aspect-[4/3.6] w-full">
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
