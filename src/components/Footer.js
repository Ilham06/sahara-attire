"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAVIGATION } from "@/data/constants";
import { getContact } from "@/lib/dataStore";

export default function Footer() {
  const [brand, setBrand] = useState({ name: "Sahara Attire", whatsapp: "", email: "", phone: "", social: {} });

  useEffect(() => {
    setBrand(getContact());
  }, []);

  return (
    <footer className="border-t border-[#e7dad4] bg-[#f9f3ef]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl tracking-tight text-[#1e1615]">
              {brand.name?.toUpperCase()}
            </h3>
            <p className="mt-4 max-w-md text-[#665753]">
              Koleksi gaun pernikahan untuk pembelian dan penyewaan.
            </p>
            <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-6">
              Hubungi Atelier
            </a>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#8a7973]">
              Menu
            </h4>
            <ul className="space-y-3">
              {NAVIGATION.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-[#594a46] transition-colors duration-300 hover:text-[#a26769]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#8a7973]">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-[#594a46]">
              <li>
                <a href={`mailto:${brand.email}`} className="transition-colors duration-300 hover:text-[#a26769]">
                  {brand.email}
                </a>
              </li>
              <li>
                <a href={`tel:${brand.phone}`} className="transition-colors duration-300 hover:text-[#a26769]">
                  {brand.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-[#e4d4cd] pt-7 md:flex-row">
          <p className="text-sm text-[#83716a]">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>

          
        </div>
      </div>
    </footer>
  );
}
