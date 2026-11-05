import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/Blocks";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { DataSourceLogos } from "@/components/ui/LogoStrip";
import { Arrow } from "@/components/ui/Button";
import { AlfredGlyph } from "@/components/product/ui";
import { Audiences, Contrast, IllustrativeNote, RelatedUseCases } from "../_components/Shared";
import { LensLines } from "../_components/LineArt";
import { PromptToMemo } from "./_components/PromptToMemo";
import { ResearchMemo } from "./_components/ResearchMemo";
import { AMZN_ASKS, AMZN_PROMPT } from "./_components/amzn";

export const metadata: Metadata = {
  title: "Deep Research | Reflexivity",
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
        <Link href="/auditability-data" className="link-underline text-paper">How auditability works</Link>
      </>
    ),
  },
  {
    icon: "stack",
    title: "Natively integrated institutional data",
    body: (
      <>
        Filings, transcripts, estimates and market data are built in, with no separate data contracts required for core coverage.{" "}
        <Link href="/auditability-data" className="link-underline text-paper">See data sources</Link>
      </>
    ),
  },
];

const PIPELINE = ["Entity resolution", "Graph context", "Institutional data", "Code-backed calculations"];

const TYPES: { icon: IconName; title: string; body: string }[] = [
  { icon: "crosshair", title: "Investment research", body: "Build a cited view of a company, sector or theme from one question." },
  { icon: "pentagon", title: "Portfolio analysis", body: "Check holdings and exposures, with sources attached." },
  { icon: "cube", title: "Deep fundamental research", body: "Work through one name’s filings, transcripts and data." },
  { icon: "knot", title: "Thesis pressure-testing", body: "Test a thesis against the latest evidence before acting." },
  { icon: "rings", title: "Scenario analysis and backtesting", body: "Run a scenario or backtest, with calculations kept for review." },
];

export default function DeepResearchPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Use Cases", href: "/use-cases" }, { label: "Deep Research" }]}
        title="Turn one prompt into a cited research memo."
        lead="Ask about a company or a thesis, and Alfred returns the thesis, valuation, catalysts, risks and related names, with claims linked to their sources and calculations you can inspect."
        secondary={{ label: "See the worked example", href: "#worked-example" }}
        cta="dr-hero"
        visual={<PromptToMemo />}
      />

      {/* The old workflow */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader
            eyebrow="The old workflow"
            title="Retrieval returns fragments. Research needs reasoning."
            maxW="max-w-[860px]"
            lead="Document search and general chat return fragments. Someone still verifies the numbers and assembles the memo."
          />
          <Contrast
            className="mt-14 md:mt-16"
            before={{
              label: "Search and general chat",
              items: [
                "Passages from filings, without the numbers reconciled.",
                "Figures you can’t trace back to a page or a dataset.",
                "Related companies named from memory, not from mapped relationships.",
                "Gaps filled with plausible estimates, unannounced.",
              ],
            }}
            after={{
              label: "Deep Research",
              items: [
                "One prompt becomes a complete workflow: thesis, valuation, catalysts, risks and related names.",
                "Claims cited to filings, transcripts and institutional data.",
                "Calculations run in code, with the code shown.",
                "Missing data flagged, not estimated.",
              ],
            }}
          />
        </div>
      </Section>

      {/* How Reflexivity does it */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow="How Reflexivity does it"
                title="Fast research, with the evidence attached."
                lead="Entity resolution, Graph context, institutional data and code-backed calculations run underneath every answer. Filings and transcripts are inputs to the job, not a separate tool to learn."
              />
              <Stagger as="ol" className="mt-10 flex flex-wrap items-center gap-2">
                {PIPELINE.map((p, i) => (
                  <StaggerItem as="li" key={p} className="flex items-center gap-2">
                    <span className="rounded-full border border-white/20 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.04em] text-paper/85">{p}</span>
                    {i < PIPELINE.length - 1 && <span aria-hidden="true" className="text-paper/35">→</span>}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <Reveal delay={0.15} className="relative hidden lg:col-span-5 lg:block">
              <div className="relative mx-auto aspect-[520/560] max-w-[420px] text-paper/70">
                <LensLines />
              </div>
              <p className="t-ui mx-auto mt-4 flex max-w-[420px] justify-between text-[10px] text-paper/55"><span>Prompt</span><span>Many sources, one path</span><span>Cited memo</span></p>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[16px] bg-white/10 md:mt-16 lg:grid-cols-3">
            {DIFFS.map((d) => (
              <StaggerItem key={d.title} className="group bg-lake-900 p-7 md:p-9">
                <PrecisionIcon name={d.icon} className="h-11 w-11 text-paper transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[20deg]" />
                <h3 className="t-h3 mt-10">{d.title}</h3>
                <p className="t-body mt-3 text-paper/70">{d.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Worked example */}
      <Section surface="paper" id="worked-example" className="scroll-mt-[var(--header-h)]">
        <div className="container-x">
          <SectionHeader
            eyebrow="Worked example"
            title="Can the Amazon thesis hold up?"
            align="split"
            lead="An investor holds Amazon after a selloff, expecting AI demand to lift AWS growth and retail margins to expand. Here is the prompt, and the memo it returns."
          />

          <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <div className="rounded-[18px] bg-lake-900 p-6 text-paper md:p-7 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
                <div className="flex items-center gap-2.5">
                  <AlfredGlyph className="h-4 w-4 text-lake-300" />
                  <span className="t-ui text-[10.5px] text-paper/60">The prompt</span>
                </div>
                <div className="mt-5 space-y-3 text-[14.5px] leading-relaxed text-paper/85">
                  {AMZN_PROMPT.map((p) => <p key={p}>{p}</p>)}
                  <ul className="space-y-2 pl-1">
                    {AMZN_ASKS.map((a) => (
                      <li key={a} className="flex gap-2.5 text-[13.5px] text-paper/75">
                        <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-paper/50" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <p>Cite a source for every number and flag where data is unavailable.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <ResearchMemo />
            </Reveal>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <IllustrativeNote>
              Condensed from a Reflexivity Deep Research output. Figures are shown for illustration and are not current market data. Section structure follows the prompt; other questions return different sections.
            </IllustrativeNote>
            <IllustrativeNote>
              A cited research memo is analysis to inspect and challenge, not an investment recommendation.
            </IllustrativeNote>
          </div>
        </div>
      </Section>

      {/* How teams use it */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader eyebrow="How teams are using Reflexivity" title="Five kinds of research, one way of working." align="split" lead="The same cited, inspectable workflow, whether the question is about one name or a whole book." />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[16px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-5 md:mt-16">
            {TYPES.map((t) => (
              <StaggerItem key={t.title} className="group flex flex-col bg-paper p-6 md:p-7">
                <PrecisionIcon name={t.icon} className="h-10 w-10 text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[20deg]" />
                <h3 className="mt-10 font-display text-[18px] font-semibold leading-snug">{t.title}</h3>
                <p className="t-small mt-2 text-ink/65">{t.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8">
            <Link href="/use-cases/scenario-stress-testing" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
              <span className="link-underline">More on scenario analysis and backtesting</span> <Arrow />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Data + who it is for */}
      <Section surface="paper">
        <div className="container-x">
          <div className="flex flex-col gap-6 border-b border-ink/10 pb-12 md:flex-row md:items-center md:gap-10">
            <p className="t-ui shrink-0 text-ink/50">Sources behind the research</p>
            <DataSourceLogos className="w-full min-w-0" />
          </div>
          <p className="t-small mt-6 max-w-[620px] text-ink/55">
            Coverage depends on your entitlements.{" "}
            <Link href="/auditability-data" className="link-underline text-ink">How sourcing and entitlements work</Link>
          </p>

          <div className="mt-20 md:mt-28">
            <SectionHeader eyebrow="Who it’s for" title="Built for serious institutional research." align="split" lead="For teams who need speed, and need to show their work." />
            <div className="mt-14 md:mt-16">
              <Audiences
                items={[
                  { name: "Hedge Funds", body: "Pressure-test a thesis before sizing a position, with the counter-case laid out and cited.", href: "/customers#hedge-funds" },
                  { name: "Asset Managers", body: "Initiation-quality work on more names, with sources an investment committee can check.", href: "/customers#asset-managers" },
                  { name: "Financial Institutions", body: "Embed cited research in the tools your analysts and clients already use.", href: "/customers#financial-institutions" },
                  { name: "Wealth Managers", body: "Answer client questions on a name with research you can stand behind.", href: "/customers#wealth-managers" },
                ]}
              />
            </div>
          </div>
          <div className="mt-20 md:mt-28">
            <RelatedUseCases current="deep-research" />
          </div>
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
