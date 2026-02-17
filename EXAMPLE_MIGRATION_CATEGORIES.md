# Example: Migrating Categories Page to Prisma API

This is a complete example showing how to migrate the Categories admin page from localStorage to the Prisma API.

## Before (Using localStorage)

**Original:** `src/app/admin/categories/page.js`

```javascript
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

  const handleDelete = (slug) => {
    if (slug === "all") return;
    if (confirm("Hapus kategori ini?")) {
      deleteCategory(slug);
      load();
    }
  };

  // ... rest of component
}
```

## After (Using Prisma API)

**Updated:** `src/app/admin/categories/page.js`

```javascript
"use client";

import { useEffect, useState } from "react";
import { categories } from "@/lib/api";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function CategoriesAdmin() {
  const [categoryList, setCategoryList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", slug: "" });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load categories from API
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
    setForm({ name: "", slug: "" });
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditing(cat.id); // Changed from cat.slug to cat.id
    setForm({ name: cat.name, slug: cat.slug });
    setShowForm(true);
  };

  const handleDelete = async (id, name) => {
    if (confirm(`Hapus kategori "${name}"?`)) {
      try {
        setLoading(true);
        await categories.delete(id);
        await load();
      } catch (err) {
        alert(err.message); // Will show "Cannot delete category with X products"
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

      {/* Error Display */}
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          Error: {error}
        </div>
      )}

      {/* Loading State */}
      {loading && !showForm && (
        <div className="mt-6 text-center text-[#8a7973]">
          Loading...
        </div>
      )}

      {/* Categories Table */}
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

      {/* Form Modal */}
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
```

## Key Changes

### 1. **Import Statement**
```javascript
// Before
import { getCategories, addCategory, updateCategory, deleteCategory } from "@/lib/dataStore";

// After
import { categories } from "@/lib/api";
```

### 2. **State Management**
```javascript
// After - Added loading and error states
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

### 3. **Data Loading**
```javascript
// Before
const load = () => setCategories(getCategories());

// After - Async with error handling
const load = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await categories.getAll();
    setCategoryList(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 4. **Create/Update**
```javascript
// Before
if (editing) {
  updateCategory(editing, data);
} else {
  addCategory(data);
}
setShowForm(false);
load();

// After - Async with error handling
try {
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
}
```

### 5. **Delete**
```javascript
// Before
const handleDelete = (slug) => {
  if (confirm("Hapus kategori ini?")) {
    deleteCategory(slug);
    load();
  }
};

// After - Async with error handling
const handleDelete = async (id, name) => {
  if (confirm(`Hapus kategori "${name}"?`)) {
    try {
      setLoading(true);
      await categories.delete(id);
      await load();
    } catch (err) {
      alert(err.message); // Shows "Cannot delete category with X products"
    } finally {
      setLoading(false);
    }
  }
};
```

### 6. **ID vs Slug**
```javascript
// Before - Used slug as identifier
const openEdit = (cat) => {
  setEditing(cat.slug);
  // ...
};

// After - Use database ID
const openEdit = (cat) => {
  setEditing(cat.id);
  // ...
};
```

### 7. **UI Enhancements**
```javascript
// Added product count display
<td className="px-6 py-4 text-[#655752]">
  {cat._count?.products || 0} products
</td>

// Added loading state
{loading && !showForm && (
  <div className="mt-6 text-center text-[#8a7973]">
    Loading...
  </div>
)}

// Added error display
{error && (
  <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
    Error: {error}
  </div>
)}

// Added empty state
{!loading && categoryList.length === 0 && (
  <tr>
    <td colSpan="4" className="px-6 py-8 text-center text-[#8a7973]">
      Belum ada kategori
    </td>
  </tr>
)}

// Disabled buttons during loading
<button disabled={loading}>
  {loading ? "Saving..." : "Save"}
</button>
```

## Summary of Changes

| Aspect | Before | After |
|--------|--------|-------|
| **Data Source** | localStorage | PostgreSQL via Prisma |
| **Operations** | Synchronous | Async/await |
| **Error Handling** | None | Try/catch with user feedback |
| **Loading States** | None | Loading indicators |
| **Identifiers** | Slug strings | Database IDs (integers) |
| **Validation** | Client-side only | Server-side validation |
| **Product Count** | Not available | Included in response |
| **Delete Protection** | Manual check | Server enforces (prevents deleting categories with products) |

## Testing the Migration

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to:**
   ```
   http://localhost:3000/admin/categories
   ```

3. **Test operations:**
   - ✅ Create new category
   - ✅ Edit existing category
   - ✅ Try to delete category with products (should fail with error message)
   - ✅ Delete empty category
   - ✅ Check loading states
   - ✅ Check error handling (try creating duplicate slug)

## Next Steps

Apply the same migration pattern to other admin pages:
- Products page
- Reviews page
- Contact page
- Copywriting page

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for more examples and patterns.
