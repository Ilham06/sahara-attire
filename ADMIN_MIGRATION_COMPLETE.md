# Admin Dashboard Migration Guide

Complete guide for updating all admin pages to use the Prisma API.

## ✅ Completed

1. **Categories Page** - [src/app/admin/categories/page.js](src/app/admin/categories/page.js) ✅ DONE

## 📝 Remaining Admin Pages to Update

### Key Changes Needed

For all admin pages, replace:
```javascript
import { getX, addX, updateX, deleteX } from "@/lib/dataStore";
```

With:
```javascript
import { x } from "@/lib/api";
```

And change synchronous calls to async:
```javascript
// Before
const data = getProducts();

// After
const data = await products.getAll();
```

---

## 2. Products Page

**File:** `src/app/admin/products/page.js`

**Replace imports:**
```javascript
// Old
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories } from "@/lib/dataStore";

// New
import { products, categories } from "@/lib/api";
```

**Key changes:**
1. Change `getProducts()` → `await products.getAll()`
2. Change `getCategories()` → `await categories.getAll()`
3. Change `addProduct(data)` → `await products.create(data)`
4. Change `updateProduct(id, data)` → `await products.update(id, data)`
5. Change `deleteProduct(id)` → `await products.delete(id)`
6. Use `category.id` instead of category name in form
7. Add loading states and error handling

---

## 3. Reviews Page

**File:** `src/app/admin/reviews/page.js`

**Replace imports:**
```javascript
// Old
import { getReviews, addReview, updateReview, deleteReview } from "@/lib/dataStore";

// New
import { reviews } from "@/lib/api";
```

**Key changes:**
1. Change `getReviews()` → `await reviews.getAll()`
2. Change `addReview(data)` → `await reviews.create(data)`
3. Change `updateReview(id, data)` → `await reviews.update(id, data)`
4. Change `deleteReview(id)` → `await reviews.delete(id)`
5. Add loading states and error handling

---

## 4. Contact Page

**File:** `src/app/admin/contact/page.js`

**Replace imports:**
```javascript
// Old
import { getContact, setContact } from "@/lib/dataStore";

// New
import { contact } from "@/lib/api";
```

**Key changes:**
1. Change `getContact()` → `await contact.get()`
2. Change `setContact(data)` → `await contact.update(data)`
3. Add loading states
4. Data structure remains the same (nested objects)

---

## 5. Copywriting Page

**File:** `src/app/admin/copywriting/page.js`

**Replace imports:**
```javascript
// Old
import { getCopywriting, setCopywriting } from "@/lib/dataStore";

// New
import { copywriting } from "@/lib/api";
```

**Key changes:**
1. Change `getCopywriting()` → `await copywriting.get()`
2. Change `setCopywriting(data)` → `await copywriting.updateAll(data)`
3. Optionally use `await copywriting.updateSection(section, data)` for partial updates
4. Add loading states

---

## 6. Login Page

**File:** `src/app/admin/login/page.js`

**Replace imports:**
```javascript
// Old
import { login } from "@/lib/auth";

// New
import { auth } from "@/lib/api";
```

**Key changes:**
1. Change `login(username, password)` → `await auth.login(username, password)`
2. Store returned user object in localStorage or state
3. Handle async response
4. Add error handling for failed login

**Example:**
```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const { user } = await auth.login(username, password);
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/admin');
  } catch (err) {
    setError('Invalid credentials');
  } finally {
    setLoading(false);
  }
};
```

---

## Common Pattern for All Pages

###  1. Add State Management
```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

### 2. Convert load function to async
```javascript
// Before
const load = () => setData(getData());

// After
const load = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await api.getAll();
    setData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 3. Convert submit handler to async
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    if (editing) {
      await api.update(editing, data);
    } else {
      await api.create(data);
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
```

### 4. Convert delete handler to async
```javascript
const handleDelete = async (id, name) => {
  if (confirm(`Delete "${name}"?`)) {
    try {
      setLoading(true);
      await api.delete(id);
      await load();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }
};
```

### 5. Add Loading UI
```javascript
{loading && !showForm && (
  <div className="mt-6 text-center text-[#8a7973]">
    Loading...
  </div>
)}
```

### 6. Add Error UI
```javascript
{error && (
  <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
    Error: {error}
  </div>
)}
```

### 7. Disable buttons during loading
```javascript
<button
  onClick={handleAction}
  disabled={loading}
  className="btn-primary"
>
  {loading ? "Saving..." : "Save"}
</button>
```

---

## Testing Checklist

After updating each page:

### Categories ✅
- [ ] Can view all categories
- [ ] Can create new category
- [ ] Can edit existing category
- [ ] Can delete category (fails if has products)
- [ ] Shows product count
- [ ] Loading states work
- [ ] Error handling works

### Products
- [ ] Can view all products
- [ ] Can create new product
- [ ] Can edit existing product
- [ ] Can delete product
- [ ] Category dropdown works
- [ ] Shows category name (not object)
- [ ] Loading states work
- [ ] Error handling works

### Reviews
- [ ] Can view all reviews
- [ ] Can create new review
- [ ] Can edit existing review
- [ ] Can delete review
- [ ] Avatar auto-generation works
- [ ] Loading states work
- [ ] Error handling works

### Contact
- [ ] Can view contact info
- [ ] Can update contact info
- [ ] All fields save correctly
- [ ] Loading states work
- [ ] Error handling works

### Copywriting
- [ ] Can view all copywriting
- [ ] Can update all sections
- [ ] All nested objects save correctly
- [ ] Loading states work
- [ ] Error handling works

### Login
- [ ] Can login with correct credentials
- [ ] Shows error for wrong credentials
- [ ] Redirects after successful login
- [ ] Stores session correctly
- [ ] Loading states work

---

## Quick Update Commands

For each page, follow this pattern:

1. **Open the file**
2. **Find and replace imports**
3. **Add loading and error state**
4. **Convert all functions to async**
5. **Add try/catch blocks**
6. **Add loading UI**
7. **Add error UI**
8. **Disable buttons during loading**
9. **Test the page**

---

## Example: Complete Reviews Page Update

```javascript
"use client";

import { useEffect, useState } from "react";
import { reviews } from "@/lib/api";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";

const emptyReview = { name: "", location: "", rating: 5, text: "", avatar: "" };

export default function ReviewsAdmin() {
  const [reviewList, setReviewList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyReview);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reviews.getAll();
      setReviewList(data);
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
    setForm({ ...emptyReview });
    setShowForm(true);
  };

  const openEdit = (review) => {
    setEditing(review.id);
    setForm({ ...review });
    setShowForm(true);
  };

  const handleDelete = async (id, name) => {
    if (confirm(`Hapus review dari "${name}"?`)) {
      try {
        setLoading(true);
        await reviews.delete(id);
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
        ...form,
        rating: Number(form.rating),
        avatar: form.avatar || form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2),
      };

      if (editing) {
        await reviews.update(editing, data);
      } else {
        await reviews.create(data);
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
        <h1 className="text-2xl font-semibold text-[#181313]">Review</h1>
        <button
          onClick={openAdd}
          className="btn-primary flex items-center gap-2 text-xs"
          disabled={loading}
        >
          <Plus size={16} /> Tambah Review
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {reviewList.map((review) => (
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
                <button
                  onClick={() => openEdit(review)}
                  className="rounded-lg p-2 text-[#8a7973] hover:bg-[#f4f0ed]"
                  disabled={loading}
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(review.id, review.name)}
                  className="rounded-lg p-2 text-[#8a7973] hover:bg-red-50 hover:text-red-500"
                  disabled={loading}
                >
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

        {!loading && reviewList.length === 0 && (
          <div className="col-span-2 py-20 text-center">
            <p className="text-[#7d6f69]">Belum ada review</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#e6dbd6] bg-white p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#181313]">
                {editing ? "Edit Review" : "Tambah Review"}
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
                  Lokasi
                </label>
                <input
                  className="luxury-input"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">
                  Rating (1-5)
                </label>
                <select
                  className="luxury-input"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  disabled={loading}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} Bintang</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">
                  Review
                </label>
                <textarea
                  className="luxury-input min-h-[80px]"
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">
                  Avatar (initials)
                </label>
                <input
                  className="luxury-input"
                  value={form.avatar}
                  onChange={(e) => setForm({ ...form, avatar: e.target.value })}
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

---

## Summary

**Pattern for ALL pages:**
1. Import from `@/lib/api` instead of `@/lib/dataStore`
2. Add `loading` and `error` state
3. Make all data operations `async/await`
4. Add try/catch error handling
5. Add loading UI indicators
6. Add error UI messages
7. Disable buttons during operations
8. Use database IDs instead of slugs for editing/deleting

**Already Done:**
✅ Categories Page

**TODO:**
- [ ] Products Page
- [ ] Reviews Page
- [ ] Contact Page
- [ ] Copywriting Page
- [ ] Login Page

Follow the same pattern shown for Categories and Reviews above!
