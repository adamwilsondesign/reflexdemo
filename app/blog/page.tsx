import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/Blocks";
import { POSTS, getFeatured } from "@/lib/blog";
import { BlogHeroVisual } from "./_components/BlogHeroVisual";
import { FeaturedPost } from "./_components/FeaturedPost";
import { BlogIndex } from "./_components/BlogIndex";
import { NewsletterModule } from "./_components/NewsletterModule";

export const metadata: Metadata = {
  title: "Blog: perspectives, product and research",
  description:
    "Writing from the Reflexivity team on AI in investment research: how Alfred and the Knowledge Graph are built, where AI should stop, and what cheaper curiosity is worth to investors.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const featured = getFeatured();
  const rest = POSTS.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <PageHero
        actions={null}
        trail={[{ label: "Resources" }, { label: "Blog" }]}
        title="A closer look at what moves markets."
        lead="Perspectives, product notes and research from the team building Reflexivity: how AI changes investment research, and where the decision should stay with you."
        visual={<BlogHeroVisual posts={POSTS.slice(0, 9)} />}
        secondary={{ label: "Get the newsletter", href: "#subscribe" }}
        cta="blog-hero"
      />

      <Section surface="lake" tight>
        <div className="container-x">
          <FeaturedPost post={featured} />
        </div>
      </Section>

      <Section surface="paper">
        <div className="container-x">
          <SectionHeader title="Perspectives, product notes and research." align="split" lead="Written by the people building the platform. Quality over cadence." />
          <Reveal className="mt-12 md:mt-16" amount={0.05}>
            <BlogIndex posts={rest} />
          </Reveal>
        </div>
      </Section>

      <NewsletterModule />

      <CTABand
        title="See the thinking in the product."
        lead="Bring a question you’ve been meaning to answer. We’ll show you how Alfred and the Knowledge Graph work through it, with sources you can inspect."
        secondary={{ label: "Explore the platform", href: "/platform" }}
        cta="blog-final"
      />
    </>
  );
}
