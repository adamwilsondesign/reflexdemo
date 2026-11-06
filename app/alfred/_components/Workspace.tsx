"use client";

import Link from "next/link";
import clsx from "clsx";
import { AlfredGlyph, Stage } from "@/components/product/ui";
import { MockPanel, Row, useCycle } from "@/components/product/motion";
import { Arrow } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

/* ---------------- Analysis that stays alive ---------------- */
const ALIVE = [
  { title: "Rerun a question on a schedule.", body: "Set a question to run daily or weekly. Alfred sends the latest, so your research stays current." },
  { title: "A morning summary of what changed.", body: "Start your day with a personalized brief from Alfred recapping key developments." },
  { title: "Durable workflows hold steady.", body: "Saves, schedules and updates." },
];

function AlivePanel({ i }: { i: number }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between text-[13px]">
        <span className="flex items-center gap-2 text-[14px] font-semibold"><AlfredGlyph className="h-4 w-4" />Alfred</span>
        <span className="text-[#8f8f8f]">{["Weekdays 07:00", "Mon 07:00", "Saved"][i]}</span>
      </div>
      {i === 0 && (
        <>
          <p className="mt-4 text-[18px] font-semibold leading-6">Guidance changes across my semiconductor names</p>
          <div className="mt-auto">
            <Row label="Last run" value="Today" />
            <Row label="Next run" value="Tomorrow" />
          </div>
        </>
      )}
      {i === 1 && (
        <>
          <p className="mt-4 text-[18px] font-semibold leading-6">Morning brief</p>
          <div className="mt-3">
            <Row dot strong label="NVIDIA raises guidance" />
            <Row dot strong label="Netflix ad tier update" />
            <Row dot strong label="Microsoft Copilot seats" />
          </div>
        </>
      )}
      {i === 2 && (
        <>
          <p className="mt-4 text-[18px] font-semibold leading-6">Earnings preview workflow</p>
          <div className="mt-auto">
            <Row label="Runs on" value="NVDA, AVGO, MU" />
            <Row label="Updated" value="This morning" />
          </div>
        </>
      )}
    </div>
  );
}

/** Copy list on the left, one fixed panel on the right; the highlighted item matches the panel state. */
export function LivingAnalysis() {
  const [i, ref, setI] = useCycle(ALIVE.length, { ms: 5200 });
  return (
    <div ref={ref} className="grid-12 items-center gap-y-10">
      <ul className="col-span-12 lg:col-span-5">
        {ALIVE.map((a, k) => (
          <li key={a.title}>
            <button
              type="button"
              onClick={() => setI(k)}
              className={clsx("block w-full border-t py-6 text-left transition-colors duration-500", k === i ? "border-ink/40" : "border-ink/12")}
            >
              <span className={clsx("t-h3 block transition-opacity duration-500", k === i ? "opacity-100" : "opacity-45")}>{a.title}</span>
              <span className={clsx("t-small mt-2 block transition-opacity duration-500", k === i ? "text-ink/70" : "text-ink/40")}>{a.body}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="col-span-12 lg:col-span-6 lg:col-start-7" aria-hidden="true">
        <Stage field="lake" className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-[400px]">
            <MockPanel stateKey={i} height={232}>
              <AlivePanel i={i} />
            </MockPanel>
          </div>
        </Stage>
      </div>
    </div>
  );
}

/* ---------------- Works where you do ---------------- */
/** A static two-chip connection: your tool, a labelled hairline, Alfred. */
function Hookup({ from, via }: { from: string; via: string }) {
  return (
    <div className="pui flex h-full flex-col items-center justify-center">
      <span className="ui-card px-4 py-2 text-[13px] text-[#0d0d0d]">{from}</span>
      <span className="relative h-12 w-px bg-white/50">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[12px] text-white/75">{via}</span>
      </span>
      <span className="ui-card flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-[#0d0d0d]">
        <AlfredGlyph className="h-4 w-4" /> Alfred
      </span>
    </div>
  );
}

const CARDS = [
  { title: "Bring your own MCP.", body: "Use Alfred and the Knowledge Graph from the tools you already run.", href: "/deployment#api-mcp", link: "MCP access", from: "Your AI assistant", via: "via MCP" },
  { title: "Microsoft 365.", body: "Search SharePoint, OneDrive, Outlook, and OneNote. Use Alfred in Teams.", href: "/deployment#microsoft-365", link: "Microsoft 365 details", from: "Microsoft Teams", via: "Native app" },
  { title: "Your own environment.", body: "Put Alfred in a system you already run, through an API or a custom integration.", href: "/deployment#api-mcp", link: "API and custom integration", from: "Your research portal", via: "via API" },
];

/** Three ways in, on the shared hairline grid. Hover = tint only. */
export function WorksWhere() {
  return (
    <Stagger className="grid border-l border-t border-ink/12 md:grid-cols-3">
      {CARDS.map((c) => (
        <StaggerItem key={c.title} className="h-full">
          <Link href={c.href} className="group flex h-full flex-col border-b border-r border-ink/12 transition-colors duration-500 hover:bg-ink/[0.035]">
            <div className="p-4 pb-0">
              <Stage field="lake" className="h-[240px]">
                <Hookup from={c.from} via={c.via} />
              </Stage>
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
