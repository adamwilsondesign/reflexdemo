"use client";

import { RequestStatus } from "@/components/visual/scenes/RequestStatus";

const STEPS = [
  "Request received: your details and any question you shared are with our team.",
  "Within one business day, we follow up by email to schedule.",
  "Your walkthrough, typically 30 minutes, led by a product specialist.",
  "Next steps, if it fits: follow-up material, a security review, or a deeper session.",
];

/** "What happens next", shown as a request checklist that updates itself. */
export function NextSteps({ interests }: { interests: string[] }) {
  return (
    <div>
      <div aria-hidden="true">
        <RequestStatus interests={interests} />
      </div>
      <ol className="sr-only">
        {STEPS.map((s) => <li key={s}>{s}</li>)}
      </ol>
    </div>
  );
}
