"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, Pill } from "@/components/product/ui";
import { DailyBrief } from "@/components/product/visuals";
import { Arrow } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

function useTick(ms: number, count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setT((x) => (x + 1) % count), ms);
    return () => clearInterval(iv);
  }, [inView, reduce, ms, count]);
  return { ref, t, reduce };
}

/* ---------------- Analysis that stays alive ---------------- */
export function LivingAnalysis({ field = "lake" }: { field?: "lake" | "mist" | "pine" }) {
  const { ref, t } = useTick(2600, 3);
  const runs = ["Mon 07:00", "Tue 07:00", "Wed 07:00"];
  return (
    <div ref={ref} className={clsx("grain relative isolate overflow-hidden rounded-[18px] p-4 sm:p-8", `field-${field}`)}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="ui-card p-4">
            <div className="flex items-center justify-between">
              <span className="t-ui text-ink/50">Scheduled question</span>
              <Pill tone="lake">Weekdays · 07:00 ET</Pill>
            </div>
            <p className="mt-3 font-display text-[14.5px] font-medium leading-snug text-ink">Summarise new guidance changes across my semiconductor watchlist.</p>
            <ul className="mt-3 space-y-1.5">
              {runs.map((r, k) => (
                <li key={r} className={clsx("flex items-center justify-between rounded-md px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.04em] transition-colors duration-500", k === t ? "bg-lake-100 text-lake-700" : "text-ink/45")}>
                  <span>Run · {r}</span>
                  <span>{k === t ? "Latest" : "Delivered"}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ui-card p-4">
            <div className="flex items-center justify-between">
              <span className="t-ui text-ink/50">Saved workflow</span>
              <span className="font-mono text-[10px] text-ink/40">Reused 14×</span>
            </div>
            <p className="mt-2 font-display text-[14.5px] font-semibold text-ink">Earnings preview template</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["NVDA", "AVGO", "MU", "+ add ticker"].map((x, k) => (
                <motion.span key={x} animate={{ opacity: k === 3 ? [0.5, 1, 0.5] : 1 }} transition={{ duration: 2.4, repeat: k === 3 ? Infinity : 0 }} className={clsx("rounded-full px-2.5 py-1 font-mono text-[10.5px]", k === 3 ? "border border-dashed border-ink/25 text-ink/55" : "bg-ink/[0.06] text-ink/75")}>{x}</motion.span>
              ))}
            </div>
          </div>
        </div>
        <DailyBrief className="h-full" />
      </div>
    </div>
  );
}

/* ---------------- Works where you do ---------------- */
function McpVisual() {
  const { ref, t } = useTick(1600, 3);
  const tools = ["Your AI assistant", "Agent framework", "Internal copilot"];
  return (
    <div ref={ref} className="relative flex h-full flex-col justify-center gap-3 p-5">
      <div className="flex flex-col gap-2">
        {tools.map((x, k) => (
          <span key={x} className={clsx("flex items-center justify-between rounded-lg border px-3 py-2 font-display text-[12.5px] font-medium transition-colors duration-500", k === t ? "border-paper/50 bg-white/10 text-paper" : "border-white/12 text-paper/55")}>
            {x}
            <span className={clsx("h-1.5 w-1.5 rounded-full transition-colors", k === t ? "bg-paper" : "bg-white/25")} />
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 pl-4 font-mono text-[10px] uppercase tracking-[0.06em] text-paper/45">
        <span className="h-6 w-px bg-white/30" /> MCP
      </div>
      <span className="flex items-center gap-2 rounded-lg bg-paper px-3 py-2.5 font-display text-[13px] font-semibold text-ink">
        <AlfredGlyph className="h-4 w-4 text-lake-700" /> Alfred + Knowledge Graph
      </span>
    </div>
  );
}

function M365Visual() {
  const { ref, t } = useTick(1500, 5);
  const apps = ["SharePoint", "OneDrive", "Outlook", "OneNote", "Teams"];
  return (
    <div ref={ref} className="relative flex h-full flex-col justify-center gap-4 p-5">
      <Image src="/framer/rKwnurKIF5kRT25S3bfsirp2g8.png" alt="Microsoft" width={400} height={245} sizes="150px" className="-my-[30px] h-auto w-[150px] -translate-x-[2px] opacity-85 invert" />
      <div className="grid grid-cols-2 gap-2">
        {apps.map((a, k) => (
          <span key={a} className={clsx("rounded-lg border px-3 py-2 font-display text-[12.5px] font-medium transition-[border-color,background-color,color] duration-500", k === 4 && "col-span-2", k === t ? "border-lake-500/50 bg-lake-100/70 text-lake-900" : "border-ink/10 bg-white/70 text-ink/60")}>
            {k === 4 ? "Use Alfred in Teams" : `Search ${a}`}
          </span>
        ))}
      </div>
    </div>
  );
}

function EnvVisual() {
  const { ref, t } = useTick(1800, 3);
  const sys = ["Research portal", "Models and notebooks", "Client reporting"];
  return (
    <div ref={ref} className="relative flex h-full flex-col justify-center gap-3 p-5">
      <span className="flex items-center gap-2 rounded-lg border border-ink/12 bg-white px-3 py-2.5 font-display text-[13px] font-semibold text-ink">
        <AlfredGlyph className="h-4 w-4 text-lake-700" /> Reflexivity
        <span className="ml-auto font-mono text-[10px] font-normal uppercase tracking-[0.05em] text-ink/45">API · custom</span>
      </span>
      <div className="relative ml-4 flex flex-col gap-2 border-l border-dashed border-ink/20 pl-4">
        {sys.map((x, k) => (
          <span key={x} className={clsx("relative rounded-lg border px-3 py-2 font-display text-[12.5px] font-medium transition-colors duration-500", k === t ? "border-ink/30 bg-white text-ink" : "border-ink/10 bg-white/50 text-ink/55")}>
            <span className={clsx("absolute -left-[21px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full transition-colors", k === t ? "bg-lake-700" : "bg-ink/20")} />
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

const CARDS = [
  { title: "Bring your own MCP.", body: "Use Alfred and the Knowledge Graph from the tools you already run.", href: "/deployment#api-mcp", link: "MCP access", visual: <McpVisual />, dark: true },
  { title: "Microsoft 365.", body: "Search SharePoint, OneDrive, Outlook, and OneNote. Use Alfred in Teams.", href: "/deployment#microsoft-365", link: "Microsoft 365 details", visual: <M365Visual />, dark: false },
  { title: "Your own environment.", body: "Put Alfred in a system you already run, through an API or a custom integration.", href: "/deployment#api-mcp", link: "API and custom integration", visual: <EnvVisual />, dark: false },
];

export function WorksWhere() {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {CARDS.map((c, i) => (
        <motion.div key={c.title} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}>
          <Link href={c.href} className={clsx("group flex h-full flex-col overflow-hidden rounded-[16px] border transition-[transform,border-color] duration-500 ease-[var(--ease-out-expo)]", c.dark ? "border-transparent bg-ink text-paper" : "border-ink/10 bg-white text-ink hover:border-ink/25")}>
            <div className={clsx("h-[240px]", c.dark ? "field-ink" : "bg-mist-100 bg-dots")}>{c.visual}</div>
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <h3 className="t-h3">{c.title}</h3>
              <p className={clsx("t-body mt-2.5", c.dark ? "text-paper/70" : "text-ink/65")}>{c.body}</p>
              <span className="mt-auto flex items-center gap-2 pt-6 font-display text-[15px] font-medium">
                <span className="link-underline">{c.link}</span> <Arrow />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
