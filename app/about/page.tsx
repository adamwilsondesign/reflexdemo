import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Arrow, Button } from "@/components/ui/Button";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import { WordmarkStrip } from "@/components/ui/LogoStrip";
import { SplitText } from "@/components/ui/SplitText";
import { INVESTORS } from "@/lib/logos";
import { DurableOrbit } from "./_components/DurableOrbit";
import { Offices } from "./_components/Offices";

export const metadata: Metadata = {
  title: "About Reflexivity: Built by Investors, for Investors",
  description:
    "Reflexivity is built by operators from Duquesne, Brevan Howard, Fortress and Kensho. Meet the leadership team, see what we believe, and find our offices in New York, London and Tokyo.",
};

const CREDENTIALS = ["Duquesne", "Brevan Howard", "Fortress", "Kensho"];

const TEAM = [
  {
    name: "Jan Szilagyi",
    role: "Chief Executive Officer",
    bio: "Former Co-CIO at Lombard Odier and portfolio manager at Fortress. Managed a $15B global macro book before founding Reflexivity.",
    img: "/framer/DIiqEWaWAs6FbiqChsKjpdbVaFE.jpg",
  },
  {
    name: "Giuseppe Sette",
    role: "President & Co-founder",
    bio: "Co-founded Reflexivity. Writes and speaks on AI in wealth and asset management, including for Barron’s.",
    img: "/framer/9qCZXlPC6KMTAvRLkHgZURjy9g.jpg",
  },
  {
    name: "Armenak Mayalian",
    role: "Chief Technology Officer",
    bio: "Leads engineering, data infrastructure and the systems behind the Knowledge Graph.",
    img: "/framer/0y6JYkLhFhbLpT0AAAkMWtCY2w.jpg",
  },
  {
    name: "RJ Assaly",
    role: "Chief Product Officer",
    bio: "Former Product Lead at Kensho (acquired by S&P Global). Previously at AllianceBernstein.",
    img: "/framer/BZAHSpNG3qX5SfB2vKT3tOv36zU.jpg",
  },
  {
    name: "Katherine Plumlee",
    role: "Chief Strategy Officer",
    bio: "Leads strategy, partnerships and how Reflexivity reaches institutional clients.",
    img: "/framer/6EPNrdh7fviYBALUtv9xxLgbfic.jpg",
  },
];

const BELIEFS = [
  {
    icon: "stack" as const,
    title: "The data",
    body: "Institutional data is integrated into the platform, so answers start from sources rather than guesses.",
  },
  {
    icon: "knot" as const,
    title: "The Knowledge Graph",
    body: "Relationships are stored, not invented at question time. The Graph maps how companies connect through products, customers, competitors, themes and geographies.",
    href: "/knowledge-graph",
    linkLabel: "How the Graph works",
  },
  {
    icon: "signal" as const,
    title: "The monitoring",
    body: "Insights watches the holdings and themes you follow for catalysts, earnings and theme shifts, and each item says why it appeared.",
    href: "/insights",
    linkLabel: "See Insights",
  },
  {
    icon: "chain" as const,
    title: "The audit trail",
    body: "Sources and code stay when the model changes. Claims link to their sources, and missing data is flagged rather than filled.",
    href: "/auditability-data",
    linkLabel: "Auditability & Data",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Company" }, { label: "About" }]}
        title="A team that has worked inside the firms Reflexivity is built for."
        lead="Reflexivity’s leadership has managed global macro investing, founded fintech companies and led product at Kensho, so the platform starts from how investment research gets done."
        secondary={{ label: "Meet the team", href: "#team" }}
        cta="about-hero"
        visual={<DurableOrbit />}
      >
        <div className="mt-12 border-t border-ink/12 pt-6">
          <p className="t-ui text-ink/50">Built by operators from</p>
          <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
            {CREDENTIALS.map((c) => (
              <li key={c} className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink/70">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      {/* Origin */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="t-ui text-paper/60">Why we built it</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <SplitText
              text="Reflexivity is the market platform our CEO wished he’d had while managing a $15B global macro book."
              className="font-display text-[30px] font-medium leading-[1.2] tracking-[-0.02em] md:text-[44px]"
            />
            <Reveal delay={0.2}>
              <p className="t-lead mt-8 max-w-[640px] text-paper/70">
                One place to see how a development connects across a book, test the idea behind it, and check every step of the work. The team has run money, built research tools and shipped products at institutions where that work has to stand up to scrutiny.
              </p>
              <Link href="/platform" className="group mt-8 inline-flex items-center gap-2 font-display text-[15px] font-medium">
                <span className="link-underline">See what we built</span> <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section surface="paper" id="team" className="scroll-mt-[var(--header-h)]">
        <div className="container-x">
          <SectionHeader
            eyebrow="Leadership"
            title="Built by investors, for investors."
            align="split"
            lead="Led by former portfolio managers and technologists from leading financial institutions."
          />
          <Stagger className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-3 lg:grid-cols-5">
            {TEAM.map((p) => (
              <StaggerItem key={p.name} as="article" className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-mist-200">
                  <Image
                    src={p.img}
                    alt={`Portrait of ${p.name}`}
                    fill
                    sizes="(min-width:1024px) 20vw, (min-width:768px) 33vw, 50vw"
                    className="object-cover grayscale transition-[filter,transform] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                </div>
                <h3 className="t-h3 mt-5">{p.name}</h3>
                <p className="t-ui mt-1.5 text-ink/55">{p.role}</p>
                <p className="t-small mt-3 text-ink/65">{p.bio}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* What we believe */}
      <Section surface="ink" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 field-ink" />
        <div className="container-x">
          <SectionHeader
            eyebrow="What we believe"
            title="Models will keep improving, so we build what lasts around them."
            lead="The durable work is the data, the Knowledge Graph, the monitoring and the audit trail around the model. That’s where we put our effort."
            maxW="max-w-[880px]"
          />
          <FeatureGrid items={BELIEFS} cols={4} onDark className="mt-14 md:mt-20" />
        </div>
      </Section>

      {/* Investors */}
      <Section surface="paper" tight className="border-b border-ink/8">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <p className="t-ui shrink-0 text-ink/50 md:max-w-[200px]">Supported by world-class investors</p>
              <WordmarkStrip names={INVESTORS} className="w-full min-w-0" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Offices */}
      <Section surface="mist">
        <div className="container-x">
          <SectionHeader
            eyebrow="Offices"
            title="New York, London and Tokyo."
            align="split"
            lead="A distributed team with hubs in three financial centres."
            actions={
              <Link href="/contact" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
                <span className="link-underline">Contact us</span> <Arrow />
              </Link>
            }
          />
          <Reveal className="mt-12 md:mt-16">
            <Offices />
          </Reveal>
        </div>
      </Section>

      {/* Careers link (detail lives on /careers) */}
      <Section surface="paper" tight>
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col gap-6 rounded-[18px] border border-ink/10 bg-white p-7 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="t-ui text-ink/50">Careers</p>
                <h2 className="t-h2 mt-3">Help build institutional market infrastructure.</h2>
                <p className="t-body mt-3 max-w-[560px] text-ink/65">We’re hiring across engineering, machine learning and product in New York and London.</p>
              </div>
              <Button href="/careers" variant="secondary" arrow className="shrink-0">
                See open roles
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand title="See what this team has built." lead="Bring a question, a watchlist or a thesis, and see how Reflexivity works on it." cta="about-final" />
    </>
  );
}
