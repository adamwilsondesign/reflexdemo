import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import { TextLink } from "@/components/ui/Layouts";
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
    href: "/alfred#trust",
    linkLabel: "How Alfred shows its work",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        actions={null}
        trail={[{ label: "Company" }, { label: "About" }]}
        title="A team that has worked inside the firms Reflexivity is built for."
        lead="Reflexivity’s leadership has managed global macro investing, founded fintech companies and led product at Kensho, so the platform starts from how investment research gets done."
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
      <Section surface="mist">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SplitText
            text="Reflexivity is the market platform our CEO wished he’d had while managing a $15B global macro book."
            className="t-h2"
          />
          <Reveal delay={0.2} className="lg:pt-2">
            <p className="t-lead text-ink/72">
              One place to see how a development connects across a book, test the idea behind it, and check every step of the work. The team has run money, built research tools and shipped products at institutions where that work has to stand up to scrutiny.
            </p>
            <TextLink href="/platform" className="mt-8">See what we built</TextLink>
          </Reveal>
        </div>
      </Section>

      {/* Team */}
      <Section surface="ink" id="team" className="scroll-mt-[var(--header-h)]">
        <div className="container-x">
          <SectionHeader
            title="Built by investors, for investors."
            align="split"
            lead="Led by former portfolio managers and technologists from leading financial institutions."
          />
          <Stagger className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-3 lg:grid-cols-5">
            {TEAM.map((p) => (
              <StaggerItem key={p.name} as="article" className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-graphite">
                  <Image
                    src={p.img}
                    alt={`Portrait of ${p.name}`}
                    fill
                    sizes="(min-width:1024px) 20vw, (min-width:768px) 33vw, 50vw"
                    className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                  />
                </div>
                <h3 className="t-h3 mt-5">{p.name}</h3>
                <p className="t-label mt-1 text-paper/55">{p.role}</p>
                <p className="t-small mt-3 text-paper/68">{p.bio}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* What we believe */}
      <Section surface="pine">
        <div className="container-x">
          <SectionHeader
            title="Models will keep improving, so we build what lasts around them."
            align="split"
            lead="The durable work is the data, the Knowledge Graph, the monitoring and the audit trail around the model. That’s where we put our effort."
          />
          <FeatureGrid items={BELIEFS} cols={4} onDark className="mt-14 md:mt-20" />
        </div>
      </Section>

      {/* Offices */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            title="New York, London and Tokyo."
            align="split"
            lead="A distributed team with hubs in three financial centres."
            actions={
              <div>
                <TextLink href="/contact">Contact us</TextLink>
              </div>
            }
          />
          <Reveal className="mt-12 md:mt-16">
            <Offices />
          </Reveal>
        </div>
      </Section>

      {/* Investors */}
      <Section surface="lake">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SplitText text="Supported by world-class investors." className="t-h2 max-w-[460px]" />
          </div>
          <Stagger as="ul" className="grid grid-cols-2 border-t border-white/20">
            {INVESTORS.map((n) => (
              <StaggerItem
                as="li"
                key={n}
                className="border-b border-white/20 py-5 pr-4 font-display text-[18px] font-medium tracking-[-0.01em] text-paper/85 odd:border-r odd:border-white/20 even:pl-5 md:py-6 md:text-[21px] md:even:pl-8"
              >
                {n}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Careers link (detail lives on /careers) */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            title="Help build institutional market infrastructure."
            align="split"
            lead="We’re hiring across engineering, machine learning and product in New York and London."
            actions={
              <div>
                <Button href="/careers" variant="secondary" arrow>
                  See open roles
                </Button>
              </div>
            }
          />
        </div>
      </Section>

      <CTABand title="See what this team has built." lead="Bring a question, a watchlist or a thesis, and see how Reflexivity works on it." cta="about-final" />
    </>
  );
}
