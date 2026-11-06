"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { MockPanel, Row, useCycle } from "@/components/product/motion";
import clsx from "clsx";
import { CardHeader, useTypewriter } from "@/components/product/ui";
import { TextLink } from "@/components/ui/Layouts";

const EASE = [0.16, 1, 0.3, 1] as const;

function ExploreVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const typed = useTypewriter("Which of my holdings depend on TSMC?", { start: inView, speed: 40, delay: 300 });
  return (
    <div ref={ref} className="pui flex h-full items-center justify-center p-6">
      <div className="w-full max-w-[400px]">
        <MockPanel height={200}>
          <div className="flex h-full flex-col">
            <CardHeader />
            <p className="mt-3 text-[16px] leading-6 text-[#0d0d0d]">{typed}</p>
            <div className="mt-auto">
              <Row strong dot label="NVIDIA" value="Supplier, 0.90" />
              <Row strong dot label="Apple" value="Supplier, 0.88" />
            </div>
          </div>
        </MockPanel>
      </div>
    </div>
  );
}

const RECORD = [
  `{`,
  `  "source": "NVIDIA",`,
  `  "target": "TSMC",`,
  `  "relationship": "supplier",`,
  `  "weight": 0.90`,
  `}`,
];
const CHANNELS = ["Data feeds", "API", "MCP"];

function BuildVisual() {
  const [ch, ref] = useCycle(CHANNELS.length, { ms: 4800, finalForReduced: 0 });
  return (
    <div ref={ref} className="pui flex h-full items-center justify-center p-6">
      <div className="w-full max-w-[400px]">
        <MockPanel height={200}>
          <div className="flex gap-4 text-[13px]">
            {CHANNELS.map((c, k) => (
              <span key={c} className={clsx("transition-colors duration-500", k === ch ? "font-medium text-[#0d0d0d]" : "text-[#8f8f8f]")}>{c}</span>
            ))}
          </div>
          <pre className="mt-3 overflow-hidden rounded-[10px] border border-black/10 bg-[#f9f9f9] p-3 text-[12px] leading-5 text-[#0d0d0d]">{RECORD.join("\n")}</pre>
        </MockPanel>
      </div>
    </div>
  );
}

const CARDS = [
  {
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
          className={clsx("flex flex-col overflow-hidden rounded-[16px]", c.dark ? "bg-ink text-paper" : "border border-ink/12 bg-white text-ink")}
        >
          <div className={clsx("h-[296px] shrink-0", c.dark ? "field-ink" : "field-mist")}>{c.visual}</div>
          <div className="flex flex-1 flex-col p-6 md:p-9">
            <h3 className="t-h2">{c.title}</h3>
            <p className={clsx("t-body mt-3 max-w-[480px]", c.dark ? "text-paper/70" : "text-ink/70")}>{c.body}</p>
            <div className="mt-auto flex flex-wrap gap-x-7 gap-y-3 pt-8">
              {c.links.map((l) => (
                <TextLink key={l.href} href={l.href}>{l.label}</TextLink>
              ))}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
