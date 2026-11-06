"use client";

import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Field } from "@/components/visual/kit";
import { ScheduledRun } from "@/components/visual/scenes/ScheduledRun";
import { WhereApi, WhereMcp, WhereTeams } from "@/components/visual/scenes/WhereMinis";
/* ---------------- Analysis that stays alive ---------------- */
const ALIVE = [
  { title: "Rerun a question on a schedule.", body: "Set a question to run daily or weekly. Alfred sends the latest, so your research stays current." },
  { title: "A morning summary of what changed.", body: "Start your day with a personalized brief from Alfred recapping key developments." },
  { title: "Durable workflows hold steady.", body: "Saves, schedules and updates." },
];

/** Copy list on the left, one scheduled question on the right, acted out by the UI itself. */
export function LivingAnalysis() {
  return (
    <div className="grid-12 items-center gap-y-10">
      <ul className="col-span-12 lg:col-span-5">
        {ALIVE.map((a) => (
          <li key={a.title} className="border-t border-ink/12 py-6 last:border-b">
            <span className="t-h3 block">{a.title}</span>
            <span className="t-small mt-2 block text-ink/70">{a.body}</span>
          </li>
        ))}
      </ul>
      <div className="col-span-12 lg:col-span-6 lg:col-start-7" aria-hidden="true">
        <Field field="ink">
          <ScheduledRun />
        </Field>
      </div>
    </div>
  );
}

/* ---------------- Works where you do ---------------- */
const CARDS = [
  { title: "Bring your own MCP.", body: "Use Alfred and the Knowledge Graph from the tools you already run.", href: "/deployment#api-mcp", link: "MCP access", V: WhereMcp },
  { title: "Microsoft 365.", body: "Search SharePoint, OneDrive, Outlook, and OneNote. Use Alfred in Teams.", href: "/deployment#microsoft-365", link: "Microsoft 365 details", V: WhereTeams },
  { title: "Your own environment.", body: "Put Alfred in a system you already run, through an API or a custom integration.", href: "/deployment#api-mcp", link: "API and custom integration", V: WhereApi },
];

/** Three ways in, on the shared hairline grid. Hover = tint only. */
export function WorksWhere() {
  return (
    <Stagger className="grid border-l border-t border-ink/12 md:grid-cols-3">
      {CARDS.map((c) => (
        <StaggerItem key={c.title} className="h-full">
          <Link href={c.href} className="group flex h-full flex-col border-b border-r border-ink/12 transition-colors duration-500 hover:bg-ink/[0.035]">
            <div className="p-4 pb-0">
              <Field field="lake" className="flex h-[240px] items-center !p-4">
                <div className="w-full" aria-hidden="true"><c.V /></div>
              </Field>
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className="t-h3">{c.title}</h3>
              <p className="t-small mt-2 text-ink/70">{c.body}</p>
              <span className="mt-auto flex items-center gap-2 pt-8 font-display text-[15px] font-medium">
                <span className="link-underline">{c.link}</span> <Arrow />
              </span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
