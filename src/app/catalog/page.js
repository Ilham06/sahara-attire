"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/api";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        products.getAll(),
        categories.getAll(),
      ]);
      setProductList(productsData);
      setCategoryList(categoriesData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? productList
      : productList.filter((p) => {
          // Find the category by slug
          const category = categoryList.find((c) => c.slug === selectedCategory);
          return category && p.categoryId === category.id;
        });

  return (
    <div className="pt-24 md:pt-32">
      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-kicker">Catalog</p>
          <h1 className="section-title mt-6">Koleksi Sahara Attire</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#645653]">
            Temukan gaun pernikahan, resepsi, dan busana pelengkap untuk pembelian maupun penyewaan dengan kualitas
            atelier premium.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
          {categoryList.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-all duration-300 md:px-5 ${
                selectedCategory === category.slug
                  ? "border-[#a26769] bg-[#a26769] text-white shadow-[0_10px_22px_rgba(162,103,105,0.3)]"
                  : "border-[#ddcfc9] bg-white/75 text-[#6b5b57] hover:border-[#c6b3ab]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-14 text-center text-[#8a7973]">
            Loading products...
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[#7d6f69]">Belum ada koleksi pada kategori ini.</p>
          </div>
        )}
      </Section>
    </div>
  );
}

export default function Catalog() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 md:pt-32">
          <Section>
            <div className="mx-auto max-w-4xl text-center">
              <p className="section-kicker">Catalog</p>
              <h1 className="section-title mt-6">Koleksi Sahara Attire</h1>
              <div className="mt-8 text-[#8a7973]">Loading...</div>
            </div>
          </Section>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
