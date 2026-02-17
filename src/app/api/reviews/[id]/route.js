import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single review
export async function GET(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("Get review error:", error);
    return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 });
  }
}

// PUT update review
export async function PUT(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);
    const body = await request.json();
    const { name, location, rating, text, avatar } = body;

    // Check if review exists
    const existingReview = await prisma.review.findUnique({
      where: { id },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Validate rating if provided
    if (rating !== undefined) {
      const ratingNum = parseInt(rating);
      if (ratingNum < 1 || ratingNum > 5) {
        return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
      }
    }

    const review = await prisma.review.update({
      where: { id },
      data: {
        name,
        location,
        rating: rating !== undefined ? parseInt(rating) : undefined,
        text,
        avatar,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Update review error:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

// DELETE review
export async function DELETE(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    // Check if review exists
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
