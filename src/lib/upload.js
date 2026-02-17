import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

/**
 * Upload a file to the server
 * @param {File} file - The file to upload
 * @param {string} category - Category folder (e.g., 'products', 'categories', 'headers')
 * @returns {Promise<string>} - The file path relative to public folder
 */
export async function uploadFile(file, category = "general") {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const ext = file.name.split(".").pop();
    const filename = `${timestamp}-${randomString}.${ext}`;

    // Create category directory if it doesn't exist
    const uploadDir = join(process.cwd(), "public", "uploads", category);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save file
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return path relative to public folder
    return `/uploads/${category}/${filename}`;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload file");
  }
}

/**
 * Validate file upload
 * @param {File} file - The file to validate
 * @param {object} options - Validation options
 * @returns {object} - Validation result
 */
export function validateFile(file, options = {}) {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  } = options;

  const errors = [];

  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Delete a file from the server
 * @param {string} filePath - Path relative to public folder
 */
export async function deleteFile(filePath) {
  try {
    const { unlink } = await import("fs/promises");
    const fullPath = join(process.cwd(), "public", filePath);
    if (existsSync(fullPath)) {
      await unlink(fullPath);
    }
  } catch (error) {
    console.error("Delete file error:", error);
  }
}
