import type { Metadata } from "next";
import { Playfair_Display, Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { FavoritesProvider } from "@/components/favorites";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

const siteUrl = "https://ac-agency.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "A&C Agency — Agence digitale, création de sites web",
    template: "%s — A&C Agency",
  },
  description:
    "A&C Agency rend le numérique accessible aux petites entreprises. Création de sites web modernes, rapides et responsives, accompagnement personnalisé et tarifs accessibles.",
  keywords: ["agence web", "création site internet", "site vitrine", "site e-commerce", "SEO local", "A&C Agency"],
  openGraph: {
    title: "A&C Agency — Votre activité mérite plus qu'un simple site web",
    description: "Agence digitale fondée par Clément & Adam. Sites modernes, responsives et accessibles pour les entreprises locales.",
    url: siteUrl,
    siteName: "A&C Agency",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/logo-dark.jpg", width: 1200, height: 630, alt: "A&C Agency" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${playfair.variable} ${inter.variable} ${lora.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <FavoritesProvider>
            <ScrollProgress />
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
              Aller au contenu
            </a>
            <Navbar />
            <main id="main">{children}</main>
            <SiteFooter />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
