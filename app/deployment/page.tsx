import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import { SplitText } from "@/components/ui/SplitText";
import { SplitFeature } from "@/components/ui/Layouts";
import { BranchLines } from "@/components/graphics/Cartography";
import { ApiMark, EmbedMark, FeedMark, PlatformMark, StackMark } from "./_components/Marks";

export const metadata: Metadata = {
  title: "Deployment: Platform Access, API, MCP & Integrations",
  description:
    "Get the complete Reflexivity investment research platform, or integrate the Knowledge Graph and market intelligence into your existing tools and products through API, MCP, knowledge feeds, embedded experiences and Microsoft 365.",
};

const ANCHOR = "scroll-mt-[calc(var(--header-h)+32px)]";

const WAYS = [
  {
    title: "Platform Access",
    body: "For teams that want a full daily workspace without owning the infrastructure. Reflexivity maintains the environment, so your team doesn’t have to run it, and it’s set up around your team’s holdings and watchlists.",
  },
  {
    title: "Build",
    body: "For teams with their own tools and engineers, adding the Knowledge Graph, Alfred or Insights. You keep running your own systems, Reflexivity supplies the layer they plug into, and it’s shaped around your own models, workflows and interfaces.",
  },
];

const OPTIONS: { id: string; title: string; body: string; mark: React.ReactNode }[] = [
  {
    id: "platform",
    title: "Platform Access",
    body: "Get Alfred, Insights, the Knowledge Graph and institutional market data in one research environment. Ready for your team to use, with infrastructure and updates managed by Reflexivity.",
    mark: <PlatformMark />,
  },
  {
    id: "api-mcp",
    title: "API & MCP",
    body: "Connect Reflexivity’s market intelligence to your own agents, models and research applications. Bring structured relationship context and supported analytical capabilities into existing workflows.",
    mark: <ApiMark />,
  },
  {
    id: "knowledge-feeds",
    title: "Knowledge Graph as a feed",
    body: "License a living map of our Knowledge Graph across companies, products, themes and markets as structured data for thematic baskets, research platforms and proprietary models.",
    mark: <FeedMark />,
  },
  {
    id: "embedded",
    title: "Embedded & White-Label",
    body: "Offer Reflexivity intelligence as native functionality inside your own platform.",
    mark: <EmbedMark />,
  },
];

const CONNECTORS = [
  {
    icon: "stack" as const,
    title: "Firm Data & Documents",
    body: "Bring your proprietary information into Alfred through supported data connections, document uploads and MCP integrations. Analyze it alongside Reflexivity’s institutional market data.",
  },
  {
    icon: "chain" as const,
    title: "AI Tools & Internal Systems",
    body: "Connect Reflexivity intelligence to your own AI agents, dashboards and research workflows through API and MCP, including compatible Claude and ChatGPT-based environments.",
  },
  {
    icon: "venn" as const,
    title: "Microsoft 365 & Copilot",
    body: "Access Alfred in Microsoft Teams, connect supported Microsoft 365 content, and extend Copilot with relationship intelligence from Reflexivity’s Knowledge Graph.",
  },
];

export default function DeploymentPage() {
  return (
    <>
      <PageHero
        surface="ink"
        trail={[{ label: "Deployment" }]}
        title="Add Reflexivity without replacing your stack."
        lead="Get the complete investment research platform, or integrate our Knowledge Graph and market intelligence into your existing tools and products."
        cta="deployment-hero"
        visual={
          <div className="mx-auto aspect-[6/5] w-full max-w-[520px] text-paper">
            <StackMark />
          </div>
        }
      />

      {/* Two ways to work */}
      <Section surface="paper" id="compare" className={ANCHOR}>
        <div className="container-x">
          <SectionHeader title="From research workspace to market infrastructure." lead="Choose the level of integration that works for your team." />
          <Stagger className="grid-12 mt-14 gap-y-10 md:mt-16">
            {WAYS.map((w) => (
              <StaggerItem key={w.title} className="col-span-12 border-t border-ink/15 pt-6 md:col-span-6">
                <h3 className="t-h3">{w.title}</h3>
                <p className="t-body mt-4 max-w-[520px] text-ink/70">{w.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Deployment options */}
      <Section surface="pine" id="options">
        <div className="container-x">
          <SectionHeader title="Four ways to deploy." lead="Choose a ready-to-use platform or integrate the capabilities your team needs." />
          <div className="mt-16 md:mt-24">
            {OPTIONS.map((o, k) => (
              <div key={o.id} id={o.id} className={`grid-12 items-center gap-y-8 border-t border-white/20 py-12 md:py-16 ${ANCHOR}`}>
                <div className={`col-span-12 lg:col-span-5 ${k % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <SplitText text={o.title} className="t-h2" />
                  <Reveal delay={0.1}>
                    <p className="t-body mt-4 max-w-[480px] text-paper/75">{o.body}</p>
                  </Reveal>
                </div>
                <Reveal delay={0.1} className={`col-span-12 lg:col-span-6 ${k % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  <div className="mx-auto aspect-[5/4] w-full max-w-[400px] text-paper">{o.mark}</div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Connectors */}
      <Section surface="paper" id="microsoft-365" className={ANCHOR}>
        <div className="container-x">
          <SectionHeader
            title="Bring your knowledge in, or take Reflexivity out."
            lead="Connect your firm’s internal information to Alfred, or extend Reflexivity intelligence into your existing AI tools, research systems and applications."
          />
          <FeatureGrid className="mt-14 md:mt-16" items={CONNECTORS} />
          <p className="t-small mt-6 text-ink/55">Some firms need IT approval before the connection is switched on.</p>
        </div>
      </Section>

      {/* One shared foundation */}
      <SplitFeature
        surface="lake"
        title="Built for wherever you work."
        lead="Reflexivity combines trusted market data, transparent analysis and purpose-built investment intelligence. Whether your team uses the complete platform or integrates specific capabilities, sourcing, access controls and data entitlements are addressed within the deployment."
        link={{ label: "See Auditability & Data", href: "/alfred#trust" }}
        visual={<BranchLines origin="Knowledge Graph" branches={["Platform", "API & MCP", "Feeds", "Embedded"]} accent="#f4f3f1" />}
      />

      <CTABand title="Talk to us about the setup that fits your team." cta="deployment-final" />
    </>
  );
}
