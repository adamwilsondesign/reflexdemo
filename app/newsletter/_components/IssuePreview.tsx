"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Logo } from "@/components/site/Logo";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROWS = [
  { k: "Market signal", title: "AI data center power buildout accelerates", meta: "VRT · ETN · CEG", },
  { k: "Relationship of the issue", title: "Hyperscaler capex → GPU demand → advanced packaging", meta: "Knowledge Graph", },
  { k: "Product notes", title: "Introducing Earnings Insights", meta: "Insights", },
  { k: "From the blog", title: "Better Sharpe Ratio is a plumbing problem", meta: "4 min read", },
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
    <div ref={ref} className="ui-card mx-auto w-full max-w-[460px] overflow-hidden p-4 sm:p-5" aria-hidden="true">
      <div className="flex items-center justify-between gap-3">
        <span className="shrink-0 text-[#0d0d0d]">
          <Logo size="sm" />
        </span>
        <span className="text-right text-[12px] text-[#8f8f8f]"><span className="hidden sm:inline">Sample issue · </span>Illustrative</span>
      </div>
      <p className="mt-4 text-[18px] font-semibold leading-snug text-[#0d0d0d]">What moved, what connects, what&rsquo;s new.</p>
      <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
        {ROWS.map((r, i) => (
          <motion.li
            key={r.k}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 + i * 0.18, ease: EASE }}
            className="flex items-center gap-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[12px] text-[#8f8f8f]">{r.k}</p>
              <p className={clsx("mt-0.5 truncate text-[14px] transition-colors duration-700", i === active ? "font-medium text-[#0d0d0d]" : "text-[#5d5d5d]")}>{r.title}</p>
            </div>
            <span className={clsx("h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d0d0d] transition-opacity duration-700", i === active ? "opacity-100" : "opacity-0")} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
