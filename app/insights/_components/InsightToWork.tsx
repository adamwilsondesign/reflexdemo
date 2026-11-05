"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Arrow } from "@/components/ui/Button";
import { AlfredGlyph, Pill, useTypewriter } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

function Card({ title, body, href, link, children }: { title: string; body: string; href?: string; link?: string; children: React.ReactNode }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.04]">
      <div className="field-lake grain relative h-[240px] overflow-hidden p-5">{children}</div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="t-h3 text-paper">{title}</h3>
        <p className="t-body mt-2.5 text-paper/68">{body}</p>
        {href && (
          <Link href={href} className="mt-auto inline-flex items-center gap-2 pt-6 font-display text-[15px] font-medium text-paper">
            <span className="link-underline">{link}</span>
            <Arrow />
          </Link>
        )}
      </div>
    </article>
  );
}

function OpenInAlfred() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const typed = useTypewriter("Which of these names has the most exposure to US grid interconnect delays?", { start: inView, speed: 28, delay: 500 });
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-2.5">
      <div className="ui-card px-3.5 py-2.5 opacity-80">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">Market catalyst</span>
        <p className="font-display text-[13px] font-semibold leading-snug text-ink">AI data center power buildout accelerates</p>
      </div>
      <div className="ui-card p-3.5">
        <span className="flex items-center gap-2 font-display text-[12.5px] font-semibold text-ink">
          <AlfredGlyph className="h-3.5 w-3.5 text-lake-700" /> Ask Alfred
          <span className="font-mono text-[9.5px] font-normal uppercase tracking-[0.05em] text-ink/40">· context attached</span>
        </span>
        <p className="mt-2 min-h-[3.2em] text-[12.5px] leading-snug text-ink/80">
          {typed}
          <span className="animate-blink ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[2px] bg-lake-700" />
        </p>
      </div>
    </div>
  );
}

function Schedule() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [runs, setRuns] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setRuns((r) => r + 1), 2600);
    return () => clearInterval(iv);
  }, [inView, reduce]);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const lit = reduce ? 5 : (runs % 6);
  return (
    <div ref={ref} className="flex h-full flex-col justify-center">
      <div className="ui-card p-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-[13px] font-semibold text-ink">Data center power · refresh</span>
          <Pill tone="lake">Scheduled</Pill>
        </div>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">Weekdays · 07:00 · your time zone</p>
        <div className="mt-4 grid grid-cols-5 gap-1.5">
          {days.map((d, i) => (
            <div key={d} className="text-center">
              <div className={clsx("flex h-9 items-center justify-center rounded-md border transition-colors duration-500", i < lit ? "border-pine-300 bg-pine-100 text-pine-700" : "border-ink/10 bg-white/60 text-ink/30")}>
                {i < lit ? (
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5" /></svg>
                ) : (
                  <span className="h-1 w-1 rounded-full bg-current" />
                )}
              </div>
              <span className="mt-1 block font-mono text-[9.5px] uppercase text-ink/45">{d}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11.5px] text-ink/55">{lit === 0 ? "Next refresh queued" : `${lit} refresh${lit === 1 ? "" : "es"} delivered this week`}</p>
      </div>
    </div>
  );
}

function Workspace() {
  const reduce = useReducedMotion();
  const tiles = [
    { t: "Sanofi settles Regeneron dispute", k: "Company catalyst" },
    { t: "Guidance overshadowed a mixed Nike quarter", k: "Earnings recap" },
    { t: "AI data center power buildout", k: "Market catalyst" },
    { t: "Eli Lilly: recession probability", k: "Scenario pattern" },
  ];
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="ui-card p-3.5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[13px] font-semibold text-ink">Healthcare &amp; consumer book</span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/40">Workspace</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {tiles.map((x, i) => (
            <motion.div
              key={x.t}
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: EASE }}
              className="rounded-md border border-ink/8 bg-white/80 p-2"
            >
              <span className="block font-mono text-[8.5px] uppercase tracking-[0.05em] text-ink/40">{x.k}</span>
              <span className="mt-0.5 block text-[11px] font-medium leading-snug text-ink">{x.t}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InsightToWork() {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-5">
      <Card title="Open in Alfred" body="Carry the Insight into Alfred with its context attached, then ask the follow-up your book needs." href="/alfred" link="Meet Alfred">
        <OpenInAlfred />
      </Card>
      <Card title="Refresh on a schedule" body="Keep a recurring read on a theme, a name or a cohort, refreshed on the cadence your team works to." href="/use-cases/portfolio-monitoring" link="Portfolio monitoring">
        <Schedule />
      </Card>
      <Card title="Keep it on a workspace" body="Pin the Insights that matter to a workspace, so the research stays alongside the book it explains.">
        <Workspace />
      </Card>
    </div>
  );
}
