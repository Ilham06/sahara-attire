"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-50">
      {/* Split Layout Grid */}
      <div className="absolute inset-0 grid md:grid-cols-2">
        {/* Left Side - Image */}
        <div className="relative h-full">
          <div
            className="absolute inset-0 z-0 transition-transform duration-1000"
            style={{
              transform: mounted ? `translateY(${scrollY * 0.3}px)` : 'translateY(0)',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=90"
              alt="Sahara Attire Collection"
              fill
              className="object-cover"
              sizes="50vw"
              priority
              quality={95}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-stone-50 md:to-stone-50" />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>

        {/* Right Side - Solid background for mobile */}
        <div className="hidden md:block bg-stone-50" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
          {/* Empty left column for spacing on desktop */}
          <div className="hidden md:block" />

          {/* Right Content */}
          <div className="space-y-8 md:space-y-12 bg-stone-50/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-8 md:p-0 rounded-sm">
            {/* Overline */}
            <div
              className="flex items-center gap-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              <div className="w-16 h-px bg-stone-900/30" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-600 font-light">
                Fashion Premium
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-stone-900 leading-[0.95] opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
              >
                SAHARA
                <br />
                <span className="text-[#d4a574]">ATTIRE</span>
              </h1>

              <div
                className="w-32 h-px bg-gradient-to-r from-[#d4a574] to-transparent opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
              />
            </div>

            {/* Tagline */}
            <p
              className="text-lg md:text-xl font-light text-stone-700 leading-relaxed max-w-md tracking-wide opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            >
              Di mana desain minimalis bertemu kecanggihan abadi
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              <Link
                href="/catalog"
                className="btn-primary inline-flex items-center justify-center"
              >
                <span className="relative z-10">Jelajahi Koleksi</span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="btn-secondary inline-flex items-center justify-center"
              >
                <span>Cerita Kami</span>
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-8 pt-8 border-t border-stone-200 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
            >
              <div>
                <p className="text-2xl md:text-3xl font-serif font-light text-stone-900">500+</p>
                <p className="text-xs text-stone-500 tracking-wider uppercase mt-1">Produk</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-serif font-light text-stone-900">50K+</p>
                <p className="text-xs text-stone-500 tracking-wider uppercase mt-1">Pelanggan</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-serif font-light text-stone-900">4.9★</p>
                <p className="text-xs text-stone-500 tracking-wider uppercase mt-1">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-12 left-12 z-10 flex-col items-start gap-3">
        <span className="text-stone-400 text-[10px] tracking-[0.3em] uppercase font-light">Gulir</span>
        <div className="w-px h-20 bg-linear-to-b from-stone-400 to-transparent animate-pulse" />
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.02] pointer-events-none">
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
          {[...Array(64)].map((_, i) => (
            <div key={i} className="border border-stone-900" />
          ))}
        </div>
      </div>
    </section>
  );
}
