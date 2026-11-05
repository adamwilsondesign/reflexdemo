export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = {
  label: string;
  href?: string;
  columns?: NavLink[][];
  featured?: { eyebrow: string; title: string; href: string; image: string };
};

export const APP_URL = "https://app.reflexivity.com/app";
export const HELP_URL = "https://support.reflexivity.com";

/** Mirrors the Framer WIP navigation 1:1 (labels, descriptions, grouping, featured cards). */
export const NAV: NavGroup[] = [
  {
    label: "Product",
    columns: [
      [
        { label: "Alfred", href: "/alfred", description: "Your AI analyst, on demand and always on" },
        { label: "Knowledge Graph", href: "/knowledge-graph", description: "See how every market connects" },
      ],
      [
        { label: "Insights", href: "/insights", description: "Intelligence before you ask" },
        { label: "Auditability & Data", href: "/auditability-data", description: "Cited, sourced and re-runnable" },
        { label: "Security", href: "/security", description: "Built for institutional diligence" },
      ],
    ],
    featured: {
      eyebrow: "Featured",
      title: "Meet Alfred.",
      href: "/alfred",
      image: "/framer/y8MBoqPyLXK7lxS6MDF0JGeOoOk.jpg",
    },
  },
  {
    label: "Use Cases",
    columns: [
      [
        { label: "Portfolio Monitoring", href: "/use-cases/portfolio-monitoring", description: "Know what moved your book, and why" },
        { label: "Deep Research", href: "/use-cases/deep-research", description: "Sourced answers in minutes, not hours" },
      ],
      [
        { label: "Thematic Exposure", href: "/use-cases/thematic-exposure", description: "Find who is really exposed to a theme" },
        { label: "Scenario & Stress Testing", href: "/use-cases/scenario-stress-testing", description: "Test the shock before it hits" },
      ],
    ],
    featured: {
      eyebrow: "Featured Article",
      title: "Better Sharpe Ratio is a plumbing problem",
      href: "/blog/the-sharpe-ratio",
      image: "/framer/r89tHmgVo4Zd89XWjSx0V9yW93s.png",
    },
  },
  { label: "Deployment", href: "/deployment" },
  { label: "Customers", href: "/customers" },
  {
    label: "Resources",
    columns: [
      [
        { label: "Blog", href: "/blog", description: "Analysis and product thinking" },
        { label: "Customer Stories", href: "/customers", description: "Real institutional use, in detail" },
      ],
      [
        { label: "News & Press", href: "/news", description: "Announcements and coverage" },
        { label: "Newsletter", href: "/newsletter", description: "Market and product intelligence" },
      ],
    ],
    featured: {
      eyebrow: "Featured Article",
      title: "Better Sharpe Ratio is a plumbing problem",
      href: "/blog/the-sharpe-ratio",
      image: "/framer/r89tHmgVo4Zd89XWjSx0V9yW93s.png",
    },
  },
  {
    label: "Company",
    columns: [
      [
        { label: "About", href: "/about", description: "Who we are and why we built this" },
        { label: "Careers", href: "/careers", description: "Join the team building it" },
      ],
      [{ label: "Contact", href: "/contact", description: "Talk to our team" }],
    ],
  },
];

export const FOOTER: { title: string; links: (NavLink & { external?: boolean; cookie?: boolean })[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Alfred", href: "/alfred" },
      { label: "Knowledge Graph", href: "/knowledge-graph" },
      { label: "Insights", href: "/insights" },
      { label: "Auditability & Data", href: "/auditability-data" },
      { label: "Security", href: "/security" },
      { label: "Deployment", href: "/deployment" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Customer Stories", href: "/customers" },
      { label: "News & Press", href: "/news" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Data notices", href: "/data-notices" },
      { label: "Cookie Settings", href: "#cookie-settings", cookie: true },
    ],
  },
  {
    title: "Utilities",
    links: [
      { label: "Help Center", href: HELP_URL, external: true },
      { label: "Log in", href: APP_URL, external: true },
      { label: "Request a Demo", href: "/book-a-demo" },
    ],
  },
];
