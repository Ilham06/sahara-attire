"use client"

import { useEffect, useState } from "react"
import { Instagram, MessageCircle, Music, MapPin } from "lucide-react"
import { getContact } from "@/lib/dataStore"

export default function ContactSection() {
  const [brand, setBrand] = useState(null)

  useEffect(() => {
    setBrand(getContact())
  }, [])

  if (!brand) return null

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8f1ed] to-[#f4eeea] py-24 md:py-28">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="select-none font-display text-[18vw] tracking-tight text-[#a26769]/10">
          SAHARA
        </h1>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 md:grid-cols-2 md:items-center md:gap-20 md:px-10">
        <div>
          <p className="section-kicker mb-6">Private Consultation</p>
          <h2 className="font-display text-4xl leading-tight text-[#1f1716] md:text-6xl">
            Temukan Gaun
            <br /> <span className="text-[#a26769]">Untuk Hari Istimewa Anda</span>
          </h2>
          <p className="mt-8 max-w-md text-[#5f4f4c]">
            Jadwalkan fitting pribadi bersama tim kami untuk mengetahui koleksi terbaru, opsi custom, dan layanan
            rental premium.
          </p>
          <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-primary mt-9">
            Booking Appointment
          </a>
        </div>

        <div className="editorial-card space-y-6">
          <ContactItem
            icon={<MessageCircle size={20} />}
            label="WhatsApp"
            value={brand.whatsappDisplay}
            link={`https://wa.me/${brand.whatsapp}`}
          />

          <ContactItem
            icon={<Instagram size={20} />}
            label="Instagram"
            value="@saharaattire"
            link={brand.social?.instagram}
          />

          <ContactItem
            icon={<Music size={20} />}
            label="TikTok"
            value="@saharaattire"
            link={brand.social?.tiktok}
          />

          <ContactItem
            icon={<MapPin size={20} />}
            label="Lokasi"
            value={`${brand.address?.city}, ${brand.address?.country}`}
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
      className="group flex items-start justify-between gap-3 border-b border-[#e5d7d1] pb-4 transition-all duration-300"
    >
      <div className="flex items-center gap-4 text-[#7a6d67] transition-colors duration-300 group-hover:text-[#a26769]">
        {icon}
        <span className="text-xs uppercase tracking-[0.25em]">{label}</span>
      </div>

      <span className="max-w-[58%] break-words text-right text-sm text-[#2a201f] transition-colors duration-300 group-hover:text-[#a26769]">
        {value}
      </span>
    </a>
  )
}
