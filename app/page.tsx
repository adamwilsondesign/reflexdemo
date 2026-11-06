import Link from "next/link";
import { HomeHero } from "./_home/HomeHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTABand, FeatureGrid, Testimonials } from "@/components/ui/Blocks";
import { DataSourceLogos, WordmarkStrip } from "@/components/ui/LogoStrip";
import { LinkRowsBlock, SplitFeature, TwoWays } from "@/components/ui/Layouts";
import { ExposurePolar } from "@/components/graphics/Cartography";
import { CUSTOMERS } from "@/lib/logos";
import { Differentiators } from "./_home/Differentiators";
import { WorkedExample } from "./_home/WorkedExample";

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* Trusted by — customers only; data vendors live in their own labelled strip */}
      <section data-tone="light" data-bg="#f4f3f1" className="border-y border-ink/10 bg-paper py-10">
        <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
          <p className="t-ui shrink-0 text-ink/50">Trusted by</p>
          <WordmarkStrip names={CUSTOMERS} className="w-full min-w-0" />
        </div>
      </section>

      {/* Two modes (moved out of the hero) */}
      <Section surface="paper" tight>
        <div className="container-x">
          <SectionHeader title="On demand when you ask. Always on when you don’t." align="split" lead="One analyst works both ways, on the same Knowledge Graph and the same institutional data." />
          <FeatureGrid
            cols={2}
            className="mt-12 md:mt-16"
            items={[
              { icon: "crosshair", title: "On-demand research", body: "Ask Alfred to investigate a company, analyze a portfolio, or pressure-test a thesis.", href: "/alfred", linkLabel: "Meet Alfred" },
              { icon: "signal", title: "Always-on intelligence", body: "Relevant catalysts and their ripple effects, surfaced across the names you follow.", href: "/insights", linkLabel: "See Insights" },
            ]}
          />
        </div>
      </Section>

      {/* Investor value */}
      <Section surface="lake">
        <div className="container-x">
          <SectionHeader title="Find what matters. Understand what comes next." />
          <FeatureGrid
            onDark
            className="mt-14 md:mt-20"
            items={[
              { icon: "rings", title: "Uncover hidden exposures.", body: "Map how companies, products, and themes connect, including the non-obvious.", href: "/knowledge-graph", linkLabel: "How the Knowledge Graph works" },
              { icon: "signal", title: "Stay ahead of market-moving developments.", body: "Automatically surface relevant catalysts and their ripple effects.", href: "/insights", linkLabel: "See Insights" },
              { icon: "lattice", title: "Research and test investment ideas faster.", body: "From deep research to portfolio stress tests, in minutes.", href: "/alfred", linkLabel: "Meet Alfred" },
            ]}
          />
        </div>
      </Section>

      {/* Differentiation */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            title="Built to catch what others miss."
            align="split"
            lead="Underneath every answer is a Knowledge Graph that maps market relationships, supported by institutional data and analysis you can inspect."
          />
          <div className="mt-14 md:mt-20">
            <Differentiators />
          </div>
          <div className="mt-20 border-t border-ink/10 pt-10 md:mt-28">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <p className="t-ui shrink-0 text-ink/50">Data and content sources</p>
              <DataSourceLogos className="w-full min-w-0" />
            </div>
            <p className="t-small mt-6 max-w-[620px] text-ink/60">
              Natively integrated data from LSEG, S&amp;P Global, Cboe, Dow Jones, Nasdaq, Quartr, and more.{" "}
              <Link href="/alfred#trust" className="link-underline text-ink">How sourcing works</Link>
            </p>
          </div>
        </div>
      </Section>

      {/* Concept block: the relationship layer */}
      <SplitFeature
        surface="pine"
        title="Trace the exposure."
        lead="Every relationship in the Knowledge Graph is weighted by evidence, so you see not just who is connected to an event, but how strongly, and why."
        link={{ label: "Explore the Knowledge Graph", href: "/knowledge-graph" }}
        visual={<ExposurePolar accent="#f4f3f1" />}
      />

      {/* Worked example */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader title="From a headline to a decision you can defend." lead="A worked example of how the Knowledge Graph, Insights, and Alfred fit together on a single market event." />
          <WorkedExample />
        </div>
      </Section>

      {/* Who we work with */}
      <Section surface="mist">
        <div className="container-x">
          <LinkRowsBlock
            title="Built for the way you invest."
            lead="The same platform, framed around how each firm actually works."
            rows={[
              { label: "Hedge Funds", href: "/customers#hedge-funds", note: "Find differentiated ideas, watch the book, and pressure-test hypotheses." },
              { label: "Financial Institutions", href: "/customers#financial-institutions", note: "Add the relationship layer, analyst, and Insights to what you distribute." },
              { label: "Asset Managers", href: "/customers#asset-managers", note: "Research, construction, exposure, monitoring and committee narrative." },
              { label: "Wealth Managers & RIAs", href: "/customers#wealth-managers", note: "Client-ready explanations tied to holdings, the same day." },
            ]}
          />
        </div>
      </Section>

      {/* Testimonials */}
      <Section surface="lake">
        <div className="container-x">
          <Testimonials onDark title="Trusted by investors who use it every day." />
        </div>
      </Section>

      {/* Access + integration */}
      <Section surface="pine">
        <div className="container-x">
          <TwoWays
            onDark
            title="Your research platform. Your existing stack."
            items={[
              {
                title: "Platform Access",
                body: "Alfred, the Knowledge Graph, integrated data, Insights and Microsoft 365 in one maintained environment, for teams that don’t want to run the infrastructure.",
                link: { label: "Explore the platform", href: "/deployment#platform" },
              },
              {
                title: "API, MCP & integration",
                body: "Keep the tools you already run, and plug in the layer they lack: entity resolution, the Knowledge Graph, monitoring and auditability.",
                link: { label: "Explore deployment options", href: "/deployment#api-mcp" },
              },
            ]}
          />
        </div>
      </Section>

      <CTABand title="See what Reflexivity can uncover for you." lead="Explore the connections, risks, and opportunities across your own coverage universe." cta="home-final" />
    </>
  );
}
