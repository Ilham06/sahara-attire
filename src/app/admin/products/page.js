"use client";

import { useEffect, useState } from "react";
import { products, categories } from "@/lib/api";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const emptyProduct = {
  name: "",
  slug: "",
  categoryId: "",
  price: 0,
  description: "",
  images: ["", ""],
  sizes: ["Custom"],
  colors: [""],
  featured: false,
  fabric: "",
  care: "",
  fit: "",
  origin: "",
};

export default function ProductsAdmin() {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsData, categoriesData] = await Promise.all([
        products.getAll(),
        categories.getAll(),
      ]);
      setProductList(productsData);
      setCategoryList(categoriesData);
    } catch (err) {
      setError(err.message);
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyProduct, images: ["", ""], colors: [""] });
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditing(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      categoryId: product.categoryId,
      price: product.price,
      description: product.description,
      images: [...product.images],
      colors: [...product.colors],
      sizes: [...product.sizes],
      featured: product.featured,
      fabric: product.fabric || "",
      care: product.care || "",
      fit: product.fit || "",
      origin: product.origin || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id, name) => {
    if (confirm(`Hapus produk "${name}"?`)) {
      try {
        setLoading(true);
        await products.delete(id);
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
        categoryId: parseInt(form.categoryId),
        price: parseInt(form.price),
        description: form.description,
        images: form.images.filter(Boolean),
        sizes: form.sizes,
        colors: form.colors.filter(Boolean),
        featured: form.featured,
        fabric: form.fabric || null,
        care: form.care || null,
        fit: form.fit || null,
        origin: form.origin || null,
      };

      if (editing) {
        await products.update(editing, data);
      } else {
        await products.create(data);
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

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#181313]">Produk</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-xs" disabled={loading}>
          <Plus size={16} /> Tambah Produk
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

      {/* Product Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e6dbd6] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e6dbd6] text-left text-xs uppercase tracking-wider text-[#8a7973]">
              <th className="px-6 py-4">Produk</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Harga</th>
              <th className="px-6 py-4">Featured</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id} className="border-b border-[#f0e8e4] last:border-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.images?.[0] && (
                      <img src={product.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    )}
                    <div>
                      <p className="font-medium text-[#181313]">{product.name}</p>
                      <p className="text-xs text-[#8a7973]">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#655752]">{product.category?.name}</td>
                <td className="px-6 py-4 text-[#655752]">{formatPrice(product.price)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${product.featured ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                    {product.featured ? "Ya" : "Tidak"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openEdit(product)} className="mr-2 rounded-lg p-2 text-[#8a7973] hover:bg-[#f4f0ed]" disabled={loading}>
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(product.id, product.name)} className="rounded-lg p-2 text-[#8a7973] hover:bg-red-50 hover:text-red-500" disabled={loading}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {!loading && productList.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-[#8a7973]">
                  Belum ada produk
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 p-4 pt-20">
          <div className="w-full max-w-2xl rounded-2xl border border-[#e6dbd6] bg-white p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#181313]">{editing ? "Edit Produk" : "Tambah Produk"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#8a7973] hover:text-[#181313]" disabled={loading}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Nama</label>
                  <input className="luxury-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required disabled={loading} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Slug</label>
                  <input className="luxury-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated" disabled={loading} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Kategori</label>
                  <select className="luxury-input" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required disabled={loading}>
                    <option value="">Pilih kategori</option>
                    {categoryList.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Harga (IDR)</label>
                  <input type="number" className="luxury-input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required disabled={loading} />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Deskripsi</label>
                <textarea className="luxury-input min-h-[80px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required disabled={loading} />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Image URL 1</label>
                <input className="luxury-input" value={form.images[0] || ""} onChange={(e) => { const imgs = [...form.images]; imgs[0] = e.target.value; setForm({ ...form, images: imgs }); }} disabled={loading} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Image URL 2</label>
                <input className="luxury-input" value={form.images[1] || ""} onChange={(e) => { const imgs = [...form.images]; imgs[1] = e.target.value; setForm({ ...form, images: imgs }); }} disabled={loading} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Sizes (comma separated)</label>
                  <input className="luxury-input" value={form.sizes?.join(", ")} onChange={(e) => setForm({ ...form, sizes: e.target.value.split(",").map((s) => s.trim()) })} disabled={loading} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Colors (comma separated)</label>
                  <input className="luxury-input" value={form.colors?.join(", ")} onChange={(e) => setForm({ ...form, colors: e.target.value.split(",").map((s) => s.trim()) })} disabled={loading} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[#a26769]" disabled={loading} />
                <label htmlFor="featured" className="text-sm text-[#655752]">Featured product</label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Fabric</label>
                  <input className="luxury-input" value={form.fabric || ""} onChange={(e) => setForm({ ...form, fabric: e.target.value })} disabled={loading} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Care</label>
                  <input className="luxury-input" value={form.care || ""} onChange={(e) => setForm({ ...form, care: e.target.value })} disabled={loading} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Fit</label>
                  <input className="luxury-input" value={form.fit || ""} onChange={(e) => setForm({ ...form, fit: e.target.value })} disabled={loading} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Origin</label>
                  <input className="luxury-input" value={form.origin || ""} onChange={(e) => setForm({ ...form, origin: e.target.value })} disabled={loading} />
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary" disabled={loading}>Batal</button>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Saving..." : editing ? "Simpan" : "Tambah"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
