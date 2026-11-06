import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import type { IconName } from "@/components/ui/PrecisionIcon";
import { DataSourceLogos } from "@/components/ui/LogoStrip";
import { SplitFeature, TextLink } from "@/components/ui/Layouts";
import { SplitText } from "@/components/ui/SplitText";
import { BranchLines } from "@/components/graphics/Cartography";
import { Audiences, IllustrativeNote } from "../_components/Shared";
import { PromptToMemo } from "./_components/PromptToMemo";
import { ResearchMemo } from "./_components/ResearchMemo";

export const metadata: Metadata = {
  title: "Deep Research",
  description:
    "Turn one prompt into a cited research memo: thesis, valuation, catalysts, risks and related names, with sources linked, calculations shown and missing data flagged.",
};

const DIFFS: { icon: IconName; title: string; body: React.ReactNode }[] = [
  {
    icon: "triad",
    title: "Built-in relationship intelligence",
    body: (
      <>
        Deep Research reasons on top of a Knowledge Graph that maps how companies and themes connect across products, customers, competitors and geographies, surfacing hidden exposures and ripple effects that general-purpose LLMs or MCP connectors cannot capture.{" "}
        <Link href="/knowledge-graph" className="link-underline text-paper">Explore the Graph</Link>
      </>
    ),
  },
  {
    icon: "eye",
    title: "Transparent, auditable analysis",
    body: (
      <>
        Answers show their reasoning and link claims to their sources. Deep Research is built to avoid guesswork and flags proactively when data is unavailable.{" "}
        <Link href="/alfred#trust" className="link-underline text-paper">How auditability works</Link>
      </>
    ),
  },
  {
    icon: "stack",
    title: "Natively integrated institutional data",
    body: (
      <>
        Filings, transcripts, estimates and market data are built in, with no separate data contracts required for core coverage.{" "}
        <Link href="/alfred#trust" className="link-underline text-paper">See data sources</Link>
      </>
    ),
  },
];

const TYPES: { title: string; body: string; href?: string; linkLabel?: string }[] = [
  { title: "Investment research", body: "Build a cited view of a company, sector or theme from one question." },
  { title: "Portfolio analysis", body: "Check holdings and exposures, with sources attached." },
  { title: "Deep fundamental research", body: "Work through one name’s filings, transcripts and data." },
  { title: "Thesis pressure-testing", body: "Test a thesis against the latest evidence before acting." },
  { title: "Scenario analysis and backtesting", body: "Run a scenario or backtest, with calculations kept for review.", href: "/use-cases/scenario-stress-testing", linkLabel: "More on scenario testing" },
];

export default function DeepResearchPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Use Cases", href: "/use-cases" }, { label: "Deep Research" }]}
        title="Turn one prompt into a cited research memo."
        lead="Ask about a company or a thesis, and Alfred returns the thesis, valuation, catalysts, risks and related names, with claims linked to their sources and calculations you can inspect."
        cta="dr-hero"
        visual={<PromptToMemo />}
      />

      {/* How Reflexivity does it */}
      <Section surface="lake" className="overflow-hidden">
        <div className="container-x">
          <SectionHeader
            align="split"
            title="Fast research, with the evidence attached."
            lead="Graph context, institutional data and code-backed calculations run underneath every answer. Filings and transcripts are inputs to the job, not a separate tool to learn."
          />
          <FeatureGrid onDark className="mt-14 md:mt-16" items={DIFFS} />
        </div>
      </Section>

      {/* Worked example: one prompt (left), the memo it returns (right) */}
      <Section surface="paper">
        <div className="container-x grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <SplitText text="Can the Amazon thesis hold up?" className="t-h2" />
            <Reveal delay={0.15}>
              <p className="t-lead mt-6 max-w-[528px] text-ink/72">
                An investor holds Amazon after a selloff, expecting AI demand to lift AWS and retail margins to expand. One prompt returns a memo that tests both.
              </p>
              <blockquote className="t-body mt-8 max-w-[528px] border-l border-ink/20 pl-6 text-ink/85">
                “I’m long Amazon after the late-September selloff. Pressure-test my thesis, cite a source for every number, and flag where data is unavailable.”
              </blockquote>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-6">
            <ResearchMemo />
            <IllustrativeNote className="mt-4">Illustrative example. Analysis to inspect and challenge, not a recommendation.</IllustrativeNote>
          </Reveal>
        </div>
      </Section>

      {/* Concept: a question branching to evidence */}
      <SplitFeature
        surface="pine"
        title="One question, followed to the evidence."
        lead="Alfred breaks a prompt into the parts a memo needs, works each one against filings, transcripts and data, and brings them back with their sources."
        link={{ label: "Meet Alfred", href: "/alfred" }}
        visual={<BranchLines accent="#f4f3f1" origin="Prompt" branches={["Thesis", "Valuation", "Catalysts", "Risks", "Related names"]} />}
      />

      {/* How teams use it + the sources behind it */}
      <Section surface="mist">
        <div className="container-x">
          <div className="grid-12 gap-y-12">
            <div className="col-span-12 lg:col-span-5">
              <SplitText text="Five kinds of research, one way of working." className="t-h2" />
              <Reveal delay={0.15}>
                <p className="t-lead mt-6 max-w-[480px] text-ink/72">The same cited, inspectable workflow, whether the question is about one name or a whole book.</p>
              </Reveal>
            </div>
            <Stagger as="ol" className="col-span-12 border-b border-ink/12 lg:col-span-6 lg:col-start-7">
              {TYPES.map((t) => (
                <StaggerItem as="li" key={t.title} className="grid gap-2 border-t border-ink/12 py-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:gap-8">
                  <h3 className="t-h3">{t.title}</h3>
                  <div>
                    <p className="t-body text-ink/72">{t.body}</p>
                    {t.href && <TextLink href={t.href} className="mt-4">{t.linkLabel}</TextLink>}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="mt-16 flex flex-col gap-6 md:mt-20 md:flex-row md:items-center md:gap-10">
            <p className="t-ui shrink-0 text-ink/50">Sources behind the research</p>
            <DataSourceLogos className="w-full min-w-0" />
          </div>
          <p className="t-small mt-6 max-w-[620px] text-ink/55">
            Coverage depends on your entitlements.{" "}
            <Link href="/alfred#trust" className="link-underline text-ink">How sourcing and entitlements work</Link>
          </p>
        </div>
      </Section>

      {/* Who it is for */}
      <Section surface="paper">
        <div className="container-x">
          <Audiences
            title="Built for serious institutional research."
            lead="For teams who need speed, and need to show their work."
            items={[
              { name: "Hedge Funds", body: "Pressure-test a thesis before sizing a position, with the counter-case laid out and cited.", href: "/customers#hedge-funds" },
              { name: "Asset Managers", body: "Initiation-quality work on more names, with sources an investment committee can check.", href: "/customers#asset-managers" },
              { name: "Financial Institutions", body: "Embed cited research in the tools your analysts and clients already use.", href: "/customers#financial-institutions" },
              { name: "Wealth Managers", body: "Answer client questions on a name with research you can stand behind.", href: "/customers#wealth-managers" },
            ]}
          />
        </div>
      </Section>

      <CTABand
        title="Bring a name or hypothesis you already care about."
        lead="We’ll run the pressure-test live, and you can challenge every step of it."
        secondary={{ label: "Meet Alfred", href: "/alfred" }}
        cta="dr-final"
      />
    </>
  );
}
