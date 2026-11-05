"use client";

import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { AlfredGlyph } from "@/components/product/ui";
import { Arrow } from "@/components/ui/Button";
import { DEMO_EXAMPLE_EVENT } from "./options";

const EXAMPLES = [
  {
    who: "Hedge funds",
    prompt: "Stress-test my thesis: what breaks it, and what should I watch?",
    shows: "Alfred · Scenario & Stress Testing",
  },
  {
    who: "Asset managers",
    prompt: "Map AAPL’s ecosystem and find the hidden beneficiaries.",
    shows: "Knowledge Graph · Thematic Exposure",
  },
  {
    who: "Financial institutions",
    prompt: "What changed in NFLX management’s tone relative to the prior 4 earnings calls, and what does it signal?",
    shows: "Alfred · Deep Research",
  },
  {
    who: "Wealth managers & RIAs",
    prompt: "What moved the names on my watchlist this week, and why?",
    shows: "Insights · Portfolio Monitoring",
  },
] as const;

/** Example questions visitors can drop straight into the form's optional field. */
export function ExamplePrompts() {
  const use = (text: string) => window.dispatchEvent(new CustomEvent(DEMO_EXAMPLE_EVENT, { detail: text }));
  return (
    <Stagger className="grid gap-4 md:grid-cols-2">
      {EXAMPLES.map((e) => (
        <StaggerItem key={e.prompt} className="h-full">
          <article className="group flex h-full flex-col rounded-[16px] border border-ink/10 bg-white/70 p-6 transition-[border-color,background-color] duration-500 hover:border-ink/25 hover:bg-white md:p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="t-ui text-ink/50">{e.who}</p>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white ring-1 ring-ink/8">
                <AlfredGlyph className="h-4 w-4 text-lake-700" />
              </span>
            </div>
            <h3 className="mt-6 font-display text-[19px] font-medium leading-snug tracking-[-0.01em] text-ink md:text-[21px]">&ldquo;{e.prompt}&rdquo;</h3>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-ink/45">{e.shows}</span>
              <button
                type="button"
                onClick={() => use(e.prompt)}
                className="group/b inline-flex items-center gap-2 font-display text-[15px] font-medium text-ink"
                aria-label={`Use this example in the demo request: ${e.prompt}`}
              >
                <span className="link-underline">Use this example</span>
                <Arrow />
              </button>
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
