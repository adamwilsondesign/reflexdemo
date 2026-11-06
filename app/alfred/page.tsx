import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SplitFeature } from "@/components/ui/Layouts";
import { CTABand, FeatureGrid, Testimonials, TESTIMONIALS } from "@/components/ui/Blocks";
import { DataSourceLogos } from "@/components/ui/LogoStrip";
import { Illustrative } from "@/components/ui/Illustrative";
import { Field } from "@/components/visual/kit";
import { AlertRoll } from "@/components/visual/scenes/AlertRoll";
import { ImpactTree } from "@/components/visual/scenes/ImpactTree";
import { ColHeader } from "./_components/ColHeader";
import { AlfredHero } from "./_components/AlfredHero";
import { TwoModes } from "./_components/TwoModes";
import { PromptWorkbench } from "./_components/PromptWorkbench";
import { TrustTabs } from "./_components/TrustTabs";
import { LivingAnalysis, WorksWhere } from "./_components/Workspace";
import type { IconName } from "@/components/ui/PrecisionIcon";

export const metadata: Metadata = {
  title: "Alfred, the AI analyst | Reflexivity",
  description:
    "Alfred is Reflexivity’s AI analyst: on-demand research and always-on monitoring, reasoning over the Knowledge Graph and institutional data, with cited sources, flagged gaps and inspectable calculations.",
};

const JOBS: { icon: IconName; title: string; body: string; href?: string; linkLabel?: string }[] = [
  { icon: "lattice", title: "Investment research", body: "Build a company note with valuation, catalysts, risks, and related names.", href: "/use-cases/deep-research", linkLabel: "Deep Research" },
  { icon: "rings", title: "Portfolio analysis", body: "See what your holdings are exposed to, including hidden dependencies.", href: "/use-cases/thematic-exposure", linkLabel: "Thematic Exposure" },
  { icon: "signal", title: "Watchlist monitoring", body: "Get an alert when market developments affect companies or themes you follow.", href: "/use-cases/portfolio-monitoring", linkLabel: "Portfolio Monitoring" },
  { icon: "stack", title: "Deep fundamental research", body: "Analyze filings, transcripts, financials, and market data in one sourced analysis." },
  { icon: "crosshair", title: "Thesis pressure testing", body: "Check a view you already hold against the data and the Knowledge Graph." },
  { icon: "path", title: "Scenario analysis and backtesting", body: "Model market shocks, test scenarios, and evaluate historical performance.", href: "/use-cases/scenario-stress-testing", linkLabel: "Scenario & Stress Testing" },
];

export default function AlfredPage() {
  return (
    <>
      {/* 1 · Hero (Figma copy) */}
      <PageHero
        surface="pine"
        trail={[{ label: "Product", href: "/platform" }, { label: "Alfred" }]}
        title="Run the research. Stay ahead of the market. Meet Alfred."
        lead="Ask the hardest question on your desk, get an analyst-grade workup in minutes. Step away, and Alfred monitors for the developments that matter to you."
        cta="alfred-hero"
        visual={<AlfredHero />}
      />

      {/* 2 · One analyst, two modes (Figma copy) */}
      <Section surface="lake">
        <div className="container-x">
          <SectionHeader title="One analyst, two modes." />
          <div className="mt-12 md:mt-16">
            <TwoModes />
          </div>
        </div>
      </Section>

      {/* 3 · On-demand, worked (our section) */}
      <Section surface="paper" id="on-demand">
        <div className="container-x">
          <SectionHeader
            title="Start with a question your desk is already asking."
            align="split"
            lead="Alfred resolves the entities, gathers the evidence, runs the analysis and hands you a cited result to review."
          />
          <div className="mt-12 md:mt-16">
            <PromptWorkbench />
          </div>
        </div>
      </Section>

      {/* 4 · Always-on (our section) */}
      <Section surface="mist" id="always-on" className="border-t border-ink/8">
        <div className="container-x grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <ColHeader
              title="Alfred keeps watching when you step away."
              lead="Alfred monitors the companies and themes you follow, then surfaces the events and ripple effects that touch them, without waiting for a prompt."
            />
            <Reveal delay={0.2} className="mt-8">
              <Button href="/insights" variant="secondary" arrow>See how Insights work</Button>
            </Reveal>
          </div>
          <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7" delay={0.1}>
            <Field field="pine">
              <AlertRoll />
            </Field>
          </Reveal>
        </div>
      </Section>

      {/* 5 · Relationship intelligence (Figma copy) */}
      <SplitFeature
        surface="ink"
        title="Trace market impact faster with built-in relationship intelligence."
        lead="Alfred reasons across a proprietary Knowledge Graph to reveal hidden exposures and second-order effects across companies and markets."
        link={{ label: "Explore the Knowledge Graph", href: "/knowledge-graph" }}
        visual={<Field field="lake"><ImpactTree /></Field>}
      />

      {/* 6 · Use cases (Figma copy, no CTA) */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            title="From deep research to portfolio stress tests, in minutes."
            align="split"
            lead="Alfred is built to run your research and test your ideas at scale, with analyst-grade quality."
          />
          <FeatureGrid className="mt-12 md:mt-16" items={JOBS} />
        </div>
      </Section>

      {/* 7 · Trust (Figma copy) */}
      <Section surface="lake" id="trust" className="scroll-mt-[var(--header-h)]">
        <div className="container-x">
          <SectionHeader
            title="Built so you don’t have to second-guess."
            align="split"
            lead="Analysis you can defend in a meeting. A figure without a source does not go in the answer."
          />
          <div className="mt-12 md:mt-16">
            <TrustTabs />
          </div>
          <Illustrative onDark className="mt-4 lg:text-right">Illustrative example. Figures from Amazon.com’s Q4 2023 and Q4 2024 earnings releases.</Illustrative>
          <div className="mt-16 border-t border-white/12 pt-8 md:mt-24">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <p className="t-ui shrink-0 text-paper/55">Data and content sources</p>
              <DataSourceLogos onDark className="w-full min-w-0" />
            </div>
          </div>
        </div>
      </Section>

      {/* 8 · Analysis that stays alive (Figma copy) */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader title="Analysis that stays alive." />
          <div className="mt-12 md:mt-16">
            <LivingAnalysis />
          </div>
        </div>
      </Section>

      {/* 9 · Works where you do (Figma copy) */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader
            title="Works where you do."
            align="split"
            lead="Bring Alfred’s investment intelligence into the tools, data, and environments your team already uses."
          />
          <div className="mt-12 md:mt-16">
            <WorksWhere />
          </div>
          <div className="mt-24 md:mt-32">
            <Testimonials items={[TESTIMONIALS[0]]} />
          </div>
        </div>
      </Section>

      {/* 10 · Closing CTA (Figma title) */}
      <CTABand
        title="See what Alfred can do."
        lead="Bring a real investment question, portfolio, or workflow. We’ll run it with you, live."
        cta="alfred-final"
      />
    </>
  );
}
