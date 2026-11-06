/** The four firm types. `id`s are linked from the homepage and use-case pages; keep them stable. */
export const FIRMS = [
  {
    id: "hedge-funds",
    name: "Hedge Funds",
    body: "See what changed for the book overnight, find the second-order names behind an idea, and test a thesis before you size it.",
    links: [
      { label: "Portfolio Monitoring", href: "/use-cases/portfolio-monitoring" },
      { label: "Deep Research", href: "/use-cases/deep-research" },
    ],
    panel: { ask: "What changed for my book overnight?", result: "Positions touched", value: "3", sources: "4" },
  },
  {
    id: "financial-institutions",
    name: "Financial Institutions",
    body: "Put the Knowledge Graph, Alfred or Insights inside the products you already distribute, through the API, MCP or an embedded setup.",
    links: [
      { label: "Deployment options", href: "/deployment" },
      { label: "API & MCP", href: "/deployment#api-mcp" },
    ],
    panel: { ask: "Add relationship context to our client portal.", result: "Related entities", value: "38", sources: "38" },
  },
  {
    id: "asset-managers",
    name: "Asset Managers",
    body: "Take research from the first question to the committee pack, with exposure and scenario work the team can re-run next quarter.",
    links: [
      { label: "Thematic Exposure", href: "/use-cases/thematic-exposure" },
      { label: "Scenario & Stress Testing", href: "/use-cases/scenario-stress-testing" },
    ],
    panel: { ask: "Refresh the Q3 committee pack.", result: "Changes since Q2", value: "6", sources: "12" },
  },
  {
    id: "wealth-managers",
    name: "Wealth Managers & RIAs",
    body: "Turn a market move into a client-ready note tied to that client’s holdings, with figures linked to their sources.",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Alfred", href: "/alfred" },
    ],
    panel: { ask: "Explain today’s rate move to a client.", result: "Holdings most exposed", value: "2", sources: "5" },
  },
] as const;
