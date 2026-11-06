import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import type { IconName } from "@/components/ui/PrecisionIcon";
import { SplitFeature } from "@/components/ui/Layouts";
import { ScenarioFan } from "@/components/graphics/Cartography";
import { DataSourceLogos } from "@/components/ui/LogoStrip";
import { FanChart } from "./_components/FanChart";
import { SimulationTrace } from "./_components/SimulationTrace";

export const metadata: Metadata = {
  title: "Scenario & Stress Testing",
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
        cta="sst-hero"
        visual={<FanChart />}
      />

      {/* How Reflexivity does it */}
      <Section surface="lake" className="overflow-hidden">
        <div className="container-x grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <SectionHeader className="lg:max-w-none!" title="Simulations you can check and run again." lead="Scenarios are defined in plain language and executed in code, so every figure can be inspected, questioned and re-run." />
          </div>
          <Reveal delay={0.15} className="col-span-12 lg:col-span-6">
            <SimulationTrace />
          </Reveal>
        </div>
        <div className="container-x">
          <FeatureGrid onDark className="mt-16 md:mt-20" items={HOW} />
        </div>
      </Section>

      {/* Three ways to test an idea */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader title="Three ways to test an idea." align="split" lead="Each answers a different question. All three run on the same code-backed engine." />
          <FeatureGrid
            className="mt-14 md:mt-16"
            items={JOBS.map((j) => ({
              icon: j.icon,
              title: j.name,
              body: (
                <>
                  <span className="block italic text-ink/85">“{j.question}”</span>
                  <span className="mt-2 block">{j.body}</span>
                </>
              ),
            }))}
          />
          <div className="mt-16 flex flex-col gap-6 md:mt-20 md:flex-row md:items-center md:gap-10">
            <p className="t-ui shrink-0 text-ink/50">The data behind every scenario</p>
            <DataSourceLogos className="w-full min-w-0" />
          </div>
          <p className="t-small mt-6 max-w-[620px] text-ink/55">
            Feed coverage and timeliness depend on your entitlements.{" "}
            <Link href="/alfred#trust" className="link-underline text-ink">How data and entitlements work</Link>
          </p>
        </div>
      </Section>

      {/* Concept: a distribution of outcomes */}
      <SplitFeature
        surface="pine"
        title="One starting point, a range of outcomes."
        lead="A scenario is a distribution, not a single number. Every episode runs in code, and the spread around the median stays visible, so you can see how wide the outcomes were."
        link={{ label: "Meet Alfred", href: "/alfred" }}
        visual={<ScenarioFan accent="#f4f3f1" />}
      />

      <CTABand
        title="Bring the scenario you’d otherwise build in a spreadsheet."
        lead="A supply shock, a rate path or an earnings miss. We’ll run it through your names live."
        secondary={{ label: "How auditability works", href: "/alfred#trust" }}
        cta="sst-final"
      />
    </>
  );
}
