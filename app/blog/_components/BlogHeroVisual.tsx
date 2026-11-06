"use client";

import { Field } from "@/components/visual/kit";
import { BlogShelf } from "@/components/visual/scenes/BlogShelf";
import type { BlogPost } from "@/lib/blog";

/** Hero visual: pick a topic, and the desk turns to its latest piece. */
export function BlogHeroVisual({ posts }: { posts: BlogPost[] }) {
  return (
    <div aria-hidden="true">
      <Field field="lake">
        <BlogShelf posts={posts} />
      </Field>
    </div>
  );
}
