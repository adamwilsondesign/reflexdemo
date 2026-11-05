"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph } from "@/components/product/ui";
import { DailyBrief } from "@/components/product/visuals";
import { Arrow } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

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
    <div ref={ref} className={clsx("pui grain relative isolate overflow-hidden rounded-[18px] p-4 sm:p-8", `field-${field}`)}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="ui-card p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-semibold">Scheduled question</span>
              <span className="text-[12px] text-[#8f8f8f]">Weekdays 07:00 ET</span>
            </div>
            <p className="mt-2 text-[14px] leading-snug text-[#0d0d0d]">Summarise new guidance changes across my semiconductor watchlist.</p>
            <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
              {runs.map((r, k) => (
                <li key={r} className={clsx("flex items-center justify-between py-2 text-[13px] transition-colors duration-500", k === t ? "text-[#0d0d0d]" : "text-[#8f8f8f]")}>
                  <span className="flex items-center gap-2">
                    <span className={clsx("h-1.5 w-1.5 rounded-full transition-colors duration-500", k === t ? "bg-[#0d0d0d]" : "bg-transparent")} />
                    Run, {r}
                  </span>
                  <span className={clsx(k === t && "font-medium")}>{k === t ? "Latest" : "Delivered"}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ui-card p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-semibold">Earnings preview template</span>
              <span className="text-[12px] text-[#8f8f8f]">Reused 14×</span>
            </div>
            <p className="mt-1.5 text-[13px] text-[#5d5d5d]">NVDA, AVGO, MU</p>
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
    <div ref={ref} className="pui relative flex h-full flex-col justify-center p-5">
      <ul className="ui-card divide-y divide-black/10 px-3">
        {tools.map((x, k) => (
          <li key={x} className={clsx("flex items-center justify-between py-2 text-[13px] transition-colors duration-500", k === t ? "font-medium text-[#0d0d0d]" : "text-[#8f8f8f]")}>
            {x}
            <span className={clsx("h-1.5 w-1.5 rounded-full transition-colors", k === t ? "bg-[#0d0d0d]" : "bg-transparent")} />
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 pl-4 text-[12px] text-white/60">
        <span className="h-5 w-px bg-white/30" /> MCP
      </div>
      <span className="ui-card flex items-center gap-2 px-3 py-2 text-[13px] font-semibold">
        <AlfredGlyph className="h-4 w-4 text-[#0d0d0d]" /> Alfred + Knowledge Graph
      </span>
    </div>
  );
}

function M365Visual() {
  const { ref, t } = useTick(1500, 4);
  const rows = ["Search SharePoint", "Search OneDrive", "Search Outlook and OneNote", "Use Alfred in Teams"];
  return (
    <div ref={ref} className="pui relative flex h-full flex-col justify-center gap-3 p-5">
      <Image src="/framer/rKwnurKIF5kRT25S3bfsirp2g8.png" alt="Microsoft" width={400} height={245} sizes="130px" className="-my-[26px] h-auto w-[130px] -translate-x-[2px] opacity-85 invert" />
      <ul className="ui-card divide-y divide-black/10 px-3">
        {rows.map((a, k) => (
          <li key={a} className={clsx("flex items-center justify-between py-1.5 text-[13px] transition-colors duration-500", k === t ? "font-medium text-[#0d0d0d]" : "text-[#8f8f8f]")}>
            {a}
            <span className={clsx("h-1.5 w-1.5 rounded-full transition-colors", k === t ? "bg-[#0d0d0d]" : "bg-transparent")} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function EnvVisual() {
  const { ref, t } = useTick(1800, 3);
  const sys = ["Research portal", "Models and notebooks", "Client reporting"];
  return (
    <div ref={ref} className="pui relative flex h-full flex-col justify-center p-5">
      <div className="ui-card p-3">
        <div className="flex items-center gap-2 text-[14px] font-semibold">
          <AlfredGlyph className="h-4 w-4 text-[#0d0d0d]" /> Reflexivity
          <span className="ml-auto text-[12px] font-normal text-[#8f8f8f]">API, custom</span>
        </div>
        <ul className="mt-2 divide-y divide-black/10 border-t border-black/10">
          {sys.map((x, k) => (
            <li key={x} className={clsx("flex items-center gap-2 py-2 text-[13px] transition-colors duration-500", k === t ? "font-medium text-[#0d0d0d]" : "text-[#8f8f8f]")}>
              <span className="text-[#8f8f8f]">→</span>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const CARDS = [
  { title: "Bring your own MCP.", body: "Use Alfred and the Knowledge Graph from the tools you already run.", href: "/deployment#api-mcp", link: "MCP access", visual: <McpVisual />, dark: true },
  { title: "Microsoft 365.", body: "Search SharePoint, OneDrive, Outlook, and OneNote. Use Alfred in Teams.", href: "/deployment#microsoft-365", link: "Microsoft 365 details", visual: <M365Visual />, dark: false },
  { title: "Your own environment.", body: "Put Alfred in a system you already run, through an API or a custom integration.", href: "/deployment#api-mcp", link: "API and custom integration", visual: <EnvVisual />, dark: false },
];

/** Three ways in, on the shared hairline grid; each cell carries a coded product view. Hover = tint only. */
export function WorksWhere() {
  return (
    <Stagger className="grid border-l border-t border-ink/12 md:grid-cols-3">
      {CARDS.map((c) => (
        <StaggerItem key={c.title} className="h-full">
          <Link href={c.href} className="group flex h-full flex-col border-b border-r border-ink/12 transition-colors duration-500 hover:bg-ink/[0.035]">
            <div className="p-3 pb-0 md:p-4 md:pb-0">
              <div className={clsx("grain relative isolate h-[240px] overflow-hidden rounded-[12px]", c.dark ? "field-ink" : "field-mist")} aria-hidden="true">{c.visual}</div>
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className="t-h3">{c.title}</h3>
              <p className="t-small mt-2.5 text-ink/70">{c.body}</p>
              <span className="mt-auto flex items-center gap-2 pt-7 font-display text-[15px] font-medium">
                <span className="link-underline">{c.link}</span> <Arrow />
              </span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
