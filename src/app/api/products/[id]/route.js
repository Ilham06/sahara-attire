import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteFile } from "@/lib/upload";

// GET single product
export async function GET(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT update product
export async function PUT(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);
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

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if slug is being changed and if it's already taken
    if (slug && slug !== existingProduct.slug) {
      const slugExists = await prisma.product.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 400 });
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        price: price ? parseInt(price) : undefined,
        description,
        images: images || [],
        sizes: sizes || [],
        colors: colors || [],
        featured,
        fabric,
        care,
        fit,
        origin,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    // Get product to delete associated images
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete associated image files
    if (product.images && product.images.length > 0) {
      for (const imagePath of product.images) {
        if (imagePath.startsWith("/uploads/")) {
          await deleteFile(imagePath);
        }
      }
    }

    // Delete product from database
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
