"use client";

import { Stage } from "@/components/product/ui";
import { MockPanel, Row, useCycle } from "@/components/product/motion";
import { THEME, TIERS } from "./data";

/** Hero: one theme, one motion idea. Each state reveals the next ring of constituents. */
export function ThemeConstituents() {
  const [i, ref, setI] = useCycle(TIERS.length, { ms: 5000, finalForReduced: 1 });
  const t = TIERS[i];
  return (
    <Stage field="ink" className="flex items-center justify-center px-6 py-12 sm:px-10 sm:py-16">
      <div ref={ref} className="w-full max-w-[400px]">
        <MockPanel stateKey={i} height={232}>
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-semibold text-[#0d0d0d]">{THEME}</span>
            <span className="text-[#8f8f8f]">Exposure</span>
          </div>
          <p className="mt-4 text-[18px] font-semibold leading-6 text-[#0d0d0d]">{t.label}</p>
          <div className="mt-3">
            {t.rows.map((r) => (
              <Row key={r.name} label={r.name} value={r.score} strong dot={i > 0} />
            ))}
          </div>
        </MockPanel>
      </div>
    </Stage>
  );
}
