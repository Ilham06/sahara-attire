"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION, BRAND } from "@/data/constants";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled
      ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
      : "bg-white/80 backdrop-blur-sm py-4"
  }`}
>
  <nav className="max-w-7xl mx-auto px-5 md:px-12">
    <div className="flex items-center justify-between">

      {/* Logo */}
      <Link
        href="/"
        className="text-lg md:text-2xl font-display text-[#A26769] font-semibold tracking-wide"
      >
        {BRAND.name}
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-10">
        {NAVIGATION.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className="relative group"
            >
              <span
                className={`text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-300 ${
                  active
                    ? "text-[#A26769]"
                    : "text-stone-500 group-hover:text-[#A26769]"
                }`}
              >
                {item.name}
              </span>

              <span
                className={`absolute -bottom-1 left-0 h-px bg-[#A26769] transition-all duration-300 ${
                  active ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          );
        })}
      </div>

      {/* Mobile Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden relative z-50 w-8 h-8 flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-4 flex flex-col justify-between">
          <span
            className={`h-px bg-black transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`h-px bg-black transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px bg-black transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </div>
      </button>
    </div>

    {/* ================= MOBILE PANEL ================= */}
    <div
      className={`md:hidden absolute left-0 right-0 bg-white shadow-xl transition-all duration-500 ease-out ${
        mobileMenuOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
      style={{ top: "100%" }}
    >
      <div className="px-6 py-10 space-y-8">

        {NAVIGATION.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-base tracking-[0.25em] uppercase font-light transition-colors duration-300 ${
                active
                  ? "text-[#A26769]"
                  : "text-stone-500 hover:text-[#A26769]"
              }`}
            >
              {item.name}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="h-px bg-stone-200 my-6" />

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/${BRAND.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center border border-[#A26769] text-[#A26769] py-3 tracking-[0.25em] uppercase text-xs transition-all duration-300 hover:bg-[#A26769] hover:text-white"
          onClick={() => setMobileMenuOpen(false)}
        >
          Hubungi Kami
        </a>

      </div>
    </div>
  </nav>
</header>

  );
}
