"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CardHeader, Cite, CodeBlock, MetricRow, MissingData, SourceRow, Sparkline, Stage, TakeawayList, series } from "./ui";
import { Chain, MOTION_EASE, MockPanel, useCycle } from "./motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Always-on: notifications arrive one at a time (motion system) ---------- */
const STREAM = [
  { type: "Market catalyst", title: "AI data center power buildout accelerates", touch: "VRT, ETN, CEG" },
  { type: "Earnings recap", title: "Guidance overshadowed a mixed Nike quarter", touch: "NKE" },
  { type: "Company catalyst", title: "CoreWeave rolls out Nvidia Vera Rubin", touch: "CRWV, NVDA" },
] as const;

export function InsightStream({ className, field = "lake" }: { className?: string; field?: "lake" | "pine" | "mist" }) {
  const [i, ref] = useCycle(STREAM.length, { ms: 4500 });
  return (
    <Stage field={field} className={clsx("flex h-full w-full items-center justify-center p-6 sm:p-10", className)}>
      <div ref={ref} className="w-full max-w-[380px]">
        <MockPanel height={232}>
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-semibold">Insights</span>
            <span className="text-[#8f8f8f]">Your watchlist</span>
          </div>
          <div className="mt-3">
            <AnimatePresence initial={false}>
              {[0, 1].map((k) => {
                const it = STREAM[(i - k + STREAM.length) % STREAM.length];
                return (
                  <motion.div key={`${i}-${k}`} layout initial={k === 0 ? { opacity: 0, y: -8 } : false} animate={{ opacity: k === 0 ? 1 : 0.45, y: 0 }} transition={{ duration: 0.6, ease: MOTION_EASE }} className="border-t border-black/10 py-3">
                    <p className="flex items-center justify-between text-[12px] text-[#8f8f8f]"><span>{it.type}</span><span>{k === 0 ? "now" : "8m"}</span></p>
                    <p className="mt-1 text-[14px] font-medium leading-5 text-[#0d0d0d]">{it.title}</p>
                    <p className="mt-1 text-[12px] text-[#5d5d5d]">{it.touch}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </MockPanel>
      </div>
    </Stage>
  );
}

/* ---------- Auditable: answer → source → calculation → gap (motion system) ---------- */
export function AuditTrace({ className, field = "mist" }: { className?: string; field?: "lake" | "pine" | "mist"; focus?: number }) {
  const [i, ref] = useCycle(3, { ms: 4500 });
  return (
    <Stage field={field} className={clsx("flex h-full w-full items-center justify-center p-6 sm:p-10", className)}>
      <div ref={ref} className="w-full max-w-[380px]">
        <MockPanel height={232}>
          <p className="text-[13px] text-[#8f8f8f]">AI infrastructure spend, 2024</p>
          <p className="mt-1 text-[24px] font-semibold leading-8">+48%<Cite n={1} /></p>
          <div className="mt-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: MOTION_EASE }}>
                {i === 0 && <SourceRow n={1} title="Amazon Q4 2024 earnings release" meta="Filing, p.4" />}
                {i === 1 && <CodeBlock lines={["(210 - 142) / 142 = 0.479"]} />}
                {i === 2 && <MissingData label="Regional breakdown" reason="Not disclosed" />}
              </motion.div>
            </AnimatePresence>
          </div>
        </MockPanel>
      </div>
    </Stage>
  );
}

/* ---------- Relationship: one event, followed through the Graph (motion system) ---------- */
export function RelationshipPanel({ className, field = "ink", nodes = ["AWS capacity expansion", "NVIDIA, GPU supplier", "TSMC, chip manufacturing"] }: { className?: string; field?: "lake" | "pine" | "mist" | "ink"; nodes?: string[] }) {
  const [i, ref] = useCycle(2, { ms: 5200 });
  return (
    <Stage field={field} className={clsx("flex h-full w-full items-center justify-center p-6 sm:p-10", className)}>
      <div ref={ref} className="w-full max-w-[380px]">
        <MockPanel stateKey={i} height={232}>
          <p className="text-[13px] text-[#8f8f8f]">{i === 0 ? "Impact pathway" : "Second-order effect"}</p>
          {i === 0 ? (
            <div className="mt-3"><Chain nodes={nodes} /></div>
          ) : (
            <>
              <p className="mt-2 text-[18px] font-semibold leading-6">Cloud demand reaches chip manufacturing</p>
              <p className="mt-2 text-[13px] leading-5 text-[#5d5d5d]">Weighted by evidence: supplier disclosures, filings and earnings calls.</p>
            </>
          )}
        </MockPanel>
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
    <div className={clsx("grid-12 gap-y-10", className)}>
      <div className="col-span-12 lg:col-span-5">
        {steps.map((s, i) => (
          <StoryStep key={s.title} index={i} onActive={setActive} active={active === i} {...s} />
        ))}
      </div>
      <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
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
