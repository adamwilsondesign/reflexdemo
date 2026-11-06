import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { IconName } from "@/components/ui/PrecisionIcon";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import { LinkRowsBlock } from "@/components/ui/Layouts";
import { JobsHero } from "./_components/JobsHero";
import { ConnectedLoop } from "./_components/ConnectedLoop";
import { Audiences } from "./_components/Shared";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Portfolio monitoring, deep research, thematic exposure, scenario and stress testing, and idea generation: see how one engine supports the jobs institutional investors need to finish.",
};

const CARDS: { name: string; job: string; output: string; href: string; link: string; icon: IconName; big?: boolean }[] = [
  {
    name: "Portfolio Monitoring",
    job: "Watch the book without living in alert noise. Catalysts, earnings and second-order read-throughs across the names you follow, each with the reason it reached you.",
    output: "Daily brief · Insights · ripple effects",
    href: "/use-cases/portfolio-monitoring",
    link: "See portfolio monitoring",
    icon: "signal",
    big: true,
  },
  {
    name: "Deep Research",
    job: "Turn one prompt into a cited research memo: thesis, valuation, catalysts, risks and related names, with the evidence attached.",
    output: "Cited memo · code-backed figures",
    href: "/use-cases/deep-research",
    link: "See deep research",
    icon: "lattice",
    big: true,
  },
  {
    name: "Thematic Exposure",
    job: "Find every company a theme moves, including the ones no headline will name.",
    output: "Constituents · exposure evidence",
    href: "/use-cases/thematic-exposure",
    link: "See thematic exposure",
    icon: "venn",
  },
  {
    name: "Scenario & Stress Testing",
    job: "Pressure-test a hypothesis against history and shocks before capital is committed.",
    output: "Backtests · scenarios · stress tests",
    href: "/use-cases/scenario-stress-testing",
    link: "See scenario testing",
    icon: "rings",
  },
  {
    name: "Idea Generation",
    job: "Ask Alfred where a catalyst travels next, and surface second-order names you don’t yet follow.",
    output: "Ranked ideas · related names",
    href: "/alfred",
    link: "Explore Alfred",
    icon: "star",
  },
];

const ENGINE = [
  { name: "Knowledge Graph", body: "The relationship layer: how companies, products, themes and markets connect, weighted by evidence.", href: "/knowledge-graph", icon: "triad" as IconName },
  { name: "Alfred", body: "The AI analyst that researches, calculates and answers follow-ups, on demand.", href: "/alfred", icon: "star" as IconName },
  { name: "Insights", body: "Always-on monitoring that surfaces relevant developments without waiting for a prompt.", href: "/insights", icon: "signal" as IconName },
  { name: "Auditable analysis", body: "Cited sources, visible code-backed calculations, and missing data flagged rather than estimated.", href: "/alfred#trust", icon: "eye" as IconName },
];

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        layout="stacked"
        trail={[{ label: "Use Cases" }]}
        title="Explore how the same engine supports research, monitoring, testing, and idea generation."
        lead="Reflexivity is organised around the jobs investors need to finish, not a feature catalogue. Pick the workflow closest to yours."
        cta="use-cases-hero"
        visual={
          <div className="mx-auto max-w-[1040px]">
            <JobsHero />
          </div>
        }
      />

      {/* Explore use cases */}
      <Section surface="mist">
        <div className="container-x">
          <LinkRowsBlock
            title="Start with the job in front of you."
            lead="Five workflows, one platform. Each page shows a worked example you can inspect."
            rows={CARDS.map((c) => ({ label: c.name, href: c.href, note: c.job }))}
          />
        </div>
      </Section>

      {/* Same engine */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            title="One foundation under every use case."
            align="split"
            lead="Knowledge Graph, Alfred, Insights and auditable analysis sit under every workflow, so an answer in one job means the same thing in the next."
          />
          <FeatureGrid
            cols={4}
            className="mt-14 md:mt-16"
            items={ENGINE.map((e) => ({ icon: e.icon, title: e.name, body: e.body, href: e.href, linkLabel: "Learn more" }))}
          />
        </div>
      </Section>

      {/* One connected workflow */}
      <Section surface="lake" className="overflow-hidden">
        <div className="container-x">
          <SectionHeader
            title="Research, monitoring, and testing feed each other."
            align="split"
            lead="Always-on intelligence continues across the workflow, so the work you did yesterday informs what reaches you tomorrow."
          />
          <div className="mt-14 md:mt-20">
            <ConnectedLoop />
          </div>
        </div>
      </Section>

      {/* Different teams */}
      <Section surface="mist">
        <div className="container-x">
          <Audiences
            title="The same engine, framed around how you invest."
            lead="Bring the job you actually run, and we’ll show it on the platform."
            items={[
              { name: "Hedge Funds", body: "Watch the book, find differentiated ideas, and pressure-test a thesis before sizing up.", href: "/customers#hedge-funds" },
              { name: "Financial Institutions", body: "Bring the Knowledge Graph, Alfred and Insights into products and workflows you already distribute.", href: "/customers#financial-institutions" },
              { name: "Wealth Managers", body: "Turn monitoring into client-ready commentary tied to the holdings advisors discuss.", href: "/customers#wealth-managers" },
              { name: "Asset Managers", body: "Cover more names and themes with cited research and repeatable scenario work.", href: "/customers#asset-managers" },
            ]}
          />
        </div>
      </Section>

      <CTABand
        title="Bring the job you actually run."
        lead="A watchlist, a thesis, a theme or a scenario. We’ll walk through it live on Reflexivity."
        secondary={{ label: "See deployment options", href: "/deployment" }}
        cta="use-cases-final"
      />
    </>
  );
}
