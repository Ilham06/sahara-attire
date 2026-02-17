# API Documentation

Complete API reference for Sahara Attire backend.

## Base URL

```
http://localhost:3000/api
```

---

## Authentication

### Login
**POST** `/api/auth/login`

Login to admin account.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@saharaattire.com",
    "role": "admin",
    "loggedIn": true
  },
  "message": "Login successful"
}
```

### Logout
**POST** `/api/auth/logout`

Logout from admin account.

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Check Session
**POST** `/api/auth/session`

Verify if a session is still valid.

**Request Body:**
```json
{
  "userId": 1
}
```

**Response (200):**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@saharaattire.com",
    "role": "admin"
  }
}
```

### Register New User
**POST** `/api/auth/register`

Create a new admin user.

**Request Body:**
```json
{
  "username": "newadmin",
  "password": "securepassword",
  "email": "admin2@saharaattire.com",
  "role": "admin"
}
```

**Response (201):**
```json
{
  "success": true,
  "user": {
    "id": 2,
    "username": "newadmin",
    "email": "admin2@saharaattire.com",
    "role": "admin",
    "createdAt": "2026-02-17T10:00:00.000Z"
  },
  "message": "User created successfully"
}
```

### Change Password
**POST** `/api/auth/change-password`

Change user password.

**Request Body:**
```json
{
  "userId": 1,
  "currentPassword": "admin123",
  "newPassword": "newsecurepassword"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## Categories

### Get All Categories
**GET** `/api/categories`

Fetch all categories with product count.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Gaun Pengantin",
    "slug": "bridal-gown",
    "createdAt": "2026-02-17T10:00:00.000Z",
    "updatedAt": "2026-02-17T10:00:00.000Z",
    "_count": {
      "products": 5
    }
  }
]
```

### Get Single Category
**GET** `/api/categories/:id`

Get category details with all products.

**Response (200):**
```json
{
  "id": 1,
  "name": "Gaun Pengantin",
  "slug": "bridal-gown",
  "products": [...]
}
```

### Create Category
**POST** `/api/categories`

Create a new category.

**Request Body:**
```json
{
  "name": "Gaun Malam",
  "slug": "evening-gown"
}
```

**Response (201):**
```json
{
  "id": 6,
  "name": "Gaun Malam",
  "slug": "evening-gown",
  "createdAt": "2026-02-17T10:00:00.000Z",
  "updatedAt": "2026-02-17T10:00:00.000Z"
}
```

### Update Category
**PUT** `/api/categories/:id`

Update existing category.

**Request Body:**
```json
{
  "name": "Gaun Malam Elegan",
  "slug": "elegant-evening-gown"
}
```

### Delete Category
**DELETE** `/api/categories/:id`

Delete a category (only if it has no products).

**Response (200):**
```json
{
  "message": "Category deleted successfully"
}
```

---

## Products

### Get All Products
**GET** `/api/products`

Fetch all products with optional filters.

**Query Parameters:**
- `category` - Filter by category slug (e.g., `bridal-gown`)
- `featured` - Filter featured products (`true`/`false`)

**Examples:**
```
GET /api/products
GET /api/products?category=bridal-gown
GET /api/products?featured=true
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Sahara Étoile Bridal Gown",
    "slug": "etoile-bridal-gown",
    "categoryId": 1,
    "price": 28500000,
    "description": "Gaun pengantin A-line...",
    "images": ["/uploads/products/image1.jpg"],
    "sizes": ["Custom"],
    "colors": ["Putih Gading", "Champagne"],
    "featured": true,
    "fabric": "French Lace & Premium Tulle",
    "care": "Dry clean profesional",
    "fit": "Custom made",
    "origin": "Atelier Sahara, Jakarta",
    "category": {
      "id": 1,
      "name": "Gaun Pengantin",
      "slug": "bridal-gown"
    }
  }
]
```

### Get Single Product
**GET** `/api/products/:id`

Get product details.

**Response (200):**
```json
{
  "id": 1,
  "name": "Sahara Étoile Bridal Gown",
  ...
}
```

### Create Product
**POST** `/api/products`

Create a new product.

**Request Body:**
```json
{
  "name": "New Bridal Gown",
  "slug": "new-bridal-gown",
  "categoryId": 1,
  "price": 30000000,
  "description": "Beautiful bridal gown",
  "images": ["/uploads/products/image.jpg"],
  "sizes": ["Custom"],
  "colors": ["White", "Ivory"],
  "featured": true,
  "fabric": "Silk",
  "care": "Dry clean",
  "fit": "Custom",
  "origin": "Jakarta"
}
```

**Response (201):**
```json
{
  "id": 11,
  "name": "New Bridal Gown",
  ...
}
```

### Update Product
**PUT** `/api/products/:id`

Update existing product.

**Request Body:** (same as create)

### Delete Product
**DELETE** `/api/products/:id`

Delete a product and its associated images.

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

---

## Reviews

### Get All Reviews
**GET** `/api/reviews`

Fetch all reviews.

**Query Parameters:**
- `minRating` - Filter by minimum rating (1-5)

**Examples:**
```
GET /api/reviews
GET /api/reviews?minRating=4
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Sarah Mitchell",
    "location": "New York, NY",
    "rating": 5,
    "text": "Sangat mencintai kualitas dan desainnya...",
    "avatar": "SM",
    "createdAt": "2026-02-17T10:00:00.000Z",
    "updatedAt": "2026-02-17T10:00:00.000Z"
  }
]
```

### Get Single Review
**GET** `/api/reviews/:id`

### Create Review
**POST** `/api/reviews`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "location": "Jakarta, Indonesia",
  "rating": 5,
  "text": "Amazing experience!",
  "avatar": "JD"
}
```

**Note:** `avatar` is optional. If not provided, it will be auto-generated from initials.

### Update Review
**PUT** `/api/reviews/:id`

### Delete Review
**DELETE** `/api/reviews/:id`

---

## Contact/Brand Information

### Get Contact Info
**GET** `/api/contact`

Fetch brand and contact information.

**Response (200):**
```json
{
  "name": "Sahara Attire",
  "tagline": "Elegansi abadi terinspirasi dari gurun pasir",
  "description": "Sahara Attire adalah rumah mode modern...",
  "email": "hello@saharaattire.com",
  "phone": "+1 (555) 123-4567",
  "whatsapp": "+15551234567",
  "whatsappDisplay": "+1 (555) 123-4567",
  "address": {
    "street": "245 Madison Avenue",
    "city": "New York",
    "state": "NY",
    "zip": "10016",
    "country": "Amerika Serikat"
  },
  "social": {
    "instagram": "https://instagram.com/saharaattire",
    "tiktok": "https://tiktok.com/@saharaattire",
    "facebook": "https://facebook.com/saharaattire",
    "pinterest": "https://pinterest.com/saharaattire",
    "twitter": "https://twitter.com/saharaattire"
  },
  "hours": {
    "weekdays": "10:00 - 19:00",
    "saturday": "11:00 - 18:00",
    "sunday": "12:00 - 17:00"
  }
}
```

### Update Contact Info
**PUT** `/api/contact`

Update brand and contact information.

**Request Body:** (same structure as GET response)

---

## Copywriting

### Get Copywriting Content
**GET** `/api/copywriting`

Fetch all website copywriting.

**Response (200):**
```json
{
  "hero": {
    "kicker": "Bridal Collection 2026",
    "heading1": "Sahara",
    "heading2": "Attire",
    "description": "Busana pernikahan...",
    "ctaPrimary": "Lihat Koleksi",
    "ctaSecondary": "Tentang Brand"
  },
  "collection": {
    "kicker": "Curated Collection",
    "title": "Koleksi Pilihan Kami",
    "description": "Eksplorasi kategori..."
  },
  "bestSeller": { ... },
  "features": [ ... ],
  "reviews": { ... },
  "about": { ... }
}
```

### Update All Copywriting
**PUT** `/api/copywriting`

Replace entire copywriting content.

**Request Body:** (same structure as GET response)

### Update Copywriting Section
**PATCH** `/api/copywriting`

Update only a specific section.

**Request Body:**
```json
{
  "section": "hero",
  "data": {
    "kicker": "New Collection 2027",
    "heading1": "Sahara",
    "heading2": "Attire",
    "description": "Updated description...",
    "ctaPrimary": "Shop Now",
    "ctaSecondary": "Learn More"
  }
}
```

---

## File Upload

### Upload File
**POST** `/api/upload`

Upload an image file.

**Request:** `multipart/form-data`

**Form Fields:**
- `file` - The file to upload (required)
- `category` - Upload category: `products`, `categories`, `headers`, or `general` (optional, default: `general`)

**Example (using JavaScript):**
```javascript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('category', 'products');

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
// data.path = "/uploads/products/1234567890-abc123.jpg"
```

**Response (200):**
```json
{
  "success": true,
  "path": "/uploads/products/1234567890-abc123.jpg",
  "filename": "original-filename.jpg"
}
```

**Validation:**
- Max file size: 5MB
- Allowed types: JPEG, JPG, PNG, WebP

---

## Error Responses

All endpoints return error responses in this format:

**400 Bad Request:**
```json
{
  "error": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "error": "Invalid credentials"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Operation failed"
}
```

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get Products
```bash
curl http://localhost:3000/api/products
```

### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "slug": "test-product",
    "categoryId": 1,
    "price": 1000000,
    "description": "Test description",
    "images": [],
    "sizes": ["Custom"],
    "colors": ["White"],
    "featured": false
  }'
```

### Upload File
```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@image.jpg" \
  -F "category=products"
```

---

## Frontend Integration

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for complete examples of integrating these APIs into your admin pages.
