import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { LinkRowsBlock } from "@/components/ui/Layouts";
import { CTABand } from "@/components/ui/Blocks";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { ANNOUNCEMENTS, PRESS, formatNewsDate, type Announcement } from "./_components/data";
import { PressWire } from "./_components/PressWire";
import { PressFeed } from "./_components/PressFeed";
import { Wordmark } from "./_components/Wordmark";

export const metadata: Metadata = {
  title: "News & Press",
  description:
    "Company announcements and press coverage of Reflexivity, the AI investment research platform: partnerships, product launches, funding, and commentary on CNBC, Bloomberg, Reuters and Barron’s.",
  alternates: { canonical: "/news" },
};

const TAG_ICON: Record<Announcement["tag"], IconName> = { Product: "stack", Partnership: "chain", Award: "star", Funding: "signal" };

export default function NewsPage() {
  const [lead, ...rest] = ANNOUNCEMENTS;
  const outlets = Array.from(new Set(PRESS.flatMap((p) => (p.outlet ? [p.outlet] : []))));

  return (
    <>
      <PageHero
        trail={[{ label: "Resources" }, { label: "News & Press" }]}
        title="Press & Media"
        lead="The latest news and announcements from Reflexivity: company updates, partnerships and product launches, alongside coverage and commentary from our team."
        visual={<PressWire />}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/book-a-demo" arrow cta="news-hero">
              Request a Demo
            </Button>
            <Button href="/contact?topic=press" variant="secondary">
              Press enquiries
            </Button>
          </div>
        }
      >
        <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/12 pt-6">
          <a href="#announcements" className="group/a inline-flex items-center gap-2 font-display text-[15px] font-medium">
            <span className="link-underline">Company announcements</span>
            <span className="font-mono text-[11px] text-ink/45">{ANNOUNCEMENTS.length}</span>
          </a>
          <a href="#press" className="group/a inline-flex items-center gap-2 font-display text-[15px] font-medium">
            <span className="link-underline">In the press</span>
            <span className="font-mono text-[11px] text-ink/45">{PRESS.length}</span>
          </a>
          <a href="#press-contact" className="group/a inline-flex items-center gap-2 font-display text-[15px] font-medium">
            <span className="link-underline">Press contact</span>
          </a>
        </nav>
      </PageHero>

      {/* Outlet strip */}
      <section data-tone="light" data-bg="#f4f3f1" className="border-y border-ink/10 bg-paper py-8">
        <div className="container-x flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
          <p className="t-ui shrink-0 text-ink/50">As covered in</p>
          <ul className="flex flex-wrap items-center gap-x-9 gap-y-4 text-ink/70">
            {outlets.map((o) => (
              <li key={o}>
                <Wordmark outlet={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Company announcements */}
      <Section surface="pine" id="announcements" className="scroll-mt-24">
        <div className="container-x">
          <SectionHeader title="Official updates from Reflexivity." align="split" lead="Partnerships, product launches, recognition and funding, from the source." />
          <div className="mt-14 grid border-l border-t border-white/15 md:mt-16 lg:grid-cols-12">
            <Reveal className="border-b border-r border-white/15 lg:col-span-7">
              <article className="flex h-full flex-col p-7 md:p-10">
                <PrecisionIcon name={TAG_ICON[lead.tag]} className="h-12 w-12 text-paper md:h-14 md:w-14" />
                <h3 className="t-h2 mt-12 max-w-[620px] text-balance md:mt-20">{lead.title}</h3>
                <p className="t-label mt-4 text-paper/60">
                  {lead.tag} · <time dateTime={lead.date}>{formatNewsDate(lead.date)}</time>
                </p>
                <p className="t-body mt-5 max-w-[600px] text-paper/75">{lead.summary}</p>
                <div className="mt-auto flex flex-wrap gap-3 pt-10">
                  <Button href="/deployment#platform" variant="light" arrow>
                    See Microsoft 365 access
                  </Button>
                </div>
              </article>
            </Reveal>
            <Stagger className="flex flex-col lg:col-span-5">
              {rest.map((a) => (
                <StaggerItem key={a.title} as="article" className="flex flex-1 gap-5 border-b border-r border-white/15 p-6 md:p-7">
                  <PrecisionIcon name={TAG_ICON[a.tag]} className="h-9 w-9 shrink-0 text-paper/90" />
                  <div>
                    <h3 className="font-display text-[17px] font-semibold leading-[1.3]">{a.title}</h3>
                    <p className="t-label mt-1.5 text-[13px] text-paper/55">
                      {a.tag} · <time dateTime={a.date}>{formatNewsDate(a.date)}</time>
                    </p>
                    <p className="t-small mt-3 text-paper/70">{a.summary}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* In the press */}
      <Section surface="paper" id="press" className="scroll-mt-24">
        <div className="container-x">
          <SectionHeader title="Coverage and commentary." align="split" lead="Our team’s views on markets and AI, as featured on CNBC, Bloomberg, Reuters, Barron’s and more." />
          <Reveal className="mt-12 md:mt-16" amount={0.05}>
            <PressFeed />
          </Reveal>
        </div>
      </Section>

      {/* Press contact */}
      <Section surface="mist" id="press-contact" className="scroll-mt-24">
        <div className="container-x">
          <LinkRowsBlock
            title="Writing about AI in markets?"
            lead="Reach our communications team for interviews, commentary from our leadership, company information and brand assets."
            rows={[
              { label: "Contact the press team", href: "/contact?topic=press", note: "Interviews, commentary and brand assets.", cta: "news-press" },
              { label: "About Reflexivity", href: "/about", note: "Who we are, our leadership, and why we built the platform." },
              { label: "Read the blog", href: "/blog", note: "Perspectives and product thinking from the team." },
            ]}
          />
        </div>
      </Section>

      <CTABand
        title="See what the coverage is about."
        lead="Bring a question, a watchlist or a theme, and see how Reflexivity researches it with sources you can inspect."
        secondary={{ label: "Explore the platform", href: "/platform" }}
        cta="news-final"
      />
    </>
  );
}
