"use client";

import { useEffect, useState } from "react";
import { getCategories, addCategory, updateCategory, deleteCategory } from "@/lib/dataStore";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", slug: "" });
  const [showForm, setShowForm] = useState(false);

  const load = () => setCategories(getCategories());
  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", slug: "" });
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditing(cat.slug);
    setForm({ name: cat.name, slug: cat.slug });
    setShowForm(true);
  };

  const handleDelete = (slug) => {
    if (slug === "all") return;
    if (confirm("Hapus kategori ini?")) {
      deleteCategory(slug);
      load();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    };

    if (editing) {
      updateCategory(editing, data);
    } else {
      addCategory(data);
    }
    setShowForm(false);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#181313]">Kategori</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-xs">
          <Plus size={16} /> Tambah Kategori
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e6dbd6] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e6dbd6] text-left text-xs uppercase tracking-wider text-[#8a7973]">
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.slug} className="border-b border-[#f0e8e4] last:border-0">
                <td className="px-6 py-4 font-medium text-[#181313]">{cat.name}</td>
                <td className="px-6 py-4 text-[#655752]">{cat.slug}</td>
                <td className="px-6 py-4 text-right">
                  {cat.slug !== "all" && (
                    <>
                      <button onClick={() => openEdit(cat)} className="mr-2 rounded-lg p-2 text-[#8a7973] hover:bg-[#f4f0ed]">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(cat.slug)} className="rounded-lg p-2 text-[#8a7973] hover:bg-red-50 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#e6dbd6] bg-white p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#181313]">{editing ? "Edit Kategori" : "Tambah Kategori"}</h2>
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
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Slug</label>
                <input className="luxury-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated" />
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
