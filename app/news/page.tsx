import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Arrow, Button } from "@/components/ui/Button";
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
      <section data-tone="light" className="border-y border-ink/10 bg-paper py-8">
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
      <Section surface="lake" id="announcements" className="scroll-mt-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x">
          <SectionHeader eyebrow="Company announcements" title="Official updates from Reflexivity." align="split" lead="Partnerships, product launches, recognition and funding, from the source." />
          <div className="mt-14 grid gap-4 md:mt-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04] p-7 md:p-10">
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lake-500/30 blur-3xl" />
                <div className="relative flex items-start justify-between gap-6">
                  <p className="t-ui text-paper/60">
                    Latest · {lead.tag} · <time dateTime={lead.date}>{formatNewsDate(lead.date)}</time>
                  </p>
                  <PrecisionIcon name={TAG_ICON[lead.tag]} className="h-14 w-14 shrink-0 text-paper transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:rotate-[30deg]" />
                </div>
                <h3 className="t-h2 relative mt-10 max-w-[620px] text-balance md:mt-16">{lead.title}</h3>
                <p className="t-body relative mt-5 max-w-[600px] text-paper/72">{lead.summary}</p>
                <div className="relative mt-auto flex flex-wrap gap-3 pt-10">
                  <Button href="/deployment#platform" variant="light" arrow>
                    See Microsoft 365 access
                  </Button>
                </div>
              </article>
            </Reveal>
            <Stagger className="flex flex-col gap-4 lg:col-span-5">
              {rest.map((a) => (
                <StaggerItem key={a.title} as="article" className="group flex gap-5 rounded-[14px] border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:bg-white/[0.06]">
                  <PrecisionIcon name={TAG_ICON[a.tag]} className="h-9 w-9 shrink-0 text-paper/90 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[24deg]" />
                  <div>
                    <p className="t-ui text-[11px] text-paper/50">
                      {a.tag} · <time dateTime={a.date}>{formatNewsDate(a.date)}</time>
                    </p>
                    <h3 className="mt-2 font-display text-[17px] font-semibold leading-[1.3]">{a.title}</h3>
                    <p className="t-small mt-2 text-paper/62">{a.summary}</p>
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
          <SectionHeader eyebrow="In the press" title="Coverage and commentary." align="split" lead="Our team’s views on markets and AI, as featured on CNBC, Bloomberg, Reuters, Barron’s and more." />
          <Reveal className="mt-12 md:mt-16" amount={0.05}>
            <PressFeed />
          </Reveal>
        </div>
      </Section>

      {/* Press contact */}
      <Section surface="mist" id="press-contact" tight className="scroll-mt-24 border-t border-ink/8">
        <div className="container-x">
          <div className="grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="relative flex h-full flex-col overflow-hidden rounded-[18px] bg-ink p-7 text-paper md:p-10" data-tone="dark">
                <div className="pointer-events-none absolute inset-0 field-ink" />
                <div className="relative flex items-start justify-between gap-6">
                  <p className="t-ui text-paper/55">Press contact</p>
                  <PrecisionIcon name="signal" className="h-12 w-12 text-paper" />
                </div>
                <h2 className="t-h2 relative mt-10 max-w-[520px]">Writing about AI in markets?</h2>
                <p className="t-body relative mt-4 max-w-[520px] text-paper/70">
                  Reach our communications team for interviews, commentary from our leadership, company information and brand assets.
                </p>
                <div className="relative mt-9 flex flex-wrap gap-3">
                  <Button href="/contact?topic=press" variant="light" arrow cta="news-press">
                    Contact the press team
                  </Button>
                </div>
              </div>
            </Reveal>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {[
                { href: "/about", title: "About Reflexivity", body: "Who we are, our leadership, and why we built the platform." },
                { href: "/blog", title: "Read the blog", body: "Perspectives and product thinking from the team." },
              ].map((l) => (
                <StaggerItem key={l.href}>
                  <Link href={l.href} className="group flex h-full flex-col rounded-[14px] border border-ink/10 bg-white/60 p-6 transition-[border-color,background-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-ink/25 hover:bg-white md:p-7">
                    <h3 className="t-h3">{l.title}</h3>
                    <p className="t-small mt-2 text-ink/62">{l.body}</p>
                    <span className="mt-auto flex items-center gap-2 pt-6 font-display text-[15px] font-medium">
                      Explore <Arrow />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
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
