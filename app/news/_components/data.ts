/* News & Press inventory.
   - Items from the Framer /news page keep their headline and summary verbatim. Their outbound links were not
     captured in the scrape, so `url` is unset until the client supplies them.
   - Items marked `confirm: true` come from the IA list "News to add (not already in Framer)": titles are
     written from the article URLs and must be confirmed against the published pieces. */

export type Outlet = "CNBC" | "Bloomberg" | "Barron's" | "Reuters" | "Fox Business" | "Business Insider" | "PWM" | "Hedge Fund Alpha";
export type Format = "TV" | "Article" | "Interview";

export type Announcement = {
  date: string;
  title: string;
  summary: string;
  tag: "Partnership" | "Product" | "Award" | "Funding";
  url?: string;
};

export type PressItem = {
  /** ISO date; omitted where the URL carries no date */
  date?: string;
  year: number;
  title: string;
  summary?: string;
  outlet?: Outlet;
  format: Format;
  url?: string;
  confirm?: boolean;
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    date: "2026-06-03",
    title: "Reflexivity Brings Real-Time Portfolio Intelligence to Microsoft 365 Copilot",
    summary:
      "Reflexivity’s institutional-grade investment intelligence, spanning 40,000+ securities, 47 global markets, 900+ themes, and 10M+ verified market relationships, is now accessible directly within Microsoft 365 Copilot.",
    tag: "Product",
  },
  {
    date: "2025-07-16",
    title: "Interactive Brokers Unveils Investment Themes Tool to Turn Market Trends into Smarter Trades",
    summary: "Reflexivity’s Knowledge Graph now sits at the core of a new generation of investor tools at Interactive Brokers.",
    tag: "Partnership",
  },
  {
    date: "2025-06-30",
    title: "Reflexivity’s partnership with Akbank is nominated at the Qorus-Infosys Finacle Banking Innovation Awards 2025!",
    summary:
      "Reflexivity partnered with Akbank to bring AI-Driven Stock Insights to their mobile platform. It is now one of the 9 nominees in the Predictive, Generative, and Agentic AI Innovation category at Qorus Global!",
    tag: "Award",
  },
  {
    date: "2024-10-28",
    title: "Reflexivity Raises $30M in Series B funding",
    summary: "Reflexivity (formerly Toggle AI) has announced a $30M Series B fundraising round led by Greycroft and Interactive Brokers",
    tag: "Funding",
  },
];

export const PRESS: PressItem[] = [
  {
    date: "2026-09-16",
    year: 2026,
    title: "AI leaders push for faster development while keeping guardrails in place",
    outlet: "CNBC",
    format: "TV",
    url: "https://www.cnbc.com/video/2026/09/16/ai-leaders-push-for-faster-development-while-keeping-guardrails-in-place.html",
    confirm: true,
  },
  {
    date: "2026-09-13",
    year: 2026,
    title: "US stock futures fall on AI warning, oil gains: Markets Wrap",
    outlet: "Bloomberg",
    format: "Article",
    url: "https://www.bloomberg.com/news/articles/2026-09-13/us-stock-futures-fall-on-ai-warning-oil-gains-markets-wrap",
    confirm: true,
  },
  {
    date: "2026-08-06",
    year: 2026,
    title: "Confidence in cruise and travel sector appears very strong, says Reflexivity CEO Jan Szilagyi",
    outlet: "CNBC",
    format: "TV",
    url: "https://www.cnbc.com/video/2026/08/06/confidence-in-cruise-and-travel-sector-appears-very-strong-says-reflexivity-ceo-jan-szilagyi.html",
    confirm: true,
  },
  {
    year: 2026,
    title: "Moonshot AI, Alibaba and the tech stocks to watch",
    outlet: "Barron's",
    format: "Article",
    url: "https://www.barrons.com/articles/moonshot-ai-alibaba-tech-stocks-189f80f2",
    confirm: true,
  },
  {
    date: "2026-07-13",
    year: 2026,
    title: "Asian tech firms seeking to follow SK Hynix may find foreign investors more selective",
    outlet: "Reuters",
    format: "Article",
    url: "https://www.reuters.com/world/asia-pacific/asian-tech-firms-seeking-follow-sk-hynix-may-find-foreign-investors-more-2026-07-13/",
    confirm: true,
  },
  {
    date: "2026-06-30",
    year: 2026,
    title: "Trump tariff defeat is a market tailwind no one is talking about",
    outlet: "Bloomberg",
    format: "Article",
    url: "https://www.bloomberg.com/news/articles/2026-06-30/trump-tariff-defeat-is-market-tailwind-no-one-is-talking-about",
    confirm: true,
  },
  {
    date: "2025-07-22",
    year: 2025,
    title: "Reflexivity’s analytics engine was featured in Business Insider",
    summary:
      "Behind every move - like Coca‑Cola’s upcoming cane sugar launch - there’s a ripple through supply chains, commodities, and investor expectations. Reflexivity’s models estimate that full adoption of cane sugar Coke could add 1.4M MT/year of demand - a 35% increase for the U.S. market.",
    outlet: "Business Insider",
    format: "Article",
  },
  {
    date: "2025-06-11",
    year: 2025,
    title: "Human + Machine: The Future of Fund Management",
    summary:
      "In conversation with PWM’s Yuri Bender and Ali Al-Enazi, our president and co-founder Giuseppe Sette explores the evolving intersection of human insight - including empathy and emotional engagement - with the rise of AI-driven tools in portfolio and fund management.",
    outlet: "PWM",
    format: "Interview",
  },
  {
    date: "2025-05-12",
    year: 2025,
    title: "The Future of AI in Asset Management: 1, 5, and 10-Year Outlook",
    summary:
      "Almost every company we know is using AI, but how far along is the tech? In this outlook, Giuseppe Sette says AI is already transforming financial decision-making and shares the future of asset management.",
    format: "Interview",
  },
  {
    date: "2025-05-07",
    year: 2025,
    title: "Plotting the future of AI in wealth and asset management",
    summary: "Reflexivity Co-founder and President Giuseppe Sette lays out the potential road ahead on the future of AI in wealth and asset management.",
    format: "Interview",
  },
  {
    date: "2025-04-30",
    year: 2025,
    title: "These Are The Top 6 Questions Institutional Investors Are Asking AI, Survey Finds",
    summary: "If you’re curious what other institutional investors are discussing with AI, check out Hedge Fund Alpha for the top 6 questions asked to Reflexivity!",
    outlet: "Hedge Fund Alpha",
    format: "Article",
  },
  {
    date: "2025-04-23",
    year: 2025,
    title: "Turning to AI for market guidance",
    summary: "Our CEO & Co-founder, Jan Szilagyi, joined CNBC Power Lunch today to discuss investors’ most asked questions in this market climate.",
    outlet: "CNBC",
    format: "TV",
  },
  {
    date: "2025-04-03",
    year: 2025,
    title: "Dow closes more than 200 points higher ahead of Trump’s tariff rollout",
    summary: "Our CEO & Co-founder, Jan Szilagyi, was featured on CNBC, offering his views on risks to the downside, and how deep can markets fall in 2025.",
    outlet: "CNBC",
    format: "Article",
  },
  {
    date: "2025-04-02",
    year: 2025,
    title: "Tariff Uncertainty & AI on Wall Street",
    summary:
      "Our CEO, Jan Szilagyi, joined Maria Bartiromo on Fox Business Network to discuss the impact of tariff uncertainty on the stock market - and how AI-driven insights can help investors navigate volatility with confidence.",
    outlet: "Fox Business",
    format: "TV",
  },
  {
    date: "2025-03-17",
    year: 2025,
    title: "Retail stocks are down, but are they oversold?",
    summary: "Our own Giuseppe Sette weighs in for Barron’s on why now might be the time to bargain hunt in consumer discretionary.",
    outlet: "Barron's",
    format: "Article",
  },
  {
    date: "2025-02-24",
    year: 2025,
    title: "Reflexivity’s LLMs are answering the hard investment questions",
    summary: "Interview With President & Co-Founder Giuseppe Sette About The AI-Based Investment Solutions Company",
    format: "Interview",
  },
  {
    date: "2025-01-28",
    year: 2025,
    title: "How to make trading decisions using AI",
    summary: "Reflexivity CEO, Jan Szilagyi, joins ‘Power Lunch’ with Dominic Chu and Kelly Evans on CNBC this week",
    outlet: "CNBC",
    format: "TV",
  },
];

export function formatNewsDate(iso?: string) {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
