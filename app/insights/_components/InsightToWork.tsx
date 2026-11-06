"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Arrow } from "@/components/ui/Button";
import { CardHeader, useTypewriter } from "@/components/product/ui";

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
    <div ref={ref} className="pui flex h-full flex-col justify-center">
      <div className="ui-card p-4">
        <CardHeader title="Ask Alfred" trail={["Context attached"]} />
        <p className="mt-2 truncate text-[12px] text-[#8f8f8f]">From: AI data center power buildout accelerates</p>
        <p className="mt-2 min-h-[2.9em] text-[14px] leading-snug text-[#0d0d0d]">
          {typed}
          <span className="animate-blink ml-0.5 inline-block h-[0.95em] w-px translate-y-[2px] bg-[#0d0d0d]" />
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
    const iv = setInterval(() => setRuns((r) => r + 1), 4800);
    return () => clearInterval(iv);
  }, [inView, reduce]);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const lit = reduce ? 5 : (runs % 6);
  return (
    <div ref={ref} className="pui flex h-full flex-col justify-center">
      <div className="ui-card p-4">
        <span className="block text-[14px] font-semibold">Data center power refresh</span>
        <p className="mt-0.5 text-[12px] text-[#8f8f8f]">Weekdays, 07:00 your time</p>
        <div className="mt-3 grid grid-cols-5 border-t border-black/10 pt-3">
          {days.map((d, i) => (
            <div key={d} className={clsx("flex flex-col items-center gap-1 text-[12px] transition-colors duration-500", i < lit ? "text-[#0d0d0d]" : "text-[#8f8f8f]")}>
              <span className="flex h-4 items-center">
                {i < lit ? (
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5" /></svg>
                ) : (
                  <span className="h-1 w-1 rounded-full bg-current" />
                )}
              </span>
              {d}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] text-[#5d5d5d]">{lit === 0 ? "Next refresh queued" : `${lit} refresh${lit === 1 ? "" : "es"} delivered this week`}</p>
      </div>
    </div>
  );
}

function Workspace() {
  const reduce = useReducedMotion();
  const tiles = [
    "Sanofi settles Regeneron dispute",
    "Guidance overshadowed a mixed Nike quarter",
    "AI data center power buildout",
    "Eli Lilly: recession probability",
  ];
  return (
    <div className="pui flex h-full flex-col justify-center">
      <div className="ui-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold">Healthcare &amp; consumer book</span>
          <span className="text-[12px] text-[#8f8f8f]">Pinned</span>
        </div>
        <ul className="mt-2 divide-y divide-black/10 border-t border-black/10">
          {tiles.map((t, i) => (
            <motion.li
              key={t}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: EASE }}
              className="truncate py-1.5 text-[13px] text-[#0d0d0d]"
            >
              {t}
            </motion.li>
          ))}
        </ul>
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
