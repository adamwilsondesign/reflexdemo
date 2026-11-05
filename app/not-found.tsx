import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { LinkRows } from "@/components/ui/Layouts";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { BrokenGraph } from "./_notfound/BrokenGraph";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn’t exist or has moved.",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/platform", label: "Platform", body: "How Reflexivity fits together" },
  { href: "/knowledge-graph", label: "Knowledge Graph", body: "See how markets connect" },
  { href: "/alfred", label: "Alfred", body: "Your AI analyst" },
  { href: "/blog", label: "Blog", body: "Analysis and product thinking" },
];

export default function NotFound() {
  return (
    <section data-tone="light" data-bg="#f4f3f1" className="relative isolate overflow-hidden bg-paper pb-20 pt-[calc(var(--header-h)+48px)] text-ink md:pb-28 md:pt-[calc(var(--header-h)+80px)]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-chart"
        style={{ maskImage: "radial-gradient(90% 80% at 70% 40%, #000 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(90% 80% at 70% 40%, #000 20%, transparent 70%)" }}
      />
      <div className="container-x grid gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:row-start-1">
          <Eyebrow>Error 404</Eyebrow>
          <SplitText as="h1" text="This link doesn’t resolve." trigger="mount" delay={0.1} className="t-display mt-6 max-w-[640px]" />
          <Reveal delay={0.4}>
            <p className="t-lead mt-6 max-w-[520px] text-ink/72">
              The page you were looking for has moved or no longer exists. The rest of the graph is intact. Here are a few connections that still hold.
            </p>
          </Reveal>
          <Reveal delay={0.55} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/" variant="primary" arrow>
              Back to home
            </Button>
            <Button href="/book-a-demo" variant="secondary" cta="404-demo">
              Request a Demo
            </Button>
          </Reveal>
        </div>
        <div className="text-lake-900 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="mx-auto max-w-[420px] lg:max-w-[560px]">
            <BrokenGraph />
          </div>
        </div>
        <nav aria-label="Popular pages" className="lg:col-span-6 lg:row-start-2">
          <LinkRows className="max-w-[560px]" rows={LINKS.map((l) => ({ label: l.label, href: l.href, note: l.body }))} />
        </nav>
      </div>
    </section>
  );
}
