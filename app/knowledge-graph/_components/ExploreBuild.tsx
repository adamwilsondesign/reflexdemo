"use client";

import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { TextLink } from "@/components/ui/Layouts";
import { EntityComposer } from "@/components/visual/scenes/EntityComposer";
import { GraphCall } from "@/components/visual/scenes/GraphCall";

const EASE = [0.16, 1, 0.3, 1] as const;

const CARDS = [
  {
    title: "Explore in Reflexivity",
    body: "Research exposures and investigate opportunities through Alfred. Receive portfolio-relevant Insights as alerts.",
    links: [
      { label: "Meet Alfred", href: "/alfred" },
      { label: "See Insights", href: "/insights" },
    ],
    visual: <EntityComposer />,
    field: "field-mist",
    dark: false,
  },
  {
    title: "Build with the Graph",
    body: "Bring structured relationship intelligence into your own models and applications through data feeds, API, or MCP. Suited to systematic teams and thematic basket construction.",
    links: [{ label: "Data feeds, API and MCP", href: "/deployment#knowledge-feeds" }],
    visual: <GraphCall />,
    field: "field-pine",
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
          <div className={clsx("grain relative isolate shrink-0 overflow-hidden p-4 sm:p-6", c.field)}>{c.visual}</div>
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
