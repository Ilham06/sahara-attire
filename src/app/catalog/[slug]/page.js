"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { BRAND } from "@/data/constants";

export default function ProductDetail() {
  const params = useParams();
  const product = products.find((p) => p.slug === params.slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!product) {
    return (
      <div className="pt-24 md:pt-32 min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-display">Produk Tidak Ditemukan</h1>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pt-24 md:pt-32">

      <Section>

        {/* Breadcrumb */}
        <div className="mb-12 text-sm text-stone-400">
          <Link href="/" className="hover:text-black">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/catalog" className="hover:text-black">Koleksi</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT – Smaller Gallery */}
          <div className="space-y-6">

            <div
              className="aspect-[3/4] relative overflow-hidden bg-stone-100 cursor-zoom-in"
              onClick={() => setPreviewOpen(true)}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-20 relative overflow-hidden transition-all ${
                      selectedImage === index
                        ? "ring-1 ring-[#A26769]"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT – Info */}
          <div className="space-y-8">

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-4">
                {product.category}
              </p>

              <h1 className="text-4xl font-display font-medium text-black">
                {product.name}
              </h1>

              <div className="w-20 h-px bg-[#A26769] mt-6 mb-6" />

              <p className="text-2xl text-black">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
            </div>

            <p className="text-stone-600 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Specification */}
            <div className="border-t border-stone-200 pt-8 space-y-6">

              <h3 className="text-sm uppercase tracking-[0.3em] text-stone-500">
                Detail Gaun
              </h3>

              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-stone-500">Material</div>
                <div className="text-black">{product.details.fabric}</div>

                <div className="text-stone-500">Siluet</div>
                <div className="text-black">{product.details.fit}</div>

                <div className="text-stone-500">Perawatan</div>
                <div className="text-black">{product.details.care}</div>

                <div className="text-stone-500">Asal</div>
                <div className="text-black">{product.details.origin}</div>
              </div>

            </div>

            {/* Size Specification */}
            <div className="border-t border-stone-200 pt-8 space-y-6">

              <h3 className="text-sm uppercase tracking-[0.3em] text-stone-500">
                Ukuran Gaun
              </h3>

              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-stone-500">Lingkar Dada</div>
                <div className="text-black">84 – 92 cm</div>

                <div className="text-stone-500">Lingkar Pinggang</div>
                <div className="text-black">66 – 74 cm</div>

                <div className="text-stone-500">Lingkar Pinggul</div>
                <div className="text-black">90 – 98 cm</div>

                <div className="text-stone-500">Panjang Gaun</div>
                <div className="text-black">150 cm</div>
              </div>

            </div>

            {/* CTA */}
            <div className="pt-8">
              <button
                onClick={() => {
                  const message = `Halo, saya tertarik dengan ${product.name}. Mohon informasi lebih lanjut.`;
                  const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="w-full py-4 bg-[#A26769] text-white uppercase tracking-[0.25em] text-xs transition-all duration-300 hover:bg-black"
              >
                Hubungi via WhatsApp
              </button>
            </div>

          </div>

        </div>

      </Section>

      {/* Preview Modal */}
      {previewOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setPreviewOpen(false)}
        >
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Related */}
      {relatedProducts.length > 0 && (
        <Section background="blushSoft">
          <h2 className="text-3xl font-display text-center mb-16 text-black">
            Koleksi Lainnya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Section>
      )}

    </div>
  );
}
