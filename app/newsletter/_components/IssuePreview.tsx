"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Sparkline, series } from "@/components/product/ui";
import { Logo } from "@/components/site/Logo";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROWS = [
  { k: "Market signal", title: "AI data center power buildout accelerates", meta: "VRT · ETN · CEG", kind: "spark" },
  { k: "Relationship of the issue", title: "Hyperscaler capex → GPU demand → advanced packaging", meta: "Knowledge Graph", kind: "path" },
  { k: "Product notes", title: "Introducing Earnings Insights", meta: "Insights", kind: "tag" },
  { k: "From the blog", title: "Better Sharpe Ratio is a plumbing problem", meta: "4 min read", kind: "read" },
] as const;

/** A sample issue, assembled section by section, with a slow highlight that walks the contents. */
export function IssuePreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setActive((a) => (a + 1) % ROWS.length), 2600);
    return () => clearInterval(iv);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="ui-card mx-auto w-full max-w-[500px] overflow-hidden" aria-hidden="true">
      <div className="flex items-center justify-between gap-3 border-b border-ink/8 px-4 py-3.5 sm:px-5">
        <span className="shrink-0 text-ink">
          <Logo size="sm" />
        </span>
        <span className="text-right font-mono text-[10px] uppercase tracking-[0.05em] text-ink/40"><span className="hidden sm:inline">Sample issue · </span>Illustrative</span>
      </div>
      <div className="px-4 pb-5 pt-5 sm:px-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.05em] text-lake-700">Market &amp; product intelligence</p>
        <p className="mt-1.5 font-display text-[20px] font-semibold leading-tight tracking-[-0.015em] text-ink">What moved, what connects, what&rsquo;s new.</p>
        <ul className="mt-5 space-y-2">
          {ROWS.map((r, i) => (
            <motion.li
              key={r.k}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.18, ease: EASE }}
              className={clsx(
                "relative flex items-center gap-3 rounded-[10px] border px-3.5 py-3 transition-[background-color,border-color,box-shadow] duration-700",
                i === active ? "border-lake-300/70 bg-white shadow-[0_8px_24px_-12px_rgb(36_50_68/0.35)]" : "border-ink/8 bg-white/55",
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">{r.k}</p>
                <p className="mt-1 truncate font-display text-[13.5px] font-medium text-ink">{r.title}</p>
                <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.04em] text-ink/40">{r.meta}</p>
              </div>
              <div className="w-[68px] shrink-0">
                {r.kind === "spark" && <Sparkline points={series(28, 7, 0.5, 2)} className="h-8 w-full text-lake-500" />}
                {r.kind === "path" && (
                  <svg viewBox="0 0 68 24" className="h-6 w-full" fill="none">
                    <motion.path d="M6 12 H62" stroke="#5d738c" strokeWidth="1.2" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1.2, ease: EASE }} />
                    {[6, 34, 62].map((x, k) => (
                      <circle key={x} cx={x} cy={12} r={k === 1 ? 4 : 3} fill={k === 1 ? "#3e5368" : "#fff"} stroke="#3e5368" strokeWidth="1.2" />
                    ))}
                  </svg>
                )}
                {r.kind === "tag" && <span className="float-right rounded-full bg-pine-100 px-2 py-0.5 font-mono text-[9.5px] font-medium uppercase text-pine-700">New</span>}
                {r.kind === "read" && (
                  <svg viewBox="0 0 14 12" className="float-right h-3 w-3.5 text-ink/45" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M0 6h12M7.5 1.5L12 6l-4.5 4.5" />
                  </svg>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
