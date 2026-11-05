"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { AlfredGlyph, Pill, Stage } from "@/components/product/ui";
import { useLoop } from "../../_components/useLoop";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROWS = [
  { t: "CRWV", n: "CoreWeave", tag: "AI infrastructure" },
  { t: "NVDA", n: "NVIDIA", tag: "Semiconductors" },
  { t: "NKE", n: "Nike", tag: "Consumer" },
  { t: "VRT", n: "Vertiv", tag: "Data center power" },
  { t: "LLY", n: "Eli Lilly", tag: "GLP-1" },
];

const FEED: { row: number; also: number[]; type: string; tone: "lake" | "pine"; dir: string; title: string; why: string }[] = [
  { row: 0, also: [1], type: "Company catalyst", tone: "lake", dir: "Bullish", title: "CoreWeave rolls out Nvidia Vera Rubin with Cognition live", why: "CoreWeave is on your watchlist. NVIDIA is connected as platform supplier." },
  { row: 2, also: [], type: "Earnings recap", tone: "pine", dir: "Bearish", title: "Guidance overshadowed a mixed Nike quarter", why: "Nike reported overnight. Two suppliers in the Graph share the read-through." },
  { row: 3, also: [1], type: "Market catalyst", tone: "lake", dir: "Bullish", title: "AI data center power buildout accelerates", why: "Second-order: Vertiv sits in the data center power theme you follow." },
  { row: 4, also: [], type: "Scenario pattern", tone: "pine", dir: "Pattern", title: "Eli Lilly: recession probability at a new low", why: "A historical pattern on a watchlist name, with the episodes behind it." },
];

/** Hero: the morning open. Insights land on the names you follow, each with the reason it reached you. */
export function MorningOpen() {
  const { ref, step, reduce } = useLoop(FEED.length, 3400, 0);
  const it = FEED[step];
  return (
    <Stage field="lake" className="p-4 sm:p-7" image="/figma/n915.png">
      <div ref={ref} className="relative mx-auto max-w-[560px] pb-[200px] sm:pb-[150px]">
        {/* watchlist */}
        <div className="ui-card p-4 sm:w-[78%] sm:p-5">
          <div className="flex items-start justify-between">
            <span className="flex items-center gap-2.5">
              <AlfredGlyph className="h-4 w-4 text-lake-700" />
              <span>
                <span className="block font-display text-[14px] font-semibold text-ink">Your watchlist</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">Monday · 07:00 ET · 5 names · 4 themes</span>
              </span>
            </span>
            <span className="relative mt-1 flex h-2 w-2" aria-hidden="true">
              {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pine-500 opacity-60" />}
              <span className="relative h-2 w-2 rounded-full bg-pine-500" />
            </span>
          </div>
          <ul className="mt-4 space-y-1">
            {ROWS.map((r, i) => {
              const hit = it.row === i;
              const near = it.also.includes(i);
              return (
                <li
                  key={r.t}
                  className={clsx(
                    "relative flex items-center gap-3 rounded-md px-2.5 py-2 transition-colors duration-500",
                    hit ? "bg-lake-100/80" : near ? "bg-ink/[0.03]" : "",
                  )}
                >
                  <span className={clsx("flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-display text-[10.5px] font-semibold transition-colors duration-500", hit ? "bg-lake-700 text-white" : "bg-ink/[0.06] text-ink/60")}>{r.t.slice(0, 2)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[13px] font-semibold text-ink">{r.n}</span>
                    <span className="block truncate font-mono text-[9.5px] uppercase tracking-[0.04em] text-ink/40">{r.tag}</span>
                  </span>
                  <span className={clsx("font-mono text-[9.5px] uppercase tracking-[0.04em] transition-opacity duration-500", hit || near ? "opacity-100" : "opacity-0", hit ? "text-lake-700" : "text-ink/45")}>
                    {hit ? "New insight" : "Connected"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* arriving insight */}
        <div className="absolute bottom-0 right-0 w-full sm:w-[72%]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="ui-card p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <Pill tone={it.tone}>{it.type}</Pill>
                <span className="font-mono text-[10px] uppercase text-ink/40">{it.dir}</span>
              </div>
              <p className="mt-2.5 font-display text-[15.5px] font-semibold leading-snug text-ink sm:text-[17px]">{it.title}</p>
              <p className="mt-2.5 border-t border-ink/8 pt-2.5 text-[12px] leading-relaxed text-ink/65">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-lake-700">Why you’re seeing this · </span>
                {it.why}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}
