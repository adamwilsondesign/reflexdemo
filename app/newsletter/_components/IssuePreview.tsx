import { InboxIssue } from "@/components/visual/scenes/InboxIssue";

/** Hero visual: a sample issue lands in the inbox and opens, section by section. */
export function IssuePreview() {
  return (
    <div aria-hidden="true">
      <InboxIssue />
    </div>
  );
}
