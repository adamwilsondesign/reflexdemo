import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { CTABand } from "@/components/ui/Blocks";
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
  { name: "Auditable analysis", body: "Cited sources, visible code-backed calculations, and missing data flagged rather than estimated.", href: "/auditability-data", icon: "eye" as IconName },
];

const JOBS = ["Monitoring", "Research", "Themes", "Scenarios", "Ideas"];

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        layout="stacked"
        trail={[{ label: "Use Cases" }]}
        title="Explore how the same engine supports research, monitoring, testing, and idea generation."
        lead="Reflexivity is organised around the jobs investors need to finish, not a feature catalogue. Pick the workflow closest to yours."
        secondary={{ label: "Explore the platform", href: "/platform" }}
        cta="use-cases-hero"
        visual={
          <div className="mx-auto max-w-[1040px]">
            <JobsHero />
          </div>
        }
      />

      {/* Explore use cases */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader eyebrow="Explore use cases" title="Start with the job in front of you." align="split" lead="Five workflows, one platform. Each page shows a worked example you can inspect." />
          <Stagger className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-6">
            {CARDS.map((c) => (
              <StaggerItem key={c.name} className={c.big ? "lg:col-span-3" : "lg:col-span-2"}>
                <Link
                  href={c.href}
                  className={clsx(
                    "group relative flex h-full flex-col overflow-hidden rounded-[16px] border p-7 transition-[border-color,background-color,transform] duration-500 ease-[var(--ease-out-expo)] md:p-8",
                    c.big ? "min-h-[320px] border-transparent bg-lake-900 text-paper" : "min-h-[300px] border-ink/10 bg-white/60 hover:border-ink/25 hover:bg-white",
                  )}
                >
                  {c.big && <div className="pointer-events-none absolute inset-0 bg-chart-dark opacity-60" />}
                  <div className="relative flex items-start justify-between gap-4">
                    <PrecisionIcon name={c.icon} className="h-11 w-11 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)]" />
                    <span className={clsx("rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.04em]", c.big ? "bg-white/10 text-paper/70" : "bg-ink/[0.05] text-ink/55")}>{c.output}</span>
                  </div>
                  <h3 className={clsx("relative mt-auto pt-12", c.big ? "t-h2" : "t-h3")}>{c.name}</h3>
                  <p className={clsx("t-body relative mt-3 max-w-[480px]", c.big ? "text-paper/70" : "text-ink/65")}>{c.job}</p>
                  <span className="relative mt-7 flex items-center gap-2 font-display text-[15px] font-medium">
                    <span className="link-underline">{c.link}</span> <Arrow />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* One connected workflow */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x">
          <SectionHeader
            eyebrow="One connected workflow"
            title="Research, monitoring, and testing feed each other."
            lead="Always-on intelligence continues across the workflow, so the work you did yesterday informs what reaches you tomorrow."
            maxW="max-w-[820px]"
          />
          <div className="mt-14 md:mt-20">
            <ConnectedLoop />
          </div>
        </div>
      </Section>

      {/* Same engine */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            eyebrow="Same engine"
            title="One foundation under every use case."
            align="split"
            lead="Knowledge Graph, Alfred, Insights and auditable analysis sit under every workflow, so an answer in one job means the same thing in the next."
          />
          <Reveal className="mt-14 md:mt-16">
            <div className="overflow-hidden rounded-[16px] border border-ink/10 bg-white/50">
              <div className="hidden grid-cols-5 border-b border-ink/10 bg-mist-100 sm:grid">
                {JOBS.map((j) => (
                  <div key={j} className="relative border-r border-ink/8 px-2 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.04em] text-ink/60 last:border-r-0 sm:text-[11px]">
                    {j}
                  </div>
                ))}
              </div>
              {ENGINE.map((e, i) => (
                <Link
                  key={e.name}
                  href={e.href}
                  className={clsx("group relative grid items-center gap-4 px-5 py-6 transition-colors duration-500 hover:bg-white sm:grid-cols-[56px_220px_1fr_auto] md:px-8", i > 0 && "border-t border-ink/8")}
                >
                  <PrecisionIcon name={e.icon} className="hidden h-9 w-9 text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] sm:block" />
                  <h3 className="t-h3">{e.name}</h3>
                  <p className="t-body text-ink/65">{e.body}</p>
                  <span className="flex items-center gap-2 font-display text-[14px] font-medium text-ink/70 group-hover:text-ink">
                    Learn more <Arrow />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Different teams */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader eyebrow="Different teams" title="The same engine, framed around how you invest." align="split" lead="Bring the job you actually run, and we’ll show it on the platform." />
          <div className="mt-14 md:mt-16">
            <Audiences
              items={[
                { name: "Hedge Funds", body: "Watch the book, find differentiated ideas, and pressure-test a thesis before sizing up.", href: "/customers#hedge-funds" },
                { name: "Financial Institutions", body: "Bring the Knowledge Graph, Alfred and Insights into products and workflows you already distribute.", href: "/customers#financial-institutions" },
                { name: "Wealth Managers", body: "Turn monitoring into client-ready commentary tied to the holdings advisors discuss.", href: "/customers#wealth-managers" },
                { name: "Asset Managers", body: "Cover more names and themes with cited research and repeatable scenario work.", href: "/customers#asset-managers" },
              ]}
            />
          </div>
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
