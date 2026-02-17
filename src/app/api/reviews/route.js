import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all reviews
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const minRating = searchParams.get("minRating");

    const where = {};

    if (minRating) {
      where.rating = {
        gte: parseInt(minRating),
      };
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST create new review
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, location, rating, text, avatar } = body;

    // Validate required fields
    if (!name || !location || !text) {
      return NextResponse.json({ error: "Name, location, and text are required" }, { status: 400 });
    }

    // Validate rating
    const ratingNum = parseInt(rating || 5);
    if (ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    // Generate avatar from initials if not provided
    const finalAvatar =
      avatar ||
      name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const review = await prisma.review.create({
      data: {
        name,
        location,
        rating: ratingNum,
        text,
        avatar: finalAvatar,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
