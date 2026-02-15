"use client";

import { useState } from "react";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="pt-24 md:pt-32">

      {/* HEADER */}
      <Section>
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-medium text-black">
            Koleksi
          </h1>

          <div className="w-20 h-px bg-[#A26769] mx-auto" />

          <p className="text-stone-600 font-light max-w-2xl mx-auto">
            Temukan pilihan gaun pernikahan untuk pembelian
            dan penyewaan yang dirancang dengan siluet modern
            dan sentuhan elegan.
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">

          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className={`relative text-sm uppercase tracking-[0.3em] font-light transition-all duration-300 ${
                selectedCategory === category.slug
                  ? "text-black"
                  : "text-stone-400 hover:text-black"
              }`}
            >
              {category.name}

              {/* Underline indicator */}
              <span
                className={`absolute -bottom-2 left-0 h-px bg-[#A26769] transition-all duration-300 ${
                  selectedCategory === category.slug
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}

        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 md:gap-x-10 md:gap-y-20">

          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500 font-light">
              Belum ada koleksi pada kategori ini.
            </p>
          </div>
        )}

      </Section>
    </div>
  );
}
