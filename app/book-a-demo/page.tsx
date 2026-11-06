import { CTABand } from "@/components/ui/Blocks";
import type { Metadata } from "next";
import Link from "next/link";
import { DemoHero } from "./_components/DemoHero";
import { ExamplePrompts } from "./_components/ExamplePrompts";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { HELP_URL } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "Request a live walkthrough of Reflexivity tailored to your process. Bring a question, watchlist, or example, or we’ll provide one. No confidential holdings required.",
  alternates: { canonical: "/book-a-demo" },
};

const linkCls = "text-ink underline decoration-ink/25 underline-offset-2 hover:decoration-ink";

const FAQ = [
  {
    q: "Do I need to share holdings or confidential data?",
    a: (
      <p>
        No. A list of public tickers, a research question, or one of our examples is enough for a useful session. If your team later wants to work with
        proprietary data, we&rsquo;ll walk through how it is handled. Our{" "}
        <Link href="/security" className={linkCls}>Security</Link> page covers the detail.
      </p>
    ),
  },
  {
    q: "How long is the walkthrough, and who leads it?",
    a: (
      <p>
        Typically 30 minutes, led by a Reflexivity product specialist. If you&rsquo;re evaluating an API or MCP integration, select it in the form and we&rsquo;ll
        plan the session around your stack. See{" "}
        <Link href="/deployment" className={linkCls}>deployment options</Link>.
      </p>
    ),
  },
  {
    q: "What happens after I submit the form?",
    a: <p>We follow up by email within one business day to find a time that suits you and confirm what you&rsquo;d like to cover.</p>,
  },
  {
    q: "Is this the same as the newsletter?",
    a: (
      <p>
        No. This form requests a live walkthrough. If you&rsquo;d like market and product intelligence by email instead, you can{" "}
        <Link href="/newsletter" className={linkCls}>subscribe to the newsletter</Link> separately.
      </p>
    ),
  },
  {
    q: "I’m already a customer, or I’m getting in touch about something else.",
    a: (
      <p>
        Existing customers can reach support through the{" "}
        <a href={HELP_URL} className={linkCls}>Help Center</a>. For partnerships, press, or anything else, use our{" "}
        <Link href="/contact" className={linkCls}>contact page</Link>.
      </p>
    ),
  },
];

export default function BookADemoPage() {
  return (
    <>
      <DemoHero />

      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            title="Start from real work, or borrow one of ours."
            align="split"
            lead="The walkthrough is built around a question you actually have. If you don’t have one to hand, pick an example and we’ll run it live."
          />
          <div className="mt-14 md:mt-16">
            <ExamplePrompts />
          </div>
          <p className="t-small mt-6 text-ink/50">Example prompts. Choosing one adds it to the optional field in the form; you can edit it before sending.</p>
        </div>
      </Section>

      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHeader title="Questions, answered." />
            <Reveal delay={0.2} className="mt-8">
              <p className="t-body max-w-[340px] text-ink/65">
                Want the detail first? Read how{" "}
                <Link href="/alfred#trust" className={linkCls}>sourcing and auditability</Link> work, or explore the{" "}
                <Link href="/platform" className={linkCls}>platform</Link>.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={FAQ} />
          </div>
        </div>
      </Section>

<CTABand
        title="See what Reflexivity finds in your own coverage."
        lead="Five quick fields, a follow-up within one business day, and a walkthrough shaped around how you work."
        note={null}
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <Button href="#demo-form" variant="light" arrow cta="demo-closing">
              Request a Demo
            </Button>
            <Button href="/security" variant="outline-light">
              Review Security
            </Button>
          </div>
        }
      />
    </>
  );
}
