import Section from "@/components/Section";
import Image from "next/image";
import { BRAND } from "@/data/constants";

export const metadata = {
  title: `Tentang Kami - ${BRAND.name}`,
  description: BRAND.description,
};

export default function About() {
  return (
    <div className="pt-24 md:pt-32">

      {/* 1️⃣ Cinematic Hero */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
          alt="Sahara Attire Bridal"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-white px-6">
          <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tight">
            Sahara Attire
          </h1>
          <div className="w-24 h-px bg-[#A26769] mx-auto mt-8 mb-8" />
          <p className="text-lg md:text-xl font-light text-white/80 max-w-xl mx-auto">
            Gaun pernikahan yang dirancang untuk
            menciptakan momen tak terlupakan.
          </p>
        </div>
      </section>

      {/* 2️⃣ Editorial Split Layout with Overlap */}
      <Section>
        <div className="max-w-6xl mx-auto relative">

          <div className="grid md:grid-cols-2 gap-20 items-center">

            {/* Image */}
            <div className="relative aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80"
                alt="Bridal Collection"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-10">
              <p className="uppercase tracking-[0.4em] text-xs text-stone-400">
                Tentang Kami
              </p>

              <h2 className="text-4xl md:text-5xl font-display text-black leading-tight">
                Keanggunan dalam
                <br />
                Setiap Detail
              </h2>

              <div className="w-16 h-px bg-[#A26769]" />

              <p className="text-stone-600 font-light leading-relaxed">
                Sahara Attire menghadirkan koleksi gaun pernikahan
                untuk pembelian dan penyewaan dengan pendekatan
                modern dan elegan.
              </p>

              <p className="text-stone-600 font-light leading-relaxed">
                Setiap desain dipilih dengan perhatian pada siluet,
                tekstur, dan kenyamanan — agar setiap pengantin
                merasa percaya diri di hari istimewanya.
              </p>
            </div>

          </div>

        </div>
      </Section>

      {/* 3️⃣ Large Statement Section */}
      <Section background="blushSoft">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl md:text-6xl font-display font-medium text-black leading-snug">
            Kami percaya bahwa
            <br />
            setiap gaun memiliki cerita.
          </h2>

          <div className="mt-10 w-20 h-px bg-[#A26769] mx-auto" />

        </div>
      </Section>

      {/* 4️⃣ Premium Values Layout */}
      <Section>
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-3 gap-16">

            <div className="space-y-6">
              <span className="text-5xl font-display text-[#A26769]">
                01
              </span>
              <h3 className="text-xl font-display text-black">
                Elegan
              </h3>
              <p className="text-stone-600 font-light">
                Siluet modern yang dirancang
                untuk menciptakan kesan tak terlupakan.
              </p>
            </div>

            <div className="space-y-6">
              <span className="text-5xl font-display text-[#A26769]">
                02
              </span>
              <h3 className="text-xl font-display text-black">
                Berkualitas
              </h3>
              <p className="text-stone-600 font-light">
                Material pilihan dengan detail
                yang diperhatikan secara presisi.
              </p>
            </div>

            <div className="space-y-6">
              <span className="text-5xl font-display text-[#A26769]">
                03
              </span>
              <h3 className="text-xl font-display text-black">
                Fleksibel
              </h3>
              <p className="text-stone-600 font-light">
                Tersedia untuk pembelian dan
                penyewaan sesuai kebutuhan Anda.
              </p>
            </div>

          </div>

        </div>
      </Section>

    </div>
  );
}
