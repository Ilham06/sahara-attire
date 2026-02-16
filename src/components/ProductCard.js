"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <Link href={`/catalog/${product.slug}`} className="group block">
      <article className="space-y-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-[#eadfda] bg-[#f4efeb]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
        </div>

        <div className="space-y-2 px-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#8c7d76]">
            {product.category}
          </p>

          <h3 className="font-display text-lg leading-snug text-[#191313] transition-colors duration-300 group-hover:text-[#a26769] md:text-[1.35rem]">
            {product.name}
          </h3>

          <p className="text-sm font-medium text-[#473735]">
            {formatPrice(product.price)}
          </p>
        </div>
      </article>
    </Link>
  );
}
