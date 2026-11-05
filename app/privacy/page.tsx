import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/Blocks";
import { Stage } from "@/components/product/ui";
import { PRIVACY } from "@/lib/legal";
import { LegalDocument } from "../_legal/LegalDocument";
import { LegalIndex } from "../_legal/LegalIndex";
import { LegalMeta } from "../_legal/LegalMeta";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Reflexivity (Knabble, Inc.) collects, uses, shares and protects personal data, and how to exercise your privacy rights.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const sections = PRIVACY.blocks.flatMap((b) => (b.type === "h2" ? [b.text] : []));
  return (
    <>
      <PageHero
        trail={[{ label: "Legal" }, { label: "Privacy" }]}
        title={PRIVACY.title}
        lead={<p>What personal data Reflexivity collects, why, how it is used and shared, and how to contact us about your rights.</p>}
        actions={
          <LegalMeta updated={PRIVACY.updated} iso="2022-01-26">
            <Button href="mailto:privacy@reflexivity.com" variant="secondary">
              privacy@reflexivity.com
            </Button>
          </LegalMeta>
        }
        visual={
          <Stage field="mist" className="p-4 sm:p-8 md:p-10">
            <LegalIndex title={PRIVACY.title} kicker="Knabble, Inc. · Reflexivity" sections={sections} icon="eye" footer="Applies to reflexivity.com, reflexivity.ai, toggle.global and toggle.ai" />
          </Stage>
        }
      />
      <Section surface="paper" className="border-t border-ink/8 !pt-14 md:!pt-20">
        <div className="container-x">
          <LegalDocument doc={PRIVACY} />
        </div>
      </Section>
      <CTABand
        title="Questions about how your data is handled?"
        lead="Our Security page covers controls, deployment and data handling for institutional teams."
        secondary={{ label: "Review Security", href: "/security" }}
        note={null}
        cta="privacy-final"
      />
    </>
  );
}
