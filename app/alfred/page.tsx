import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Arrow } from "@/components/ui/Button";
import { CTABand, FeatureGrid, Testimonials, TESTIMONIALS } from "@/components/ui/Blocks";
import { DATA_SOURCES } from "@/lib/logos";
import { AlfredHero } from "./_components/AlfredHero";
import { TwoModes } from "./_components/TwoModes";
import { PromptWorkbench } from "./_components/PromptWorkbench";
import { AlwaysOnVisual } from "./_components/AlwaysOn";
import { ImpactCard, ReasoningPipeline } from "./_components/Reasoning";
import { TrustTabs } from "./_components/TrustTabs";
import { LivingAnalysis, WorksWhere } from "./_components/Workspace";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";

export const metadata: Metadata = {
  title: "Alfred, the AI analyst | Reflexivity",
  description:
    "Alfred is Reflexivity’s AI analyst: on-demand research and always-on monitoring, reasoning over the Knowledge Graph and institutional data, with cited sources, flagged gaps and inspectable calculations.",
};

const BUILT_IN = ["LSEG", "S&P Global", "Dow Jones Newswires", "Quartr", "Cboe", "MT Newswires", "Benzinga"];

const JOBS: { icon: IconName; title: string; body: string; href?: string; linkLabel?: string }[] = [
  { icon: "lattice", title: "Investment research", body: "Build a company note with valuation, catalysts, risks, and related names.", href: "/use-cases/deep-research", linkLabel: "Deep Research" },
  { icon: "rings", title: "Portfolio analysis", body: "See what your holdings are exposed to, including hidden dependencies.", href: "/use-cases/thematic-exposure", linkLabel: "Thematic Exposure" },
  { icon: "signal", title: "Watchlist monitoring", body: "Get an alert when market developments affect companies or themes you follow.", href: "/use-cases/portfolio-monitoring", linkLabel: "Portfolio Monitoring" },
  { icon: "stack", title: "Deep fundamental research", body: "Analyze filings, transcripts, financials, and market data in one sourced analysis." },
  { icon: "crosshair", title: "Thesis pressure testing", body: "Check a view you already hold against the data and the Knowledge Graph." },
  { icon: "path", title: "Scenario analysis and backtesting", body: "Model market shocks, test scenarios, and evaluate historical performance.", href: "/use-cases/scenario-stress-testing", linkLabel: "Scenario & Stress Testing" },
];

const ALIVE: { icon: IconName; title: string; body: string }[] = [
  { icon: "loop", title: "Rerun a question on a schedule.", body: "Set a question to run daily or weekly. Alfred sends the latest, so your research stays current." },
  { icon: "orbit", title: "A morning summary of what changed.", body: "Start your day with a personalized brief from Alfred recapping key developments across your watchlist." },
  { icon: "chain", title: "Save a workflow, then reuse it.", body: "Keep a finished analysis as a template, then point it at a new ticker, watchlist or date range without rebuilding the prompt." },
];

export default function AlfredPage() {
  return (
    <>
      {/* 1 · Hero */}
      <PageHero
        trail={[{ label: "Product", href: "/platform" }, { label: "Alfred" }]}
        title="Run the research. Stay ahead of the market. Meet Alfred."
        lead="Alfred is Reflexivity’s AI analyst. Ask it to build a company note, map a portfolio’s exposures or pressure-test a thesis, and get a cited workup in minutes. Step away, and Alfred keeps watching the companies and themes you follow."
        secondary={{ label: "See sample questions", href: "#on-demand" }}
        cta="alfred-hero"
        visual={
          <>
            <AlfredHero />
            <p className="t-ui mt-4 text-ink/45">Illustrative example of Alfred’s two modes.</p>
          </>
        }
      />

      {/* 2 · One analyst, two modes */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x">
          <SectionHeader eyebrow="How Alfred works" title="One analyst, two modes." align="split" lead="On-demand and always-on share the same context, Knowledge Graph and data. Ask when you have a question; let Alfred watch when you don’t." />
          <div className="mt-14 md:mt-20">
            <TwoModes />
          </div>
        </div>
      </Section>

      {/* 3 · On-demand */}
      <Section surface="paper" id="on-demand">
        <div className="container-x">
          <SectionHeader
            eyebrow="On-demand research"
            title="Start with a question your desk is already asking."
            lead="A prompt becomes a cited workflow: Alfred resolves the entities, gathers the evidence, runs the analysis and hands you a result to review."
            maxW="max-w-[820px]"
          />
          <div className="mt-14 md:mt-16">
            <PromptWorkbench />
          </div>
        </div>
      </Section>

      {/* 4 · Always-on */}
      <Section surface="mist" id="always-on" className="border-t border-ink/8">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Always-on intelligence"
              title="Alfred keeps watching when you step away."
              lead="Alfred queries itself. It monitors the companies and themes you follow, then surfaces the events, ripple effects and implications that touch them, without waiting for a prompt."
            />
            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3 border-t border-ink/12 pt-6">
                {[
                  ["Alert", "A catalyst touches a name or theme you follow, with the reason it reached you."],
                  ["Insight", "Five takeaways, tagged to the themes they affect."],
                  ["Ripple", "Connected companies ranked through the Knowledge Graph."],
                  ["Follow-up", "Open it in Alfred and keep going."],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-4 text-[15px]">
                    <span className="t-ui w-[88px] shrink-0 pt-0.5 text-ink/45">{k}</span>
                    <span className="text-ink/75">{v}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/insights" variant="secondary" arrow>See how Insights work</Button>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <AlwaysOnVisual />
            <p className="t-ui mt-3 text-ink/45">Illustrative example based on a Reflexivity market catalyst Insight.</p>
          </Reveal>
        </div>
      </Section>

      {/* 5 · How Alfred reasons */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-40" />
        <div className="container-x">
          <SectionHeader
            eyebrow="How Alfred reasons"
            title="Trace impact from one company to the next."
            align="split"
            lead="More than a chat window. Entity resolution and context flow through the Knowledge Graph and institutional data into executable analysis and a tailored output."
          />
          <div className="mt-14 md:mt-20">
            <ReasoningPipeline />
          </div>

          <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <ImpactCard />
              <p className="t-ui mt-3 text-paper/45">Illustrative relationship view.</p>
            </Reveal>
            <div className="flex flex-col gap-12 lg:col-span-5">
              <Reveal>
                <PrecisionIcon name="triad" className="h-10 w-10 text-paper" />
                <h3 className="t-h3 mt-6">Built-in relationship intelligence</h3>
                <p className="t-body mt-3 text-paper/70">
                  Alfred reasons on top of a Knowledge Graph that maps how companies and themes connect across products, customers, competitors and geographies, surfacing hidden exposures and ripple effects.
                </p>
                <p className="t-small mt-3 text-paper/55">
                  The Graph is one input, not the only one. Alfred also works from filings, transcripts, financials, market data and news.
                </p>
                <Link href="/knowledge-graph" className="group mt-5 inline-flex items-center gap-2 font-display text-[15px] font-medium text-paper">
                  <span className="link-underline">Explore the Knowledge Graph</span> <Arrow />
                </Link>
              </Reveal>
              <Reveal delay={0.1}>
                <PrecisionIcon name="stack" className="h-10 w-10 text-paper" />
                <h3 className="t-h3 mt-6">Built-in data sources</h3>
                <p className="t-body mt-3 text-paper/70">Institutional data and content, natively integrated.</p>
                <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[12px] bg-white/10 sm:grid-cols-3 lg:grid-cols-2">
                  {DATA_SOURCES.filter((d) => BUILT_IN.includes(d.name)).map((d) => (
                    <li key={d.name} className="flex h-[68px] items-center justify-center bg-lake-900 px-4">
                      <Image src={d.src} alt={d.name} width={d.w} height={d.h} className="h-auto max-h-[22px] w-auto object-contain opacity-75 brightness-0 invert" style={{ width: d.w * 0.85 }} />
                    </li>
                  ))}
                  <li className="flex h-[68px] items-center justify-center bg-lake-900 px-4 font-mono text-[11px] uppercase tracking-[0.05em] text-paper/50">+ more sources</li>
                </ul>
                <Link href="/auditability-data" className="group mt-5 inline-flex items-center gap-2 font-display text-[15px] font-medium text-paper">
                  <span className="link-underline">How sourcing works</span> <Arrow />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* 6 · Jobs to be done */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            eyebrow="Jobs to be done"
            title="From deep research to portfolio stress tests, in minutes."
            align="split"
            lead="Alfred is built to run your research and test your ideas at scale, across the jobs an investment team does every week."
            actions={<Button href="/use-cases/deep-research" variant="secondary" arrow>Explore use cases</Button>}
          />
          <FeatureGrid className="mt-14 md:mt-20" items={JOBS} />
        </div>
      </Section>

      {/* 7 · Trust every output */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader
            eyebrow="Trust every output"
            title="Built so you don’t have to second-guess."
            lead="Research should make its evidence visible. Here is one answer, inspected three ways: its source, where the evidence ends, and the calculation behind it."
            maxW="max-w-[780px]"
          />
          <div className="mt-14 md:mt-16">
            <TrustTabs />
          </div>
          <p className="t-ui mt-6 text-ink/45">Illustrative example. Figures from Amazon.com’s Q4 2023 and Q4 2024 earnings releases.</p>
        </div>
      </Section>

      {/* 8 · Analysis that stays alive */}
      <Section surface="lake">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Beyond the conversation" title="Analysis that stays alive." lead="The work survives the chat. Keep questions running, start each day with what changed, and reuse what worked." />
            <ul className="mt-10 space-y-7">
              {ALIVE.map((a, i) => (
                <Reveal as="li" key={a.title} delay={0.1 + i * 0.08} className="flex gap-5 border-t border-white/12 pt-6">
                  <PrecisionIcon name={a.icon} className="h-8 w-8 shrink-0 text-paper" />
                  <div>
                    <h3 className="font-display text-[18px] font-semibold">{a.title}</h3>
                    <p className="t-body mt-1.5 text-paper/70">{a.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <LivingAnalysis field="mist" />
            <p className="t-ui mt-3 text-paper/45">Illustrative example.</p>
          </Reveal>
        </div>
      </Section>

      {/* 9 · Works where you do */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            eyebrow="Works where you do"
            title="Bring Alfred into the tools your team already uses."
            align="split"
            lead="Use Alfred inside the Reflexivity platform, or bring its investment intelligence into the tools, data and environments your team already runs."
            actions={<Button href="/deployment" variant="secondary" arrow>Explore deployment options</Button>}
          />
          <div className="mt-14 md:mt-16">
            <WorksWhere />
          </div>

          <div className="mt-20 md:mt-28">
            <Testimonials items={[TESTIMONIALS[0]]} />
          </div>
        </div>
      </Section>

      {/* 10 · Proof + CTA */}
      <CTABand
        title="See what Alfred can do."
        lead="Bring a real investment question, portfolio, or workflow. We’ll run it with you, live."
        secondary={{ label: "Explore deployment options", href: "/deployment" }}
        cta="alfred-final"
      />
    </>
  );
}
