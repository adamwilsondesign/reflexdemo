/** Data & content source logos (NOT customers). Label any strip of these as data/content sources. */
export const DATA_SOURCES = [
  { name: "LSEG", src: "/framer/VIwXfK47Zlmo1WCya9uTQEApI0.svg", w: 58, h: 18 },
  { name: "S&P Global", src: "/framer/PAlP0TGzlvpB627Mo1thxsBTcmQ.png", w: 119, h: 26 },
  { name: "Cboe", src: "/framer/BNwYZXDKqWVC9M2GUevCqfk7K6U.png", w: 69, h: 24 },
  { name: "Dow Jones Newswires", src: "/framer/a9eL0PFzIG6pgGyVz7A5lYDKQ4.png", w: 130, h: 25 },
  { name: "Nasdaq", src: "/framer/AK2XVF1142moKK9XlnJg3hV2M.png", w: 100, h: 29 },
  { name: "MT Newswires", src: "/framer/zmr94GkPgg01zhJ4k15Q0sqSDXw.png", w: 140, h: 19 },
  { name: "Benzinga", src: "/framer/gQ0VYSkjx68kwp8n5mK2gmdqY.png", w: 108, h: 15 },
  { name: "Quartr", src: "/framer/IcRfH35NRt1j0yfwCqfVWcWid48.svg", w: 120, h: 17 },
  { name: "FRED (Federal Reserve Bank of St. Louis)", src: "/framer/F2saL32GbuUGbk2yjedw3RCCw.png", w: 190, h: 25 },
] as const;

/**
 * Customers & partners from the IA "Trusted by" list. Only names marked okay-to-use are shown;
 * rendered as wordmarks until approved logo files are supplied.
 */
export const CUSTOMERS = ["LSEG", "Interactive Brokers", "Lombard Odier", "Mubadala", "Sun Life", "CastleHook", "QUICK", "Wood & Co."] as const;

export const INVESTORS = ["SoftBank", "General Catalyst", "Greycroft", "MUFG", "Rose Park Advisors", "LSEG", "QUICK", "Interactive Brokers"] as const;
