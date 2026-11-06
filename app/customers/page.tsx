import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { CTABand, TESTIMONIALS, Testimonials } from "@/components/ui/Blocks";
import { TextLink } from "@/components/ui/Layouts";
import { FirmPanel } from "./_components/FirmPanel";
import { FIRMS } from "./_components/firms";

export const metadata: Metadata = {
  title: "Solutions by Firm: Hedge Funds, Institutions, Asset & Wealth Managers",
  description:
    "How hedge funds, financial institutions, asset managers and wealth managers use Reflexivity: the same Knowledge Graph, Alfred and Insights, pointed at each firm’s work.",
};

export default function CustomersPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Solutions" }, { label: "By firm type" }]}
        title="One platform, set up around how your firm works."
        lead="The same Knowledge Graph, Alfred and Insights, pointed at the questions your firm asks every day."
        cta="customers-hero"
        visual={<FirmPanel />}
      />

      {/* Firm types: one compact row each. Anchors are linked from the homepage. */}
      <Section surface="lake" id="firms" className="scroll-mt-[var(--header-h)]">
        <div className="container-x">
          <div className="grid-12 gap-y-6">
            <SplitText text="Different decisions. The same need for evidence." className="t-h2 col-span-12 lg:col-span-6" />
            <Reveal delay={0.15} className="col-span-12 flex items-end lg:col-span-6">
              <p className="t-lead text-paper/72">What changes from firm to firm is the work, not the platform underneath it.</p>
            </Reveal>
          </div>

          <Stagger as="ul" className="mt-16 border-t border-white/20 md:mt-20">
            {FIRMS.map((f) => (
              <StaggerItem as="li" key={f.id} className="border-b border-white/20">
                <div id={f.id} className="grid-12 scroll-mt-[calc(var(--header-h)+32px)] gap-y-4 py-8 md:py-10">
                <h3 className="t-h3 col-span-12 lg:col-span-4">{f.name}</h3>
                <p className="t-body col-span-12 max-w-[560px] text-paper/72 lg:col-span-5">{f.body}</p>
                <ul className="col-span-12 flex flex-wrap gap-x-6 gap-y-3 lg:col-span-3 lg:flex-col lg:items-start">
                  {f.links.map((l) => (
                    <li key={l.href}>
                      <TextLink href={l.href}>{l.label}</TextLink>
                    </li>
                  ))}
                </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section surface="paper">
        <div className="container-x">
          <Testimonials items={[TESTIMONIALS[0]]} title="A daily tool for the modern portfolio manager." />
        </div>
      </Section>

      <CTABand
        title="See Reflexivity set up for your firm."
        lead="Bring your coverage, your book or a client question. We’ll show the workflow that fits how your firm works."
        secondary={{ label: "Discuss a partnership", href: "/contact?topic=partnerships" }}
        cta="customers-final"
      />
    </>
  );
}
