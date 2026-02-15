"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80"
          alt="Sahara Attire Collection"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
          priority
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-20 left-20 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-in-up">
          {/* Small tagline */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-white/40" />
            <p className="text-white/80 text-xs tracking-[0.3em] uppercase font-light">
              Premium Fashion
            </p>
            <div className="w-12 h-px bg-white/40" />
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.15em] text-white leading-none">
            SAHARA<br />ATTIRE
          </h1>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4a574] to-transparent mx-auto" />

          <p className="text-lg md:text-2xl font-light tracking-[0.1em] text-white/90 max-w-3xl mx-auto leading-relaxed">
            Where minimalist design meets timeless sophistication
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link
              href="/catalog"
              className="btn-primary group"
            >
              <span className="relative z-10">Discover Collection</span>
            </Link>
            <Link
              href="/about"
              className="link-underline text-white text-xs tracking-[0.2em] uppercase font-light py-4 px-8"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-white/60 text-xs tracking-[0.2em] uppercase font-light">Scroll</span>
        <div className="w-[2px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* Corner Frames */}
      <div className="absolute top-0 left-0 z-20 w-16 h-16 border-l-2 border-t-2 border-white/20" />
      <div className="absolute top-0 right-0 z-20 w-16 h-16 border-r-2 border-t-2 border-white/20" />
      <div className="absolute bottom-0 left-0 z-20 w-16 h-16 border-l-2 border-b-2 border-white/20" />
      <div className="absolute bottom-0 right-0 z-20 w-16 h-16 border-r-2 border-b-2 border-white/20" />
    </section>
  );
}
