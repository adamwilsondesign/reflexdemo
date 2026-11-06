"use client";

import { useInView, useReducedMotion } from "motion/react";
import { Field } from "@/components/visual/kit";
import { WhyPopover } from "@/components/visual/scenes/WhyPopover";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

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
        <Field field="ink">
          <p className="sr-only">{`${r.insight.title}. Why you’re seeing this: ${r.why}`}</p>
          <div aria-hidden="true">
            <WhyPopover key={r.key} route={active} />
          </div>
        </Field>
        <p className="mt-3 text-[12px] text-ink/55">Illustrative example.</p>
      </div>
    </div>
  );
}
