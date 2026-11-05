import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABand, Steps } from "@/components/ui/Blocks";
import { Accordion } from "@/components/ui/Accordion";
import { SplitText } from "@/components/ui/SplitText";
import { SplitFeature, TextLink, TwoWays } from "@/components/ui/Layouts";
import { BranchLines } from "@/components/graphics/Cartography";
import { DoorsDiagram } from "./_components/DoorsDiagram";
import { AnchorNav } from "./_components/AnchorNav";
import { ConnectorMap, EmbeddedFrame, FeedTable, McpConsole, PlatformCockpit } from "./_components/Visuals";

export const metadata: Metadata = {
  title: "Deployment: Platform Access, API, MCP & Integrations",
  description:
    "Start with the finished Reflexivity Platform, or bring the Knowledge Graph, Alfred and Insights into the systems you already run through API, MCP, knowledge feeds, embedded experiences and Microsoft 365. No rip-and-replace.",
};

const ANCHORS = [
  { id: "compare", label: "Two ways to work" },
  { id: "platform", label: "Platform Access" },
  { id: "api-mcp", label: "API & MCP" },
  { id: "knowledge-feeds", label: "Knowledge feeds" },
  { id: "embedded", label: "Embedded" },
  { id: "microsoft-365", label: "Microsoft 365 & connectors" },
  { id: "implementation", label: "Implementation" },
  { id: "faq", label: "FAQ" },
];

const COMPARE: { label: string; platform: string; build: string }[] = [
  {
    label: "Who it’s for",
    platform: "Investment teams that want a daily research and monitoring cockpit without owning the plumbing.",
    build: "Firms with their own platforms, assistants, models or client products that want Reflexivity’s layer inside them.",
  },
  {
    label: "What you receive",
    platform: "The Reflexivity interface: Alfred, the Knowledge Graph, integrated data, Insights and Microsoft 365.",
    build: "API responses, MCP tools, relationship data feeds, or an embedded experience in your own product.",
  },
  {
    label: "Who maintains the infrastructure",
    platform: "Reflexivity runs and updates the environment. Your team signs in.",
    build: "Reflexivity maintains the Graph, data and services. Your team owns the surface it plugs into.",
  },
  {
    label: "How it’s priced",
    platform: "Per seat.",
    build: "Scoped to the integration: surfaces, data, volume and distribution.",
  },
  {
    label: "How far it can be customised",
    platform: "Configured to your coverage: watchlists, themes, portfolios and connected firm knowledge.",
    build: "Shaped to your workflow, from a single MCP connection to a white-labelled experience.",
  },
];

const FOUNDATION: { title: string; body: string }[] = [
  {
    title: "The same Knowledge Graph",
    body: "Entity resolution keeps companies consistent across sources, so a relationship means the same thing in the Platform, an API response or a feed.",
  },
  {
    title: "The same data, per your entitlements",
    body: "Each path draws on the same integrated data. Which datasets you receive depends on your licence and the surface, and we set that out during scoping.",
  },
  {
    title: "The same approach to auditability",
    body: "Sources travel with outputs wherever the surface can carry them, and missing data is flagged rather than filled. Any differences by surface are documented up front.",
  },
];

const STEPS = [
  { title: "Discovery", body: "Agree the workflows, users and systems in scope, and whether you start with seats, an integration, or both." },
  { title: "Access & entitlements", body: "Set up users, single sign-on, data licences and permissions for connected sources." },
  { title: "Integration", body: "Connect Microsoft 365, MCP clients, APIs or feeds. Platform-only teams can skip straight to validation." },
  { title: "Validation", body: "Run real questions against your coverage, check sources and outputs, and complete security review." },
  { title: "Rollout", body: "Onboard the wider team, set up monitoring for your book, and review usage together." },
];

const FAQ = [
  {
    q: "Should we buy seats or scope a custom integration?",
    a: "If your team wants to research and monitor in a finished interface, start with Platform seats. If you need Reflexivity inside a system you already run, such as an internal portal, an assistant, a model or a client product, scope an integration. Many teams do both: seats for the investment team, an integration for a platform or data team.",
  },
  {
    q: "Can we start on one path and expand later?",
    a: "Yes. Integrations can sit alongside Platform seats, and both draw on the same Knowledge Graph and data. A common pattern is to start with seats, prove the workflow, then bring the same layer into internal tools through API or MCP.",
  },
  {
    q: "How does security review work?",
    a: (
      <>
        We support institutional due diligence, including security questionnaires and documentation requests. See{" "}
        <Link href="/security" className="link-underline text-ink">Security</Link> for how data is protected, or{" "}
        <Link href="/contact?topic=security" className="link-underline text-ink">start a security review</Link>.
      </>
    ),
  },
  {
    q: "How long does implementation take?",
    a: "It depends on scope. Platform seats need accounts, entitlements and connected sources. Integrations add build and validation work on your side. We agree a plan and owners during discovery, so the timeline is set against your environment rather than a generic estimate.",
  },
  {
    q: "Do API, MCP and feed customers get the same data and auditability as the Platform?",
    a: "They draw on the same Knowledge Graph and integrated data, subject to your licence. Sources are returned with outputs where the surface supports it. We document what each surface includes during scoping, so there are no surprises later.",
  },
  {
    q: "Do we connect our own MCP client, or do you host something for us?",
    a: "Reflexivity exposes its capabilities as MCP tools that your existing client can call, whether that is Claude, ChatGPT, Copilot or an internal agent. The exact setup is confirmed in a technical discovery call.",
  },
];

export default function DeploymentPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Deployment" }, { label: "Platform & integrations" }]}
        title="Add Reflexivity without replacing your stack."
        lead="Start with the finished Platform, or bring the Knowledge Graph, Alfred, and Insights into systems you already run. No rip-and-replace."
        secondary={{ label: "Talk to a technical team", href: "/contact?topic=technical" }}
        cta="deployment-hero"
        visual={<DoorsDiagram />}
      />

      <AnchorNav items={ANCHORS} />

      {/* 2 · Two ways to work */}
      <Section surface="pine" id="compare" className="scroll-mt-[calc(var(--header-h)+48px)]">
        <div className="container-x">
          <TwoWays
            onDark
            title="One intelligence. Two ways to work."
            items={[
              {
                title: "Use the platform.",
                body: "Platform Access gives your team a finished environment: Alfred, the Knowledge Graph, integrated data and Insights, maintained by Reflexivity.",
                link: { label: "Explore the platform", href: "#platform" },
              },
              {
                title: "Build on its intelligence.",
                body: "Build brings the same intelligence into the tools you already run, through API, MCP, knowledge feeds or an embedded experience. You can combine the two.",
                link: { label: "Explore integration", href: "#api-mcp" },
              },
            ]}
          />

          {/* comparison: rows aligned to the two columns above */}
          <div className="mt-20 md:mt-28">
            <h3 className="t-h3">Use the Platform, build with the layer, or both.</h3>
            <div className="mt-10 hidden gap-x-12 pb-4 lg:grid lg:grid-cols-[200px_1fr_1fr]" aria-hidden="true">
              <span />
              <span className="t-label text-paper">Platform Access</span>
              <span className="t-label text-paper">Build: API, MCP, feeds, embedded</span>
            </div>
            <dl className="border-t border-white/20 lg:mt-0 mt-8">
              {COMPARE.map((r) => (
                <Reveal key={r.label}>
                  <div className="grid gap-x-16 gap-y-3 border-b border-white/20 py-6 md:grid-cols-2 lg:grid-cols-[200px_1fr_1fr] lg:gap-x-12">
                    <dt className="t-label text-paper/60 md:col-span-2 lg:col-span-1">{r.label}</dt>
                    <dd className="t-small text-paper/85">
                      <span className="mb-1 block font-display text-[13px] font-medium text-paper/55 lg:hidden">Platform Access</span>
                      {r.platform}
                    </dd>
                    <dd className="t-small text-paper/85">
                      <span className="mb-1 block font-display text-[13px] font-medium text-paper/55 lg:hidden">Build</span>
                      {r.build}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* 3 · Platform Access */}
      <Section surface="paper" id="platform" className="scroll-mt-[calc(var(--header-h)+48px)]">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              title="The daily cockpit, without the plumbing."
              lead="Alfred, the Knowledge Graph, integrated data, Insights and Microsoft 365 in one maintained environment, for teams that don’t want to run the infrastructure."
              className="lg:max-w-none"
            />
            <Reveal delay={0.2}>
              <ul className="mt-8 border-t border-ink/12">
                {[
                  "Research a company, a theme or a portfolio with Alfred",
                  "Explore relationships in the Knowledge Graph",
                  "Monitor holdings and themes with Insights",
                  "Bring firm knowledge in from Microsoft 365",
                ].map((x) => (
                  <li key={x} className="t-body border-b border-ink/12 py-3 text-ink/80">
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                <TextLink href="/platform">See the full Platform</TextLink>
                <TextLink href="/alfred" className="text-ink/75">Meet Alfred</TextLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <PlatformCockpit />
          </Reveal>
        </div>
      </Section>

      {/* 4 · API & MCP */}
      <Section surface="lake" id="api-mcp" className="scroll-mt-[calc(var(--header-h)+48px)]">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-7" delay={0.1}>
            <McpConsole />
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <SectionHeader
              title="Keep the tools you run. Add the layer they lack."
              lead="You don’t have to give up Claude, ChatGPT or your own agents. Plug in what they structurally lack: entity resolution, the Knowledge Graph, monitoring and auditability."
              className="lg:max-w-none"
            />
            <Reveal delay={0.2}>
              <dl className="mt-8 grid gap-5 border-t border-white/20 pt-6 sm:grid-cols-2">
                <div>
                  <dt className="font-display text-[15px] font-semibold">MCP</dt>
                  <dd className="t-small mt-1.5 text-paper/70">Reflexivity tools your assistant can call, with sources returned alongside the answer.</dd>
                </div>
                <div>
                  <dt className="font-display text-[15px] font-semibold">API</dt>
                  <dd className="t-small mt-1.5 text-paper/70">Graph, Insights and Alfred research as structured responses for internal platforms.</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                <TextLink href="/contact?topic=technical">Book a technical discovery call</TextLink>
                <TextLink href="/blog/mcp-from-protocol-to-product" className="text-paper/75">Read: MCP, from protocol to product</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 5 · Knowledge feeds */}
      <Section surface="mist" id="knowledge-feeds" className="scroll-mt-[calc(var(--header-h)+48px)]">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              title="The Graph, licensed as infrastructure."
              lead="License the Knowledge Graph’s relationship data as a feed for thematic baskets, research platforms and your own internal models."
              className="lg:max-w-none"
            />
            <Reveal delay={0.2}>
              <ul className="mt-8 grid gap-5 border-t border-ink/12 pt-6 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ["Thematic baskets", "Find companies exposed to a theme, with the relationship behind each one."],
                  ["Research platforms", "Add supplier, customer and competitor context to your own coverage."],
                  ["Internal models", "Feed resolved relationships into quant and risk models."],
                ].map(([t, b]) => (
                  <li key={t}>
                    <p className="font-display text-[15px] font-semibold">{t}</p>
                    <p className="t-small mt-1 text-ink/65">{b}</p>
                  </li>
                ))}
              </ul>
              <TextLink href="/knowledge-graph" className="mt-8">How the Knowledge Graph works</TextLink>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <FeedTable />
            <p className="t-small mt-3 text-ink/50">Illustrative schema and values. Delivery format and cadence are agreed in scoping.</p>
          </Reveal>
        </div>
      </Section>

      {/* 6 · Embedded */}
      <Section surface="ink" id="embedded" className="scroll-mt-[calc(var(--header-h)+48px)] overflow-hidden">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-7" delay={0.1}>
            <EmbeddedFrame />
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <SectionHeader
              title="Reflexivity intelligence, native to your product."
              lead="Offer Reflexivity’s analysis inside your own platform, presented as your functionality. This pattern already runs in production with a distribution partner."
              className="lg:max-w-none"
            />
            <Reveal delay={0.2}>
              <ul className="mt-8 border-t border-white/15">
                {["Your brand, your interface, your client entitlements", "Insights and Alfred answers alongside your own data", "Sources carried through to your users"].map((x) => (
                  <li key={x} className="t-body border-b border-white/15 py-3 text-paper/80">
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/contact?topic=partnerships" variant="outline-light" arrow>
                  Discuss a partnership
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 7 · Microsoft 365 & connectors */}
      <Section surface="paper" id="microsoft-365" className="scroll-mt-[calc(var(--header-h)+48px)]">
        <div className="container-x">
          <SectionHeader
            title="Portability in both directions."
            align="split"
            lead="Connect SharePoint, OneDrive, Outlook and OneNote so Alfred reasons across firm knowledge and market intelligence together, for teams that live in Office. Then take Reflexivity into the assistants your team already uses."
          />
          <Reveal className="mt-12 md:mt-16">
            <ConnectorMap />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[
                ["Permission-aware", "Designed to respect the Microsoft 365 permissions each user already has."],
                ["Firm knowledge + market data", "Answers can draw on your IC memos and call notes alongside integrated market data, with each source shown."],
                ["Where you work", "Teams and Copilot are additional surfaces; MCP connects assistants such as ChatGPT and Claude."],
              ].map(([t, b]) => (
                <div key={t} className="border-t border-ink/12 pt-5">
                  <p className="font-display text-[15px] font-semibold">{t}</p>
                  <p className="t-small mt-1.5 text-ink/65">{b}</p>
                </div>
              ))}
            </div>
            <p className="t-small mt-8 max-w-[640px] text-ink/50">
              Connector availability depends on your Microsoft tenant, licences and deployment. We confirm which connectors are generally available for your setup during discovery.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 8 · One shared foundation */}
      <SplitFeature
        surface="lake"
        title="Two doors, not two products."
        lead="Whichever way you deploy, you’re working from the same Knowledge Graph, the same integrated data and the same approach to sourcing."
        link={{ label: "How sourcing and auditability work", href: "/auditability-data" }}
        visual={<BranchLines origin="Knowledge Graph" branches={["Platform", "API & MCP", "Knowledge feeds", "Embedded"]} accent="#a9c4b6" />}
      >
        <dl className="mt-10 max-w-[520px] border-t border-white/20">
          {FOUNDATION.map((f) => (
            <div key={f.title} className="border-b border-white/20 py-5">
              <dt className="t-h3">{f.title}</dt>
              <dd className="t-small mt-2 text-paper/70">{f.body}</dd>
            </div>
          ))}
        </dl>
      </SplitFeature>

      {/* Implementation sequence */}
      <Section surface="paper" id="implementation" className="scroll-mt-[calc(var(--header-h)+48px)]">
        <div className="container-x">
          <SectionHeader
            title="From first call to rollout."
            align="split"
            lead="A clear sequence with owners on both sides, whether you start with seats, an integration, or both."
          />
          <div className="mt-14 md:mt-20 [&_li]:pb-8 md:[&_li]:pb-0">
            <Steps items={STEPS} />
          </div>
        </div>
      </Section>

      {/* Technical buyer path */}
      <Section surface="pine">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <SplitText text="Go deeper on architecture before the sales conversation." className="t-h2" />
          </div>
          <Reveal delay={0.15}>
            <p className="t-lead text-paper/75">
              Talk to our engineers about API and MCP access, feed delivery, entitlements, identity and data handling. We’ll share technical documentation as part of the call.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact?topic=technical" variant="light" arrow cta="deployment-technical">
                Book a technical call
              </Button>
              <Button href="/security" variant="outline-light">
                Security overview
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 9 · Practical questions */}
      <Section surface="paper" id="faq" className="scroll-mt-[calc(var(--header-h)+48px)]">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader title="Before you talk to us." lead="Seats, scope, security and how teams usually expand." className="lg:max-w-none" />
          </div>
          <Reveal className="lg:col-span-8">
            <Accordion items={FAQ} />
          </Reveal>
        </div>
      </Section>
      {/* 10 · Final CTA */}
      <CTABand
        title="Talk about Platform access, a custom integration, or both."
        lead="Tell us how your team works and what you already run. We’ll recommend the setup that fits."
        secondary={{ label: "Talk to a technical team", href: "/contact?topic=technical" }}
        cta="deployment-final"
      />
    </>
  );
}
