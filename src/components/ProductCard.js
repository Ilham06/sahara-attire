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
    <Link
      href={`/catalog/${product.slug}`}
      className="group block"
    >
      <div className="space-y-3 md:space-y-5">

        {/* IMAGE */}
        <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-stone-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* INFO */}
        <div className="space-y-1.5 md:space-y-2">

          <p className="text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.35em] uppercase text-stone-400">
            {product.category}
          </p>

          <h3 className="font-display text-sm sm:text-base md:text-xl font-medium text-black leading-snug transition-colors duration-300 group-hover:text-[#A26769]">
            {product.name}
          </h3>

          <p className="text-xs md:text-sm text-stone-600 font-light">
            {formatPrice(product.price)}
          </p>

        </div>
      </div>
    </Link>
  );
}
