import type { OutputSpec } from "./OutputCard";
import type { IconName } from "@/components/ui/PrecisionIcon";

export type Workflow = { title: string; problem: string; action: string; output: string; spec: OutputSpec };

export type Audience = {
  id: string;
  name: string;
  icon: IconName;
  hero: string;
  lead: string;
  card: string;
  workflows: Workflow[];
  why: { title: string; body: string };
  cta: { title: string; body: string; primary: string; secondary: { label: string; href: string } };
  links: { label: string; href: string }[];
};

export const AUDIENCES: Audience[] = [
  {
    id: "hedge-funds",
    name: "Hedge Funds",
    icon: "crosshair",
    hero: "Find differentiated ideas, watch the book, and pressure-test hypotheses with cited, code-backed work.",
    lead: "Idea generation, book monitoring and conviction, mapped onto the hedge-fund day.",
    card: "Find the second-order names behind an idea, see what changed in the book overnight, and test a thesis, with sources, before you size it.",
    workflows: [
      {
        title: "Deep research",
        problem: "A new idea needs a supply-chain map and counter-thesis before the morning meeting.",
        action: "Alfred traces the Knowledge Graph, pulls filings and transcripts, and writes the analysis as code you can inspect.",
        output: "A cited memo with the second-order names and what would break the thesis.",
        spec: {
          trail: ["Deep research", "HBM supply"],
          prompt: "Who benefits beyond the obvious names if HBM supply stays tight through next year?",
          lines: [
            { text: "Packaging and test suppliers with rising HBM mix", cite: 1, tag: "2nd order", tone: "lake" },
            { text: "Substrate makers exposed through a shared customer", cite: 2, tag: "3rd order", tone: "lake" },
            { text: "Counter-thesis: capacity additions announced for H2", cite: 3, tag: "Risk", tone: "warn" },
          ],
          output: "Cited memo with second-order names",
          gap: "Supplier-level revenue split",
        },
      },
      {
        title: "Portfolio and catalyst monitoring",
        problem: "Overnight news touches the book in ways a headline scan won’t show.",
        action: "Insights watches holdings and their relationships, and explains why each item reached you.",
        output: "A ranked list of what moved the book and why, with sources.",
        spec: {
          trail: ["Monitoring", "Core book"],
          prompt: "What changed for my book overnight?",
          lines: [
            { text: "Key supplier cut guidance; touches 3 positions", cite: 1, tag: "Catalyst", tone: "lake" },
            { text: "Peer pre-announced; read-across to one long", cite: 2, tag: "Read-across", tone: "neutral" },
            { text: "Regulatory filing changes a theme input", cite: 3, tag: "Theme", tone: "pine" },
          ],
          output: "Ranked, cited changes to the book",
          spark: 9,
        },
      },
      {
        title: "Always-on earnings intelligence",
        problem: "Earnings season stacks dozens of calls into a few days.",
        action: "Insights summarises results and tone shifts across holdings and peers as they report.",
        output: "Takeaways per name, with what changed versus prior quarters.",
        spec: {
          trail: ["Earnings", "Semis"],
          prompt: "Summarise this week’s semis prints against prior-quarter tone.",
          lines: [
            { text: "Two names raised data-center guidance", cite: 1, tag: "Up", tone: "pine" },
            { text: "Management tone on China softened at one", cite: 2, tag: "Tone", tone: "warn" },
            { text: "Inventory days normalised across the group", cite: 3, tag: "Trend", tone: "neutral" },
          ],
          output: "Per-name takeaways vs prior quarters",
          spark: 14,
        },
      },
      {
        title: "Scenario and stress testing",
        problem: "A macro shock needs translating into position-level risk, fast.",
        action: "Alfred runs the scenario across the book and its relationships, with the code and data attached.",
        output: "Position-level impact and the names that would signal trouble first.",
        spec: {
          trail: ["Scenario", "Rates +50bp"],
          prompt: "Stress-test the book for a sharp 50bp rise in 10-year yields.",
          lines: [
            { text: "Most sensitive: long-duration growth positions", cite: 1, tag: "High", tone: "warn" },
            { text: "Partial offset from financials exposure", cite: 2, tag: "Offset", tone: "pine" },
            { text: "Early signals to watch: two key suppliers", cite: 3, tag: "Watch", tone: "lake" },
          ],
          output: "Position-level impact, code attached",
          gap: "Private holdings marks",
        },
      },
    ],
    why: {
      title: "Retrieval tools summarise what’s been published. Reflexivity shows how a development connects across your book, and what to do about it.",
      body: "Answers start from the Knowledge Graph and integrated data, not from whatever a search happened to return, so second-order names can surface earlier in the process.",
    },
    cta: {
      title: "Run this against your coverage universe.",
      body: "Bring a watchlist or a live thesis. We’ll walk through it on your names.",
      primary: "Request a Demo",
      secondary: { label: "Portfolio monitoring", href: "/use-cases/portfolio-monitoring" },
    },
    links: [
      { label: "Deep Research", href: "/use-cases/deep-research" },
      { label: "Scenario & Stress Testing", href: "/use-cases/scenario-stress-testing" },
    ],
  },
  {
    id: "financial-institutions",
    name: "Financial Institutions",
    icon: "knot",
    hero: "Add Reflexivity’s relationship layer, analyst, and insights to products and workflows you already distribute.",
    lead: "For banks, brokerages and platforms that want to embed intelligence, not only buy seats.",
    card: "Put the Knowledge Graph, Alfred or Insights inside a product you distribute, through the API, MCP, knowledge feeds or an embedded setup.",
    workflows: [
      {
        title: "White-label and embedded experiences",
        problem: "Clients expect AI research inside your platform, not another login.",
        action: "Reflexivity analysis appears as native functionality, under your brand and entitlements.",
        output: "An embedded experience your clients use as part of your product.",
        spec: {
          trail: ["Embedded", "Client portal"],
          prompt: "Show clients what changed for their watchlist, inside our app.",
          lines: [
            { text: "Native panel rendered in the partner UI", tag: "Embedded", tone: "lake" },
            { text: "Insights filtered to each client’s list", cite: 1, tag: "Per client", tone: "neutral" },
            { text: "Sources carried through to the end user", cite: 2, tag: "Cited", tone: "pine" },
          ],
          output: "White-labelled experience",
          field: "mist",
        },
      },
      {
        title: "API and MCP into internal platforms",
        problem: "Internal tools and assistants lack resolved entities and relationships.",
        action: "The API and MCP tools return Graph, Insights and Alfred research to the systems you run.",
        output: "Structured responses with sources, ready for your own interface.",
        spec: {
          trail: ["API", "Research desk"],
          prompt: "graph.related_entities(entity: “Siemens Energy”, relation: “customer”)",
          lines: [
            { text: "42 resolved relationships returned", cite: 1, tag: "200 OK", tone: "pine" },
            { text: "Each with source, type and as-of date", cite: 2, tag: "Cited", tone: "lake" },
            { text: "Same entity IDs as the Platform", tag: "Resolved", tone: "neutral" },
          ],
          output: "Structured, sourced API response",
          field: "mist",
        },
      },
      {
        title: "Knowledge Graph feeds for baskets and research",
        problem: "Thematic products need defensible constituent lists that stay current.",
        action: "Relationship data is licensed as a feed for baskets, research and models.",
        output: "A refreshed relationship feed with the evidence behind each link.",
        spec: {
          trail: ["Feed", "Thematic basket"],
          prompt: "Which listed companies are exposed to grid modernisation, and how?",
          lines: [
            { text: "Constituents ranked by relationship strength", cite: 1, tag: "Basket", tone: "lake" },
            { text: "New exposure added since the last rebalance", cite: 2, tag: "Change", tone: "pine" },
            { text: "Evidence stored with each relationship", cite: 3, tag: "Audit", tone: "neutral" },
          ],
          output: "Relationship feed for baskets",
          field: "mist",
          spark: 21,
        },
      },
    ],
    why: {
      title: "Institutions already present Reflexivity intelligence as native functionality.",
      body: "This should feel like infrastructure, not another research terminal. A distribution partner runs Reflexivity inside its own product in production today.",
    },
    cta: {
      title: "Talk about embedding the Graph, Alfred, or Insights.",
      body: "We’ll map the surfaces, data and entitlements with your platform team.",
      primary: "Request a Demo",
      secondary: { label: "Discuss a partnership", href: "/contact?topic=partnerships" },
    },
    links: [
      { label: "Deployment options", href: "/deployment" },
      { label: "API & MCP", href: "/deployment#api-mcp" },
    ],
  },
  {
    id: "asset-managers",
    name: "Asset Managers",
    icon: "stack",
    hero: "Connect research, construction, exposure, monitoring, and committee narrative in one environment.",
    lead: "An end-to-end investment workflow, not a single feature, for the institutional asset-management day.",
    card: "Take research from the first question through to the committee note, with claims linked to their sources so the committee can use them.",
    workflows: [
      {
        title: "Fund and security research",
        problem: "Analysts rebuild the same context for every new name or fund.",
        action: "Alfred researches across filings, transcripts and the Graph, and keeps the work re-runnable.",
        output: "Research the next analyst can open, check and refresh.",
        spec: {
          trail: ["Research", "Industrial gases"],
          prompt: "Build a briefing on the industrial gases sector for a new analyst.",
          lines: [
            { text: "Market structure and the three largest players", cite: 1, tag: "Context", tone: "neutral" },
            { text: "Pricing power evidence from recent calls", cite: 2, tag: "Signal", tone: "lake" },
            { text: "Key exposures: hydrogen, electronics, healthcare", cite: 3, tag: "Themes", tone: "pine" },
          ],
          output: "Re-runnable, cited briefing",
          field: "lake",
          gap: "Segment margin by region",
        },
      },
      {
        title: "Portfolio construction and explanation",
        problem: "Construction choices are hard to explain consistently across a team.",
        action: "Alfred tests candidate names against the sleeve’s exposures and records the reasoning.",
        output: "A construction rationale that holds up when it’s questioned.",
        spec: {
          trail: ["Construction", "Quality sleeve"],
          prompt: "Which candidates add the least overlap to the current quality sleeve?",
          lines: [
            { text: "Lowest overlap: two healthcare names", cite: 1, tag: "Add", tone: "pine" },
            { text: "High overlap via shared customers: one semi", cite: 2, tag: "Overlap", tone: "warn" },
            { text: "Rationale saved with data and code", tag: "Audit", tone: "neutral" },
          ],
          output: "Explained construction choices",
          field: "lake",
          spark: 31,
        },
      },
      {
        title: "Exposure and scenario analysis",
        problem: "Exposure to a theme hides in suppliers, customers and geographies.",
        action: "The Knowledge Graph traces direct and indirect exposure, then Alfred runs the scenario.",
        output: "Direct and second-order exposure, with the path behind each link.",
        spec: {
          trail: ["Exposure", "China supply chain"],
          prompt: "How exposed is the fund to a disruption in Taiwanese foundry supply?",
          lines: [
            { text: "Direct exposure across 4 holdings", cite: 1, tag: "Direct", tone: "lake" },
            { text: "Indirect exposure via 6 customers", cite: 2, tag: "Indirect", tone: "lake" },
            { text: "Largest single path: one handset supplier", cite: 3, tag: "Path", tone: "warn" },
          ],
          output: "Exposure map with paths",
          field: "lake",
        },
      },
      {
        title: "Attribution and IC narratives",
        problem: "Committee packs take days and go stale between meetings.",
        action: "Alfred drafts attribution and narrative from the same sources, and refreshes them on demand.",
        output: "A committee narrative that’s explainable, refreshable and consistent.",
        spec: {
          trail: ["IC pack", "Q3 review"],
          prompt: "Draft the attribution narrative for the Q3 committee pack.",
          lines: [
            { text: "Top contributor: selection in industrials", cite: 1, tag: "+", tone: "pine" },
            { text: "Main detractor: energy underweight", cite: 2, tag: "−", tone: "warn" },
            { text: "What changed since the Q2 pack", cite: 3, tag: "Delta", tone: "neutral" },
          ],
          output: "Refreshable committee narrative",
          field: "lake",
          spark: 5,
        },
      },
    ],
    why: {
      title: "Outputs need to be explainable to a committee, refreshable through time, and consistent across the team.",
      body: "Governance matters as much as speed. Every output keeps its sources, data and code, so the next person can check it and the next quarter can re-run it.",
    },
    cta: {
      title: "Bring a sleeve, theme, or committee pack.",
      body: "We’ll walk through the workflow end to end, from first question to committee narrative.",
      primary: "Request a Demo",
      secondary: { label: "Thematic exposure", href: "/use-cases/thematic-exposure" },
    },
    links: [
      { label: "Thematic Exposure", href: "/use-cases/thematic-exposure" },
      { label: "Auditability & Data", href: "/auditability-data" },
    ],
  },
  {
    id: "wealth-managers",
    name: "Wealth Managers & RIAs",
    icon: "petals",
    hero: "Client-ready explanations tied to holdings, in language an advisor can use the same day.",
    lead: "Institutional-quality answers without a dedicated research desk.",
    card: "Turn daily monitoring into a client note tied to that client’s holdings, with claims linked back to their sources.",
    workflows: [
      {
        title: "Source-backed answers to client questions",
        problem: "A client asks about a headline and expects an answer today.",
        action: "Alfred answers in plain language, tied to what the client owns, with sources.",
        output: "An answer an advisor can send, not just read.",
        spec: {
          trail: ["Client question", "Household"],
          prompt: "A client asks whether tariffs put their portfolio at risk.",
          lines: [
            { text: "Three holdings with meaningful import exposure", cite: 1, tag: "Exposed", tone: "warn" },
            { text: "Diversifiers in the portfolio that offset it", cite: 2, tag: "Offset", tone: "pine" },
            { text: "Plain-language summary for the client", tag: "Ready", tone: "lake" },
          ],
          output: "Client-ready answer, cited",
          field: "pine",
        },
      },
      {
        title: "Portfolio implications",
        problem: "Market moves need translating into what they mean for each model.",
        action: "Alfred maps a development to holdings and the relationships behind them.",
        output: "Implications by model or household, with the reasoning shown.",
        spec: {
          trail: ["Implications", "Growth model"],
          prompt: "What does today’s rate move mean for the growth model?",
          lines: [
            { text: "Two positions most rate-sensitive", cite: 1, tag: "Watch", tone: "warn" },
            { text: "Bond sleeve duration offsets part of it", cite: 2, tag: "Offset", tone: "pine" },
            { text: "No action implied; context for client calls", tag: "Context", tone: "neutral" },
          ],
          output: "Implications by model",
          field: "pine",
          spark: 17,
        },
      },
      {
        title: "Holdings monitoring",
        problem: "Advisors can’t watch every holding across every household.",
        action: "Insights flags catalysts across client holdings and says why each one matters.",
        output: "A short daily list of what to raise with which clients.",
        spec: {
          trail: ["Monitoring", "All households"],
          prompt: "What should I raise with clients this week?",
          lines: [
            { text: "Dividend change at a widely held name", cite: 1, tag: "12 clients", tone: "lake" },
            { text: "Earnings beat at a core holding", cite: 2, tag: "8 clients", tone: "pine" },
            { text: "Sector news touching a model portfolio", cite: 3, tag: "Model", tone: "neutral" },
          ],
          output: "Weekly client talking list",
          field: "pine",
        },
      },
      {
        title: "Narratives and talking points for meetings",
        problem: "Review meetings need a clear story, not a data dump.",
        action: "Alfred drafts talking points from the same cited analysis.",
        output: "Meeting notes polished enough to leave the building.",
        spec: {
          trail: ["Meeting prep", "Quarterly review"],
          prompt: "Draft talking points for the quarterly review with the Patel household.",
          lines: [
            { text: "What drove performance this quarter", cite: 1, tag: "Story", tone: "lake" },
            { text: "Two risks worth discussing, and why", cite: 2, tag: "Risk", tone: "warn" },
            { text: "Questions the client is likely to ask", tag: "Prep", tone: "neutral" },
          ],
          output: "Client meeting talking points",
          field: "pine",
          gap: "Held-away account data",
        },
      },
    ],
    why: {
      title: "The output has to be cited, holdings-aware, and polished enough to leave the building.",
      body: "Terminals don’t scale across an advisory team, and general AI produces answers you can’t send to a client. Reflexivity sits between the two.",
    },
    cta: {
      title: "Try this on a household or model book.",
      body: "Bring a model portfolio or an anonymised household. We’ll show the client conversation end to end.",
      primary: "Request a Demo",
      secondary: { label: "Portfolio monitoring", href: "/use-cases/portfolio-monitoring" },
    },
    links: [
      { label: "Portfolio Monitoring", href: "/use-cases/portfolio-monitoring" },
      { label: "Insights", href: "/insights" },
    ],
  },
];

export const ROLES = [
  { role: "Portfolio managers", body: "Monitor the book and pressure-test conviction before sizing.", href: "/use-cases/portfolio-monitoring", link: "Portfolio Monitoring" },
  { role: "Analysts", body: "Go from a question to a cited, re-runnable answer.", href: "/use-cases/deep-research", link: "Deep Research" },
  { role: "Research leaders", body: "Keep work consistent, auditable and shareable across the team.", href: "/auditability-data", link: "Auditability & Data" },
  { role: "Platform & data teams", body: "Bring the Graph and Alfred into the systems you run.", href: "/deployment#api-mcp", link: "API & MCP" },
];
