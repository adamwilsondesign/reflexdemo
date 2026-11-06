import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/Blocks";
import { SplitFeature } from "@/components/ui/Layouts";
import { KGHero } from "./_components/KGHero";
import { GraphMaps } from "./_components/GraphMaps";
import { RippleExample } from "./_components/RippleExample";
import { ExploreBuild } from "./_components/ExploreBuild";
import { Coverage } from "./_components/Coverage";
import { SystemViz } from "./_components/SystemViz";

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
      <section data-tone="light" data-bg="#f4f3f1" className="border-b border-ink/10 bg-paper py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <h2 className="t-h1 mx-auto max-w-[1040px] text-center text-ink">
              Powers thematic analysis at the world’s largest bank and is distributed by Interactive Brokers to millions of end users.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* 2 · What the Graph maps */}
      <Section surface="paper" id="what-it-maps">
        <div className="container-x">
          <SectionHeader
            title="Find the connections in your data that matter, and why."
            align="split"
            lead="Every relationship is weighted, revealing the strength of each exposure and the evidence to back it up."
          />
          <Reveal delay={0.1}>
            <p className="t-body mt-8 max-w-[560px] text-ink/65">
              Companies, themes, geographies, and products or brands. Securities are not isolated data points. The graph doesn’t just tell you how things are connected, but how strongly.
            </p>
          </Reveal>
          <div className="mt-12 md:mt-16">
            <GraphMaps />
          </div>
        </div>
      </Section>

      {/* 3 · Event to ripple effects */}
      <Section surface="lake" id="ripple">
        <div className="container-x">
          <SectionHeader
            title="Surface the ripple effects of any market event."
            align="split"
            lead="In markets, nothing exists in a vacuum. Trace an event across the broader investment implications for your portfolio."
          />
          <div className="mt-14 md:mt-16">
            <RippleExample />
          </div>
        </div>
      </Section>

      {/* 5 · Coverage and scale (concept block) */}
      <SplitFeature
        surface="pine"
        title="A living map of the financial market, built for institutional scale."
        lead="Each filing, earnings call, press release, and market event expands the Knowledge Graph, continuously enriching the relationships it tracks."
        visual={<SystemViz />}
      >
        <Coverage />
      </SplitFeature>

      {/* 6 · Explore vs Build */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
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
