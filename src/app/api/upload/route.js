import { NextResponse } from "next/server";
import { uploadFile, validateFile } from "@/lib/upload";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const category = formData.get("category") || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.errors.join(", ") }, { status: 400 });
    }

    // Upload file
    const filePath = await uploadFile(file, category);

    // Track upload in database
    await prisma.upload.create({
      data: {
        filename: filePath.split("/").pop(),
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        path: filePath,
        category: category,
      },
    });

    return NextResponse.json({
      success: true,
      path: filePath,
      filename: file.name,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
