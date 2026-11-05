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
        className="group grid overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.03] transition-[border-color,background-color] duration-500 hover:border-white/25 hover:bg-white/[0.06] lg:grid-cols-12"
      >
        <BlogCover post={post} size="lg" priority className="aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[460px]" sizes="(min-width:1024px) 58vw, 100vw" />
        <div className="flex flex-col p-7 md:p-10 lg:col-span-5 lg:p-12">
          <p className="t-ui flex items-center gap-2 text-paper/60">
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-pine-300" aria-hidden="true" />
            Featured
          </p>
          <h2 className="t-h2 mt-6 text-balance">{post.title}</h2>
          <p className="t-lead mt-5 text-paper/72">{post.dek ?? post.excerpt}</p>
          <PostMeta post={post} onDark className="mt-7" />
          <div className="mt-auto flex flex-wrap items-center justify-between gap-5 pt-10">
            <span className="flex items-center gap-3">
              <Initials name={post.author.name} className="h-10 w-10 bg-white/10 text-[13px]" />
              <span>
                <span className="block font-display text-[15px] font-semibold">{post.author.name}</span>
                {post.author.role && <span className="block text-[13px] text-paper/55">{post.author.role}</span>}
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
