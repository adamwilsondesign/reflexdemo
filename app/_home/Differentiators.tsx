"use client";

import { AutoTabs } from "@/components/ui/AutoTabs";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { AuditTrace, InsightStream, RelationshipPanel } from "@/components/product/visuals";
import Link from "next/link";

export function Differentiators() {
  return (
    <AutoTabs
      interval={9000}
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
          visual: <RelationshipPanel />,
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
