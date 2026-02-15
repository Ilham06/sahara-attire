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
          ? "bg-white/98 backdrop-blur-md shadow-sm py-3 md:py-4"
          : "bg-white/95 backdrop-blur-sm py-4 md:py-6"
      }`}
    >
      <nav className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-display text-[#A26769] font-bold leading-6"
          >
            {BRAND.name.toUpperCase()}
          </Link>

          {/* Desktop Navigation */}
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

                  {/* Underline */}
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
            className="md:hidden text-black p-2 relative z-50"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-px bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-full h-px bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-px bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-white transition-all duration-500 ${
            mobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
          style={{ top: scrolled ? "60px" : "76px" }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6">

            {NAVIGATION.map((item, index) => {
              const active = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl tracking-[0.2em] uppercase font-light transition-all duration-300 ${
                    active
                      ? "text-[#A26769]"
                      : "text-stone-400 hover:text-[#A26769]"
                  }`}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms",
                    transform: mobileMenuOpen
                      ? "translateY(0)"
                      : "translateY(20px)",
                    opacity: mobileMenuOpen ? 1 : 0,
                  }}
                >
                  {item.name}
                </Link>
              );
            })}

            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg tracking-[0.2em] uppercase font-light text-[#A26769] mt-4"
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
