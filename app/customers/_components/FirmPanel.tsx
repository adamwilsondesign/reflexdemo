"use client";

import { Stage } from "@/components/product/ui";
import { MockPanel, Row, StepDots, useCycle } from "@/components/product/motion";
import { FIRMS } from "./firms";

/**
 * Hero visual (motion system): one fixed panel, one question per firm type.
 * One motion idea: the panel cross-fades from firm to firm. Position shown with StepDots.
 */
export function FirmPanel() {
  const [i, ref, setI] = useCycle(FIRMS.length, { ms: 5200, finalForReduced: 0 });
  const f = FIRMS[i];
  return (
    <Stage field="lake" className="flex w-full items-center justify-center p-6 sm:p-12" parallax={false}>
      <div ref={ref} className="w-full max-w-[400px]">
        <MockPanel stateKey={i} height={208}>
          <p className="text-[13px] text-[#8f8f8f]">{f.name}</p>
          <p className="mt-2 min-h-[48px] text-[18px] font-semibold leading-6 text-[#0d0d0d]">{f.panel.ask}</p>
          <div className="mt-4">
            <Row dot strong label={f.panel.result} value={f.panel.value} />
            <Row label="Sources cited" value={f.panel.sources} />
          </div>
        </MockPanel>
        <StepDots count={FIRMS.length} active={i} onSelect={setI} />
      </div>
    </Stage>
  );
}
