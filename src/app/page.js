import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { BRAND, REVIEWS } from "@/data/constants";
import Link from "next/link";
import Image from "next/image";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Beranda",
  description: `${BRAND.tagline}. ${BRAND.description}`,
};

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured);
  const mainCategories = categories.filter((c) => c.slug !== "all");

  return (
    <div>
      {/* 1. HERO */}
      <Hero />

      {/* 2. CATEGORIES */}
      <Section>
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-stone-300" />
            <p className="text-[10px] text-stone-400 tracking-[0.3em] uppercase font-light">
              Belanja Berdasarkan Kategori
            </p>
            <div className="w-16 h-px bg-stone-300" />
          </div>
          <h2 className="text-4xl md:text-5xl tracking-[0.05em] mb-6 text-black font-bold font-display">
            Collections
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {mainCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/catalog?category=${category.slug}`}
              className="group relative aspect-square overflow-hidden bg-stone-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <h3 className="text-white text-sm md:text-base tracking-[0.2em] uppercase font-light text-center">
                  {category.name}
                </h3>
              </div>
              <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition-transform duration-500" />
            </Link>
          ))}
        </div>
      </Section>

      {/* 3. FEATURED COLLECTION */}
      <Section background="stone">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-stone-400" />
            <p className="text-[10px] text-stone-500 tracking-[0.3em] uppercase font-light">
              Koleksi Unggulan
            </p>
            <div className="w-16 h-px bg-stone-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-[0.05em] mb-6 text-black">
            Anggun & Timeless
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Setiap desain dipilih dengan penuh perhatian untuk menghadirkan
            kesederhanaan yang elegan — busana modest yang nyaman, berkualitas,
            dan relevan sepanjang waktu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-20">
          <Link href="/catalog" className="btn-secondary group">
            <span className="relative z-10">Lihat Semua Produk</span>
          </Link>
        </div>
      </Section>

      {/* 4. BRAND STORY */}
      <Section>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="Lifestyle Modest Fashion"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-stone-300" />
                  <p className="text-[10px] text-stone-400 tracking-[0.3em] uppercase font-light">
                    Filosofi Kami
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light tracking-wide text-black leading-tight mb-6">
                  Keanggunan dalam
                  <br /> Kesederhanaan
                </h2>
                <p className="text-stone-600 leading-relaxed font-light text-lg mb-4">
                  Kami percaya bahwa modest fashion adalah tentang rasa percaya diri,
                  kenyamanan, dan nilai. Setiap koleksi dirancang untuk menemani
                  perempuan modern yang ingin tampil santun tanpa meninggalkan gaya.
                </p>
                <p className="text-stone-600 leading-relaxed font-light">
                  Dengan material pilihan dan detail yang dikerjakan dengan teliti,
                  kami menghadirkan busana yang tidak hanya indah dipandang,
                  tetapi juga nyaman dikenakan sepanjang hari.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-light text-black mb-2">100%</div>
                  <p className="text-xs text-stone-500 tracking-wider uppercase">
                    Bahan Berkualitas
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-black mb-2">8+</div>
                  <p className="text-xs text-stone-500 tracking-wider uppercase">
                    Koleksi Eksklusif
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-black mb-2">5★</div>
                  <p className="text-xs text-stone-500 tracking-wider uppercase">
                    Ulasan Terbaik
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/about" className="btn-secondary">
                  <span className="relative z-10">Cerita Kami</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. CONTACT */}
      <ContactSection/>

      {/* 6. TESTIMONIALS */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-stone-300" />
              <p className="text-[10px] text-stone-400 tracking-[0.3em] uppercase font-light">
                Testimoni
              </p>
              <div className="w-16 h-px bg-stone-300" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display tracking-[0.05em] mb-6 text-black">
              Apa Kata Pelanggan Kami
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-stone-50 p-8 md:p-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#d4a574]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="text-stone-700 leading-relaxed font-light mb-6 italic">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4a574] flex items-center justify-center text-white font-light">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-light text-black">{review.name}</p>
                    <p className="text-xs text-stone-500">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
