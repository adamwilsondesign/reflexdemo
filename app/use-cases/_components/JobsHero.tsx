"use client";

import { Field } from "@/components/visual/kit";
import { JobsBoard } from "@/components/visual/scenes/JobsBoard";

/** Overview hero: five jobs running on one engine, finishing one by one. */
export function JobsHero() {
  return (
    <Field field="lake">
      <div className="mx-auto max-w-[920px]">
        <div className="sm:hidden"><JobsBoard narrow /></div>
        <div className="hidden sm:block"><JobsBoard /></div>
      </div>
    </Field>
  );
}
