"use client";

import { Stage } from "@/components/product/ui";
import { MockPanel, Row, useCycle } from "@/components/product/motion";

const NAMES = ["CoreWeave", "Nike", "Vertiv"];

const FEED = [
  { type: "Company catalyst", title: "CoreWeave rolls out Nvidia Vera Rubin" },
  { type: "Earnings recap", title: "Guidance overshadowed a mixed Nike quarter" },
  { type: "Market catalyst", title: "AI data center power buildout accelerates" },
];

/** Hero: one motion idea. A new Insight lands on a name you follow. */
export function MorningOpen() {
  const [i, ref, setI] = useCycle(FEED.length, { ms: 5000 });
  const it = FEED[i];
  return (
    <Stage field="lake" className="flex items-center justify-center px-6 py-12 sm:px-10 sm:py-16">
      <div ref={ref} className="w-full max-w-[400px]">
        <MockPanel stateKey={i} height={256}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-semibold text-[#0d0d0d]">Your watchlist</span>
              <span className="text-[#8f8f8f]">Mon 07:00</span>
            </div>
            <div className="mt-3">
              {NAMES.map((n, k) => (
                <Row key={n} label={n} strong={k === i} dot={k === i} value={k === i ? "New insight" : undefined} />
              ))}
            </div>
            <div className="mt-auto rounded-[10px] bg-[#f9f9f9] px-3 py-2">
              <p className="text-[12px] text-[#8f8f8f]">{it.type}</p>
              <p className="mt-1 text-[14px] font-medium leading-5 text-[#0d0d0d]">{it.title}</p>
            </div>
          </div>
        </MockPanel>
      </div>
    </Stage>
  );
}
