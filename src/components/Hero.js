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
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#150f0f] pt-24 md:pt-28">
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <Image
          src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1600&q=90"
          alt="Sahara Attire Bridal Collection"
          fill
          priority
          quality={95}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#110d0d]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0908] via-[#1b1211]/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <div className="max-w-3xl rounded-[2rem] border border-white/25 bg-white/[0.08] p-7 shadow-[0_18px_52px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-10">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/65">Bridal Collection 2026</p>

          <h1 className="mt-8 leading-[0.85] text-white">
            <span className="block font-display text-6xl tracking-tight md:text-[6rem] lg:text-[7rem]">Sahara</span>
            <span className="-mt-3 block font-display text-6xl tracking-tight text-[#d6a0a1] md:text-[6rem] lg:text-[7rem]">
              Attire
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/80 md:text-lg">
            Busana pernikahan untuk momen paling berharga Anda, memadukan craftsmanship premium, siluet modern,
            dan detail elegan yang timeless.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/catalog"
              className="btn-primary"
            >
              Lihat Koleksi
            </Link>
            <Link href="/about" className="btn-secondary border-white/35 bg-white/15 !text-white hover:!text-white">
              Tentang Brand
            </Link>
          </div>
        </div>
        <div className="mt-10 max-w-xl text-[11px] uppercase tracking-[0.3em] text-white/55">
          Premium bridal atelier for custom, rental, and ready-to-wear wedding looks
        </div>
      </div>

      <div className="absolute bottom-0 right-0 pointer-events-none">
        <span className="select-none font-display text-[18vw] tracking-tight text-white/[0.04]">
          SAHARA
        </span>
      </div>
    </section>
  );
}
