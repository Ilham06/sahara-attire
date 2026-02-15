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
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  if (!product) {
    return (
      <div className="pt-24 md:pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-light text-stone-900 mb-4">
            Product Not Found
          </h1>
          <Link
            href="/catalog"
            className="text-stone-600 hover:text-stone-900 underline underline-offset-4"
          >
            Return to Catalog
          </Link>
        </div>
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
        <div className="mb-8 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/catalog" className="hover:text-stone-900">
            Catalog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-900">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] relative overflow-hidden bg-stone-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative overflow-hidden bg-stone-100 border-2 transition-colors ${
                      selectedImage === index
                        ? "border-stone-900"
                        : "border-transparent hover:border-stone-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs text-stone-500 tracking-wider uppercase mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-light tracking-wide text-stone-900 mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-stone-900">${product.price}</p>
            </div>

            <p className="text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <label className="block text-[10px] font-light text-black mb-4 tracking-[0.2em] uppercase">
                Select Color
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 border transition-all text-xs tracking-wider font-light ${
                      selectedColor === color
                        ? "bg-black text-white border-black"
                        : "border-stone-300 text-black hover:border-black"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-[10px] font-light text-black mb-4 tracking-[0.2em] uppercase">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border transition-all text-sm font-light ${
                      selectedSize === size
                        ? "bg-black text-white border-black scale-105"
                        : "border-stone-300 text-black hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Order via WhatsApp */}
            <div className="space-y-4">
              <button
                onClick={() => {
                  const message = `Hi! I'm interested in ordering:\n\n*${product.name}*\nPrice: $${product.price}\nSize: ${selectedSize || "Not selected"}\nColor: ${selectedColor || "Not selected"}\n\nPlease provide more information.`;
                  const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, "_blank");
                }}
                disabled={!selectedSize || !selectedColor}
                className="btn-primary w-full group disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="relative z-10">Order via WhatsApp</span>
              </button>
              {(!selectedSize || !selectedColor) && (
                <p className="text-xs text-stone-500 text-center tracking-wide">
                  Please select size and color to continue
                </p>
              )}
            </div>

            {/* Product Details */}
            <div className="border-t border-stone-200 pt-6 space-y-3">
              <h3 className="text-sm font-medium text-stone-900 tracking-wider uppercase">
                Details
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-stone-500">Fabric</dt>
                  <dd className="text-stone-900">{product.details.fabric}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">Care</dt>
                  <dd className="text-stone-900 text-right max-w-xs">
                    {product.details.care}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">Fit</dt>
                  <dd className="text-stone-900">{product.details.fit}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">Origin</dt>
                  <dd className="text-stone-900">{product.details.origin}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section background="stone">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-12 text-stone-900">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
