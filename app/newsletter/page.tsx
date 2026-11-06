import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LinkRows, TextLink } from "@/components/ui/Layouts";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import { Stage } from "@/components/product/ui";
import { SubscribeForm } from "./_components/SubscribeForm";
import { IssuePreview } from "./_components/IssuePreview";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Market and product intelligence from Reflexivity, not a blast: the market relationships worth knowing, what’s new in the platform, and our latest research.",
  alternates: { canonical: "/newsletter" },
};

const RECEIVE = [
  {
    icon: "signal" as const,
    title: "Market signals",
    body: "A few developments we think matter, with the companies they touch and why.",
  },
  {
    icon: "rings" as const,
    title: "Relationships worth knowing",
    body: "One connection from the Knowledge Graph that most coverage misses, traced step by step.",
  },
  {
    icon: "stack" as const,
    title: "Product notes",
    body: "What’s new in Alfred, Insights and the Knowledge Graph, and how teams are using it.",
  },
  {
    icon: "path" as const,
    title: "Research and perspectives",
    body: "New essays from the blog on AI, markets and the craft of investment research.",
  },
];

const PROMISES = [
  { k: "Cadence", v: "About every two weeks", note: "Plus the occasional product announcement." },
  { k: "Length", v: "One focused read", note: "Short sections, each with a link to go deeper." },
  { k: "Control", v: "Unsubscribe in one click", note: "From any email, at any time." },
];

const RECENT = [
  { title: "Better Sharpe Ratio is a plumbing problem", href: "/blog/the-sharpe-ratio", tag: "Perspectives" },
  { title: "Introducing Earnings Insights: AI-Driven Intelligence for Earnings Season", href: "/blog/introducing-earnings-insights", tag: "Product" },
  { title: "MCP: From Protocol to Product", href: "/blog/mcp-from-protocol-to-product", tag: "Technology" },
  { title: "The ideal AI agent is honest, not flawless", href: "/blog/the-ideal-ai-agent-is-honest-not-flawless", tag: "Perspectives" },
];

export default function NewsletterPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Resources", href: "/blog" }, { label: "Newsletter" }]}
        title="Market and product intelligence, not a blast."
        lead={
          <p>
            A short, considered email from the Reflexivity team: the market relationships worth knowing about, what&rsquo;s new in the platform, and our latest research.
          </p>
        }
        actions={
          <div>
            <SubscribeForm />
            <p className="t-small mt-6 max-w-[480px] text-ink/55">
              Looking for a walkthrough instead?{" "}
              <Link href="/book-a-demo" className="text-ink underline decoration-ink/25 underline-offset-2 hover:decoration-ink">
                Request a demo
              </Link>{" "}
              separately.
            </p>
          </div>
        }
        visual={
          <Stage field="lake" className="p-4 sm:p-8 md:p-10">
            <IssuePreview />
          </Stage>
        }
      />

      <Section surface="pine">
        <div className="container-x">
          <SectionHeader title="Four things, every issue." align="split" lead="Built for investors who want signal, not volume. Each section is short and links to the full analysis." />
          <FeatureGrid onDark cols={4} className="mt-14 md:mt-20" items={RECEIVE} />
        </div>
      </Section>

      <Section surface="paper">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeader title="Respectful of your inbox." />
            <Stagger as="ul" className="mt-10 border-b border-ink/12">
              {PROMISES.map((p) => (
                <StaggerItem key={p.k} as="li" className="grid grid-cols-[110px_1fr] gap-4 border-t border-ink/12 py-6">
                  <span className="t-label pt-0.5 text-ink/50">{p.k}</span>
                  <span>
                    <span className="block font-display text-[17px] font-semibold">{p.v}</span>
                    <span className="t-small mt-1 block text-ink/60">{p.note}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2} className="mt-10">
              <div className="rounded-[14px] border border-ink/10 bg-white/60 p-6">
                <p className="font-display text-[17px] font-semibold">Subscribe</p>
                <p className="t-small mt-1 text-ink/60">Takes a few seconds. Work or personal address both welcome.</p>
                <SubscribeForm className="mt-6" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h3 className="t-h3">Recently from the blog</h3>
            </Reveal>
            <LinkRows className="mt-6" rows={RECENT.map((r) => ({ label: r.title, href: r.href, note: r.tag }))} />
            <Reveal delay={0.2}>
              <TextLink href="/blog" className="mt-8">Browse all articles</TextLink>
            </Reveal>
          </div>
        </div>
      </Section>

      <CTABand
        title="Want to see it on your own work?"
        lead="The newsletter shows what Reflexivity notices. A walkthrough shows what it finds in your coverage."
        secondary={{ label: "Read the blog", href: "/blog" }}
        cta="newsletter-final"
      />
    </>
  );
}
