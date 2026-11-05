import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABand, Testimonials } from "@/components/ui/Blocks";
import { DataSourceLogos } from "@/components/ui/LogoStrip";
import { LinkRowsBlock, SplitFeature } from "@/components/ui/Layouts";
import { FlowLines } from "@/components/graphics/Cartography";
import { TwoModes } from "./_components/TwoModes";
import { LayerStack } from "./_components/LayerStack";
import { Capabilities } from "./_components/Capabilities";

export const metadata: Metadata = {
  title: "Platform overview | Reflexivity",
  description:
    "Reflexivity is the investment intelligence layer for your research workflow: Alfred, the Knowledge Graph, Insights, auditable institutional data and enterprise security, in one maintained platform or inside your own stack.",
};

const MODES: { title: string; body: string; href: string; link: string }[] = [
  {
    title: "On-demand research",
    body: "Alfred turns a question into a cited workflow with analysis, charts and executable outputs, for the questions you already know to ask.",
    href: "/alfred#on-demand",
    link: "See sample questions",
  },
  {
    title: "Always-on monitoring",
    body: "The platform watches your coverage universe and surfaces portfolio-relevant developments and their second-order implications, without a prompt.",
    href: "/insights",
    link: "See Insights",
  },
];

const WORKFLOWS = [
  { label: "Deep Research", href: "/use-cases/deep-research", note: "Company and sector work, cited from question to output." },
  { label: "Portfolio Monitoring", href: "/use-cases/portfolio-monitoring", note: "Developments that touch your holdings, with the reason they reached you." },
  { label: "Thematic Exposure", href: "/use-cases/thematic-exposure", note: "Who is exposed to a theme, and how strongly." },
  { label: "Scenario & Stress Testing", href: "/use-cases/scenario-stress-testing", note: "Model a shock and trace it through a portfolio." },
];

const COMPARE: [string, string, string][] = [
  ["Entity resolution", "Build and maintain mappings from tickers, names and segments to entities", "Built in, across 40,000 mapped securities"],
  ["Relationship intelligence", "Not available off the shelf", "Knowledge Graph with 600K+ evidence-backed relationships"],
  ["Institutional data", "License, ingest and normalise each source yourself", "LSEG, S&P Global, Cboe, Dow Jones, Quartr and more, integrated"],
  ["Validation", "Write and maintain your own output checks", "Cited by default; missing data flagged, not estimated"],
  ["Monitoring", "Build schedulers, alerting and relevance logic", "Insights across your watchlists and themes"],
  ["Audit and controls", "Own logging, permissions and security reviews", "Inspectable calculations; SOC 2 Type II audited controls"],
];

export default function PlatformPage() {
  return (
    <>
      {/* 1 · Hero */}
      <PageHero
        trail={[{ label: "Product" }, { label: "Platform" }]}
        title="The investment intelligence layer for your research workflow."
        lead="Reflexivity brings an AI analyst, a market-wide Knowledge Graph, always-on Insights and institutional data together in one maintained platform, or into the tools your team already runs."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/book-a-demo" arrow cta="platform-hero">Request a Demo</Button>
            <Button href="/contact?topic=partnerships" variant="secondary">Explore partnerships</Button>
          </div>
        }
        visual={
          <>
            <LayerStack />
            <p className="t-small mt-4 text-ink/50">How Reflexivity sits between institutional data and your workflow.</p>
          </>
        }
      />

      {/* 2 · Platform overview: 50/50 live panel | capability rows */}
      <Section surface="lake" className="overflow-hidden" id="capabilities">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-40" />
        <div className="container-x">
          <SectionHeader
            title="Everything in the platform, and where to go next."
            align="split"
            lead="Five capabilities that work as one environment. The Knowledge Graph maps the market, Insights watches it, Alfred investigates it, and every output stays sourced and secure."
          />
          <div className="mt-14 md:mt-20">
            <Capabilities />
          </div>
        </div>
      </Section>

      {/* 3–5 · Two modes + workflows */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader title="Answer the question in front of you. Catch the one you didn’t ask." align="split" lead="On-demand research and always-on monitoring share the same Knowledge Graph, data and context." />
          <TwoModes items={MODES} />
          <LinkRowsBlock className="mt-20 border-t border-ink/12 pt-14 md:mt-28 md:pt-20" title="Start from an investment workflow." rows={WORKFLOWS} />
        </div>
      </Section>

      {/* 6 · Why a maintained platform (concept block) */}
      <SplitFeature
        surface="pine"
        title="More than a model with a few tools attached."
        lead="A general model connected through MCP can answer questions. Institutional research also needs the engineering, data controls, entity resolution, validation and audit infrastructure around it. With Reflexivity, you don’t have to own that."
        link={{ label: "Explore deployment options", href: "/deployment" }}
        visual={
          <div className="flex h-full items-center justify-center">
            {/* rendered at native viewBox width: the shared viz draws dashed strokes in screen units */}
            <div className="aspect-[44/30] w-full max-w-[440px]"><FlowLines accent="#f4f3f1" count={7} /></div>
          </div>
        }
      />

      {/* 7–8 · What it takes */}
      <Section surface="mist">
        <div className="container-x">
          <SectionHeader title="What you would otherwise build and maintain." />
          <Reveal className="mt-12 overflow-hidden rounded-[16px] border border-ink/10 bg-white md:mt-16">
            <div className="hidden grid-cols-12 border-b border-ink/10 bg-mist-100 px-7 py-4 md:grid">
              <span className="t-ui col-span-3 text-ink/50">What it takes</span>
              <span className="t-ui col-span-4 text-ink/50">Assembling it yourself</span>
              <span className="t-ui col-span-5 text-ink">With Reflexivity</span>
            </div>
            <ul>
              {COMPARE.map(([k, diy, rfx]) => (
                <li key={k} className="grid gap-2 border-b border-ink/8 px-6 py-5 last:border-b-0 md:grid-cols-12 md:gap-0 md:px-7">
                  <span className="font-display text-[16px] font-semibold md:col-span-3">{k}</span>
                  <span className="t-small flex gap-2.5 text-ink/55 md:col-span-4 md:pr-8">
                    <span className="mt-[4px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] font-display text-[9px] text-ink/50" aria-hidden="true">—</span>
                    <span><span className="sr-only">Assembling it yourself: </span>{diy}</span>
                  </span>
                  <span className="t-small flex gap-2.5 text-ink md:col-span-5">
                    <span className="mt-[4px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-pine-100 font-display text-[10px] text-pine-700" aria-hidden="true">✓</span>
                    <span><span className="sr-only">With Reflexivity: </span>{rfx}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-8 grid gap-4 md:grid-cols-2 md:gap-16">
            <p className="t-small text-ink/60">
              <span className="font-display font-semibold text-ink">Works with existing tools.</span> Microsoft 365, documents, Excel and exports, plus API and MCP access for your own systems.{" "}
              <Link href="/deployment#microsoft-365" className="link-underline text-ink">Microsoft 365 on Deployment</Link>
            </p>
            <p className="t-small text-ink/60">
              <span className="font-display font-semibold text-ink">Decision-grade by design.</span> Cited outputs, explicit missing-data behaviour and code-backed calculations are built in, not added later.{" "}
              <Link href="/auditability-data" className="link-underline text-ink">Auditability &amp; Data</Link>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 9 · Proof */}
      <Section surface="lake">
        <div className="container-x">
          <Testimonials onDark title="Used by investors who rely on it every day." />
          <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 md:mt-20 md:flex-row md:items-center md:gap-10">
            <p className="t-ui shrink-0 text-paper/50">Data and content sources</p>
            <DataSourceLogos onDark className="w-full min-w-0" />
          </div>
        </div>
      </Section>

      <CTABand
        title="Test the Platform against your own portfolio or watchlist."
        lead="See what Reflexivity surfaces on the names you already follow, in a working session with our team."
        secondary={{ label: "Explore partnerships", href: "/contact?topic=partnerships" }}
        cta="platform-final"
      />
    </>
  );
}
