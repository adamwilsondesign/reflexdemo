import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "./_home/HomeHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Arrow, Button } from "@/components/ui/Button";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { CTABand, Testimonials } from "@/components/ui/Blocks";
import { DataSourceLogos, WordmarkStrip } from "@/components/ui/LogoStrip";
import { CUSTOMERS } from "@/lib/logos";
import { Differentiators } from "./_home/Differentiators";
import { WorkedExample } from "./_home/WorkedExample";

const VALUE = [
  {
    icon: "rings" as const,
    title: "Uncover hidden exposures.",
    body: "Map how companies, products, and themes connect, including the non-obvious.",
    href: "/knowledge-graph",
    link: "How the Knowledge Graph works",
  },
  {
    icon: "signal" as const,
    title: "Stay ahead of market-moving developments.",
    body: "Automatically surface relevant catalysts and their ripple effects.",
    href: "/insights",
    link: "See Insights",
  },
  {
    icon: "lattice" as const,
    title: "Research and test investment ideas faster.",
    body: "From deep research to portfolio stress tests, in minutes.",
    href: "/alfred",
    link: "Meet Alfred",
  },
];

const AUDIENCES = [
  {
    name: "Hedge Funds",
    body: "Find differentiated ideas, watch the book, and pressure-test hypotheses with cited, code-backed work.",
    img: "/framer/k1knLywObjJMAOj536UeeZ4eY.jpg",
    href: "/customers#hedge-funds",
  },
  {
    name: "Financial Institutions",
    body: "Add Reflexivity’s relationship layer, analyst, and insights to products and workflows you already distribute.",
    img: "/framer/Dd9zT54vlMJTmKcjvXlX8B1f1A8.jpg",
    href: "/customers#financial-institutions",
  },
  {
    name: "Asset Managers",
    body: "Connect research, construction, exposure, monitoring, and committee narrative in one environment.",
    img: "/framer/ESoFHJ32ORe23sIU6aWl8eSvr2I.jpg",
    href: "/customers#asset-managers",
  },
  {
    name: "Wealth Managers & RIAs",
    body: "Client-ready explanations tied to holdings, in language an advisor can use the same day.",
    img: "/framer/4i2yo5gNdSVh0olwWRw40Bo2h10.jpg",
    href: "/customers#wealth-managers",
  },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* 2 · Trusted by (customers only — data vendors live in their own labelled strip below) */}
      <section data-tone="light" className="border-y border-ink/10 bg-paper py-9">
        <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
          <p className="t-ui shrink-0 text-ink/50">Trusted by</p>
          <WordmarkStrip names={CUSTOMERS} className="w-full min-w-0" />
        </div>
      </section>

      {/* 3 · Investor value */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-60" />
        <div className="container-x">
          <SectionHeader eyebrow="What Reflexivity helps you do" title="Find what matters. Understand what comes next." maxW="max-w-[820px]" />
          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-[14px] bg-white/10 md:mt-20 md:grid-cols-3">
            {VALUE.map((v) => (
              <StaggerItem key={v.title} className="group relative flex flex-col bg-lake-900 p-7 transition-colors duration-500 hover:bg-[#2a3a4f] md:p-9">
                <PrecisionIcon name={v.icon} className="h-12 w-12 text-paper transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:rotate-[30deg] group-hover:scale-110" />
                <h3 className="t-h3 mt-12 max-w-[300px] text-[24px] md:mt-20 md:text-[26px]">{v.title}</h3>
                <p className="t-body mt-4 max-w-[320px] text-paper/70">{v.body}</p>
                <Link href={v.href} className="group/l mt-10 inline-flex items-center gap-2 font-display text-[15px] font-medium text-paper">
                  <span className="link-underline">{v.link}</span>
                  <Arrow />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* 4 · Differentiation */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            eyebrow="Why Reflexivity"
            title="Built to catch what others miss."
            align="split"
            lead="Underneath every answer is a Knowledge Graph that maps market relationships, supported by institutional data and analysis you can inspect."
          />
          <div className="mt-14 md:mt-20">
            <Differentiators />
          </div>
          <div className="mt-20 border-t border-ink/10 pt-10 md:mt-28">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <p className="t-ui shrink-0 text-ink/50">
                Data and content sources
              </p>
              <DataSourceLogos className="w-full min-w-0" />
            </div>
            <p className="t-small mt-6 max-w-[620px] text-ink/55">
              Natively integrated data from LSEG, S&amp;P Global, Cboe, Dow Jones, Nasdaq, Quartr, and more.{" "}
              <Link href="/auditability-data" className="link-underline text-ink">How sourcing works</Link>
            </p>
          </div>
        </div>
      </Section>

      {/* Worked example: one market event → connected exposure → follow-up → inspection */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader eyebrow="One workflow, end to end" title="From a headline to a decision you can defend." lead="A worked example of how the Knowledge Graph, Insights, and Alfred fit together on a single market event." />
          <WorkedExample />
        </div>
      </Section>

      {/* 5 · Who we work with */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader eyebrow="Who we work with" title="Built for the way you invest." align="split" lead="The same platform, framed around how each firm actually works." />
          <Stagger className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((a, i) => (
              <StaggerItem key={a.name} className={i === 0 ? "lg:col-span-1" : ""}>
                <Link href={a.href} className="group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-ink/10 bg-white/60 transition-[border-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-ink/25">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={a.img} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw" className="object-cover grayscale-[0.3] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
                    {i === 0 && <span className="t-ui absolute left-4 top-4 rounded-full bg-paper/90 px-2.5 py-1 text-[10px] text-ink">Most popular</span>}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="t-h3">{a.name}</h3>
                    <p className="t-body mt-2.5 text-ink/65">{a.body}</p>
                    <span className="mt-auto flex items-center gap-2 pt-6 font-display text-[15px] font-medium">
                      See how {a.name.split(" ")[0].toLowerCase() === "wealth" ? "advisors" : "teams"} use it <Arrow />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* 6 · Testimonials */}
      <Section surface="lake">
        <div className="container-x">
          <Reveal>
            <Eyebrow className="mb-5 text-paper">Customers</Eyebrow>
          </Reveal>
          <Testimonials onDark title="Trusted by investors who use it every day." />
        </div>
      </Section>

      {/* 7 · Access + integration */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            eyebrow="Deployment"
            title="Your research platform. Your existing stack."
            align="split"
            lead="Access Reflexivity through our complete platform, or integrate our solutions into the tools and systems your team already uses."
            actions={<Button href="/deployment" variant="secondary" arrow>Explore Deployment Options</Button>}
          />
          <Stagger className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2">
            <StaggerItem>
              <DoorCard
                href="/deployment#platform"
                kicker="Platform Access"
                title="Seats in a maintained environment"
                body="Alfred, the Knowledge Graph, integrated data, Insights and Microsoft 365 in one maintained environment, for teams that don’t want to run the infrastructure."
                tags={["Alfred", "Knowledge Graph", "Insights", "Microsoft 365"]}
                icon="stack"
              />
            </StaggerItem>
            <StaggerItem>
              <DoorCard
                href="/deployment#api-mcp"
                kicker="API · MCP · Custom integration"
                title="The same layer, inside your stack"
                body="Keep the tools you already run, and plug in the layer they lack: entity resolution, the Knowledge Graph, monitoring and auditability."
                tags={["API", "MCP", "Knowledge feeds", "Embedded"]}
                icon="knot"
                dark
              />
            </StaggerItem>
          </Stagger>
        </div>
      </Section>

      {/* 8 · Final CTA */}
      <CTABand title="See what Reflexivity can uncover for you." lead="Explore the connections, risks, and opportunities across your own coverage universe." cta="home-final" />
    </>
  );
}

function DoorCard({ href, kicker, title, body, tags, icon, dark = false }: { href: string; kicker: string; title: string; body: string; tags: string[]; icon: "stack" | "knot"; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={
        "group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-[16px] p-7 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-10 " +
        (dark ? "bg-ink text-paper" : "border border-ink/10 bg-white text-ink")
      }
    >
      <div className={"pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 " + (dark ? "bg-chart-dark" : "bg-chart")} />
      <div className="relative flex items-start justify-between">
        <p className={"t-ui " + (dark ? "text-paper/55" : "text-ink/55")}>{kicker}</p>
        <PrecisionIcon name={icon} className="h-12 w-12 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:rotate-90" />
      </div>
      <h3 className="t-h2 relative mt-auto max-w-[420px] pt-16">{title}</h3>
      <p className={"t-body relative mt-4 max-w-[480px] " + (dark ? "text-paper/70" : "text-ink/70")}>{body}</p>
      <div className="relative mt-7 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className={"rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.04em] " + (dark ? "border-white/15 text-paper/70" : "border-ink/12 text-ink/65")}>
              {t}
            </li>
          ))}
        </ul>
        <span className="flex items-center gap-2 font-display text-[15px] font-medium">
          Learn more <Arrow />
        </span>
      </div>
    </Link>
  );
}
