import Section from "@/components/Section";
import Image from "next/image";
import { BRAND } from "@/data/constants";

export const metadata = {
  title: `About - ${BRAND.name}`,
  description: BRAND.description,
};

export default function About() {
  return (
    <div className="pt-24 md:pt-32">
      {/* Hero Section */}
      <Section>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-stone-900">
            Our Story
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            {BRAND.tagline}
          </p>
        </div>
      </Section>

      {/* Image Section */}
      <section className="w-full h-[50vh] md:h-[60vh] relative">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
          alt="Sahara Attire Studio"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </section>

      {/* Brand Philosophy */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-stone-900">
                Philosophy
              </h2>
              <p className="text-stone-600 leading-relaxed">
                We believe that true style is timeless. Our approach to fashion
                rejects the ephemeral nature of trends in favor of pieces that
                transcend seasons and remain relevant for years to come.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Each garment is designed with intention, crafted from premium
                natural materials, and finished with meticulous attention to
                detail. We celebrate simplicity, quality, and the beauty of
                understated elegance.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-stone-900">
                Craftsmanship
              </h2>
              <p className="text-stone-600 leading-relaxed">
                Our collections are produced in small batches by skilled
                artisans across Europe. We partner with family-owned
                manufacturers who share our commitment to ethical production
                and sustainable practices.
              </p>
              <p className="text-stone-600 leading-relaxed">
                From the finest European linens to Italian wool and French silk,
                we source only premium natural fibers that age beautifully and
                feel exceptional against the skin.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section background="stone">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-12 text-stone-900">
            Our Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto border border-stone-400 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-stone-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-light tracking-wider text-stone-900">
                Timeless
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Designs that transcend fleeting trends and remain relevant
                season after season.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto border border-stone-400 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-stone-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-light tracking-wider text-stone-900">
                Sustainable
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Ethical production, natural materials, and a commitment to
                reducing our environmental impact.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto border border-stone-400 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-stone-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-light tracking-wider text-stone-900">
                Quality
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Premium fabrics, expert craftsmanship, and attention to every
                detail.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
