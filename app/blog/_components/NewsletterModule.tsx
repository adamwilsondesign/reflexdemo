import Link from "next/link";
import { NewsletterForm } from "@/components/site/Footer";
import { Section } from "@/components/ui/Section";
import { FeatureGrid } from "@/components/ui/Blocks";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import type { IconName } from "@/components/ui/PrecisionIcon";

const GETS: { icon: IconName; title: string; body: string }[] = [
  { icon: "signal", title: "New writing from the team", body: "Perspectives from our CEO and product leadership on where AI helps investment research, and where it shouldn’t." },
  { icon: "stack", title: "What shipped, and why", body: "Product updates explained through the workflow they change, not a feature list." },
  { icon: "path", title: "Worked examples", body: "A market question taken from prompt to sourced answer, so you can judge the method." },
];

/**
 * Newsletter subscribe block on the Pine colour block: says exactly what subscribers receive (CRO).
 * Separate from the demo request. Headline left, lead + form right (50/50), then the three things you get.
 */
export function NewsletterModule({ id = "subscribe" }: { id?: string }) {
  return (
    <Section surface="pine" id={id} className="scroll-mt-24">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <SplitText text="Market and product intelligence, not a blast." className="t-h2 max-w-[520px]" />
          <Reveal delay={0.15} className="lg:pt-1">
            <p className="t-lead max-w-[520px] text-paper/75">
              New articles, product notes and worked examples in one considered email. Unsubscribe any time.
            </p>
            <div className="mt-8 max-w-[520px]">
              <NewsletterForm compact />
              <p className="t-small mt-3 text-paper/60">
                How we handle your details:{" "}
                <Link href="/privacy" className="underline decoration-paper/30 underline-offset-2 hover:decoration-paper">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
        <FeatureGrid items={GETS} cols={3} onDark className="mt-14 md:mt-20" />
      </div>
    </Section>
  );
}
