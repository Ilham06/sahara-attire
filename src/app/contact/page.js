"use client";

import { useState, useEffect } from "react";
import Section from "@/components/Section";
import { getContact } from "@/lib/dataStore";

export default function Contact() {
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    setBrand(getContact());
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!brand) return null;

  return (
    <div className="pt-24 md:pt-32">
      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-kicker">Contact</p>
          <h1 className="section-title mt-6">Hubungi Sahara Attire</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#665854]">
            Sampaikan kebutuhan Anda untuk booking fitting, konsultasi desain, maupun informasi ketersediaan koleksi.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <div className="editorial-card">
                <h2 className="font-display text-3xl text-[#1f1716]">Kirim Pesan</h2>

                {submitted && (
                  <div className="mb-6 mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
                    Terima kasih, pesan Anda sudah terkirim.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-[11px] uppercase tracking-[0.26em] text-[#7d6d68]">
                      Nama
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="luxury-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-[11px] uppercase tracking-[0.26em] text-[#7d6d68]">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="luxury-input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-[11px] uppercase tracking-[0.26em] text-[#7d6d68]"
                    >
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="luxury-input resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="editorial-card">
                <h2 className="font-display text-3xl text-[#1f1716]">Informasi Kontak</h2>
                <div className="mt-6 space-y-5">
                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.26em] text-[#867670]">Email</h3>
                    <a href={`mailto:${brand.email}`} className="mt-2 inline-block text-[#2d2220] hover:text-[#a26769]">
                      {brand.email}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.26em] text-[#867670]">Telepon</h3>
                    <a href={`tel:${brand.phone}`} className="mt-2 inline-block text-[#2d2220] hover:text-[#a26769]">
                      {brand.phone}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.26em] text-[#867670]">Alamat</h3>
                    <address className="mt-2 not-italic text-[#2d2220]">
                      {brand.address.street}
                      <br />
                      {brand.address.city}, {brand.address.state}{" "}
                      {brand.address.zip}
                      <br />
                      {brand.address.country}
                    </address>
                  </div>

                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.26em] text-[#867670]">Jam Operasional</h3>
                    <div className="mt-2 space-y-1 text-[#2d2220]">
                      <p>Senin - Jumat: {brand.hours.weekdays}</p>
                      <p>Sabtu: {brand.hours.saturday}</p>
                      <p>Minggu: {brand.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="editorial-card">
                <h3 className="text-[11px] uppercase tracking-[0.28em] text-[#867670]">
                  Follow Us
                </h3>
                <div className="mt-4 flex gap-4">
                  <a
                    href={brand.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6f615c] transition-colors hover:text-[#a26769]"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href={brand.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6f615c] transition-colors hover:text-[#a26769]"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href={brand.social.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6f615c] transition-colors hover:text-[#a26769]"
                    aria-label="Pinterest"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
