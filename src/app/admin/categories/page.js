"use client";

import { useEffect, useState } from "react";
import { categories } from "@/lib/api";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function CategoriesAdmin() {
  const [categoryList, setCategoryList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", slug: "", image: "" });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categories.getAll();
      setCategoryList(data);
    } catch (err) {
      setError(err.message);
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", slug: "", image: "" });
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditing(cat.id);
    setForm({ name: cat.name, slug: cat.slug, image: cat.image || "" });
    setShowForm(true);
  };

  const handleDelete = async (id, name) => {
    if (confirm(`Hapus kategori "${name}"?`)) {
      try {
        setLoading(true);
        await categories.delete(id);
        await load();
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = {
        name: form.name,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        image: form.image || null,
      };

      if (editing) {
        await categories.update(editing, data);
      } else {
        await categories.create(data);
      }

      setShowForm(false);
      await load();
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#181313]">Kategori</h1>
        <button
          onClick={openAdd}
          className="btn-primary flex items-center gap-2 text-xs"
          disabled={loading}
        >
          <Plus size={16} /> Tambah Kategori
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          Error: {error}
        </div>
      )}

      {loading && !showForm && (
        <div className="mt-6 text-center text-[#8a7973]">
          Loading...
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e6dbd6] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e6dbd6] text-left text-xs uppercase tracking-wider text-[#8a7973]">
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Products</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((cat) => (
              <tr key={cat.id} className="border-b border-[#f0e8e4] last:border-0">
                <td className="px-6 py-4 font-medium text-[#181313]">{cat.name}</td>
                <td className="px-6 py-4 text-[#655752]">{cat.slug}</td>
                <td className="px-6 py-4 text-[#655752]">
                  {cat._count?.products || 0} products
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openEdit(cat)}
                    className="mr-2 rounded-lg p-2 text-[#8a7973] hover:bg-[#f4f0ed]"
                    disabled={loading}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="rounded-lg p-2 text-[#8a7973] hover:bg-red-50 hover:text-red-500"
                    disabled={loading}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {!loading && categoryList.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-[#8a7973]">
                  Belum ada kategori
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#e6dbd6] bg-white p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#181313]">
                {editing ? "Edit Kategori" : "Tambah Kategori"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-[#8a7973] hover:text-[#181313]"
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">
                  Nama
                </label>
                <input
                  className="luxury-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">
                  Slug
                </label>
                <input
                  className="luxury-input"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="auto-generated"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">
                  Image URL (optional)
                </label>
                <input
                  className="luxury-input"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="Category image URL"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                  disabled={loading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : editing ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
