"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Pill } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROUTES = [
  {
    key: "watchlist",
    label: "On your watchlist",
    body: "The company in the event is one you follow directly.",
    chain: [
      { k: "You follow", v: "Sanofi", sub: "Watchlist" },
      { k: "Event", v: "Regeneron dispute settled", sub: "Company catalyst" },
    ],
    insight: { type: "Company catalyst", title: "Sanofi settles Regeneron dispute in expanded antibody pact" },
    why: "Sanofi is on your watchlist.",
  },
  {
    key: "graph",
    label: "Connected in the Knowledge Graph",
    body: "The event reaches a name you follow through a supplier, customer, partner or competitor link.",
    chain: [
      { k: "You follow", v: "Vertiv", sub: "Watchlist" },
      { k: "Link", v: "Supplies power & cooling", sub: "Knowledge Graph" },
      { k: "Event", v: "Data center power demand", sub: "Market catalyst" },
    ],
    insight: { type: "Market catalyst", title: "AI data center power buildout accelerates" },
    why: "Vertiv supplies power and cooling equipment to data center operators.",
  },
  {
    key: "theme",
    label: "Inside a theme you follow",
    body: "The event moves a theme, sector or macro factor in your coverage.",
    chain: [
      { k: "You follow", v: "Consumer discretionary", sub: "Theme" },
      { k: "Member", v: "Nike", sub: "Theme constituent" },
      { k: "Event", v: "Quarterly results", sub: "Earnings recap" },
    ],
    insight: { type: "Earnings recap", title: "Guidance overshadowed a mixed Nike quarter" },
    why: "Nike is a constituent of the Consumer discretionary theme you follow.",
  },
] as const;

/** Explains how relevance is decided, with the "why you're seeing this" line drawn as a path. */
export function WhySurfaced() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const running = inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % ROUTES.length), 6000);
    return () => clearTimeout(t);
  }, [active, running]);

  const r = ROUTES[active];

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-12 lg:gap-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="lg:col-span-5" role="tablist" aria-label="Why an Insight is surfaced">
        {ROUTES.map((x, i) => {
          const on = i === active;
          return (
            <button
              key={x.key}
              role="tab"
              id={`why-tab-${x.key}`}
              aria-selected={on}
              aria-controls="why-panel"
              onClick={() => setActive(i)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="group relative block w-full border-t border-ink/12 py-5 text-left"
            >
              <span aria-hidden="true" className="absolute -top-px left-0 h-px bg-ink" style={{ width: on ? "100%" : "0%", transition: on && running ? "width 6000ms linear" : "width 300ms ease" }} />
              <span className={clsx("t-h3 block transition-opacity duration-500", on ? "opacity-100" : "opacity-45 group-hover:opacity-75")}>{x.label}</span>
              <span className={clsx("t-body mt-2 block text-ink/65 transition-opacity duration-500", on ? "opacity-100" : "opacity-60")}>{x.body}</span>
            </button>
          );
        })}
      </div>

      <div id="why-panel" role="tabpanel" aria-labelledby={`why-tab-${r.key}`} className="lg:col-span-7">
        <div className="field-mist grain relative overflow-hidden rounded-[18px] border border-ink/8 p-5 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={r.key} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.55, ease: EASE }}>
              {/* Path */}
              <ol className="flex flex-col gap-0 sm:flex-row sm:items-stretch" aria-label="Relevance path">
                {r.chain.map((c, i) => (
                  <li key={c.v} className="flex flex-col sm:flex-1 sm:flex-row sm:items-center">
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.35, ease: EASE }}
                      className={clsx("rounded-[10px] border bg-white px-3.5 py-3 shadow-[0_6px_20px_-10px_rgb(23_25_28/0.3)] sm:flex-1", i === r.chain.length - 1 ? "border-lake-300" : "border-ink/8")}
                    >
                      <span className="block font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">{c.k}</span>
                      <span className="mt-1 block font-display text-[14px] font-semibold leading-tight text-ink">{c.v}</span>
                      <span className="mt-0.5 block text-[11px] text-ink/50">{c.sub}</span>
                    </motion.div>
                    {i < r.chain.length - 1 && (
                      <span className="relative mx-auto block h-6 w-px bg-ink/15 sm:mx-0 sm:h-px sm:w-6 sm:shrink-0" aria-hidden="true">
                        <motion.span
                          className="absolute left-0 top-0 block bg-lake-500 sm:h-px"
                          initial={reduce ? false : { scaleX: 0, scaleY: 0 }}
                          animate={{ scaleX: 1, scaleY: 1 }}
                          style={{ width: "100%", height: "100%", transformOrigin: "left top" }}
                          transition={{ duration: 0.4, delay: 0.4 + i * 0.35, ease: EASE }}
                        />
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              {/* Resulting Insight */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 + r.chain.length * 0.35, ease: EASE }}
                className="ui-card mt-6 p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <Pill tone={r.insight.type.startsWith("Earnings") ? "pine" : "lake"}>{r.insight.type}</Pill>
                  <span className="font-mono text-[10px] text-ink/40">In your Insights feed</span>
                </div>
                <p className="mt-3 font-display text-[18px] font-semibold leading-snug text-ink sm:text-[20px]">{r.insight.title}</p>
                <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-lake-300/60 bg-lake-100/60 px-3.5 py-3">
                  <svg viewBox="0 0 16 16" className="mt-[2px] h-4 w-4 shrink-0 text-lake-700" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                    <circle cx="8" cy="8" r="6.2" />
                    <path d="M8 7.2v3.6M8 5v.2" strokeLinecap="round" />
                  </svg>
                  <p className="text-[13px] leading-snug text-lake-900">
                    <span className="font-semibold">Why you&rsquo;re seeing this.</span> {r.why}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <p className="t-ui mt-5 text-[10px] text-ink/40">Illustrative example</p>
        </div>
      </div>
    </div>
  );
}
