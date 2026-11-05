"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, CardHeader, Cite, Pill, Sparkline, Stage, series } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Ticks while in view; frozen when off-screen or with reduced motion. */
function useTicker(ms: number, amount = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setT((x) => x + 1), ms);
    return () => clearInterval(iv);
  }, [inView, reduce, ms]);
  return { ref, t, reduce: !!reduce, inView };
}

/* ---------------- Platform Access: the maintained cockpit ---------------- */
const NAV = [
  { k: "Alfred", sub: "Ask and investigate" },
  { k: "Knowledge Graph", sub: "Explore relationships" },
  { k: "Insights", sub: "Always-on monitoring" },
  { k: "Data", sub: "Integrated sources" },
  { k: "Microsoft 365", sub: "Firm knowledge" },
] as const;

export function PlatformCockpit() {
  const { ref, t, reduce } = useTicker(2600);
  const on = t % NAV.length;
  return (
    <Stage field="mist" className="p-4 sm:p-7">
      <div ref={ref} className="ui-card overflow-hidden p-0">
        <div className="flex items-center gap-1.5 border-b border-ink/8 px-4 py-2.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/40">app.reflexivity.com</span>
        </div>
        <div className="grid grid-cols-[132px_1fr] sm:grid-cols-[176px_1fr]">
          <ul className="space-y-0.5 border-r border-ink/8 p-2.5">
            {NAV.map((n, i) => (
              <li
                key={n.k}
                className={clsx(
                  "rounded-md px-2.5 py-2 transition-colors duration-500",
                  i === on ? "bg-ink text-paper" : "text-ink/60",
                )}
              >
                <span className="block font-display text-[12px] font-semibold leading-tight">{n.k}</span>
                <span className={clsx("hidden text-[10.5px] sm:block", i === on ? "text-paper/60" : "text-ink/40")}>{n.sub}</span>
              </li>
            ))}
          </ul>
          <div className="relative min-h-[250px] p-3.5 sm:p-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={on}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {on === 0 && (
                  <div>
                    <CardHeader trail={["Research", "Thesis check"]} />
                    <p className="mt-3 font-display text-[13.5px] font-medium leading-snug text-ink">What breaks the long thesis on European grid equipment?</p>
                    <p className="mt-2 text-[12px] leading-relaxed text-ink/65">
                      Order backlogs cover roughly two years of revenue<Cite n={1} />, but transformer lead times are easing<Cite n={2} />, which would compress pricing power first.
                    </p>
                  </div>
                )}
                {on === 1 && (
                  <div>
                    <p className="t-ui text-ink/50">Relationships · ASML</p>
                    <ul className="mt-3 space-y-1.5">
                      {[
                        ["Supplier", "Carl Zeiss SMT", "lake"],
                        ["Customer", "TSMC", "lake"],
                        ["Customer", "Samsung Electronics", "lake"],
                        ["Competitor", "Canon", "neutral"],
                        ["Theme", "Advanced packaging", "pine"],
                      ].map(([r, n, tone]) => (
                        <li key={n} className="flex items-center justify-between rounded-md border border-ink/8 bg-white/70 px-2.5 py-1.5">
                          <span className="font-display text-[12px] font-medium text-ink">{n}</span>
                          <Pill tone={tone as "lake" | "pine" | "neutral"} className="!py-0.5 !text-[9px]">{r}</Pill>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {on === 2 && (
                  <div className="space-y-2">
                    {[
                      ["Earnings recap", "Guidance raised on data center demand", "pine"],
                      ["Company catalyst", "Supplier flags capacity constraint", "lake"],
                      ["Theme shift", "Rate-cut odds reprice utilities", "lake"],
                    ].map(([k, title, tone]) => (
                      <div key={title} className="rounded-md border border-ink/8 bg-white/70 px-2.5 py-2">
                        <Pill tone={tone as "lake" | "pine"} className="!py-0.5 !text-[9px]">{k}</Pill>
                        <p className="mt-1 font-display text-[12px] font-semibold text-ink">{title}</p>
                      </div>
                    ))}
                  </div>
                )}
                {on === 3 && (
                  <div>
                    <p className="t-ui text-ink/50">Integrated sources</p>
                    <div className="mt-3 grid grid-cols-2 gap-1.5">
                      {["Filings", "Transcripts", "Estimates", "Pricing", "Newswires", "Macro series"].map((s) => (
                        <span key={s} className="rounded-md border border-ink/8 bg-white/70 px-2.5 py-2 font-display text-[12px] font-medium text-ink/80">{s}</span>
                      ))}
                    </div>
                    <div className="mt-3 h-10 text-lake-500"><Sparkline points={series(36, 11)} className="h-full w-full" animate={false} /></div>
                  </div>
                )}
                {on === 4 && (
                  <div>
                    <p className="t-ui text-ink/50">Firm knowledge + market data</p>
                    <ul className="mt-3 space-y-1.5">
                      {["IC memo · Q3 grid thesis.docx", "Call notes · OneNote", "PM thread · Outlook"].map((f) => (
                        <li key={f} className="flex items-center gap-2 rounded-md border border-ink/8 bg-white/70 px-2.5 py-1.5 font-display text-[12px] text-ink/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-lake-500" /> {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2.5 flex items-center gap-1.5 text-[11.5px] text-ink/55"><AlfredGlyph className="h-3 w-3 text-lake-700" /> Alfred reads both, with permissions respected</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ---------------- API & MCP: a tool call with a cited response ---------------- */
const CALLS = [
  {
    from: "Claude",
    tool: "graph.related_entities",
    args: `{ "entity": "Novo Nordisk", "relation": "supplier" }`,
    out: [`"Catalent"  · fill-finish · <src 1>`, `"West Pharma" · devices    · <src 2>`, `"Gerresheimer" · pens    · <src 3>`],
  },
  {
    from: "Internal research portal",
    tool: "insights.list",
    args: `{ "watchlist": "EU utilities", "since": "24h" }`,
    out: [`"Grid capex guidance raised" · <src 1>`, `"Rate-cut odds reprice sector" · <src 2>`, `missing: "regional mix" · flagged`],
  },
  {
    from: "ChatGPT",
    tool: "alfred.research",
    args: `{ "question": "Who is exposed to HBM supply?" }`,
    out: [`answer · 6 citations`, `code · attached`, `gaps · 1 flagged`],
  },
] as const;

export function McpConsole() {
  const { ref, t, reduce } = useTicker(4200);
  const c = CALLS[t % CALLS.length];
  return (
    <Stage field="ink" className="p-4 sm:p-7">
      <div ref={ref} className="ui-card-dark overflow-hidden p-0 text-paper">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
          <span className="t-ui text-paper/55">Reflexivity · MCP server</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.05em] text-pine-300">
            <span className="h-1.5 w-1.5 rounded-full bg-pine-300" /> Connected
          </span>
        </div>
        <div className="min-h-[248px] p-4 font-mono text-[11px] leading-[1.75] sm:text-[11.5px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={t % CALLS.length} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <p className="text-paper/40">
                <span className="text-paper/60">client</span> {c.from}
              </p>
              <p className="mt-1">
                <span className="text-lake-300">call</span> <span className="text-paper">{c.tool}</span>
              </p>
              <p className="break-words text-pine-300">{c.args}</p>
              <div className="mt-3 border-t border-white/8 pt-3">
                {c.out.map((o, i) => (
                  <motion.p
                    key={o}
                    initial={reduce ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.35, ease: EASE }}
                    className={clsx("break-words", o.startsWith("missing") || o.startsWith("gaps") ? "text-[#d9b48a]" : "text-paper/80")}
                  >
                    <span className="mr-2 text-paper/30">←</span>
                    {o}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="t-ui mt-3 text-paper/55">Illustrative tool names and responses</p>
    </Stage>
  );
}

/* ---------------- Knowledge feeds: relationship rows streaming ---------------- */
const ROWS = [
  ["NVDA", "supplier_of", "SMCI", "0.82"],
  ["TSMC", "manufactures_for", "AAPL", "0.91"],
  ["LLY", "exposed_to", "GLP-1", "0.88"],
  ["VRT", "exposed_to", "DC power", "0.79"],
  ["ASML", "customer", "Samsung", "0.74"],
  ["CEG", "supplier_of", "MSFT", "0.66"],
  ["NVO", "competitor", "LLY", "0.93"],
  ["ETN", "exposed_to", "Grid capex", "0.71"],
] as const;

export function FeedTable() {
  const { ref, t } = useTicker(1700);
  const start = t % ROWS.length;
  const rows = Array.from({ length: 5 }, (_, i) => ({ r: ROWS[(start + i) % ROWS.length], key: t + i }));
  return (
    <div ref={ref} className="overflow-hidden rounded-[14px] border border-ink/10 bg-white">
      <div className="flex items-center justify-between border-b border-ink/8 px-4 py-3">
        <span className="t-ui text-ink/55">relationships.parquet</span>
        <Pill tone="lake">Daily delivery</Pill>
      </div>
      <div className="grid grid-cols-[1fr_1.3fr_1fr_56px] gap-2 border-b border-ink/8 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/40">
        <span>source</span>
        <span>relation</span>
        <span>target</span>
        <span className="text-right">conf.</span>
      </div>
      <div className="relative h-[200px] overflow-hidden">
        <AnimatePresence initial={false}>
          {rows.map(({ r, key }, i) => (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: EASE }}
              className={clsx("grid h-10 grid-cols-[1fr_1.3fr_1fr_56px] items-center gap-2 border-b border-ink/6 px-4 font-mono text-[11.5px]", i === 4 && "bg-lake-100/40")}
            >
              <span className="truncate text-ink">{r[0]}</span>
              <span className="truncate text-lake-700">{r[1]}</span>
              <span className="truncate text-ink">{r[2]}</span>
              <span className="text-right text-ink/55">{r[3]}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-ink/8 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">
        <span>+ as_of</span>
        <span>+ source_id</span>
        <span>+ entity_id</span>
      </div>
    </div>
  );
}

/* ---------------- Embedded: Reflexivity inside a partner's product ---------------- */
export function EmbeddedFrame() {
  const { ref, t, reduce } = useTicker(3000);
  const step = t % 3;
  return (
    <div ref={ref} className="relative rounded-[18px] border border-white/10 bg-white/[0.04] p-3 sm:p-5">
      <div className="flex items-center justify-between px-1 pb-3">
        <span className="t-ui text-paper/55">Your platform</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-paper/40">Your brand · your entitlements</span>
      </div>
      <div className="grid gap-3 rounded-[12px] bg-[#e9e7e3] p-3 sm:grid-cols-[1fr_1.15fr] sm:p-4">
        {/* host app chrome */}
        <div className="space-y-2">
          <div className="h-5 w-24 rounded bg-ink/15" />
          <div className="rounded-md bg-white p-2.5">
            <div className="flex items-center justify-between">
              <span className="font-display text-[12px] font-semibold text-ink">Client watchlist</span>
              <span className="font-mono text-[10px] text-ink/40">12 names</span>
            </div>
            {["Microsoft", "Siemens Energy", "Schneider", "Vistra"].map((n, i) => (
              <div key={n} className="mt-1.5 flex items-center justify-between border-t border-ink/6 pt-1.5 text-[11.5px]">
                <span className="text-ink/75">{n}</span>
                <span className={clsx("font-mono", i === 2 ? "text-[#9a4b3c]" : "text-pine-500")}>{i === 2 ? "−0.8%" : `+${(1.2 + i * 0.6).toFixed(1)}%`}</span>
              </div>
            ))}
          </div>
          <div className="h-3 w-3/4 rounded bg-ink/10" />
          <div className="h-3 w-1/2 rounded bg-ink/10" />
        </div>
        {/* native panel powered by Reflexivity */}
        <motion.div
          className="relative rounded-md bg-white p-3 ring-1 ring-lake-500/30"
          animate={reduce ? undefined : { boxShadow: ["0 0 0 0 rgb(93 115 140 / 0)", "0 0 0 6px rgb(93 115 140 / 0.12)", "0 0 0 0 rgb(93 115 140 / 0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-[12px] font-semibold text-ink">What changed for this list</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.05em] text-ink/35">native panel</span>
          </div>
          <div className="relative mt-2 min-h-[112px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45, ease: EASE }}>
                {step === 0 && (
                  <p className="text-[11.5px] leading-relaxed text-ink/70">
                    Utility capex guidance rose across three names on the list<Cite n={1} />. Schneider is the most exposed to the transformer bottleneck<Cite n={2} />.
                  </p>
                )}
                {step === 1 && (
                  <div className="space-y-1.5">
                    {["Grid equipment orders", "Transformer lead times", "Data center demand"].map((x) => (
                      <div key={x} className="flex items-center gap-2 text-[11.5px] text-ink/75">
                        <span className="h-1.5 w-1.5 rounded-full bg-lake-500" /> {x}
                      </div>
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div className="h-[100px] text-lake-500">
                    <Sparkline points={series(36, 4, 0.5)} className="h-full w-full" animate={false} fill="rgb(93 115 140 / 0.12)" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/40">Sources attached</p>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Microsoft 365 & connectors: knowledge in, Reflexivity out ---------------- */
const IN = ["SharePoint", "OneDrive", "Outlook", "OneNote"] as const;
const OUT = ["Microsoft Teams", "Microsoft Copilot", "ChatGPT", "Claude"] as const;

export function ConnectorMap() {
  const { ref, t, reduce } = useTicker(1300);
  const i = t % 4;
  return (
    <div ref={ref} className="relative grid items-center gap-4 rounded-[18px] border border-ink/10 bg-white/70 p-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-6 sm:p-7">
      <div>
        <p className="t-ui mb-3 text-ink/50">Bring your knowledge in</p>
        <ul className="space-y-2">
          {IN.map((n, k) => (
            <li key={n} className={clsx("flex items-center justify-between rounded-lg border px-3 py-2.5 transition-colors duration-500", k === i ? "border-lake-500/50 bg-lake-100/60" : "border-ink/10 bg-white")}>
              <span className="font-display text-[14px] font-medium text-ink">{n}</span>
              <span className="font-mono text-[11px] text-ink/40">→</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center py-2">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-lake-900 text-paper sm:h-32 sm:w-32">
          {!reduce && <span className="absolute inset-0 animate-pulse-ring rounded-full border border-lake-500" />}
          <span className="text-center">
            <AlfredGlyph className="mx-auto h-5 w-5" />
            <span className="mt-1.5 block font-display text-[13px] font-semibold leading-tight">Reflexivity</span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.05em] text-paper/55">Alfred · Graph</span>
          </span>
        </div>
      </div>
      <div>
        <p className="t-ui mb-3 text-ink/50">Take Reflexivity out</p>
        <ul className="space-y-2">
          {OUT.map((n, k) => (
            <li key={n} className={clsx("flex items-center justify-between rounded-lg border px-3 py-2.5 transition-colors duration-500", k === i ? "border-pine-500/50 bg-pine-100/60" : "border-ink/10 bg-white")}>
              <span className="font-mono text-[11px] text-ink/40">→</span>
              <span className="font-display text-[14px] font-medium text-ink">{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
