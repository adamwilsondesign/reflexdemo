"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, Pill, useTypewriter } from "@/components/product/ui";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { Arrow } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

function ExploreVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const typed = useTypewriter("Which of my holdings depend on TSMC, directly or through suppliers?", { start: inView, speed: 28, delay: 300 });
  return (
    <div ref={ref} className="space-y-2.5 p-5 sm:p-6">
      <div className="ui-card p-4">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/50"><AlfredGlyph className="h-3.5 w-3.5 text-lake-700" /> Alfred</span>
        <p className="mt-2 min-h-[2.8em] font-display text-[14px] font-medium leading-snug text-ink">{typed}</p>
      </div>
      <div className="ui-card flex items-center justify-between gap-3 p-3.5">
        <span className="min-w-0">
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">Insight · touches 3 holdings</span>
          <span className="mt-0.5 block truncate font-display text-[13px] font-semibold text-ink">AI data center power buildout accelerates</span>
        </span>
        <Pill tone="pine">Alert</Pill>
      </div>
    </div>
  );
}

const RECORD = [
  `{`,
  `  <span style="color:#8fa3b6">"source"</span>: <span style="color:#c9d6c2">"NVIDIA"</span>,`,
  `  <span style="color:#8fa3b6">"target"</span>: <span style="color:#c9d6c2">"TSMC"</span>,`,
  `  <span style="color:#8fa3b6">"relationship"</span>: <span style="color:#c9d6c2">"supplier"</span>,`,
  `  <span style="color:#8fa3b6">"weight"</span>: <span style="color:#e6c9a8">0.90</span>,`,
  `  <span style="color:#8fa3b6">"evidence"</span>: [<span style="color:#c9d6c2">"filing"</span>, <span style="color:#c9d6c2">"transcript"</span>]`,
  `}`,
];

function BuildVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? RECORD.length : 0);
  const [ch, setCh] = useState(0);
  useEffect(() => {
    if (reduce || !inView) return;
    if (n < RECORD.length) {
      const t = setTimeout(() => setN((x) => x + 1), 260);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCh((c) => (c + 1) % 3), 1800);
    return () => clearTimeout(t);
  }, [n, ch, inView, reduce]);
  return (
    <div ref={ref} className="flex flex-col gap-3 p-5 sm:p-6">
      <div className="flex gap-1.5">
        {["Data feeds", "API", "MCP"].map((c, k) => (
          <span key={c} className={clsx("rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.05em] transition-colors duration-500", k === ch ? "bg-paper text-ink" : "border border-white/15 text-paper/60")}>{c}</span>
        ))}
      </div>
      <pre className="min-h-[164px] overflow-hidden rounded-lg border border-white/10 bg-black/30 p-3.5 font-mono text-[11.5px] leading-[1.7] text-paper/85">
        {RECORD.slice(0, n).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} dangerouslySetInnerHTML={{ __html: l }} />
        ))}
      </pre>
    </div>
  );
}

const CARDS = [
  {
    icon: "eye" as const,
    title: "Explore in Reflexivity",
    body: "Research exposures and investigate opportunities through Alfred. Receive portfolio-relevant Insights as alerts.",
    links: [
      { label: "Meet Alfred", href: "/alfred" },
      { label: "See Insights", href: "/insights" },
    ],
    visual: <ExploreVisual />,
    dark: false,
  },
  {
    icon: "cube" as const,
    title: "Build with the Graph",
    body: "Bring structured relationship intelligence into your own models and applications through data feeds, API, or MCP. Suited to systematic teams and thematic basket construction.",
    links: [{ label: "Data feeds, API and MCP", href: "/deployment#knowledge-feeds" }],
    visual: <BuildVisual />,
    dark: true,
  },
];

export function ExploreBuild() {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {CARDS.map((c, i) => (
        <motion.article
          key={c.title}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
          className={clsx("flex flex-col overflow-hidden rounded-[16px]", c.dark ? "bg-ink text-paper" : "bg-paper text-ink")}
        >
          <div className={clsx("min-h-[250px]", c.dark ? "field-ink" : "field-mist")}>{c.visual}</div>
          <div className="flex flex-1 flex-col p-6 md:p-9">
            <PrecisionIcon name={c.icon} className="h-10 w-10" />
            <h3 className="t-h2 mt-8">{c.title}</h3>
            <p className={clsx("t-body mt-3 max-w-[480px]", c.dark ? "text-paper/70" : "text-ink/70")}>{c.body}</p>
            <div className="mt-auto flex flex-wrap gap-x-7 gap-y-3 pt-8">
              {c.links.map((l) => (
                <Link key={l.href} href={l.href} className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
                  <span className="link-underline">{l.label}</span> <Arrow />
                </Link>
              ))}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
