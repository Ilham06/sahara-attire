import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Session invalid" }, { status: 401 });
    }

    return NextResponse.json({
      valid: true,
      user,
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ error: "Session check failed" }, { status: 500 });
  }
}
