import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/Blocks";
import { Stage } from "@/components/product/ui";
import { TERMS } from "@/lib/legal";
import { LegalDocument } from "../_legal/LegalDocument";
import { LegalIndex } from "../_legal/LegalIndex";
import { LegalMeta } from "../_legal/LegalMeta";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The Reflexivity Service Agreement: access, license and use restrictions, confidentiality, data provider notices, liability and other terms.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const sections = TERMS.blocks.flatMap((b) => (b.type === "h2" ? [b.text] : []));
  return (
    <>
      <PageHero
        trail={[{ label: "Legal" }, { label: "Terms" }]}
        title={TERMS.title}
        lead={<p>The Reflexivity Service Agreement, which sets out the terms on which you subscribe to and use the Reflexivity platform.</p>}
        actions={
          <LegalMeta updated={TERMS.updated} iso="2026-01-01">
            <Button href="/data-notices" variant="secondary" arrow>
              Data provider notices
            </Button>
          </LegalMeta>
        }
        visual={
          <Stage field="mist" className="p-4 sm:p-8 md:p-10">
            <LegalIndex title="Reflexivity Service Agreement" kicker="Knabble, Inc. · RSA" sections={sections} icon="chain" footer="Governed by the laws of the State of New York" />
          </Stage>
        }
      />
      <Section surface="paper" className="border-t border-ink/8 !pt-14 md:!pt-20">
        <div className="container-x">
          <LegalDocument doc={TERMS} />
        </div>
      </Section>
      <CTABand
        title="Licensing Reflexivity for a team?"
        lead="Talk to us about multi-user access, deployment options and the right agreement for your firm."
        secondary={{ label: "Explore Deployment Options", href: "/deployment" }}
        note={null}
        cta="terms-final"
      />
    </>
  );
}
