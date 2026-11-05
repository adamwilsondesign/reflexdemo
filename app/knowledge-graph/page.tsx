import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { CTABand, StatRow } from "@/components/ui/Blocks";
import { CountUp } from "@/components/ui/CountUp";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { KGHero } from "./_components/KGHero";
import { GraphMaps, WeightExplainer } from "./_components/GraphMaps";
import { RippleExample } from "./_components/RippleExample";
import { ExploreBuild } from "./_components/ExploreBuild";

export const metadata: Metadata = {
  title: "Knowledge Graph | Reflexivity",
  description:
    "Reflexivity’s Knowledge Graph maps how companies, products, themes and markets connect, with weighted, evidence-backed relationships that reveal hidden exposures and second-order effects.",
};

export default function KnowledgeGraphPage() {
  return (
    <>
      {/* 1 · Hero */}
      <KGHero />

      {/* 1a · Proofpoint */}
      <section data-tone="light" data-bg="#f4f3f1" className="border-b border-ink/10 bg-paper py-12 md:py-16">
        <div className="container-x">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <PrecisionIcon name="star" className="h-10 w-10 shrink-0 text-lake-700" />
            <p className="max-w-[920px] font-display text-[22px] font-medium leading-[1.3] tracking-[-0.01em] text-ink md:text-[28px]">
              Powers thematic analysis at the world’s largest bank and is distributed by Interactive Brokers to millions of end users.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2 · What the Graph maps */}
      <Section surface="paper" id="what-it-maps">
        <div className="container-x">
          <SectionHeader
            eyebrow="What the Graph maps"
            title="Find the connections in your data that matter, and why."
            align="split"
            lead="Every relationship is weighted, revealing the strength of each exposure and the evidence to back it up."
          />
          <Reveal delay={0.1}>
            <p className="t-body mt-8 max-w-[640px] text-ink/65">
              Companies, themes, geographies, and products or brands. Securities are not isolated data points. The graph doesn’t just tell you how things are connected, but how strongly.
            </p>
          </Reveal>
          <div className="mt-12 md:mt-16">
            <GraphMaps />
          </div>

          <div className="mt-20 md:mt-28">
            <SectionHeader eyebrow="Relationship weights" title="What a weight tells you, and what it doesn’t." maxW="max-w-[720px]" />
            <div className="mt-10 md:mt-12">
              <WeightExplainer />
            </div>
            <Reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/use-cases/thematic-exposure" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
                <span className="link-underline">See who is really exposed to a theme</span> <Arrow />
              </Link>
              <Link href="/book-a-demo" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
                <span className="link-underline">Request a methodology walkthrough</span> <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 3 · Event to ripple effects */}
      <Section surface="lake" id="ripple" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-40" />
        <div className="container-x">
          <SectionHeader
            eyebrow="Event to ripple effects"
            title="Surface the ripple effects of any market event."
            align="split"
            lead="In markets, nothing exists in a vacuum. Trace an event across the broader investment implications for your portfolio."
          />
          <div className="mt-14 md:mt-16">
            <RippleExample />
          </div>
        </div>
      </Section>

      {/* 5 · Coverage and scale */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            eyebrow="Coverage and scale"
            title="A living map of the financial market, built for institutional scale"
            align="split"
            lead="Each filing, earnings call, press release, and market event expands the Knowledge Graph, continuously enriching the relationships it tracks."
          />
          <div className="mt-14 overflow-hidden rounded-[14px] border border-ink/10 md:mt-16">
            <StatRow
              items={[
                { value: <CountUp to={40000} />, label: "Securities mapped", note: "Listed securities resolved to entities" },
                { value: <CountUp to={600} suffix="K+" />, label: "Evidence-backed relationships", note: "Weighted links with supporting sources" },
                { value: <CountUp to={47} />, label: "Global markets", note: "Markets with mapped securities" },
                {
                  value: <span className="flex h-[40px] items-center md:h-[56px]"><PrecisionIcon name="loop" className="h-10 w-10 text-lake-700 md:h-12 md:w-12" /></span>,
                  label: "Updated as evidence arrives",
                  note: "Relationships change as new documents are processed",
                },
              ]}
            />
          </div>
          <p className="t-ui mt-4 text-ink/45">Coverage figures as of November 2026.</p>
        </div>
      </Section>

      {/* Explore vs Build */}
      <Section surface="lake">
        <div className="container-x">
          <SectionHeader
            eyebrow="Two ways to use it"
            title="Bring proprietary relationship intelligence into your existing stack."
            align="split"
            lead="The same Graph runs on-demand analysis and always-on monitoring inside the Reflexivity platform. You can also take it straight into your own stack."
          />
          <div className="mt-14 md:mt-16">
            <ExploreBuild />
          </div>
        </div>
      </Section>

      <CTABand
        title="Uncover the connections behind your portfolio."
        lead="Bring a watchlist or a theme, and we’ll show you what it is connected to, and how strongly."
        secondary={{ label: "Explore data feeds and API", href: "/deployment#knowledge-feeds" }}
        cta="kg-final"
      />
    </>
  );
}
