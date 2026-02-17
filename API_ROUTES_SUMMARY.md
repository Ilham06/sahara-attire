# API Routes Summary

Quick reference for all available API endpoints.

## 📁 File Structure

```
src/app/api/
├── auth/
│   ├── login/route.js          # POST - Login
│   ├── logout/route.js         # POST - Logout
│   ├── session/route.js        # POST - Check session
│   ├── register/route.js       # POST - Register new user
│   └── change-password/route.js # POST - Change password
├── products/
│   ├── route.js                # GET (all), POST (create)
│   └── [id]/route.js          # GET, PUT, DELETE (single product)
├── categories/
│   ├── route.js                # GET (all), POST (create)
│   └── [id]/route.js          # GET, PUT, DELETE (single category)
├── reviews/
│   ├── route.js                # GET (all), POST (create)
│   └── [id]/route.js          # GET, PUT, DELETE (single review)
├── contact/
│   └── route.js                # GET, PUT (singleton)
├── copywriting/
│   └── route.js                # GET, PUT, PATCH (singleton)
└── upload/
    └── route.js                # POST - Upload file
```

## 🔐 Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with username/password |
| POST | `/api/auth/logout` | Logout current session |
| POST | `/api/auth/session` | Check if session is valid |
| POST | `/api/auth/register` | Create new admin user |
| POST | `/api/auth/change-password` | Change user password |

## 📦 Products Routes

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/products` | Get all products | `category`, `featured` |
| POST | `/api/products` | Create new product | - |
| GET | `/api/products/:id` | Get single product | - |
| PUT | `/api/products/:id` | Update product | - |
| DELETE | `/api/products/:id` | Delete product | - |

## 🏷️ Categories Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create new category |
| GET | `/api/categories/:id` | Get single category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

## ⭐ Reviews Routes

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/reviews` | Get all reviews | `minRating` |
| POST | `/api/reviews` | Create new review | - |
| GET | `/api/reviews/:id` | Get single review | - |
| PUT | `/api/reviews/:id` | Update review | - |
| DELETE | `/api/reviews/:id` | Delete review | - |

## 📞 Contact Routes (Singleton)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contact` | Get contact/brand info |
| PUT | `/api/contact` | Update contact/brand info |

## ✍️ Copywriting Routes (Singleton)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/copywriting` | Get all copywriting |
| PUT | `/api/copywriting` | Replace all copywriting |
| PATCH | `/api/copywriting` | Update specific section |

## 📤 Upload Routes

| Method | Endpoint | Description | Form Fields |
|--------|----------|-------------|-------------|
| POST | `/api/upload` | Upload image file | `file`, `category` |

---

## 🚀 Quick Start Examples

### Using API Helper (Recommended)

```javascript
import { products, auth, upload } from "@/lib/api";

// Login
const user = await auth.login("admin", "admin123");

// Get products
const allProducts = await products.getAll();
const featured = await products.getAll({ featured: "true" });

// Upload image
const result = await upload.file(imageFile, "products");

// Create product with uploaded image
await products.create({
  name: "New Product",
  slug: "new-product",
  categoryId: 1,
  price: 1000000,
  description: "Description",
  images: [result.path],
  sizes: ["Custom"],
  colors: ["White"],
});
```

### Using Fetch Directly

```javascript
// Login
const loginRes = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "admin", password: "admin123" }),
});
const user = await loginRes.json();

// Get products
const productsRes = await fetch("/api/products");
const products = await productsRes.json();

// Upload file
const formData = new FormData();
formData.append("file", imageFile);
formData.append("category", "products");

const uploadRes = await fetch("/api/upload", {
  method: "POST",
  body: formData,
});
const upload = await uploadRes.json();
```

---

## 🎯 Common Use Cases

### 1. Login & Authentication

```javascript
import { auth } from "@/lib/api";

// Login
const { user } = await auth.login("admin", "admin123");
localStorage.setItem("user", JSON.stringify(user));

// Check session on page load
const storedUser = JSON.parse(localStorage.getItem("user"));
if (storedUser) {
  const { valid } = await auth.checkSession(storedUser.id);
  if (!valid) {
    localStorage.removeItem("user");
    router.push("/admin/login");
  }
}

// Logout
await auth.logout();
localStorage.removeItem("user");
```

### 2. Product CRUD with Image Upload

```javascript
import { products, upload } from "@/lib/api";

// Create product with images
async function createProduct(formData, imageFiles) {
  // Upload images first
  const uploadPromises = imageFiles.map((file) =>
    upload.file(file, "products")
  );
  const uploadResults = await Promise.all(uploadPromises);
  const imagePaths = uploadResults.map((r) => r.path);

  // Create product with image paths
  const product = await products.create({
    ...formData,
    images: imagePaths,
    categoryId: parseInt(formData.categoryId),
    price: parseInt(formData.price),
  });

  return product;
}

// Update product
async function updateProduct(id, formData, newImageFiles) {
  let imagePaths = [...formData.existingImages];

  // Upload new images if any
  if (newImageFiles.length > 0) {
    const uploadPromises = newImageFiles.map((file) =>
      upload.file(file, "products")
    );
    const uploadResults = await Promise.all(uploadPromises);
    imagePaths.push(...uploadResults.map((r) => r.path));
  }

  const product = await products.update(id, {
    ...formData,
    images: imagePaths,
  });

  return product;
}

// Delete product
async function deleteProduct(id) {
  if (confirm("Are you sure?")) {
    await products.delete(id);
  }
}
```

### 3. Category Management

```javascript
import { categories } from "@/lib/api";

// Auto-generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Create category
const category = await categories.create({
  name: "New Category",
  slug: generateSlug("New Category"),
});

// Update category
await categories.update(categoryId, {
  name: "Updated Name",
  slug: generateSlug("Updated Name"),
});

// Delete category (will fail if it has products)
try {
  await categories.delete(categoryId);
} catch (error) {
  alert(error.message); // "Cannot delete category with X products"
}
```

### 4. Review Management

```javascript
import { reviews } from "@/lib/api";

// Create review with auto-generated avatar
const review = await reviews.create({
  name: "John Doe",
  location: "Jakarta, Indonesia",
  rating: 5,
  text: "Excellent service!",
  // avatar is optional - auto-generated from initials
});

// Get only 5-star reviews
const topReviews = await reviews.getAll({ minRating: "5" });

// Update review
await reviews.update(reviewId, {
  text: "Updated review text",
  rating: 4,
});
```

### 5. Contact Info Management

```javascript
import { contact } from "@/lib/api";

// Get contact info
const info = await contact.get();

// Update contact info
await contact.update({
  ...info,
  phone: "+62 812 3456 7890",
  email: "newemail@saharaattire.com",
  address: {
    ...info.address,
    city: "Jakarta",
  },
});
```

### 6. Copywriting Management

```javascript
import { copywriting } from "@/lib/api";

// Get all copywriting
const content = await copywriting.get();

// Update entire copywriting
await copywriting.updateAll({
  ...content,
  hero: {
    ...content.hero,
    heading1: "New Heading",
  },
});

// Update only hero section (more efficient)
await copywriting.updateSection("hero", {
  kicker: "New Collection 2027",
  heading1: "Sahara",
  heading2: "Attire",
  description: "Updated description",
  ctaPrimary: "Shop Now",
  ctaSecondary: "Learn More",
});
```

---

## 📋 Response Format

### Success Response
```json
{
  "id": 1,
  "name": "Product Name",
  ...
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

### Creation Response
```json
{
  "success": true,
  "user": { ... },
  "message": "Created successfully"
}
```

---

## 🔧 Testing

Test all endpoints with the provided examples in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

Or use the test commands:

```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Test get products
curl http://localhost:3000/api/products

# Test upload
curl -X POST http://localhost:3000/api/upload \
  -F "file=@image.jpg" \
  -F "category=products"
```

---

## 📚 Additional Resources

- [PRISMA_SETUP.md](./PRISMA_SETUP.md) - Database setup guide
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - How to migrate admin pages
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Full API reference
