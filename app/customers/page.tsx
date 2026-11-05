import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABand, FeatureGrid, TESTIMONIALS, Testimonials } from "@/components/ui/Blocks";
import { LinkRowsBlock } from "@/components/ui/Layouts";
import { FirmRouter } from "./_components/FirmRouter";
import { AudienceSection } from "./_components/AudienceSection";
import { AUDIENCES, ROLES } from "./_components/data";

export const metadata: Metadata = {
  title: "Solutions by Firm: Hedge Funds, Institutions, Asset & Wealth Managers",
  description:
    "How hedge funds, financial institutions, asset managers and wealth managers use Reflexivity: the same Knowledge Graph, Alfred and Insights, framed around each firm’s workflows.",
};

const [HF, FI, AM, WM] = AUDIENCES;

export default function CustomersPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Solutions" }, { label: "By firm type" }]}
        title="One platform, set up around how your firm works."
        lead="Built for hedge funds, financial institutions, wealth teams and asset managers, with the same Knowledge Graph, Alfred and Insights framed around each one’s work."
        secondary={{ label: "Find your firm type", href: "#firms" }}
        cta="customers-hero"
        visual={<FirmRouter />}
      />

      {/* Audience router */}
      <Section surface="ink" id="firms" className="scroll-mt-[var(--header-h)]">
        <div className="container-x">
          <LinkRowsBlock
            onDark
            title="Different decisions. A shared need for evidence."
            lead="From a hedge fund’s book to a wealth team’s client note, here’s what Reflexivity does for each kind of firm."
            rows={AUDIENCES.map((a) => ({ label: a.name, href: `#${a.id}`, note: a.card }))}
          />
          <LinkRowsBlock
            onDark
            className="mt-20 md:mt-28"
            title="Or start from your role."
            rows={ROLES.map((r) => ({ label: r.role, href: r.href, note: r.body }))}
          />
        </div>
      </Section>

      <AudienceSection a={HF} surface="paper" field="lake" quote={TESTIMONIALS[1]} />
      <AudienceSection a={FI} surface="pine" field="mist" />
      <AudienceSection a={AM} surface="paper" field="lake" />
      <AudienceSection a={WM} surface="mist" field="pine" />

      {/* Testimonials */}
      <Section surface="lake" id="testimonials">
        <div className="container-x">
          <Testimonials onDark items={[TESTIMONIALS[0]]} title="A daily tool for the modern portfolio manager." />
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
