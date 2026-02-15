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
      {/* Header */}
      <Section>
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-stone-900">
            Catalog
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            Explore our complete collection of timeless, minimalist pieces
            crafted from premium natural fabrics.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-6 py-2 border transition-colors tracking-wider text-sm uppercase ${
                selectedCategory === category.slug
                  ? "bg-stone-900 text-white border-stone-900"
                  : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}
