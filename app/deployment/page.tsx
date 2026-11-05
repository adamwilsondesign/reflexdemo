import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Arrow, Button } from "@/components/ui/Button";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { CTABand, Steps } from "@/components/ui/Blocks";
import { Accordion } from "@/components/ui/Accordion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoorsDiagram } from "./_components/DoorsDiagram";
import { AnchorNav } from "./_components/AnchorNav";
import { ConnectorMap, EmbeddedFrame, FeedTable, McpConsole, PlatformCockpit } from "./_components/Visuals";

export const metadata: Metadata = {
  title: "Deployment: Platform Access, API, MCP & Integrations",
  description:
    "Start with the finished Reflexivity Platform, or bring the Knowledge Graph, Alfred and Insights into the systems you already run through API, MCP, knowledge feeds, embedded experiences and Microsoft 365. No rip-and-replace.",
};

const ANCHORS = [
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

const FOUNDATION: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "knot",
    title: "The same Knowledge Graph",
    body: "Entity resolution keeps companies consistent across sources, so a relationship means the same thing in the Platform, an API response or a feed.",
  },
  {
    icon: "stack",
    title: "The same data, per your entitlements",
    body: "Each path draws on the same integrated data. Which datasets you receive depends on your licence and the surface, and we set that out during scoping.",
  },
  {
    icon: "chain",
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
      <Section surface="paper" id="compare" bare className="scroll-mt-[calc(var(--header-h)+60px)] pb-20 pt-16 md:pb-28 md:pt-20 lg:pb-[136px] lg:pt-24">
        <div className="container-x">
          <SectionHeader
            eyebrow="Two ways to work"
            title="Use the Platform, build with the layer, or both."
            align="split"
            lead="Platform Access gives your team a finished environment. Build brings the same intelligence into the tools you already run. You can combine the two."
          />

          {/* desktop table */}
          <Reveal className="mt-14 hidden overflow-hidden rounded-[16px] border border-ink/10 md:mt-16 lg:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Platform Access compared with Build</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[22%] bg-paper p-7 align-bottom">
                    <span className="t-ui text-ink/50">Compare</span>
                  </th>
                  <th scope="col" className="w-[39%] bg-white p-7 align-bottom">
                    <span className="flex items-center gap-3">
                      <PrecisionIcon name="stack" className="h-8 w-8 text-ink" />
                      <span>
                        <span className="t-ui block text-ink/50">Door one</span>
                        <span className="t-h3 block">Platform Access</span>
                      </span>
                    </span>
                  </th>
                  <th scope="col" className="w-[39%] bg-lake-900 p-7 align-bottom text-paper">
                    <span className="flex items-center gap-3">
                      <PrecisionIcon name="knot" className="h-8 w-8 text-paper" />
                      <span>
                        <span className="t-ui block text-paper/55">Door two</span>
                        <span className="t-h3 block">Build: API, MCP, feeds, embedded</span>
                      </span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="border-t border-ink/10 bg-paper p-7 align-top font-display text-[15px] font-semibold">{r.label}</th>
                    <td className="t-body border-t border-ink/10 bg-white p-7 align-top text-ink/75">{r.platform}</td>
                    <td className="t-body border-t border-white/10 bg-lake-900 p-7 align-top text-paper/75">{r.build}</td>
                  </tr>
                ))}
                <tr>
                  <td className="border-t border-ink/10 bg-paper p-7" />
                  <td className="border-t border-ink/10 bg-white p-7">
                    <a href="#platform" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
                      <span className="link-underline">Platform Access</span> <Arrow />
                    </a>
                  </td>
                  <td className="border-t border-white/10 bg-lake-900 p-7 text-paper">
                    <a href="#api-mcp" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
                      <span className="link-underline">Build options</span> <Arrow />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </Reveal>

          {/* mobile / tablet cards */}
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:hidden">
            {(["platform", "build"] as const).map((k) => (
              <StaggerItem key={k} className={k === "build" ? "rounded-[16px] bg-lake-900 p-6 text-paper" : "rounded-[16px] border border-ink/10 bg-white p-6"}>
                <div className="flex items-center gap-3">
                  <PrecisionIcon name={k === "platform" ? "stack" : "knot"} className="h-8 w-8" />
                  <h3 className="t-h3">{k === "platform" ? "Platform Access" : "Build: API, MCP, feeds, embedded"}</h3>
                </div>
                <dl className="mt-6 space-y-5">
                  {COMPARE.map((r) => (
                    <div key={r.label} className={k === "build" ? "border-t border-white/12 pt-4" : "border-t border-ink/10 pt-4"}>
                      <dt className={k === "build" ? "t-ui text-paper/55" : "t-ui text-ink/50"}>{r.label}</dt>
                      <dd className={k === "build" ? "t-small mt-1.5 text-paper/80" : "t-small mt-1.5 text-ink/75"}>{k === "platform" ? r.platform : r.build}</dd>
                    </div>
                  ))}
                </dl>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* 3 · Platform Access */}
      <Section surface="lake" id="platform" className="scroll-mt-[calc(var(--header-h)+48px)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Platform Access"
              title="The daily cockpit, without the plumbing."
              lead="Alfred, the Knowledge Graph, integrated data, Insights and Microsoft 365 in one maintained environment, for teams that don’t want to run the infrastructure."
            />
            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3 border-t border-white/12 pt-6">
                {[
                  "Research a company, a theme or a portfolio with Alfred",
                  "Explore relationships in the Knowledge Graph",
                  "Monitor holdings and themes with Insights",
                  "Bring firm knowledge in from Microsoft 365",
                ].map((x) => (
                  <li key={x} className="t-body flex gap-3 text-paper/80">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-paper/70" />
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <Link href="/platform" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
                  <span className="link-underline">See the full Platform</span> <Arrow />
                </Link>
                <Link href="/alfred" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium text-paper/80">
                  <span className="link-underline">Meet Alfred</span> <Arrow />
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <PlatformCockpit />
          </Reveal>
        </div>
      </Section>

      {/* 4 · API & MCP */}
      <Section surface="paper" id="api-mcp" className="scroll-mt-[calc(var(--header-h)+48px)]">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-7" delay={0.1}>
            <McpConsole />
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <SectionHeader
              eyebrow="Build · API & MCP"
              title="Keep the tools you run. Add the layer they lack."
              lead="You don’t have to give up Claude, ChatGPT or your own agents. Plug in what they structurally lack: entity resolution, the Knowledge Graph, monitoring and auditability."
            />
            <Reveal delay={0.2}>
              <dl className="mt-8 grid gap-5 border-t border-ink/12 pt-6 sm:grid-cols-2">
                <div>
                  <dt className="font-display text-[15px] font-semibold">MCP</dt>
                  <dd className="t-small mt-1.5 text-ink/65">Reflexivity tools your assistant can call, with sources returned alongside the answer.</dd>
                </div>
                <div>
                  <dt className="font-display text-[15px] font-semibold">API</dt>
                  <dd className="t-small mt-1.5 text-ink/65">Graph, Insights and Alfred research as structured responses for internal platforms.</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <Link href="/contact?topic=technical" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
                  <span className="link-underline">Book a technical discovery call</span> <Arrow />
                </Link>
                <Link href="/blog/mcp-from-protocol-to-product" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium text-ink/70">
                  <span className="link-underline">Read: MCP, from protocol to product</span> <Arrow />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 5 · Knowledge feeds */}
      <Section surface="mist" id="knowledge-feeds" className="scroll-mt-[calc(var(--header-h)+48px)] border-t border-ink/8">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Build · Knowledge feeds"
              title="The Graph, licensed as infrastructure."
              lead="License the Knowledge Graph’s relationship data as a feed for thematic baskets, research platforms and your own internal models."
            />
            <Reveal delay={0.2}>
              <ul className="mt-8 grid gap-3 border-t border-ink/12 pt-6 sm:grid-cols-3 lg:grid-cols-1">
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
              <Link href="/knowledge-graph" className="group mt-8 inline-flex items-center gap-2 font-display text-[15px] font-medium">
                <span className="link-underline">How the Knowledge Graph works</span> <Arrow />
              </Link>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <FeedTable />
            <p className="t-ui mt-3 text-ink/45">Illustrative schema and values. Delivery format and cadence are agreed in scoping.</p>
          </Reveal>
        </div>
      </Section>

      {/* 6 · Embedded */}
      <Section surface="ink" id="embedded" className="scroll-mt-[calc(var(--header-h)+48px)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 field-ink" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-7" delay={0.1}>
            <EmbeddedFrame />
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <SectionHeader
              eyebrow="Build · Embedded & white-label"
              title="Reflexivity intelligence, native to your product."
              lead="Offer Reflexivity’s analysis inside your own platform, presented as your functionality. This pattern already runs in production with a distribution partner."
            />
            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3 border-t border-white/12 pt-6">
                {["Your brand, your interface, your client entitlements", "Insights and Alfred answers alongside your own data", "Sources carried through to your users"].map((x) => (
                  <li key={x} className="t-body flex gap-3 text-paper/80">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-paper/70" />
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
            eyebrow="Microsoft 365 & connectors"
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
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x">
          <SectionHeader
            eyebrow="One shared foundation"
            title="Two doors, not two products."
            lead="Whichever way you deploy, you’re working from the same Knowledge Graph, the same integrated data and the same approach to sourcing."
            maxW="max-w-[820px]"
          />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[14px] bg-white/10 md:mt-16 md:grid-cols-3">
            {FOUNDATION.map((f) => (
              <StaggerItem key={f.title} className="group bg-lake-900 p-7 md:p-9">
                <PrecisionIcon name={f.icon} className="h-11 w-11 text-paper transition-transform duration-[1.2s] ease-[var(--ease-out-expo)]" />
                <h3 className="t-h3 mt-10 md:mt-14">{f.title}</h3>
                <p className="t-body mt-3 text-paper/70">{f.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.15}>
            <Link href="/auditability-data" className="group mt-10 inline-flex items-center gap-2 font-display text-[15px] font-medium">
              <span className="link-underline">How sourcing and auditability work</span> <Arrow />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Implementation sequence */}
      <Section surface="paper" id="implementation" className="scroll-mt-[calc(var(--header-h)+48px)]">
        <div className="container-x">
          <SectionHeader
            eyebrow="Implementation"
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
      <Section surface="mist" tight className="border-y border-ink/8">
        <div className="container-x">
          <Reveal>
            <div className="grid gap-8 rounded-[18px] bg-ink p-7 text-paper md:p-12 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-7">
                <Eyebrow className="text-paper/70">For technical teams</Eyebrow>
                <h2 className="t-h2 mt-4">Go deeper on architecture before the sales conversation.</h2>
                <p className="t-body mt-4 max-w-[560px] text-paper/70">
                  Talk to our engineers about API and MCP access, feed delivery, entitlements, identity and data handling. We’ll share technical documentation as part of the call.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
                <Button href="/contact?topic=technical" variant="light" arrow cta="deployment-technical">
                  Book a technical call
                </Button>
                <Button href="/security" variant="outline-light">
                  Security overview
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 9 · Practical questions */}
      <Section surface="paper" id="faq" className="scroll-mt-[calc(var(--header-h)+48px)]">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Practical questions" title="Before you talk to us." lead="Seats, scope, security and how teams usually expand." />
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
