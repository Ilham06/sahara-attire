import { NextResponse } from "next/server";

export async function POST() {
  try {
    // In production, clear server-side session here
    // For now, client will clear localStorage/cookies

    return NextResponse.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
