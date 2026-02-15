import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND } from "@/data/constants";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: BRAND.name,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: ["fashion", "minimalist", "desert", "attire", "clothing", "premium", "sustainable"],
  authors: [{ name: BRAND.name }],
  openGraph: {
    title: BRAND.name,
    description: BRAND.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${cormorant.variable} ${outfit.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
