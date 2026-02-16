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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "pt-2 md:pt-4" : "pt-4 md:pt-6"
      } overflow-x-clip`}
    >
      <nav className="mx-auto w-full max-w-7xl overflow-x-clip px-4 sm:px-5 md:px-10">
        <div
          className={`rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "border-[#eadfd9] bg-white/80 shadow-[0_16px_40px_rgba(48,34,31,0.14)] backdrop-blur-xl"
              : "border-white/40 bg-white/55 backdrop-blur-lg"
          }`}
        >
          <div className="flex min-w-0 items-center justify-between px-4 py-3 md:px-7">
            <Link
              href="/"
              className="block min-w-0 max-w-[72%] truncate pr-2 font-display text-xl tracking-tight text-[#a26769] sm:text-2xl md:max-w-none md:text-3xl"
            >
              {BRAND.name}
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {NAVIGATION.map((item) => {
                const active =
                  pathname === item.path || (item.path !== "/" && pathname.startsWith(`${item.path}/`));
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative text-[11px] uppercase tracking-[0.28em] transition-colors duration-300 ${
                      active ? "text-[#a26769]" : "text-[#6f605b] hover:text-[#a26769]"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-2 left-0 h-px bg-[#a26769] transition-all duration-300 ${
                        active ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                );
              })}

              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !px-5 !py-2 !text-[10px]"
              >
                Konsultasi
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="relative z-50 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8c6be] bg-white/85 md:hidden"
              aria-label="Toggle menu"
            >
              <div className="flex h-4 w-5 flex-col justify-between">
                <span
                  className={`h-px bg-[#221918] transition-all duration-300 ${
                    mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px bg-[#221918] transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-px bg-[#221918] transition-all duration-300 ${
                    mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 md:hidden ${
            mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-3 rounded-2xl border border-[#eadfd9] bg-white/92 p-5 shadow-[0_14px_34px_rgba(42,29,27,0.16)] backdrop-blur-xl">
            <div className="space-y-5">
              {NAVIGATION.map((item) => {
                const active =
                  pathname === item.path || (item.path !== "/" && pathname.startsWith(`${item.path}/`));
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`block text-sm uppercase tracking-[0.24em] ${
                      active ? "text-[#a26769]" : "text-[#685a55]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full !py-3 !text-[10px]"
            >
              Hubungi WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
