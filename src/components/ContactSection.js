"use client"

import { Instagram, MessageCircle, Music, MapPin } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#F5EFEA] to-[#FAF8F6] py-32 px-6 overflow-hidden">

      {/* Decorative Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[18vw] font-semibold text-[#EAD7C3]/30 tracking-tight select-none">
          SAHARA
        </h1>
      </div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE – Big Statement */}
        <div>
          <p className="uppercase tracking-[0.4em] text-xs text-neutral-500 mb-6">
            Let’s Connect
          </p>

          <h2 className="font-display text-5xl md:text-6xl leading-tight text-[#1F1F1F]">
            Create Something
            <br />
            <span className="italic text-[#7A5C42]">
              Timeless Together
            </span>
          </h2>

          <div className="mt-10 h-px w-24 bg-[#7A5C42]" />

          <p className="mt-10 text-neutral-600 max-w-md leading-relaxed">
            Sahara Attire terbuka untuk kolaborasi kreatif, private styling,
            maupun pertanyaan seputar koleksi terbaru kami.
          </p>
        </div>

        {/* RIGHT SIDE – Contact List */}
        <div className="space-y-8">

          <ContactItem
            icon={<MessageCircle size={20} />}
            label="WhatsApp"
            value="+62 812 3456 7890"
            link="https://wa.me/6281234567890"
          />

          <ContactItem
            icon={<Instagram size={20} />}
            label="Instagram"
            value="@saharaattire"
            link="https://instagram.com/saharaattire"
          />

          <ContactItem
            icon={<Music size={20} />}
            label="TikTok"
            value="@saharaattire.official"
            link="https://tiktok.com/@saharaattire.official"
          />

          <ContactItem
            icon={<MapPin size={20} />}
            label="Location"
            value="Jakarta Selatan, Indonesia"
            link="https://maps.google.com"
          />

        </div>

      </div>
    </section>
  )
}


/* ---------- Contact Item ---------- */

function ContactItem({ icon, label, value, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between border-b border-neutral-200 pb-4 transition-all duration-300"
    >
      <div className="flex items-center gap-4 text-neutral-500 group-hover:text-[#7A5C42] transition-colors">
        {icon}
        <span className="uppercase tracking-wide text-sm">
          {label}
        </span>
      </div>

      <span className="text-lg text-[#1F1F1F] group-hover:tracking-wide transition-all duration-300">
        {value}
      </span>
    </a>
  )
}
