import Link from "next/link";
import { NewsletterForm } from "@/components/site/Footer";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

const GETS: { icon: IconName; title: string; body: string }[] = [
  { icon: "signal", title: "New writing from the team", body: "Perspectives from our CEO and product leadership on where AI helps investment research, and where it shouldn’t." },
  { icon: "stack", title: "What shipped, and why", body: "Product updates explained through the workflow they change, not a feature list." },
  { icon: "path", title: "Worked examples", body: "A market question taken from prompt to sourced answer, so you can judge the method." },
];

/** Newsletter subscribe module: says exactly what subscribers receive (CRO). Separate from the demo request. */
export function NewsletterModule({ id = "subscribe" }: { id?: string }) {
  return (
    <div id={id} className="relative isolate scroll-mt-32 overflow-hidden rounded-[18px] bg-pine-900 text-paper" data-tone="dark">
      <div className="pointer-events-none absolute inset-0 -z-10 field-pine opacity-40" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark" style={{ maskImage: "linear-gradient(90deg, transparent, #000 70%)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 70%)" }} />
      <div className="grid gap-12 p-7 md:p-12 lg:grid-cols-12 lg:gap-10 lg:p-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="t-ui text-paper/60">The Reflexivity newsletter</p>
          </Reveal>
          <SplitText text="Market and product intelligence, not a blast." className="t-h2 mt-5 max-w-[520px]" />
          <Reveal delay={0.15}>
            <p className="t-body mt-5 max-w-[460px] text-paper/72">
              New articles, product notes and worked examples in one considered email. Unsubscribe any time.
            </p>
            <div className="mt-8 max-w-[520px]">
              <NewsletterForm compact />
              <p className="t-small mt-3 text-paper/50">
                How we handle your details: <Link href="/privacy" className="underline decoration-paper/30 underline-offset-2 hover:decoration-paper">Privacy Policy</Link>.
              </p>
            </div>
          </Reveal>
        </div>
        <Stagger as="ul" className="flex flex-col gap-px overflow-hidden rounded-[12px] bg-white/10 lg:col-span-6">
          {GETS.map((g) => (
            <StaggerItem as="li" key={g.title} className="group flex gap-5 bg-pine-900/80 p-6 md:p-7">
              <PrecisionIcon name={g.icon} className="h-9 w-9 shrink-0 text-paper transition-transform duration-700 ease-[var(--ease-out-expo)]" />
              <div>
                <h3 className="font-display text-[17px] font-semibold">{g.title}</h3>
                <p className="t-small mt-1.5 text-paper/65">{g.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
