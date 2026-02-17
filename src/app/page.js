"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import { products, categories, reviews, copywriting } from "@/lib/api";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [copy, setCopy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData, reviewsData, copywritingData] = await Promise.all([
        products.getAll(),
        categories.getAll(),
        reviews.getAll(),
        copywriting.get(),
      ]);

      setProductList(productsData);
      setCategoryList(categoriesData);
      setReviewList(reviewsData);
      setCopy(copywritingData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const featuredProducts = productList.filter((p) => p.featured);
  const mainCategories = categoryList.filter((c) => c.slug !== "all");

  const getCategoryImage = (slug) => {
    switch (slug) {
      case "bridal-gown":
        return "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80";
      case "reception-dress":
        return "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80";
      case "engagement":
        return "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80";
      case "bridesmaid":
        return "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80";
      case "bridal-accessories":
        return "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80";
      default:
        return "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80";
    }
  };

  if (loading || !copy) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-[#8a7973]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-clip">
      <div className="mesh-accent -left-16 top-60 hidden h-64 w-64 md:block" />
      <div className="mesh-accent -right-16 top-[54rem] hidden h-80 w-80 md:block" />

      <Hero />

      {/* Categories Section */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">{copy.collection?.kicker}</p>
          <h2 className="section-title mt-6">{copy.collection?.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#635551]">
            {copy.collection?.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-4">
          {mainCategories.map((category) => (
            <Link
              key={category.id}
              href={`/catalog?category=${category.slug}`}
              className="group block rounded-[1.4rem] border border-[#e8ddd8] bg-white/75 p-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(67,45,40,0.12)]"
            >
              <div className="space-y-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-[#efe8e4]">
                  <img
                    src={getCategoryImage(category.slug)}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="px-1 pb-2">
                  <h3 className="text-[11px] uppercase tracking-[0.24em] text-[#3d2f2d]">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Featured Products Section */}
      <Section background="blushSoft">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">{copy.bestSeller?.kicker}</p>
          <h2 className="section-title mt-6">{copy.bestSeller?.title}</h2>
          <p className="mt-4 text-[#635551]">
            {copy.bestSeller?.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/catalog" className="btn-secondary">
            Lihat Semua Koleksi
          </Link>
        </div>
      </Section>

      {/* Features Section */}
      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          {copy.features?.map((feat) => (
            <article key={feat.number} className="editorial-card">
              <p className="section-kicker">{feat.number}</p>
              <h3 className="mt-4 font-display text-3xl text-[#1f1816]">{feat.title}</h3>
              <p className="mt-4 text-[#655752]">{feat.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <ContactSection />

      {/* Reviews Section */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">{copy.reviews?.kicker}</p>
          <h2 className="section-title mt-6">{copy.reviews?.title}</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reviewList.slice(0, 4).map((review) => (
            <article key={review.id} className="editorial-card">
              <p className="text-lg italic leading-relaxed text-[#544744]">"{review.text}"</p>
              <div className="soft-divider my-5" />
              <p className="text-xs uppercase tracking-[0.22em] text-[#8a7973]">{review.name}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
