# Prisma Database Setup Guide

This guide will help you set up PostgreSQL with Prisma 6 for the Sahara Attire project.

## Prerequisites

- PostgreSQL installed and running
- Node.js and npm installed

## Setup Steps

### 1. Configure Database Connection

Edit the `.env` file and update the `DATABASE_URL` with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

Example:
```env
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/sahara_attire?schema=public"
```

### 2. Create the Database

If the database doesn't exist yet, create it:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE sahara_attire;

# Exit
\q
```

### 3. Run Prisma Migration

This will create all the tables in your database:

```bash
npm run prisma:migrate
```

When prompted for a migration name, you can use: `init`

### 4. Seed the Database

This will populate your database with the existing data from your constants and data files:

```bash
npm run prisma:seed
```

This will create:
- Admin user (username: `admin`, password: `admin123`)
- All categories
- All products
- All reviews
- Contact/brand information
- Copywriting content

### 5. Verify the Setup

Open Prisma Studio to view your data:

```bash
npm run prisma:studio
```

This will open a browser interface at `http://localhost:5555` where you can view and edit your database.

## Database Schema

### Tables Created:

1. **users** - Admin authentication
   - id, username, password (hashed), email, role

2. **categories** - Product categories
   - id, name, slug

3. **products** - Product catalog
   - id, name, slug, categoryId, price, description
   - images (array), sizes (array), colors (array)
   - featured, fabric, care, fit, origin

4. **reviews** - Customer reviews
   - id, name, location, rating, text, avatar

5. **contacts** - Brand/contact information (single row)
   - Brand details, address, social media, business hours

6. **copywriting** - Website content (single row)
   - All copywriting stored as JSON

7. **uploads** - File upload tracking
   - id, filename, path, category, etc.

## File Upload Configuration

Files are uploaded to `/public/uploads/` with subdirectories:
- `/public/uploads/products/` - Product images
- `/public/uploads/categories/` - Category images
- `/public/uploads/headers/` - Header/banner images

Maximum file size: 5MB (configurable in `.env`)

Allowed types: JPEG, JPG, PNG, WebP

## Default Admin Credentials

**Username:** admin
**Password:** admin123

⚠️ **Important:** Change this password in production!

## Useful Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create a new migration
npm run prisma:migrate

# Seed the database
npm run prisma:seed

# Open Prisma Studio
npm run prisma:studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

## Next Steps

After setting up the database, you'll need to:

1. Update your admin CRUD pages to use Prisma instead of localStorage
2. Implement file upload functionality in your forms
3. Update authentication to use the database
4. Create API routes for CRUD operations

## Prisma Client Usage

Import Prisma client in your code:

```javascript
import { prisma } from "@/lib/prisma";

// Example: Get all products
const products = await prisma.product.findMany({
  include: {
    category: true,
  },
});

// Example: Create a product
const newProduct = await prisma.product.create({
  data: {
    name: "New Product",
    slug: "new-product",
    categoryId: 1,
    price: 1000000,
    description: "Product description",
    images: [],
    sizes: ["Custom"],
    colors: ["White"],
    featured: false,
  },
});
```

## File Upload Usage

```javascript
import { uploadFile, validateFile } from "@/lib/upload";

// In your API route
const formData = await request.formData();
const file = formData.get("image");

// Validate
const validation = validateFile(file);
if (!validation.valid) {
  return Response.json({ error: validation.errors }, { status: 400 });
}

// Upload
const filePath = await uploadFile(file, "products");
// filePath will be something like "/uploads/products/1234567890-abc123.jpg"
```

## Troubleshooting

### Connection Issues

If you get connection errors:
1. Verify PostgreSQL is running: `pg_isready`
2. Check your credentials in `.env`
3. Ensure the database exists

### Migration Issues

If migrations fail:
1. Check database connection
2. Ensure you have proper permissions
3. Try resetting: `npx prisma migrate reset`

### Seed Issues

If seeding fails:
1. Check that migrations have run successfully
2. Verify data files exist in `src/data/`
3. Check console for specific errors
