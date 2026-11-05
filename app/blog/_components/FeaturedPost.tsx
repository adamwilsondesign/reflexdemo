import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { BlogPost } from "@/lib/blog";
import { BlogCover } from "./BlogCover";
import { Initials, PostMeta } from "./PostCard";

/** Large featured article on a dark lake surface. */
export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Reveal>
      <Link
        href={`/blog/${post.slug}`}
        className="group grid items-center gap-10 py-4 md:py-8 lg:grid-cols-2 lg:gap-16"
      >
        <BlogCover post={post} size="md" priority className="aspect-[16/10] rounded-[14px] lg:order-2" sizes="(min-width:1024px) 45vw, 100vw" />
        <div className="flex flex-col">
          <h2 className="t-h2 max-w-[560px] text-balance decoration-paper/40 underline-offset-[6px] transition-colors group-hover:underline">{post.title}</h2>
          <p className="t-lead mt-5 text-paper/72">{post.dek ?? post.excerpt}</p>
          <PostMeta post={post} onDark className="mt-7" />
          <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
            <span className="flex items-center gap-3">
              <Initials name={post.author.name} className="h-10 w-10 bg-white/10 text-[13px]" />
              <span>
                <span className="block font-display text-[15px] font-semibold">{post.author.name}</span>
                {post.author.role && <span className="block font-display text-[13px] text-paper/55">{post.author.role}</span>}
              </span>
            </span>
            <span className="inline-flex h-12 items-center gap-2 bg-paper px-6 font-display text-[16px] font-medium text-ink transition-colors group-hover:bg-white">
              Read the article <Arrow />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
