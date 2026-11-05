"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, CardHeader, Cite, CodeBlock, Sparkline, Stage, series } from "@/components/product/ui";

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
const NAV = ["Alfred", "Knowledge Graph", "Insights", "Data", "Microsoft 365"] as const;

function Rows({ rows }: { rows: [string, string][] }) {
  return (
    <ul className="mt-2 divide-y divide-black/10 border-t border-black/10">
      {rows.map(([a, b]) => (
        <li key={a} className="flex items-center justify-between gap-3 py-2 text-[13px]">
          <span className="min-w-0 truncate text-[#0d0d0d]">{a}</span>
          <span className="shrink-0 text-[#8f8f8f]">{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function PlatformCockpit() {
  const { ref, t, reduce } = useTicker(2600);
  const on = t % NAV.length;
  return (
    <Stage field="mist" className="p-4 sm:p-7">
      <div ref={ref} className="ui-card overflow-hidden p-0">
        <div className="grid grid-cols-[124px_1fr] sm:grid-cols-[160px_1fr]">
          <ul className="space-y-0.5 border-r border-black/10 bg-[#f9f9f9] p-2">
            {NAV.map((n, i) => (
              <li
                key={n}
                className={clsx(
                  "truncate rounded-[10px] px-2.5 py-1.5 text-[13px] transition-colors duration-500",
                  i === on ? "bg-black/5 font-medium text-[#0d0d0d]" : "text-[#5d5d5d]",
                )}
              >
                {n}
              </li>
            ))}
          </ul>
          <div className="relative grid min-h-[210px] p-4">
            <AnimatePresence initial={false}>
              <motion.div
                key={on}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="[grid-area:1/1]"
              >
                {on === 0 && (
                  <div>
                    <CardHeader trail={["Thesis check"]} />
                    <p className="mt-3 text-[14px] font-medium leading-snug text-[#0d0d0d]">What breaks the long thesis on European grid equipment?</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#5d5d5d]">
                      Backlogs cover about two years of revenue<Cite n={1} />, but easing transformer lead times<Cite n={2} /> would hit pricing first.
                    </p>
                  </div>
                )}
                {on === 1 && (
                  <div>
                    <p className="text-[14px] font-semibold text-[#0d0d0d]">ASML relationships</p>
                    <Rows rows={[["Carl Zeiss SMT", "Supplier"], ["TSMC", "Customer"], ["Samsung Electronics", "Customer"], ["Canon", "Competitor"]]} />
                  </div>
                )}
                {on === 2 && (
                  <div>
                    <p className="text-[14px] font-semibold text-[#0d0d0d]">Insights</p>
                    <Rows rows={[["Guidance raised on data center demand", "now"], ["Supplier flags capacity constraint", "8m"], ["Rate-cut odds reprice utilities", "21m"]]} />
                  </div>
                )}
                {on === 3 && (
                  <div>
                    <p className="text-[14px] font-semibold text-[#0d0d0d]">Integrated sources</p>
                    <p className="mt-1 text-[13px] text-[#5d5d5d]">Filings, transcripts, estimates, pricing, newswires, macro</p>
                    <div className="mt-3 h-12"><Sparkline points={series(36, 11)} className="h-full w-full" animate={false} /></div>
                  </div>
                )}
                {on === 4 && (
                  <div>
                    <p className="text-[14px] font-semibold text-[#0d0d0d]">Firm knowledge</p>
                    <Rows rows={[["Q3 grid thesis.docx", "SharePoint"], ["Call notes", "OneNote"], ["PM thread", "Outlook"]]} />
                    <p className="mt-2 text-[12px] text-[#8f8f8f]">Read with permissions respected</p>
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
  { from: "Claude", call: `graph.related_entities("Novo Nordisk", "supplier")`, out: ["Catalent · fill-finish [1]", "West Pharma · devices [2]", "Gerresheimer · pens [3]"] },
  { from: "Research portal", call: `insights.list("EU utilities", since="24h")`, out: ["Grid capex guidance raised [1]", "Rate-cut odds reprice sector [2]", "Regional mix: missing, flagged"] },
  { from: "ChatGPT", call: `alfred.research("Who is exposed to HBM supply?")`, out: ["Answer with 6 citations", "Code attached", "1 gap flagged"] },
] as const;

export function McpConsole() {
  const { ref, t, reduce } = useTicker(4200);
  const k = t % CALLS.length;
  const c = CALLS[k];
  return (
    <Stage field="ink" className="p-4 sm:p-7">
      <div ref={ref} className="ui-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#0d0d0d]">MCP server</span>
          <span className="flex items-center gap-1.5 text-[12px] text-[#8f8f8f]"><span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" />Connected</span>
        </div>
        <div className="mt-3 grid min-h-[176px]">
          <AnimatePresence initial={false}>
            <motion.div key={k} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="[grid-area:1/1]">
              <p className="text-[12px] text-[#8f8f8f]">From {c.from}</p>
              <CodeBlock className="mt-1.5" lines={[c.call]} />
              <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
                {c.out.map((o, i) => (
                  <motion.li
                    key={o}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.35, ease: EASE }}
                    className={clsx("truncate py-1.5 text-[13px]", i === 2 && k > 0 ? "font-medium text-[#0d0d0d]" : "text-[#5d5d5d]")}
                  >
                    {o}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-3 text-[12px] text-white/55">Illustrative tool names and responses</p>
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
  const rows = Array.from({ length: 4 }, (_, i) => ({ r: ROWS[(start + i) % ROWS.length], key: t + i }));
  return (
    <div ref={ref} className="ui-card pui overflow-hidden p-0">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-[14px] font-semibold text-[#0d0d0d]">relationships.parquet</span>
        <span className="text-[12px] text-[#8f8f8f]">Daily delivery</span>
      </div>
      <div className="grid grid-cols-[1fr_1.3fr_1fr_48px] gap-2 border-y border-black/10 px-4 py-2 text-[12px] text-[#8f8f8f]">
        <span>Source</span>
        <span>Relation</span>
        <span>Target</span>
        <span className="text-right">Conf.</span>
      </div>
      <div className="relative h-[160px] overflow-hidden">
        <AnimatePresence initial={false}>
          {rows.map(({ r, key }) => (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid h-10 grid-cols-[1fr_1.3fr_1fr_48px] items-center gap-2 border-b border-black/10 px-4 text-[13px] last:border-b-0"
            >
              <span className="truncate font-medium text-[#0d0d0d]">{r[0]}</span>
              <span className="truncate text-[#5d5d5d]">{r[1]}</span>
              <span className="truncate text-[#0d0d0d]">{r[2]}</span>
              <span className="text-right tabular-nums text-[#8f8f8f]">{r[3]}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- Embedded: Reflexivity inside a partner's product ---------------- */
export function EmbeddedFrame() {
  const { ref, t, reduce } = useTicker(3000);
  const step = t % 3;
  return (
    <div ref={ref} className="pui relative rounded-[18px] border border-white/10 bg-white/[0.04] p-3 sm:p-5">
      <p className="px-1 pb-3 text-[13px] text-white/60">Your platform, your brand</p>
      <div className="ui-card grid overflow-hidden p-0 sm:grid-cols-[1fr_1.15fr]">
        {/* host app */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold text-[#0d0d0d]">Client watchlist</span>
            <span className="text-[12px] text-[#8f8f8f]">12 names</span>
          </div>
          <ul className="mt-2 divide-y divide-black/10 border-t border-black/10">
            {["Microsoft", "Siemens Energy", "Schneider", "Vistra"].map((n, i) => (
              <li key={n} className="flex items-center justify-between py-2 text-[13px]">
                <span className="text-[#0d0d0d]">{n}</span>
                <span className="tabular-nums text-[#5d5d5d]">{i === 2 ? "−0.8%" : `+${(1.2 + i * 0.6).toFixed(1)}%`}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* native panel powered by Reflexivity */}
        <div className="flex flex-col border-t border-black/10 p-4 sm:border-l sm:border-t-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[14px] font-semibold text-[#0d0d0d]">What changed</span>
            <span className="flex items-center gap-1 text-[12px] text-[#8f8f8f]"><AlfredGlyph className="h-3 w-3" />Reflexivity</span>
          </div>
          <div className="relative mt-2 grid min-h-[88px]">
            <AnimatePresence initial={false}>
              <motion.div key={step} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45, ease: EASE }} className="[grid-area:1/1]">
                {step === 0 && (
                  <p className="text-[13px] leading-relaxed text-[#5d5d5d]">
                    Capex guidance rose for three names on the list<Cite n={1} />. Schneider is most exposed to the transformer bottleneck<Cite n={2} />.
                  </p>
                )}
                {step === 1 && (
                  <ul className="space-y-1 text-[13px] text-[#5d5d5d]">
                    {["Grid equipment orders", "Transformer lead times", "Data center demand"].map((x) => <li key={x}>{x}</li>)}
                  </ul>
                )}
                {step === 2 && <div className="h-[72px]"><Sparkline points={series(36, 4, 0.5)} className="h-full w-full" animate={false} /></div>}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-auto rounded-[10px] bg-[#f9f9f9] px-3 py-2 text-[13px] text-[#8f8f8f]">Ask about this list</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Microsoft 365 & connectors: knowledge in, Reflexivity out ---------------- */
const IN = ["SharePoint", "OneDrive", "Outlook", "OneNote"] as const;
const OUT = ["Microsoft Teams", "Microsoft Copilot", "ChatGPT", "Claude"] as const;

function ConnectorList({ title, items, active }: { title: string; items: readonly string[]; active: number }) {
  return (
    <div className="ui-card p-4">
      <p className="text-[14px] font-semibold text-[#0d0d0d]">{title}</p>
      <ul className="mt-2 divide-y divide-black/10 border-t border-black/10">
        {items.map((n, k) => (
          <li key={n} className={clsx("flex items-center justify-between py-2 text-[14px] transition-colors duration-500", k === active ? "font-medium text-[#0d0d0d]" : "text-[#5d5d5d]")}>
            {n}
            <span className={clsx("h-1.5 w-1.5 rounded-full bg-[#0d0d0d] transition-opacity duration-500", k === active ? "opacity-100" : "opacity-0")} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConnectorMap() {
  const { ref, t } = useTicker(1300);
  const i = t % 4;
  return (
    <div ref={ref} className="pui relative grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
      <ConnectorList title="Bring your knowledge in" items={IN} active={i} />
      <div className="flex items-center justify-center gap-3 sm:flex-col">
        <span className="hidden h-px w-8 bg-black/15 sm:block" />
        <div className="ui-card flex items-center gap-2 px-4 py-3">
          <AlfredGlyph className="h-4 w-4 text-[#0d0d0d]" />
          <span className="text-[14px] font-semibold text-[#0d0d0d]">Reflexivity</span>
        </div>
        <span className="hidden h-px w-8 bg-black/15 sm:block" />
      </div>
      <ConnectorList title="Take Reflexivity out" items={OUT} active={i} />
    </div>
  );
}
