"use client";

import { AutoTabs } from "@/components/ui/AutoTabs";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { Field } from "@/components/visual/kit";
import { HomeLinkLedger } from "@/components/visual/scenes/HomeLinkLedger";
import { OvernightWatch } from "@/components/visual/scenes/OvernightWatch";
import { SourceTrace } from "@/components/visual/scenes/SourceTrace";
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
          visual: <Slot field="lake"><HomeLinkLedger /></Slot>,
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
          visual: <Slot field="pine"><OvernightWatch /></Slot>,
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
          visual: <Slot field="mist"><SourceTrace /></Slot>,
        },
      ]}
    />
  );
}

function Slot({ field, children }: { field: "lake" | "pine" | "mist"; children: React.ReactNode }) {
  return (
    <Field field={field} className="flex h-full w-full items-center">
      <div className="w-full">{children}</div>
    </Field>
  );
}
