"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">

      {/* Background Image */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=90"
          alt="Editorial Sahara Attire"
          fill
          priority
          quality={95}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 w-full">
        <div className="max-w-3xl">

          {/* Micro Label */}
          <p className="text-[10px] tracking-[0.6em] uppercase text-white/60 mb-16">
            Koleksi 2026 — Rumah Mode Sahara
          </p>

          {/* Brand Name with Playfair */}
          <h1 className="leading-[0.85] text-white">

            <span className="block text-6xl md:text-[6rem] lg:text-[7rem] font-display font-medium tracking-tight">
              Sahara
            </span>

            <span className="block text-6xl md:text-[6rem] lg:text-[7rem] font-display italic font-medium tracking-tight -mt-4 text-[#C6A66A]">
              Attire
            </span>

          </h1>

          {/* Gold Accent Line */}
          <div className="w-32 h-px bg-gradient-to-r from-[#C6A66A] to-transparent mt-14 mb-14" />

          {/* Statement */}
          <p className="text-white/75 text-lg md:text-xl font-light max-w-xl leading-relaxed">
            Keanggunan modern yang terinspirasi dari nuansa gurun —
            dirancang dengan siluet minimal,
            warna hangat yang tenang,
            dan detail yang abadi.
          </p>

          {/* CTA */}
          <div className="mt-16 flex gap-6 flex-wrap">
            <Link
              href="/catalog"
              className="px-12 py-4 bg-[#C6A66A] text-black uppercase tracking-[0.25em] text-xs transition-all duration-300 hover:bg-white"
            >
              Lihat Koleksi
            </Link>

            <Link
              href="/about"
              className="px-12 py-4 border border-white/40 text-white uppercase tracking-[0.25em] text-xs transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Tentang Kami
            </Link>
          </div>

        </div>
      </div>

      {/* Giant Background Text */}
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <span className="text-white/[0.03] text-[18vw] font-[var(--font-playfair)] font-semibold tracking-tight select-none">
          SAHARA
        </span>
      </div>

    </section>
  );
}
