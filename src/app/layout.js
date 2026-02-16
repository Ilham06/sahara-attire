import { Cormorant_Garamond, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

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
      <body className="font-[var(--font-outfit)] antialiased text-neutral-900">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
