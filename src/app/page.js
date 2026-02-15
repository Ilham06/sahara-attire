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
  description:
    "Sahara Attire adalah rumah mode busana pernikahan dengan sentuhan modern dan keanggunan klasik.",
};

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured);
  const mainCategories = categories.filter((c) => c.slug !== "all");

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

  return (
    <div>
      {/* HERO */}
      <Hero />

      {/* CATEGORIES */}
      <Section>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-medium text-black">
            Koleksi Kami
          </h2>
          <p className="mt-4 text-stone-500 font-light">
            Gaun pernikahan untuk pembelian dan penyewaan.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {mainCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/catalog?category=${category.slug}`}
              className="group block"
            >
              <div className="space-y-4">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  <img
                    src={getCategoryImage(category.slug)}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Title */}
                <div className="flex flex-col items-start gap-2">
                  <h3 className="text-sm tracking-[0.25em] uppercase font-light text-black transition-colors duration-300 group-hover:text-[#A26769]">
                    {category.name}
                  </h3>

                  {/* Subtle underline */}
                  <span className="h-px w-0 bg-[#A26769] transition-all duration-300 group-hover:w-10" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* FEATURED */}
      <Section background="blushSoft">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-light text-black mb-6">
            Gaun Pengantin & Resepsi
          </h2>
          <p className="text-stone-600 font-light leading-relaxed">
            Setiap rancangan diciptakan untuk menghadirkan keanggunan,
            kemewahan, dan keindahan yang tak terlupakan.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-20">
          <Link href="/catalog" className="btn-secondary">
            Lihat Semua Koleksi
          </Link>
        </div>
      </Section>

      {/* BRAND STORY */}
      {/* <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
            <Image
              src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=900&q=80"
              alt="Bridal Atelier"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-6">
              Filosofi Kami
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-light text-black mb-8">
              Keindahan dalam
              <br /> Setiap Detail
            </h2>
            <p className="text-stone-600 leading-relaxed font-light mb-6">
              Sahara Attire adalah rumah mode yang berfokus pada busana
              pernikahan dengan sentuhan modern dan keanggunan klasik. Kami
              menciptakan gaun yang bukan hanya dikenakan — tetapi dikenang
              sepanjang hidup.
            </p>
            <p className="text-stone-600 leading-relaxed font-light">
              Setiap desain dibuat dengan perhatian penuh terhadap detail,
              menggunakan material premium dan pengerjaan yang presisi.
            </p>

            <div className="mt-10">
              <Link href="/about" className="btn-secondary">
                Tentang Kami
              </Link>
            </div>
          </div>
        </div>
      </Section> */}

      {/* CONTACT / APPOINTMENT */}
      <ContactSection />

      {/* TESTIMONIAL */}
      <Section>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">
            Testimoni
          </h2>

          <p className="text-stone-500 font-light mb-16">
            Cerita dari pelanggan Sahara Attire.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-stone-50 p-10 rounded-2xl">
                <p className="italic text-stone-700 mb-6">"{review.text}"</p>
                <p className="text-sm font-medium">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
