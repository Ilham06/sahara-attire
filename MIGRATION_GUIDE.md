# Migration Guide: LocalStorage to Prisma + File Upload

This guide explains how to migrate your existing CRUD pages from localStorage to Prisma with file upload support.

## Overview

Your current setup uses:
- localStorage for data storage (`src/lib/dataStore.js`)
- URL inputs for images

The new setup uses:
- PostgreSQL database via Prisma
- File upload for images
- API routes for CRUD operations

## Step-by-Step Migration

### 1. Database Setup

Follow the [PRISMA_SETUP.md](./PRISMA_SETUP.md) guide to:
1. Configure your PostgreSQL database
2. Run migrations
3. Seed the database

### 2. Update Admin Pages

You'll need to update each admin page to:
1. Use API routes instead of localStorage
2. Add file upload functionality
3. Replace URL inputs with file inputs

### Example: Products Page Migration

#### Before (localStorage):
```javascript
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/dataStore";

// In component
const load = () => setProducts(getProducts());

const handleSubmit = (e) => {
  e.preventDefault();
  if (editing) {
    updateProduct(editing, data);
  } else {
    addProduct(data);
  }
  load();
};
```

#### After (Prisma + API):
```javascript
// No import of dataStore

// In component
const load = async () => {
  const res = await fetch("/api/products");
  const data = await res.json();
  setProducts(data);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const url = editing ? `/api/products/${editing}` : "/api/products";
  const method = editing ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    setShowForm(false);
    load();
  }
};
```

### 3. Add File Upload

#### Update Form to Handle Files:

```javascript
const [imageFiles, setImageFiles] = useState([]);
const [uploading, setUploading] = useState(false);

// Handle file selection
const handleImageChange = (e, index) => {
  const file = e.target.files[0];
  if (file) {
    const newFiles = [...imageFiles];
    newFiles[index] = file;
    setImageFiles(newFiles);
  }
};

// Upload images before submitting
const uploadImages = async () => {
  const uploadedPaths = [];

  for (const file of imageFiles) {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "products");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        uploadedPaths.push(data.path);
      }
    }
  }

  return uploadedPaths;
};

// Modified submit handler
const handleSubmit = async (e) => {
  e.preventDefault();
  setUploading(true);

  try {
    // Upload new images
    const uploadedPaths = await uploadImages();

    // Merge with existing images
    const allImages = [
      ...form.images.filter(img => img), // Keep existing URLs
      ...uploadedPaths, // Add new uploads
    ];

    const productData = {
      ...form,
      images: allImages,
      categoryId: parseInt(form.categoryId),
    };

    const url = editing ? `/api/products/${editing}` : "/api/products";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      setShowForm(false);
      setImageFiles([]);
      load();
    }
  } catch (error) {
    console.error("Submit error:", error);
  } finally {
    setUploading(false);
  }
};
```

#### Update Form HTML:

```jsx
{/* Replace URL input with file input */}
<div>
  <label className="block text-xs uppercase tracking-[0.15em] text-[#8a7973] mb-1">
    Image 1
  </label>

  {/* Show existing image if any */}
  {form.images[0] && (
    <div className="mb-2">
      <img src={form.images[0]} alt="" className="h-20 w-20 rounded object-cover" />
    </div>
  )}

  {/* File input */}
  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleImageChange(e, 0)}
    className="luxury-input"
  />
  <p className="text-xs text-[#8a7973] mt-1">Max 5MB, JPEG/PNG/WebP</p>
</div>

{/* Add loading state to submit button */}
<button
  type="submit"
  className="btn-primary"
  disabled={uploading}
>
  {uploading ? "Uploading..." : editing ? "Simpan" : "Tambah"}
</button>
```

### 4. Create API Routes

Create API routes for each resource. See examples:
- [/src/app/api/products/route.js](./src/app/api/products/route.js) - Products CRUD
- [/src/app/api/upload/route.js](./src/app/api/upload/route.js) - File upload

### 5. Update Authentication

Replace `src/lib/auth.js` with database-backed authentication:

```javascript
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function login(username, password) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}
```

Consider using NextAuth.js for production authentication.

## Migration Checklist

- [ ] Set up PostgreSQL database
- [ ] Run Prisma migrations
- [ ] Seed database with existing data
- [ ] Create API routes for:
  - [ ] Products
  - [ ] Categories
  - [ ] Reviews
  - [ ] Contact
  - [ ] Copywriting
  - [ ] File upload
- [ ] Update admin pages:
  - [ ] Products page
  - [ ] Categories page
  - [ ] Reviews page
  - [ ] Contact page
  - [ ] Copywriting page
- [ ] Update authentication
- [ ] Test all CRUD operations
- [ ] Test file uploads
- [ ] Remove localStorage dependencies

## API Route Templates

### Basic CRUD Pattern:

```javascript
// GET all
export async function GET() {
  const items = await prisma.modelName.findMany();
  return NextResponse.json(items);
}

// POST create
export async function POST(request) {
  const body = await request.json();
  const item = await prisma.modelName.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}

// PUT update (in [id]/route.js)
export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  const body = await request.json();
  const item = await prisma.modelName.update({
    where: { id },
    data: body,
  });
  return NextResponse.json(item);
}

// DELETE (in [id]/route.js)
export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  await prisma.modelName.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
```

## Common Issues

### 1. Category Relationship

Products need categoryId, not category name:

```javascript
// Get category ID from name
const category = await prisma.category.findUnique({
  where: { slug: categorySlug },
});

// Use in product
const product = await prisma.product.create({
  data: {
    categoryId: category.id, // Not category.name!
    // ...
  },
});
```

### 2. Image Arrays

Prisma stores arrays as JSON. Make sure to filter empty values:

```javascript
images: form.images.filter(Boolean), // Remove empty strings
```

### 3. File Upload Size

If uploads fail, check:
1. File size limit in `.env`
2. Next.js body size limit (add to `next.config.js`):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
```

### 4. CORS Issues

If using external clients, add CORS headers:

```javascript
return NextResponse.json(data, {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
```

## Testing

Test each endpoint with:

```bash
# GET all products
curl http://localhost:3000/api/products

# POST create product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","slug":"test","categoryId":1,"price":1000,"description":"Test"}'

# Upload file
curl -X POST http://localhost:3000/api/upload \
  -F "file=@image.jpg" \
  -F "category=products"
```

## Next Steps

After migration:
1. Remove old `src/lib/dataStore.js`
2. Test thoroughly
3. Add error handling
4. Add loading states
5. Implement proper authentication (NextAuth.js recommended)
6. Add image optimization
7. Add pagination for large datasets
8. Deploy to production
