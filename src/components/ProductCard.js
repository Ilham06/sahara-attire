"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Image Container */}
        <div className="aspect-[3/4] relative overflow-hidden bg-stone-100 mb-6">
          {/* Main Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? "opacity-0 scale-110" : "opacity-100 scale-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover Image (if available) */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} - alternate view`}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-110"
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Overlay on Hover */}
          <div
            className={`absolute inset-0 bg-black/10 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Quick View Button */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="bg-white text-black px-6 py-3 text-xs tracking-[0.2em] uppercase font-light">
              View Details
            </span>
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-[#d4a574] text-white px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-light">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2 px-1">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-stone-400 tracking-[0.2em] uppercase font-light">
              {product.category}
            </p>
            {product.colors && product.colors.length > 1 && (
              <div className="flex gap-1">
                {product.colors.slice(0, 3).map((color, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full border border-stone-300 bg-stone-100"
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>

          <h3 className="text-base font-light text-black group-hover:text-[#d4a574] transition-colors duration-300 tracking-wide">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2">
            <p className="text-sm font-light text-black">${product.price}</p>
            {product.sizes && (
              <p className="text-[10px] text-stone-400 tracking-wider">
                {product.sizes.length} sizes
              </p>
            )}
          </div>
        </div>

        {/* Decorative Line */}
        <div
          className={`h-px bg-black mt-4 transition-all duration-500 ${
            isHovered ? "w-full" : "w-0"
          }`}
        />
      </div>
    </Link>
  );
}
