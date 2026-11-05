"use client";

import { AutoTabs } from "@/components/ui/AutoTabs";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { KnowledgeGraph } from "@/components/graphics/KnowledgeGraph";
import { Stage } from "@/components/product/ui";
import { AuditTrace, InsightStream } from "@/components/product/visuals";
import Link from "next/link";

export function Differentiators() {
  return (
    <AutoTabs
      interval={7000}
      items={[
        {
          title: "Knowledge Graph",
          icon: <PrecisionIcon name="triad" className="h-6 w-6" />,
          body: (
            <>
              A proprietary map of relationships across companies, products, themes, and markets reveals hidden exposures and second-order effects.{" "}
              <Link href="/knowledge-graph" className="link-underline font-medium text-ink">Explore the Graph</Link>
            </>
          ),
          visual: (
            <Stage field="ink" className="h-full w-full">
              <KnowledgeGraph tone="dark" minor={60} />
              <p className="pointer-events-none absolute right-4 top-4 text-[12px] text-white/50">Hover a node</p>
            </Stage>
          ),
        },
        {
          title: "Always-on intelligence",
          icon: <PrecisionIcon name="signal" className="h-6 w-6" />,
          body: (
            <>
              Alfred monitors relevant market developments, surfacing insights without waiting for a prompt.{" "}
              <Link href="/insights" className="link-underline font-medium text-ink">See Insights</Link>
            </>
          ),
          visual: <InsightStream />,
        },
        {
          title: "Auditable analysis",
          icon: <PrecisionIcon name="eye" className="h-6 w-6" />,
          body: (
            <>
              Research grounded in institutional data, with traceable sources and code-backed calculations.{" "}
              <Link href="/alfred#trust" className="link-underline font-medium text-ink">How auditability works</Link>
            </>
          ),
          visual: <AuditTrace />,
        },
      ]}
    />
  );
}
