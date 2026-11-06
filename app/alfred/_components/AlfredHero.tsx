"use client";

import { AlfredGlyph, Cite, useTypewriter } from "@/components/product/ui";
import { MockPanel, Row, useCycle } from "@/components/product/motion";

const PROMPT = "What changed in Netflix’s tone on recent earnings calls?";

/**
 * Hero: Alfred's two modes in one fixed panel, three calm states.
 * Ask (on demand) → cited answer → an alert arrives unprompted (always on).
 */
export function AlfredHero() {
  const [i, ref, setI] = useCycle(3, { ms: 5200 });
  const typed = useTypewriter(PROMPT, { start: i === 0, speed: 38 });

  return (
    <div ref={ref} className="pui mx-auto w-full max-w-[400px]">
      <MockPanel stateKey={i} height={264}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between text-[13px]">
            <span className="flex items-center gap-2 text-[14px] font-semibold"><AlfredGlyph className="h-4 w-4" />Alfred</span>
            <span className="text-[#8f8f8f]">{i === 2 ? "Always on" : "On demand"}</span>
          </div>

          {i === 0 && (
            <>
              <p className="mt-4 text-[16px] leading-6 text-[#0d0d0d]">
                {typed}
                {typed.length < PROMPT.length && <span className="animate-blink ml-0.5 inline-block h-4 w-px translate-y-[2px] bg-[#0d0d0d]" />}
              </p>
              <div className="mt-auto flex justify-end">
                <span className="rounded-[10px] border border-black/10 px-3 py-1 text-[13px] font-medium">Ask</span>
              </div>
            </>
          )}

          {i === 1 && (
            <>
              <p className="mt-4 text-[18px] font-semibold leading-6">3 shifts in management tone</p>
              <div className="mt-3">
                <Row strong label="Advertising" value={<>Firmer<Cite n={1} /></>} />
                <Row strong label="Content spend" value={<>Unchanged<Cite n={2} /></>} />
                <Row strong label="Margin outlook" value={<>Softer<Cite n={3} /></>} />
              </div>
            </>
          )}

          {i === 2 && (
            <>
              <p className="mt-4 flex items-center gap-2 text-[13px] text-[#5d5d5d]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" />
                New insight, no prompt
              </p>
              <p className="mt-2 text-[18px] font-semibold leading-6">AI data center power buildout accelerates</p>
              <p className="mt-auto text-[13px] text-[#5d5d5d]">Touches VRT and ETN on your watchlist</p>
            </>
          )}
        </div>
      </MockPanel>
    </div>
  );
}
