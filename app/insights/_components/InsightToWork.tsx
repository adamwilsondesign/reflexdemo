"use client";

import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { MiniCadence, MiniOpenInAlfred, MiniPinboard } from "@/components/visual/scenes/InsightToWorkMinis";

function Card({ title, body, href, link, children }: { title: string; body: string; href?: string; link?: string; children: React.ReactNode }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.04]">
      <div className="field-mist grain relative flex h-[240px] items-center overflow-hidden p-4" aria-hidden="true"><div className="w-full">{children}</div></div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="t-h3 text-paper">{title}</h3>
        <p className="t-body mt-2.5 text-paper/68">{body}</p>
        {href && (
          <Link href={href} className="mt-auto inline-flex items-center gap-2 pt-6 font-display text-[15px] font-medium text-paper">
            <span className="link-underline">{link}</span>
            <Arrow />
          </Link>
        )}
      </div>
    </article>
  );
}

export function InsightToWork() {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-5">
      <Card title="Open in Alfred" body="Carry the Insight into Alfred with its context attached, then ask the follow-up your book needs." href="/alfred" link="Meet Alfred">
        <MiniOpenInAlfred />
      </Card>
      <Card title="Refresh on a schedule" body="Keep a recurring read on a theme, a name or a cohort, refreshed on the cadence your team works to." href="/use-cases/portfolio-monitoring" link="Portfolio monitoring">
        <MiniCadence />
      </Card>
      <Card title="Keep it on a workspace" body="Pin the Insights that matter to a workspace, so the research stays alongside the book it explains.">
        <MiniPinboard />
      </Card>
    </div>
  );
}
