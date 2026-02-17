import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const featured = searchParams.get("featured");

    const where = {};

    if (categorySlug && categorySlug !== "all") {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });
      if (category) {
        where.categoryId = category.id;
      }
    }

    if (featured === "true") {
      where.featured = true;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST create new product
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      categoryId,
      price,
      description,
      images,
      sizes,
      colors,
      featured,
      fabric,
      care,
      fit,
      origin,
    } = body;

    // Validate required fields
    if (!name || !slug || !categoryId || !price || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json({ error: "Product with this slug already exists" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        categoryId: parseInt(categoryId),
        price: parseInt(price),
        description,
        images: images || [],
        sizes: sizes || [],
        colors: colors || [],
        featured: featured || false,
        fabric,
        care,
        fit,
        origin,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
