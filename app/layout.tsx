import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { CookieConsent } from "@/components/site/CookieConsent";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-archivo", display: "swap" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["400"], variable: "--font-source-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://reflexivity.com"),
  title: {
    default: "Reflexivity | AI investment research platform for institutional investors",
    template: "%s | Reflexivity",
  },
  description:
    "Reflexivity is an AI investment research platform for institutional investors. Ask Alfred to investigate a question, get always-on intelligence across the names you follow, and inspect every source.",
  openGraph: { siteName: "Reflexivity", type: "website" },
};

export const viewport: Viewport = { themeColor: "#17191c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="sr-only z-[100] bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
