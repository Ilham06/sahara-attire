"use client";

import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories } from "@/lib/dataStore";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const emptyProduct = {
  name: "",
  slug: "",
  category: "",
  price: 0,
  description: "",
  images: ["", ""],
  sizes: ["Custom"],
  colors: [""],
  featured: false,
  details: { fabric: "", care: "", fit: "", origin: "" },
};

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setProducts(getProducts());
    setCategories(getCategories().filter((c) => c.slug !== "all"));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyProduct, images: ["", ""], colors: [""], details: { ...emptyProduct.details } });
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditing(product.id);
    setForm({
      ...product,
      images: [...product.images],
      colors: [...product.colors],
      sizes: [...product.sizes],
      details: { ...product.details },
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Hapus produk ini?")) {
      deleteProduct(id);
      load();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      images: form.images.filter(Boolean),
      colors: form.colors.filter(Boolean),
    };

    if (editing) {
      updateProduct(editing, data);
    } else {
      addProduct(data);
    }
    setShowForm(false);
    load();
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#181313]">Produk</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-xs">
          <Plus size={16} /> Tambah Produk
        </button>
      </div>

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
            {products.map((product) => (
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
                <td className="px-6 py-4 text-[#655752]">{product.category}</td>
                <td className="px-6 py-4 text-[#655752]">{formatPrice(product.price)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${product.featured ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                    {product.featured ? "Ya" : "Tidak"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openEdit(product)} className="mr-2 rounded-lg p-2 text-[#8a7973] hover:bg-[#f4f0ed]">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="rounded-lg p-2 text-[#8a7973] hover:bg-red-50 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 p-4 pt-20">
          <div className="w-full max-w-2xl rounded-2xl border border-[#e6dbd6] bg-white p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#181313]">{editing ? "Edit Produk" : "Tambah Produk"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#8a7973] hover:text-[#181313]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Nama</label>
                  <input className="luxury-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Slug</label>
                  <input className="luxury-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Kategori</label>
                  <select className="luxury-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
                    <option value="">Pilih kategori</option>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Harga (IDR)</label>
                  <input type="number" className="luxury-input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Deskripsi</label>
                <textarea className="luxury-input min-h-[80px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Image URL 1</label>
                <input className="luxury-input" value={form.images[0] || ""} onChange={(e) => { const imgs = [...form.images]; imgs[0] = e.target.value; setForm({ ...form, images: imgs }); }} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Image URL 2</label>
                <input className="luxury-input" value={form.images[1] || ""} onChange={(e) => { const imgs = [...form.images]; imgs[1] = e.target.value; setForm({ ...form, images: imgs }); }} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Sizes (comma separated)</label>
                  <input className="luxury-input" value={form.sizes?.join(", ")} onChange={(e) => setForm({ ...form, sizes: e.target.value.split(",").map((s) => s.trim()) })} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Colors (comma separated)</label>
                  <input className="luxury-input" value={form.colors?.join(", ")} onChange={(e) => setForm({ ...form, colors: e.target.value.split(",").map((s) => s.trim()) })} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[#a26769]" />
                <label htmlFor="featured" className="text-sm text-[#655752]">Featured product</label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Fabric</label>
                  <input className="luxury-input" value={form.details?.fabric || ""} onChange={(e) => setForm({ ...form, details: { ...form.details, fabric: e.target.value } })} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Care</label>
                  <input className="luxury-input" value={form.details?.care || ""} onChange={(e) => setForm({ ...form, details: { ...form.details, care: e.target.value } })} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Fit</label>
                  <input className="luxury-input" value={form.details?.fit || ""} onChange={(e) => setForm({ ...form, details: { ...form.details, fit: e.target.value } })} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">Origin</label>
                  <input className="luxury-input" value={form.details?.origin || ""} onChange={(e) => setForm({ ...form, details: { ...form.details, origin: e.target.value } })} />
                </div>
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
