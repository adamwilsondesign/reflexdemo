"use client";

import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
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
    tone: "lake" as const,
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
    tone: "pine" as const,
  },
];

/** One event, two artifacts: personalisation is methodological, not cosmetic. */
export function SameEvent() {
  const reduce = useReducedMotion();
  const vp = { once: true, amount: 0.3 } as const;

  return (
    <div className="relative">
      {/* Event */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto max-w-[560px] rounded-[14px] border border-white/15 bg-white/[0.06] p-5 text-center backdrop-blur"
      >
        <p className="t-ui text-[10.5px] text-paper/55">The event · illustrative</p>
        <p className="mt-2 font-display text-[19px] font-semibold leading-snug text-paper sm:text-[21px]">An activist investor discloses a stake in a consumer brands company.</p>
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
            className="ui-card flex flex-col p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-[15px] font-semibold text-ink">{r.who}</span>
              <Pill tone={r.tone}>{r.frame}</Pill>
            </div>
            <p className="mt-3 text-[12px] text-ink/55">
              <span className="font-semibold text-ink/70">Why you&rsquo;re seeing this.</span> {r.why}
            </p>
            <ol className="mt-4 space-y-2">
              {r.points.map((p, j) => (
                <li key={p} className="flex gap-3 rounded-md bg-white/70 px-3 py-2.5 text-[13px] leading-snug text-ink/85">
                  <span className={clsx("mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full", r.tone === "lake" ? "bg-lake-500" : "bg-pine-500")} aria-hidden="true" />
                  <span>
                    <span className="sr-only">Takeaway {j + 1}: </span>
                    {p}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-auto pt-5">
              <p className="t-ui mb-2 text-[10px] text-ink/40">One click from source</p>
              <SourceRow n={1} title={i === 0 ? "Activist stake disclosure, newswire report" : "Beneficial-ownership filing and investor letter"} meta={i === 0 ? "News · Dow Jones" : "Filing · company documents"} />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
