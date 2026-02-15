import { Cormorant_Garamond, Outfit, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${outfit.variable} ${playfair.variable}`}
    >
      <body className="font-[var(--font-outfit)] antialiased bg-white text-neutral-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
