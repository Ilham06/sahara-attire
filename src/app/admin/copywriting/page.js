"use client";

import { useEffect, useState } from "react";
import { getCopywriting, setCopywriting } from "@/lib/dataStore";
import { Save } from "lucide-react";

export default function CopywritingAdmin() {
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getCopywriting());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCopywriting(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!form) return null;

  const updateNested = (section, key, value) => {
    setForm({ ...form, [section]: { ...form[section], [key]: value } });
  };

  const updateFeature = (index, key, value) => {
    const features = [...form.features];
    features[index] = { ...features[index], [key]: value };
    setForm({ ...form, features });
  };

  const updateAboutValue = (index, key, value) => {
    const values = [...form.about.values];
    values[index] = { ...values[index], [key]: value };
    setForm({ ...form, about: { ...form.about, values } });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#181313]">Copywriting</h1>
        {saved && <span className="text-sm text-green-600">Tersimpan!</span>}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Hero Section */}
        <div className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7973] mb-4">Hero Section</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Kicker</label>
              <input className="luxury-input" value={form.hero?.kicker || ""} onChange={(e) => updateNested("hero", "kicker", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Heading 1</label>
              <input className="luxury-input" value={form.hero?.heading1 || ""} onChange={(e) => updateNested("hero", "heading1", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Heading 2</label>
              <input className="luxury-input" value={form.hero?.heading2 || ""} onChange={(e) => updateNested("hero", "heading2", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">CTA Primary</label>
              <input className="luxury-input" value={form.hero?.ctaPrimary || ""} onChange={(e) => updateNested("hero", "ctaPrimary", e.target.value)} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Description</label>
            <textarea className="luxury-input min-h-[60px]" value={form.hero?.description || ""} onChange={(e) => updateNested("hero", "description", e.target.value)} />
          </div>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">CTA Secondary</label>
            <input className="luxury-input" value={form.hero?.ctaSecondary || ""} onChange={(e) => updateNested("hero", "ctaSecondary", e.target.value)} />
          </div>
        </div>

        {/* Collection Section */}
        <div className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7973] mb-4">Koleksi Section</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Kicker</label>
              <input className="luxury-input" value={form.collection?.kicker || ""} onChange={(e) => updateNested("collection", "kicker", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Title</label>
              <input className="luxury-input" value={form.collection?.title || ""} onChange={(e) => updateNested("collection", "title", e.target.value)} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Description</label>
            <textarea className="luxury-input min-h-[60px]" value={form.collection?.description || ""} onChange={(e) => updateNested("collection", "description", e.target.value)} />
          </div>
        </div>

        {/* Best Seller Section */}
        <div className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7973] mb-4">Best Seller Section</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Kicker</label>
              <input className="luxury-input" value={form.bestSeller?.kicker || ""} onChange={(e) => updateNested("bestSeller", "kicker", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Title</label>
              <input className="luxury-input" value={form.bestSeller?.title || ""} onChange={(e) => updateNested("bestSeller", "title", e.target.value)} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Description</label>
            <textarea className="luxury-input min-h-[60px]" value={form.bestSeller?.description || ""} onChange={(e) => updateNested("bestSeller", "description", e.target.value)} />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7973] mb-4">Feature Cards</h3>
          <div className="space-y-4">
            {form.features?.map((feat, i) => (
              <div key={i} className="grid gap-4 sm:grid-cols-3 rounded-xl border border-[#f0e8e4] p-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Number</label>
                  <input className="luxury-input" value={feat.number} onChange={(e) => updateFeature(i, "number", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Title</label>
                  <input className="luxury-input" value={feat.title} onChange={(e) => updateFeature(i, "title", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Description</label>
                  <input className="luxury-input" value={feat.description} onChange={(e) => updateFeature(i, "description", e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section Heading */}
        <div className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7973] mb-4">Reviews Section Heading</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Kicker</label>
              <input className="luxury-input" value={form.reviews?.kicker || ""} onChange={(e) => updateNested("reviews", "kicker", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Title</label>
              <input className="luxury-input" value={form.reviews?.title || ""} onChange={(e) => updateNested("reviews", "title", e.target.value)} />
            </div>
          </div>
        </div>

        {/* About Page */}
        <div className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7973] mb-4">About Page</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Hero Kicker</label>
              <input className="luxury-input" value={form.about?.heroKicker || ""} onChange={(e) => setForm({ ...form, about: { ...form.about, heroKicker: e.target.value } })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Hero Title</label>
              <input className="luxury-input" value={form.about?.heroTitle || ""} onChange={(e) => setForm({ ...form, about: { ...form.about, heroTitle: e.target.value } })} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Hero Subtitle</label>
            <input className="luxury-input" value={form.about?.heroSubtitle || ""} onChange={(e) => setForm({ ...form, about: { ...form.about, heroSubtitle: e.target.value } })} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Story Kicker</label>
              <input className="luxury-input" value={form.about?.storyKicker || ""} onChange={(e) => setForm({ ...form, about: { ...form.about, storyKicker: e.target.value } })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Story Title</label>
              <input className="luxury-input" value={form.about?.storyTitle || ""} onChange={(e) => setForm({ ...form, about: { ...form.about, storyTitle: e.target.value } })} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Story Paragraph 1</label>
            <textarea className="luxury-input min-h-[60px]" value={form.about?.storyP1 || ""} onChange={(e) => setForm({ ...form, about: { ...form.about, storyP1: e.target.value } })} />
          </div>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Story Paragraph 2</label>
            <textarea className="luxury-input min-h-[60px]" value={form.about?.storyP2 || ""} onChange={(e) => setForm({ ...form, about: { ...form.about, storyP2: e.target.value } })} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Philosophy Kicker</label>
              <input className="luxury-input" value={form.about?.philosophyKicker || ""} onChange={(e) => setForm({ ...form, about: { ...form.about, philosophyKicker: e.target.value } })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Philosophy Title</label>
              <input className="luxury-input" value={form.about?.philosophyTitle || ""} onChange={(e) => setForm({ ...form, about: { ...form.about, philosophyTitle: e.target.value } })} />
            </div>
          </div>

          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8a7973] mt-6 mb-3">Values (About Page)</h4>
          <div className="space-y-4">
            {form.about?.values?.map((val, i) => (
              <div key={i} className="grid gap-4 sm:grid-cols-3 rounded-xl border border-[#f0e8e4] p-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Number</label>
                  <input className="luxury-input" value={val.number} onChange={(e) => updateAboutValue(i, "number", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Title</label>
                  <input className="luxury-input" value={val.title} onChange={(e) => updateAboutValue(i, "title", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Description</label>
                  <input className="luxury-input" value={val.description} onChange={(e) => updateAboutValue(i, "description", e.target.value)} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">CTA Title</label>
              <input className="luxury-input" value={form.about?.ctaTitle || ""} onChange={(e) => setForm({ ...form, about: { ...form.about, ctaTitle: e.target.value } })} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">CTA Button Text</label>
              <input className="luxury-input" value={form.about?.ctaButton || ""} onChange={(e) => setForm({ ...form, about: { ...form.about, ctaButton: e.target.value } })} />
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
