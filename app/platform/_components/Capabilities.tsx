"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Cite, PromptCard } from "@/components/product/ui";
import { ArrowNE } from "@/components/ui/Layouts";

const EASE = [0.16, 1, 0.3, 1] as const;

function useLoop(ms: number, n: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setT((x) => (x + 1) % n), ms);
    return () => clearInterval(iv);
  }, [inView, reduce, ms, n]);
  return { ref, t, inView, reduce };
}

/* ---------- mini visuals ---------- */
const QUESTIONS = ["Map AAPL’s ecosystem and find the hidden beneficiaries.", "Stress-test my thesis: what breaks it, and what should I watch?", "What changed in NFLX management’s tone across the last 4 calls?"];

function AlfredMini() {
  const { ref, t, inView } = useLoop(5200, QUESTIONS.length);
  return (
    <div ref={ref} className="pui flex h-full items-center p-5 sm:p-6">
      <PromptCard key={t} className="w-full" prompt={QUESTIONS[t]} trail={["On-demand"]} sources={12} typing start={inView} />
    </div>
  );
}

function GraphMini() {
  const { ref, reduce, inView } = useLoop(9999, 1);
  const N = [
    { id: "AWS", x: 60, y: 60 },
    { id: "NVDA", x: 190, y: 110 },
    { id: "TSMC", x: 90, y: 180 },
    { id: "ASML", x: 260, y: 200 },
    { id: "AI", x: 270, y: 50 },
  ];
  const E: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [1, 4]];
  const path = "M60 60 L190 110 L90 180 L260 200";
  return (
    <div ref={ref} className="pui relative h-full">
      <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden="true">
        {E.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={N[a].x} y1={N[a].y} x2={N[b].x} y2={N[b].y} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        ))}
        <path d={path} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.25" />
        {!reduce && inView && (
          <circle r="3" fill="#ffffff">
            <animateMotion dur="3.6s" repeatCount="indefinite" path={path} />
          </circle>
        )}
        {N.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="4.5" fill="#ffffff" />
            <text x={n.x + 10} y={n.y + 4} fill="rgba(255,255,255,0.85)" fontSize="12">{n.id}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const ALERTS = [
  ["Market catalyst", "AI data center power buildout accelerates"],
  ["Earnings recap", "Guidance overshadowed a mixed Nike quarter"],
  ["Company catalyst", "Sanofi settles Regeneron dispute in expanded antibody pact"],
  ["Scenario pattern", "Eli Lilly: recession probability at a new low"],
];
function InsightsMini() {
  const { ref, t } = useLoop(2600, ALERTS.length);
  const shown = [0, 1, 2].map((k) => ({ i: (t + ALERTS.length - k) % ALERTS.length, k }));
  return (
    <div ref={ref} className="pui flex h-full items-center p-5 sm:p-6">
      <div className="ui-card w-full p-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold">Insights</span>
          <span className="flex items-center gap-1.5 text-[12px] text-[#8f8f8f]"><span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" />Live</span>
        </div>
        <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map(({ i, k }) => (
              <motion.li key={`${t}-${k}`} layout initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1 - k * 0.25, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="py-2.5">
                <div className="flex items-center justify-between gap-2 text-[12px] text-[#8f8f8f]">
                  <span>{ALERTS[i][0]}</span>
                  <span>{k === 0 ? "now" : `${k * 12}m`}</span>
                </div>
                <p className="mt-0.5 truncate text-[14px] font-medium text-[#0d0d0d]">{ALERTS[i][1]}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

const AUDIT = [
  ["Source", "Amazon Q4 2024 earnings release, p.4"],
  ["Flagged", "AI revenue not disclosed, not estimated"],
  ["Code", "growth = (28.8 - 24.2) / 24.2"],
];
function AuditMini() {
  const { ref, t } = useLoop(2200, 3);
  return (
    <div ref={ref} className="pui flex h-full items-center p-5 sm:p-6">
      <div className="ui-card w-full p-4">
        <p className="text-[15px] leading-relaxed text-[#0d0d0d]">
          AWS revenue grew 19% year over year<Cite n={1} />; AI revenue is not disclosed.
        </p>
        <div className="mt-3 divide-y divide-black/10 border-t border-black/10">
          {AUDIT.map(([l, v], k) => (
            <div key={l} className={clsx("flex items-baseline gap-3 py-2 text-[13px] transition-colors duration-500", k === t ? "text-[#0d0d0d]" : "text-[#8f8f8f]")}>
              <span className={clsx("w-14 shrink-0", k === t && "font-medium")}>{l}</span>
              <span className="min-w-0 truncate">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CONTROLS = ["SOC 2 Type II", "Encrypted in transit", "Permission-aware access", "Not used for model training"];
function SecurityMini() {
  const { ref, t, reduce } = useLoop(900, CONTROLS.length + 3);
  const n = reduce ? CONTROLS.length : Math.min(t, CONTROLS.length);
  return (
    <div ref={ref} className="pui flex h-full items-center p-5 sm:p-6">
      <div className="ui-card w-full p-4">
        <span className="text-[14px] font-semibold">Controls</span>
        <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
          {CONTROLS.map((c, k) => (
            <li key={c} className={clsx("flex items-center justify-between py-2 text-[13px] transition-colors duration-500", k < n ? "text-[#0d0d0d]" : "text-[#8f8f8f]")}>
              {c}
              <svg viewBox="0 0 16 16" className={clsx("h-3.5 w-3.5 transition-opacity duration-500", k < n ? "opacity-100" : "opacity-0")} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5" /></svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- index: 50/50, live panel | linked rows ---------- */
const CAPS: { title: string; body: string; href: string; link: string; visual: React.ReactNode; field: string }[] = [
  {
    title: "Alfred",
    body: "Ask Alfred to investigate a company, analyze a portfolio, or pressure-test a thesis. Get comprehensive, source-backed analysis in minutes.",
    href: "/alfred",
    link: "Meet Alfred",
    visual: <AlfredMini />,
    field: "field-mist",
  },
  {
    title: "Knowledge Graph",
    body: "A proprietary map of how companies, products, themes and markets connect, with weighted, evidence-backed relationships.",
    href: "/knowledge-graph",
    link: "Explore the Graph",
    visual: <GraphMini />,
    field: "field-ink",
  },
  {
    title: "Insights",
    body: "Market developments, earnings intelligence and second-order effects across the companies and themes you follow.",
    href: "/insights",
    link: "See Insights",
    visual: <InsightsMini />,
    field: "field-pine",
  },
  {
    title: "Security",
    body: "Independently audited controls, encryption and permission-aware access to connected sources.",
    href: "/security",
    link: "Review security",
    visual: <SecurityMini />,
    field: "field-ink",
  },
];

const STEP = 5200;

/**
 * Platform overview as a 50/50: a live product panel on the left, the five capabilities as
 * linked rows on the right. Rows auto-advance while in view; hover or focus takes over.
 * Hover is rule colour + arrow only; nothing moves.
 */
export function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const running = inView && !held && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % CAPS.length), STEP);
    return () => clearTimeout(t);
  }, [active, running]);

  const c = CAPS[active];
  return (
    <div ref={ref} className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="lg:sticky lg:top-[calc(var(--header-live)+32px)]">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-white/10" aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className={clsx("grain absolute inset-0 isolate flex items-center justify-center", c.field)}
            >
              <div className="h-full w-full max-w-[460px]">{c.visual}</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="t-small mt-4 text-paper/55">
          <span className="font-display font-medium text-paper/85">{c.title}.</span> Illustrative product view.
        </p>
      </div>

      <ul className="border-t border-white/20" onMouseLeave={() => setHeld(false)}>
        {CAPS.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.title} className="relative">
              <span aria-hidden="true" className="absolute -top-px left-0 h-px bg-paper" style={{ width: on ? "100%" : "0%", transition: on && running ? `width ${STEP}ms linear` : "width 300ms ease" }} />
              <Link
                href={it.href}
                onMouseEnter={() => { setHeld(true); setActive(i); }}
                onFocus={() => { setHeld(true); setActive(i); }}
                onBlur={() => setHeld(false)}
                className="group grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-2 border-b border-white/20 py-6 transition-colors duration-300 hover:border-paper md:py-7"
              >
                <span className={clsx("font-display text-[22px] font-medium tracking-[-0.01em] transition-colors duration-500 md:text-[26px]", on ? "text-paper" : "text-paper/55")}>{it.title}</span>
                <ArrowNE className="mt-2.5 justify-self-end" />
                <span className={clsx("t-small col-span-2 max-w-[520px] transition-colors duration-500", on ? "text-paper/75" : "text-paper/50")}>{it.body}</span>
                <span className="col-span-2 font-display text-[14px] font-medium text-paper/80">
                  <span className="link-underline">{it.link}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
