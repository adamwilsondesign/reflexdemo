/**
 * Readout data mirroring the named nodes and weighted edges drawn by
 * components/graphics/KnowledgeGraph.tsx, so side panels can describe the focused node.
 * Illustrative weights, matching the interactive graph.
 */
const LABELS: Record<string, [string, string]> = {
  AMZN: ["Amazon", "Company"],
  NVDA: ["NVIDIA", "Company"],
  TSM: ["TSMC", "Company"],
  AAPL: ["Apple", "Company"],
  MSFT: ["Microsoft", "Company"],
  AVGO: ["Broadcom", "Company"],
  ASML: ["ASML", "Company"],
  CRWV: ["CoreWeave", "Company"],
  VRT: ["Vertiv", "Company"],
  ETN: ["Eaton", "Company"],
  LLY: ["Eli Lilly", "Company"],
  NVO: ["Novo Nordisk", "Company"],
  MU: ["Micron", "Company"],
  CEG: ["Constellation", "Company"],
  AI: ["AI infrastructure", "Theme"],
  PWR: ["Data center power", "Theme"],
  GLP: ["GLP-1", "Theme"],
  AUTO: ["Industrial automation", "Theme"],
  RATES: ["Rates", "Theme"],
  GPU: ["GPUs", "Product"],
  HBM: ["HBM memory", "Product"],
  AWS: ["AWS", "Product"],
  IPH: ["iPhone", "Product"],
  TW: ["Taiwan", "Market"],
  US: ["United States", "Market"],
  NL: ["Netherlands", "Market"],
};

const EDGES: [string, string, number, string][] = [
  ["AMZN", "AWS", 0.95, "Segment"],
  ["AWS", "AI", 0.85, "Theme exposure"],
  ["AWS", "NVDA", 0.8, "Customer of"],
  ["NVDA", "GPU", 0.95, "Product"],
  ["NVDA", "TSM", 0.9, "Supplier"],
  ["NVDA", "HBM", 0.7, "Input"],
  ["HBM", "MU", 0.75, "Product"],
  ["TSM", "TW", 0.9, "Domicile"],
  ["TSM", "ASML", 0.8, "Supplier"],
  ["ASML", "NL", 0.9, "Domicile"],
  ["TSM", "AAPL", 0.85, "Customer"],
  ["AAPL", "IPH", 0.95, "Product"],
  ["MSFT", "AI", 0.8, "Theme exposure"],
  ["MSFT", "NVDA", 0.7, "Customer of"],
  ["CRWV", "NVDA", 0.85, "Customer of"],
  ["CRWV", "MSFT", 0.6, "Customer"],
  ["AVGO", "AI", 0.7, "Theme exposure"],
  ["AVGO", "TSM", 0.7, "Supplier"],
  ["AI", "PWR", 0.8, "Driver"],
  ["PWR", "VRT", 0.85, "Beneficiary"],
  ["PWR", "ETN", 0.75, "Beneficiary"],
  ["PWR", "CEG", 0.7, "Beneficiary"],
  ["VRT", "US", 0.5, "Revenue"],
  ["AUTO", "ETN", 0.6, "Theme exposure"],
  ["AUTO", "RATES", 0.45, "Sensitivity"],
  ["GLP", "LLY", 0.95, "Leader"],
  ["GLP", "NVO", 0.92, "Leader"],
  ["LLY", "US", 0.6, "Revenue"],
  ["NVO", "RATES", 0.3, "Sensitivity"],
  ["AMZN", "US", 0.5, "Revenue"],
  ["CEG", "US", 0.6, "Domicile"],
  ["MU", "US", 0.5, "Domicile"],
  ["AAPL", "AI", 0.45, "Theme exposure"],
];

/** Relationship label read from the other end of the edge. */
const REVERSE: Record<string, string> = {
  Segment: "Parent",
  "Theme exposure": "Exposed company",
  "Customer of": "Customer",
  Customer: "Supplier",
  Supplier: "Customer",
  Product: "Made by",
  Input: "Input to",
  Domicile: "Domiciled company",
  Driver: "Driven by",
  Beneficiary: "Beneficiary of",
  Revenue: "Revenue exposure",
  Sensitivity: "Sensitive company",
  Leader: "Leader in",
};

export type NodeInfo = { label: string; type: string; rels: { to: string; rel: string; w: number }[] };

export const NODE_INFO: Record<string, NodeInfo> = Object.fromEntries(
  Object.entries(LABELS).map(([id, [label, type]]) => {
    const rels = EDGES.filter(([a, b]) => a === id || b === id)
      .map(([a, b, w, rel]) => ({ to: LABELS[a === id ? b : a][0], rel: a === id ? rel : REVERSE[rel] ?? rel, w }))
      .sort((x, y) => y.w - x.w);
    return [id, { label, type, rels }];
  }),
);
