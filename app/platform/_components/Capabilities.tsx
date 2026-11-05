"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, Cite, useTypewriter } from "@/components/product/ui";
import { Arrow } from "@/components/ui/Button";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";

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
  const typed = useTypewriter(QUESTIONS[t], { start: inView, speed: 24 });
  return (
    <div ref={ref} className="flex h-full items-center p-5 sm:p-6">
      <div className="ui-card w-full p-4">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/50"><AlfredGlyph className="h-3.5 w-3.5 text-lake-700" /> Alfred · On-demand</span>
        <p className="mt-2.5 min-h-[2.8em] font-display text-[15px] font-medium leading-snug text-ink">
          {typed}
          <span className="animate-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-lake-700" />
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-ink/8 pt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">Cited · code-backed</span>
          <span className="rounded-md bg-lake-700 px-3 py-1 font-display text-[12px] font-medium text-white">Ask</span>
        </div>
      </div>
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
    { id: "AI", x: 270, y: 50, theme: true },
  ];
  const E: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [1, 4]];
  const path = "M60 60 L190 110 L90 180 L260 200";
  return (
    <div ref={ref} className="relative h-full">
      <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, i) => (
          <circle key={i} cx={(i * 73) % 320} cy={(i * 47 + 20) % 240} r="1.6" fill="rgba(244,243,241,0.25)" />
        ))}
        {E.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={N[a].x} y1={N[a].y} x2={N[b].x} y2={N[b].y} stroke="rgba(213,222,230,0.35)" strokeWidth="1.2" />
        ))}
        <path d={path} fill="none" stroke="rgba(244,243,241,0.85)" strokeWidth="1.6" strokeDasharray="4 6" />
        {!reduce && inView && (
          <circle r="4" fill="#f4f3f1">
            <animateMotion dur="3.6s" repeatCount="indefinite" path={path} />
          </circle>
        )}
        {N.map((n) => (
          <g key={n.id}>
            {n.theme ? <circle cx={n.x} cy={n.y} r="7" fill="none" stroke="#7d978c" strokeWidth="2.2" /> : <circle cx={n.x} cy={n.y} r="6" fill="#f4f3f1" />}
            <text x={n.x + 11} y={n.y + 4} fill="rgba(244,243,241,0.85)" fontSize="11" fontFamily="var(--font-archivo)">{n.id}</text>
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
    <div ref={ref} className="relative flex h-full flex-col justify-center gap-2 overflow-hidden p-5 sm:p-6">
      <AnimatePresence initial={false} mode="popLayout">
        {shown.map(({ i, k }) => (
          <motion.div key={`${t}-${k}`} layout initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1 - k * 0.3, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="ui-card px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/50">{ALERTS[i][0]}</span>
              <span className="font-mono text-[9.5px] text-ink/35">{k === 0 ? "now" : `${k * 12}m`}</span>
            </div>
            <p className="mt-1 truncate font-display text-[13px] font-semibold text-ink">{ALERTS[i][1]}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function AuditMini() {
  const { ref, t } = useLoop(2200, 3);
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-2 p-5 sm:p-6">
      <p className="ui-card px-3.5 py-3 text-[12.5px] leading-relaxed text-ink/80">
        AWS revenue grew <span className={clsx("rounded px-0.5 transition-colors duration-500", t === 0 && "bg-lake-100")}>19% year over year</span>
        <Cite n={1} />; AI revenue is <span className={clsx("rounded px-0.5 transition-colors duration-500", t === 1 && "bg-[#f3e6d6]")}>not disclosed</span>.
      </p>
      <div className="grid grid-cols-3 gap-1.5">
        {["Source", "NA flagged", "Code"].map((l, k) => (
          <span key={l} className={clsx("rounded-md border px-2 py-1.5 text-center font-mono text-[9.5px] uppercase tracking-[0.04em] transition-colors duration-500", k === t ? "border-ink/30 bg-white text-ink" : "border-ink/10 text-ink/45")}>{l}</span>
        ))}
      </div>
    </div>
  );
}

const CONTROLS = ["SOC 2 Type II", "Encrypted in transit", "Permission-aware access", "Not used for model training"];
function SecurityMini() {
  const { ref, t, reduce } = useLoop(900, CONTROLS.length + 3);
  const n = reduce ? CONTROLS.length : Math.min(t, CONTROLS.length);
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-1.5 p-5 sm:p-6">
      {CONTROLS.map((c, k) => (
        <span key={c} className={clsx("flex items-center justify-between rounded-md border px-3 py-2 font-display text-[12.5px] font-medium transition-colors duration-500", k < n ? "border-white/25 text-paper" : "border-white/10 text-paper/40")}>
          {c}
          <span className={clsx("flex h-4 w-4 items-center justify-center rounded-full text-[10px] transition-colors", k < n ? "bg-pine-300 text-ink" : "bg-white/10 text-transparent")}>✓</span>
        </span>
      ))}
    </div>
  );
}

/* ---------- grid ---------- */
const CAPS: { title: string; kicker: string; body: string; href: string; link: string; icon: IconName; visual: React.ReactNode; field: string; span: string }[] = [
  {
    title: "Alfred",
    kicker: "AI analyst",
    body: "Ask Alfred to investigate a company, analyze a portfolio, or pressure-test a thesis. Get comprehensive, source-backed analysis in minutes.",
    href: "/alfred",
    link: "Meet Alfred",
    icon: "crosshair",
    visual: <AlfredMini />,
    field: "field-mist",
    span: "lg:col-span-3",
  },
  {
    title: "Knowledge Graph",
    kicker: "Relationship intelligence",
    body: "A proprietary map of how companies, products, themes and markets connect, with weighted, evidence-backed relationships.",
    href: "/knowledge-graph",
    link: "Explore the Graph",
    icon: "triad",
    visual: <GraphMini />,
    field: "field-ink",
    span: "lg:col-span-3",
  },
  {
    title: "Insights",
    kicker: "Always-on monitoring",
    body: "Market developments, earnings intelligence and second-order effects across the companies and themes you follow.",
    href: "/insights",
    link: "See Insights",
    icon: "signal",
    visual: <InsightsMini />,
    field: "field-pine",
    span: "lg:col-span-2",
  },
  {
    title: "Auditability & Data",
    kicker: "Cited and inspectable",
    body: "Institutional data with citations by default, missing data flagged, and calculations you can inspect.",
    href: "/auditability-data",
    link: "How auditability works",
    icon: "eye",
    visual: <AuditMini />,
    field: "field-mist",
    span: "lg:col-span-2",
  },
  {
    title: "Security",
    kicker: "Institutional diligence",
    body: "Independently audited controls, encryption and permission-aware access to connected sources.",
    href: "/security",
    link: "Review security",
    icon: "cube",
    visual: <SecurityMini />,
    field: "field-ink",
    span: "lg:col-span-2",
  },
];

export function Capabilities() {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      {CAPS.map((c, i) => (
        <motion.div
          key={c.title}
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 }}
          className={clsx(c.span, i === 0 && "md:col-span-2 lg:col-span-3")}
        >
          <Link href={c.href} className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.03] transition-[border-color,background-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:border-white/25 hover:bg-white/[0.06]">
            <div className={clsx("grain relative isolate m-2 overflow-hidden rounded-[12px]", c.field, i < 2 ? "h-[240px] md:h-[260px]" : "h-[220px]")}>{c.visual}</div>
            <div className="flex flex-1 flex-col p-6 pt-5 md:p-7 md:pt-6">
              <div className="flex items-center justify-between gap-3">
                <span className="t-ui text-paper/50">{c.kicker}</span>
                <PrecisionIcon name={c.icon} className="h-7 w-7 text-paper/80 transition-transform duration-700 ease-[var(--ease-out-expo)]" />
              </div>
              <h3 className="t-h2 mt-4 text-[28px] md:text-[32px]">{c.title}</h3>
              <p className="t-body mt-3 max-w-[520px] text-paper/70">{c.body}</p>
              <span className="mt-auto flex items-center gap-2 pt-7 font-display text-[15px] font-medium text-paper">
                <span className="link-underline">{c.link}</span> <Arrow />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

