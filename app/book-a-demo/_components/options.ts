export const ROLES = [
  "Portfolio Manager",
  "Analyst / Research",
  "CIO / Head of Investments",
  "Risk",
  "Quant / Data Science",
  "Technology / Engineering",
  "Product / Innovation",
  "Advisor / Wealth Manager",
  "Operations",
  "Other",
] as const;

export const FIRM_TYPES = [
  "Hedge Fund",
  "Asset Manager",
  "Financial Institution / Bank",
  "Wealth Manager / RIA",
  "Family Office",
  "Pension, Endowment or Sovereign Fund",
  "Other",
] as const;

export const INTERESTS = [
  "Alfred",
  "Knowledge Graph",
  "Insights",
  "Portfolio Monitoring",
  "Deep Research",
  "Thematic Exposure",
  "Scenario & Stress Testing",
  "API/MCP integration",
] as const;

/** Pre-select an interest chip from the page the visitor came from. */
export const INTEREST_BY_PATH: Record<string, (typeof INTERESTS)[number]> = {
  "/alfred": "Alfred",
  "/knowledge-graph": "Knowledge Graph",
  "/insights": "Insights",
  "/use-cases/portfolio-monitoring": "Portfolio Monitoring",
  "/use-cases/deep-research": "Deep Research",
  "/use-cases/thematic-exposure": "Thematic Exposure",
  "/use-cases/scenario-stress-testing": "Scenario & Stress Testing",
  "/deployment": "API/MCP integration",
};

/** Common personal / free-mail domains. Demo requests need a work address so they can be routed. */
const FREE_MAIL = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "rocketmail.com", "hotmail.com", "outlook.com", "live.com", "msn.com",
  "aol.com", "icloud.com", "me.com", "mac.com", "proton.me", "protonmail.com", "pm.me", "gmx.com", "gmx.net", "gmx.de", "mail.com",
  "yandex.com", "yandex.ru", "zoho.com", "qq.com", "163.com", "126.com", "hey.com", "fastmail.com", "tutanota.com", "web.de",
]);

export function isFreeMail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase().trim() ?? "";
  if (FREE_MAIL.has(domain)) return true;
  // regional variants, e.g. yahoo.co.uk, hotmail.fr, outlook.de
  return /^(yahoo|hotmail|outlook|live|gmx|yandex)\.[a-z.]{2,6}$/.test(domain);
}

export const DEMO_EXAMPLE_EVENT = "rfx:demo-example";
