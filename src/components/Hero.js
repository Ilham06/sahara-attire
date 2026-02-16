"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCopywriting } from "@/lib/dataStore";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [copy, setCopy] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setCopy(getCopywriting());
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hero = copy?.hero;

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-[#150f0f] pt-24 md:min-h-screen md:pt-28">
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <Image
          src="https://sahara-dress-catalog.lovable.app/assets/hero-fashion-B5Fqi6o5.jpg"
          alt="Sahara Attire Bridal Collection"
          fill
          priority
          quality={95}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#120d0d]/64" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/70" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.46em] text-white/70">{hero?.kicker || "Bridal Collection 2026"}</p>

          <h1 className="mt-6 leading-[0.9] text-white">
            <span className="block font-display text-5xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">{hero?.heading1 || "Sahara"}</span>
            <span className="block font-display text-5xl tracking-tight text-[#ddb0b1] sm:text-6xl md:text-7xl lg:text-8xl">
              {hero?.heading2 || "Attire"}
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/82 sm:text-base md:text-lg">
            {hero?.description || "Busana pernikahan dengan siluet modern, detail refined, dan material premium untuk momen paling berharga Anda."}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/catalog"
              className="btn-primary w-full justify-center sm:w-auto"
            >
              {hero?.ctaPrimary || "Lihat Koleksi"}
            </Link>
            <Link
              href="/about"
              className="w-full text-center text-[11px] uppercase tracking-[0.22em] text-white/80 transition-colors hover:text-white sm:w-auto sm:text-left"
            >
              {hero?.ctaSecondary || "Tentang Brand"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
