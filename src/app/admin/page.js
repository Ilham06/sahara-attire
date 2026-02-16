"use client";

import { useEffect, useState } from "react";
import { getProducts, getCategories, getReviews, getContact } from "@/lib/dataStore";
import Link from "next/link";
import { Package, Tag, Star, Phone, FileText } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, reviews: 0, brand: "" });

  useEffect(() => {
    const products = getProducts();
    const categories = getCategories();
    const reviews = getReviews();
    const contact = getContact();
    setStats({
      products: products.length,
      categories: categories.filter((c) => c.slug !== "all").length,
      reviews: reviews.length,
      brand: contact.name,
    });
  }, []);

  const cards = [
    { label: "Produk", value: stats.products, href: "/admin/products", icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Kategori", value: stats.categories, href: "/admin/categories", icon: Tag, color: "bg-green-50 text-green-600" },
    { label: "Review", value: stats.reviews, href: "/admin/reviews", icon: Star, color: "bg-yellow-50 text-yellow-600" },
    { label: "Kontak", value: "Edit", href: "/admin/contact", icon: Phone, color: "bg-purple-50 text-purple-600" },
    { label: "Copywriting", value: "Edit", href: "/admin/copywriting", icon: FileText, color: "bg-pink-50 text-pink-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#181313]">Dashboard</h1>
      <p className="mt-1 text-sm text-[#8a7973]">Selamat datang di panel admin {stats.brand}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="flex items-center gap-4 rounded-2xl border border-[#e6dbd6] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#181313]">{card.value}</p>
                <p className="text-sm text-[#8a7973]">{card.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
