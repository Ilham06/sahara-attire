"use client";

import { useEffect, useState } from "react";
import { getReviews, addReview, updateReview, deleteReview } from "@/lib/dataStore";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";

const emptyReview = { name: "", location: "", rating: 5, text: "", avatar: "" };

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyReview);
  const [showForm, setShowForm] = useState(false);

  const load = () => setReviews(getReviews());
  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyReview });
    setShowForm(true);
  };

  const openEdit = (review) => {
    setEditing(review.id);
    setForm({ ...review });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Hapus review ini?")) {
      deleteReview(id);
      load();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      rating: Number(form.rating),
      avatar: form.avatar || form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2),
    };

    if (editing) {
      updateReview(editing, data);
    } else {
      addReview(data);
    }
    setShowForm(false);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#181313]">Review</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-xs">
          <Plus size={16} /> Tambah Review
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-2xl border border-[#e6dbd6] bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a26769]/10 text-sm font-medium text-[#a26769]">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-medium text-[#181313]">{review.name}</p>
                  <p className="text-xs text-[#8a7973]">{review.location}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(review)} className="rounded-lg p-2 text-[#8a7973] hover:bg-[#f4f0ed]">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(review.id)} className="rounded-lg p-2 text-[#8a7973] hover:bg-red-50 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="mt-3 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            <p className="mt-3 text-sm italic text-[#544744]">"{review.text}"</p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#e6dbd6] bg-white p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#181313]">{editing ? "Edit Review" : "Tambah Review"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#8a7973] hover:text-[#181313]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Nama</label>
                <input className="luxury-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Lokasi</label>
                <input className="luxury-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Rating (1-5)</label>
                <select className="luxury-input" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} Bintang</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Review</label>
                <textarea className="luxury-input min-h-[80px]" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Avatar (initials)</label>
                <input className="luxury-input" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="auto-generated" />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Batal</button>
                <button type="submit" className="btn-primary">{editing ? "Simpan" : "Tambah"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
