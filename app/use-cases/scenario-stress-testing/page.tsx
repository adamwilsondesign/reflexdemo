import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/Blocks";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { DataSourceLogos } from "@/components/ui/LogoStrip";
import { CodeBlock, MissingData, Pill, Stage } from "@/components/product/ui";
import { Audiences, Contrast, IllustrativeNote, RelatedUseCases } from "../_components/Shared";
import { ShockRings } from "../_components/LineArt";
import { FanChart } from "./_components/FanChart";
import { ScenarioResult } from "./_components/ScenarioResult";

export const metadata: Metadata = {
  title: "Scenario & Stress Testing | Reflexivity",
  description:
    "Test a hypothesis before you commit capital: historical backtests across 50+ years of market data, custom scenarios, and stress tests of portfolios and positions, with code-backed calculations you can check and re-run.",
};

const HOW: { icon: IconName; title: string; body: string }[] = [
  { icon: "cube", title: "Code-backed simulations", body: "Every simulation runs in code, so each figure comes with the calculation behind it." },
  { icon: "eye", title: "Missing inputs flagged", body: "When an input or dataset is unavailable, the output says so instead of inventing one." },
  { icon: "loop", title: "Re-run any output", body: "When the tape moves, re-run the same analysis on the new data, or change an assumption and compare." },
];

const JOBS: { icon: IconName; name: string; question: string; body: string }[] = [
  { icon: "path", name: "Historical backtesting", question: "How would this strategy have performed?", body: "Run your strategies against 50+ years of market data to see how they held up in earlier conditions." },
  { icon: "knot", name: "Custom scenario building", question: "What happens to these assets if…?", body: "Set specific macro conditions, market shocks and variables, such as a rate rise, then compare the assets you want to study." },
  { icon: "pentagon", name: "Stress testing", question: "Where is my book vulnerable?", body: "Test portfolios and positions against changing market and macro conditions, using past shocks as the reference." },
];

export default function ScenarioStressTestingPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Use Cases", href: "/use-cases" }, { label: "Scenario & Stress Testing" }]}
        title="Test a hypothesis before you commit capital."
        lead="Pressure-test an idea against history, correlations, market shocks and what-breaks analysis, and see what holds."
        secondary={{ label: "See the worked example", href: "#worked-example" }}
        cta="sst-hero"
        visual={<FanChart />}
      />

      {/* The old workflow */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader
            eyebrow="The old workflow"
            title="Terminals look up history. General models narrate a scenario."
            maxW="max-w-[900px]"
            lead="Neither reliably runs the calculation, shows the code, and keeps the analysis alive as conditions change."
          />
          <Contrast
            className="mt-14 md:mt-16"
            before={{
              label: "Terminals, spreadsheets and chat",
              items: [
                "Historical lookups, rebuilt by hand in a spreadsheet for each new question.",
                "A plausible story about what might happen, with no calculation behind it.",
                "Missing data quietly filled or skipped.",
                "A one-off file that is stale the day after it is built.",
              ],
            }}
            after={{
              label: "With Reflexivity",
              items: [
                "Scenarios defined in plain language, executed in code.",
                "The calculation shown alongside every figure.",
                "Missing inputs flagged instead of invented.",
                "Outputs you can re-run as the tape changes.",
              ],
            }}
          />
        </div>
      </Section>

      {/* How Reflexivity does it */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader eyebrow="How Reflexivity does it" title="Simulations you can check and run again." />
            <Stagger as="ul" className="mt-12 space-y-px overflow-hidden rounded-[14px] bg-white/10">
              {HOW.map((x) => (
                <StaggerItem as="li" key={x.title} className="group flex gap-5 bg-lake-900 p-6 md:p-7">
                  <PrecisionIcon name={x.icon} className="h-9 w-9 shrink-0 text-paper transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[20deg]" />
                  <div>
                    <h3 className="t-h3">{x.title}</h3>
                    <p className="t-body mt-2 text-paper/70">{x.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.15} className="lg:col-span-6">
            <Stage field="ink" className="p-5 sm:p-8">
              <div className="mx-auto max-w-[480px] space-y-3">
                <div className="ui-card p-4">
                  <div className="flex items-center justify-between">
                    <span className="t-ui text-[10px] text-ink/45">Scenario · rates shock</span>
                    <Pill tone="lake">Run 2 of 2</Pill>
                  </div>
                  <p className="mt-2 font-display text-[15px] font-semibold leading-snug text-ink">What followed when the US 10-year yield rose 0.5pp in three months?</p>
                </div>
                <CodeBlock
                  lines={[
                    `<span style="color:#8fa3b6">episodes</span> = find_episodes(<span style="color:#d5e0da">"US10Y"</span>, rise=0.5, window=<span style="color:#d5e0da">"3M"</span>)`,
                    `<span style="color:#8fa3b6">fwd</span> = forward_returns(sp1500, episodes, [<span style="color:#d5e0da">"1W","1M","3M","6M","1Y"</span>])`,
                    `<span style="color:#8fa3b6">summary</span> = fwd.median(by=<span style="color:#d5e0da">"sector"</span>)  <span style="color:#7d978c"># 23 episodes</span>`,
                  ]}
                />
                <MissingData label="Pre-listing history, 212 stocks" reason="Excluded from earlier episodes" />
                <div className="flex items-center justify-between rounded-lg bg-white/90 px-3 py-2.5">
                  <span className="font-display text-[12.5px] font-medium text-ink">Re-run on latest data</span>
                  <span className="font-mono text-[10px] uppercase text-ink/45">Same code · new inputs</span>
                </div>
              </div>
            </Stage>
            <IllustrativeNote onDark className="mt-4">Simplified code shown for illustration.</IllustrativeNote>
          </Reveal>
        </div>
      </Section>

      {/* Three ways to test an idea */}
      <Section surface="paper">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="How teams use it" title="Three ways to test an idea." lead="Each answers a different question. All three run on the same code-backed engine." />
            <Reveal delay={0.2} className="mx-auto mt-12 hidden aspect-[560/620] max-w-[320px] text-lake-700/60 lg:block">
              <ShockRings />
            </Reveal>
          </div>
          <Stagger className="grid gap-4 lg:col-span-8">
            {JOBS.map((j) => (
              <StaggerItem key={j.name} className="group grid gap-5 rounded-[16px] border border-ink/10 bg-white/60 p-6 transition-colors duration-500 hover:bg-white sm:grid-cols-[56px_1fr] md:p-8">
                <PrecisionIcon name={j.icon} className="h-11 w-11 text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[20deg]" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-lake-700">“{j.question}”</p>
                  <h3 className="t-h2 mt-3 text-[28px] md:text-[32px]">{j.name}</h3>
                  <p className="t-body mt-3 max-w-[560px] text-ink/65">{j.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Worked example */}
      <Section surface="mist" id="worked-example" className="scroll-mt-[var(--header-h)] border-t border-ink/8">
        <div className="container-x">
          <SectionHeader
            eyebrow="Worked example"
            title="What followed a rise in Treasury yields?"
            align="split"
            lead="A scenario across S&P 1500 stocks: what happened when 10-year Treasuries sold off sharply, with yields up 0.5 percentage points in three months. Change the horizon or the threshold to explore."
          />
          <div className="mt-14 md:mt-16">
            <ScenarioResult />
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <IllustrativeNote>Episode count, returns and sector figures are illustrative, condensed from a Reflexivity scenario analysis.</IllustrativeNote>
            <IllustrativeNote>
              Methodology: historical scenarios describe what followed past episodes. They show correlation, not causation, and are not a forecast of future returns. Results depend on the trigger definition, history window and universe.
            </IllustrativeNote>
          </div>
        </div>
      </Section>

      {/* Data + who it is for */}
      <Section surface="paper">
        <div className="container-x">
          <div className="flex flex-col gap-6 border-b border-ink/10 pb-12 md:flex-row md:items-center md:gap-10">
            <p className="t-ui shrink-0 text-ink/50">The data behind every scenario</p>
            <DataSourceLogos className="w-full min-w-0" />
          </div>
          <p className="t-small mt-6 max-w-[620px] text-ink/55">
            Feed coverage and timeliness depend on your entitlements.{" "}
            <Link href="/auditability-data" className="link-underline text-ink">How data and entitlements work</Link>
          </p>

          <div className="mt-20 md:mt-28">
            <SectionHeader eyebrow="Who it’s for" title="For conviction before capital is committed." align="split" lead="Bring the scenario you would otherwise build in a spreadsheet." />
            <div className="mt-14 md:mt-16">
              <Audiences
                items={[
                  { name: "Hedge Funds", body: "Test the macro view behind a trade, and see which names historically moved with it.", href: "/customers#hedge-funds" },
                  { name: "Asset Managers", body: "Stress portfolios against rate, supply and earnings shocks before the committee asks.", href: "/customers#asset-managers" },
                  { name: "Financial Institutions", body: "Offer scenario analysis to clients and desks inside the tools they already use.", href: "/customers#financial-institutions" },
                  { name: "Wealth Managers", body: "Show clients how their holdings behaved in past shocks, with the method stated plainly.", href: "/customers#wealth-managers" },
                ]}
              />
            </div>
          </div>
          <div className="mt-20 md:mt-28">
            <RelatedUseCases current="scenario-stress-testing" />
          </div>
        </div>
      </Section>

      <CTABand
        title="Bring the scenario you’d otherwise build in a spreadsheet."
        lead="A supply shock, a rate path or an earnings miss. We’ll run it through your names live."
        secondary={{ label: "How auditability works", href: "/auditability-data" }}
        cta="sst-final"
      />
    </>
  );
}
