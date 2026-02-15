import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { BRAND, REVIEWS } from "@/data/constants";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Home",
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
              Shop by Category
            </p>
            <div className="w-16 h-px bg-stone-300" />
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-[0.05em] mb-6 text-black">
            Browse Collections
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
              Featured Collection
            </p>
            <div className="w-16 h-px bg-stone-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-[0.05em] mb-6 text-black">
            Curated for You
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Handpicked pieces that define our aesthetic — timeless designs crafted from premium materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-20">
          <Link href="/catalog" className="btn-secondary group">
            <span className="relative z-10">View All Products</span>
          </Link>
        </div>
      </Section>

      {/* 4. LIFESTYLE / BRAND STORY */}
      <Section>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Image 1 */}
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="Sahara Attire Lifestyle"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-stone-300" />
                  <p className="text-[10px] text-stone-400 tracking-[0.3em] uppercase font-light">
                    Our Philosophy
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-light tracking-wide text-black leading-tight mb-6">
                  Designed for the<br />Modern Minimalist
                </h2>
                <p className="text-stone-600 leading-relaxed font-light text-lg mb-4">
                  Every piece in our collection tells a story of craftsmanship, sustainability, and timeless elegance. We work exclusively with European ateliers who share our vision of creating fashion that lasts.
                </p>
                <p className="text-stone-600 leading-relaxed font-light">
                  From premium linens to organic cotton, each fabric is carefully selected for its quality, comfort, and environmental impact.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-light text-black mb-2">100%</div>
                  <p className="text-xs text-stone-500 tracking-wider uppercase">Natural Fabrics</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-black mb-2">8+</div>
                  <p className="text-xs text-stone-500 tracking-wider uppercase">Collections</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-black mb-2">5★</div>
                  <p className="text-xs text-stone-500 tracking-wider uppercase">Rated</p>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/about" className="btn-secondary">
                  <span className="relative z-10">Our Story</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. CONTACT - WhatsApp, Instagram, TikTok, Location */}
      <Section background="stone">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-stone-400" />
              <p className="text-[10px] text-stone-500 tracking-[0.3em] uppercase font-light">
                Get in Touch
              </p>
              <div className="w-16 h-px bg-stone-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-[0.05em] mb-6 text-black">
              Connect With Us
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
              Follow our journey and stay updated with the latest collections. Order directly through WhatsApp for personalized service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Social Media */}
            <div className="bg-white p-8 md:p-12">
              <h3 className="text-xl font-light tracking-wide mb-8 text-black">
                Follow Our Story
              </h3>
              <div className="space-y-6">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs tracking-[0.2em] uppercase font-light text-stone-400">WhatsApp</p>
                    <p className="text-sm text-black font-light">{BRAND.whatsappDisplay}</p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href={BRAND.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs tracking-[0.2em] uppercase font-light text-stone-400">Instagram</p>
                    <p className="text-sm text-black font-light">@saharaattire</p>
                  </div>
                </a>

                {/* TikTok */}
                <a
                  href={BRAND.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs tracking-[0.2em] uppercase font-light text-stone-400">TikTok</p>
                    <p className="text-sm text-black font-light">@saharaattire</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-8 md:p-12">
              <h3 className="text-xl font-light tracking-wide mb-8 text-black">
                Visit Our Store
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase font-light text-stone-400 mb-2">Address</p>
                    <p className="text-sm text-black font-light leading-relaxed">
                      {BRAND.address.street}<br />
                      {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}<br />
                      {BRAND.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase font-light text-stone-400 mb-2">Hours</p>
                    <p className="text-sm text-black font-light leading-relaxed">
                      Mon - Fri: {BRAND.hours.weekdays}<br />
                      Saturday: {BRAND.hours.saturday}<br />
                      Sunday: {BRAND.hours.sunday}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-stone-200">
                <Link href="/contact" className="btn-secondary w-full text-center">
                  <span className="relative z-10">Get Directions</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. REVIEWS / TESTIMONIALS */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-stone-300" />
              <p className="text-[10px] text-stone-400 tracking-[0.3em] uppercase font-light">
                Testimonials
              </p>
              <div className="w-16 h-px bg-stone-300" />
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-[0.05em] mb-6 text-black">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-stone-50 p-8 md:p-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#d4a574]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-stone-700 leading-relaxed font-light mb-6 italic">
                  "{review.text}"
                </p>

                {/* Reviewer */}
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

      {/* Footer is rendered by layout.js */}
    </div>
  );
}
