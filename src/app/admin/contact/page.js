"use client";

import { useEffect, useState } from "react";
import { getContact, setContact } from "@/lib/dataStore";
import { Save } from "lucide-react";

export default function ContactAdmin() {
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getContact());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setContact(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!form) return null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#181313]">Kontak & Brand Info</h1>
        {saved && <span className="text-sm text-green-600">Tersimpan!</span>}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Brand Info */}
        <div className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7973] mb-4">Brand</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Nama Brand</label>
              <input className="luxury-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Tagline</label>
              <input className="luxury-input" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Deskripsi</label>
            <textarea className="luxury-input min-h-[80px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7973] mb-4">Kontak</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Email</label>
              <input className="luxury-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Phone</label>
              <input className="luxury-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">WhatsApp</label>
              <input className="luxury-input" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">WhatsApp Display</label>
              <input className="luxury-input" value={form.whatsappDisplay} onChange={(e) => setForm({ ...form, whatsappDisplay: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7973] mb-4">Alamat</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Street</label>
              <input className="luxury-input" value={form.address?.street || ""} onChange={(e) => setForm({ ...form, address: { ...form.address, street: e.target.value } })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">City</label>
              <input className="luxury-input" value={form.address?.city || ""} onChange={(e) => setForm({ ...form, address: { ...form.address, city: e.target.value } })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">State</label>
              <input className="luxury-input" value={form.address?.state || ""} onChange={(e) => setForm({ ...form, address: { ...form.address, state: e.target.value } })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">ZIP</label>
              <input className="luxury-input" value={form.address?.zip || ""} onChange={(e) => setForm({ ...form, address: { ...form.address, zip: e.target.value } })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Country</label>
              <input className="luxury-input" value={form.address?.country || ""} onChange={(e) => setForm({ ...form, address: { ...form.address, country: e.target.value } })} />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7973] mb-4">Social Media</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {["instagram", "tiktok", "facebook", "pinterest", "twitter"].map((platform) => (
              <div key={platform}>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">{platform}</label>
                <input
                  className="luxury-input"
                  value={form.social?.[platform] || ""}
                  onChange={(e) => setForm({ ...form, social: { ...form.social, [platform]: e.target.value } })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7973] mb-4">Jam Operasional</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Weekdays</label>
              <input className="luxury-input" value={form.hours?.weekdays || ""} onChange={(e) => setForm({ ...form, hours: { ...form.hours, weekdays: e.target.value } })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Saturday</label>
              <input className="luxury-input" value={form.hours?.saturday || ""} onChange={(e) => setForm({ ...form, hours: { ...form.hours, saturday: e.target.value } })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Sunday</label>
              <input className="luxury-input" value={form.hours?.sunday || ""} onChange={(e) => setForm({ ...form, hours: { ...form.hours, sunday: e.target.value } })} />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary flex items-center gap-2">
          <Save size={16} /> Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
