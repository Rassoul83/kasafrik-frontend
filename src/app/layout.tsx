import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kasafrik — Immobilier & Événements en Afrique",
  description:
    "La référence immobilière et événementielle en Afrique. Achetez, louez, réservez des hôtels et achetez vos billets d'événements en toute sécurité.",
  keywords: "immobilier, Sénégal, Dakar, Afrique, événements, billets, location, vente",
  openGraph: {
    title: "Kasafrik — Immobilier & Événements en Afrique",
    description: "La référence immobilière et événementielle en Afrique.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
