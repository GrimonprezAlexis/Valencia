import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata = {
  title: "Malvine à Valence · 6 → 9 nov.",
  description: "Week-end d'anniversaire à Valence : programme jour par jour, carte, photos, budget et réservations.",
  appleWebApp: { capable: true, title: "Valence", statusBarStyle: "black-translucent" },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#fbf3f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
