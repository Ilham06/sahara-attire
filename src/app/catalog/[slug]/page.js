"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import { products, contact } from "@/lib/api";

export default function ProductDetail() {
  const params = useParams();
  const [productList, setProductList] = useState([]);
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, contactData] = await Promise.all([
        products.getAll(),
        contact.get(),
      ]);
      setProductList(productsData);
      setBrand(contactData);
    } catch (error) {
      console.error("Load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const product = productList.find((p) => p.slug === params.slug);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 md:pt-32">
        <p className="text-[#8a7973]">Loading...</p>
      </div>
    );
  }

  if (!brand || productList.length === 0) return null;

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 md:pt-32">
        <h1 className="font-display text-2xl">Produk Tidak Ditemukan</h1>
      </div>
    );
  }

  const relatedProducts = productList
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pt-24 md:pt-32">
      <Section>
        <div className="mb-8 text-xs uppercase tracking-[0.2em] text-[#8c7d77]">
          <Link href="/" className="hover:text-[#342826]">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/catalog" className="hover:text-[#342826]">Koleksi</Link>
          <span className="mx-2">/</span>
          <span className="text-[#342826]">{product.name}</span>
        </div>

        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <div
              className="relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-[2rem] border border-[#e8dcd7] bg-[#f0e9e5]"
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
                    className={`relative h-20 w-16 overflow-hidden rounded-xl transition-all ${
                      selectedImage === index
                        ? "ring-2 ring-[#a26769]"
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

          <div className="editorial-card space-y-7">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-[#8d7f78]">
                {product.category?.name}
              </p>

              <h1 className="font-display text-4xl text-[#171211]">{product.name}</h1>

              <p className="mt-4 text-2xl font-medium text-[#3e2f2d]">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
            </div>

            <p className="text-[#61524d]">{product.description}</p>

            <div className="space-y-6 border-t border-[#e5d5cf] pt-6">
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#8a7973]">Detail Gaun</h3>

              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-[#867670]">Material</div>
                <div className="text-[#211918]">{product.fabric || "-"}</div>

                <div className="text-[#867670]">Siluet</div>
                <div className="text-[#211918]">{product.fit || "-"}</div>

                <div className="text-[#867670]">Perawatan</div>
                <div className="text-[#211918]">{product.care || "-"}</div>

                <div className="text-[#867670]">Asal</div>
                <div className="text-[#211918]">{product.origin || "-"}</div>
              </div>
            </div>

            <div className="space-y-6 border-t border-[#e5d5cf] pt-6">
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#8a7973]">Ukuran Referensi</h3>

              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-[#867670]">Lingkar Dada</div>
                <div className="text-[#211918]">84 - 92 cm</div>

                <div className="text-[#867670]">Lingkar Pinggang</div>
                <div className="text-[#211918]">66 - 74 cm</div>

                <div className="text-[#867670]">Lingkar Pinggul</div>
                <div className="text-[#211918]">90 - 98 cm</div>

                <div className="text-[#867670]">Panjang Gaun</div>
                <div className="text-[#211918]">150 cm</div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  const message = `Halo, saya tertarik dengan ${product.name}. Mohon informasi lebih lanjut.`;
                  const whatsappUrl = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="btn-primary w-full"
              >
                Hubungi via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </Section>

      {previewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
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

      {relatedProducts.length > 0 && (
        <Section background="blushSoft">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker">Recommended</p>
            <h2 className="section-title mt-5">Koleksi Lainnya</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
