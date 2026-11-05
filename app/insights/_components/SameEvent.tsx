"use client";

import { motion, useReducedMotion } from "motion/react";
import { Pill, SourceRow } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const READS = [
  {
    who: "Consumer portfolio manager",
    frame: "Category read",
    why: "You cover consumer brands and the companies’ closest peers.",
    points: [
      "Pressure to prune portfolios could put brands up for sale across the category.",
      "Margin gaps versus peers come into focus: which names screen as the next target.",
      "Watch for pricing and shelf-space responses from category leaders.",
    ],
  },
  {
    who: "Special situations analyst",
    frame: "Deal-mechanics read",
    why: "You follow activist and event-driven situations.",
    points: [
      "Stake size, filing type and stated intent, set against prior disclosures.",
      "Board composition, nomination window and the next annual meeting date.",
      "The same investor’s prior campaigns and how they were resolved.",
    ],
  },
];

/** One event, two artifacts: personalisation is methodological, not cosmetic. */
export function SameEvent() {
  const reduce = useReducedMotion();
  const vp = { once: true, amount: 0.3 } as const;

  return (
    <div className="pui relative">
      {/* Event */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.8, ease: EASE }}
        className="ui-card mx-auto max-w-[560px] p-4 text-center"
      >
        <p className="text-[12px] text-[#8f8f8f]">The event, illustrative</p>
        <p className="mt-1 text-[18px] font-semibold leading-snug text-[#0d0d0d] sm:text-[20px]">An activist investor discloses a stake in a consumer brands company.</p>
      </motion.div>

      {/* Branches */}
      <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="hidden h-20 w-full md:block" aria-hidden="true">
        {["M500 0 C 500 40, 250 40, 250 80", "M500 0 C 500 40, 750 40, 750 80"].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="rgb(244 243 241 / 0.35)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={vp}
            transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: EASE }}
          />
        ))}
      </svg>
      <div className="mx-auto h-8 w-px bg-white/25 md:hidden" aria-hidden="true" />

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {READS.map((r, i) => (
          <motion.article
            key={r.who}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.9, delay: 0.7 + i * 0.15, ease: EASE }}
            className="ui-card flex flex-col p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[15px] font-semibold text-[#0d0d0d]">{r.who}</span>
              <Pill>{r.frame}</Pill>
            </div>
            <p className="mt-1.5 text-[13px] text-[#5d5d5d]">{r.why}</p>
            <ol className="mt-3 divide-y divide-black/10 border-t border-black/10">
              {r.points.map((p, j) => (
                <li key={p} className="flex gap-3 py-2 text-[13px] leading-snug text-[#0d0d0d]">
                  <span className="w-3 shrink-0 tabular-nums text-[#8f8f8f]" aria-hidden="true">{j + 1}</span>
                  <span>
                    <span className="sr-only">Takeaway {j + 1}: </span>
                    {p}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-auto pt-4">
              <SourceRow n={1} title={i === 0 ? "Activist stake disclosure, newswire report" : "Beneficial-ownership filing and investor letter"} meta={i === 0 ? "News, Dow Jones" : "Filing, company documents"} />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
