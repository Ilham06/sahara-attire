import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const defaultCopywriting = {
  hero: {
    kicker: "Bridal Collection 2026",
    heading1: "Sahara",
    heading2: "Attire",
    description: "Busana pernikahan dengan siluet modern, detail refined, dan material premium untuk momen paling berharga Anda.",
    ctaPrimary: "Lihat Koleksi",
    ctaSecondary: "Tentang Brand",
  },
  collection: {
    kicker: "Curated Collection",
    title: "Koleksi Pilihan Kami",
    description: "Eksplorasi kategori gaun pengantin dan busana acara istimewa dengan sentuhan modern, struktur elegan, dan material premium.",
  },
  bestSeller: {
    kicker: "Best Seller",
    title: "Gaun Pengantin & Resepsi",
    description: "Pilihan favorit klien kami untuk momen akad, resepsi, hingga engagement photoshoot.",
  },
  features: [
    { number: "01", title: "Premium Material", description: "Satin silk, French lace, dan organza pilihan dengan hasil akhir mewah." },
    { number: "02", title: "Tailored Fit", description: "Setiap gaun dipersiapkan agar proporsional dan nyaman sepanjang acara." },
    { number: "03", title: "Timeless Design", description: "Desain kontemporer yang tetap relevan untuk dikenang bertahun-tahun." },
  ],
  reviews: {
    kicker: "Client Experience",
    title: "Cerita Klien Sahara",
  },
  about: {
    heroKicker: "Our Story",
    heroTitle: "Sahara Attire",
    heroSubtitle: "Atelier bridal modern untuk momen hidup paling berharga.",
    storyKicker: "Tentang Kami",
    storyTitle: "Keanggunan dalam\nsetiap detail",
    storyP1: "Sahara Attire menghadirkan koleksi gaun pernikahan untuk pembelian dan penyewaan dengan pendekatan desain clean, siluet refined, dan craftsmanship premium.",
    storyP2: "Kami percaya fitting yang tepat dan detail yang presisi akan membuat setiap calon pengantin tampil percaya diri, anggun, dan autentik.",
    philosophyKicker: "Our Philosophy",
    philosophyTitle: "Setiap gaun bukan sekadar pakaian,\nmelainkan cerita hidup.",
    values: [
      { number: "01", title: "Elegan", description: "Siluet modern yang dirancang untuk menciptakan kesan berkelas." },
      { number: "02", title: "Berkualitas", description: "Material pilihan dengan perhatian detail pada setiap proses akhir." },
      { number: "03", title: "Fleksibel", description: "Tersedia untuk pembelian dan penyewaan sesuai kebutuhan acara." },
    ],
    ctaTitle: "Mari Rancang Penampilan Istimewa Anda",
    ctaButton: "Konsultasi Sekarang",
  },
};

// GET copywriting content
export async function GET() {
  try {
    let copywriting = await prisma.copywriting.findUnique({
      where: { id: 1 },
    });

    // If copywriting doesn't exist, create default one
    if (!copywriting) {
      copywriting = await prisma.copywriting.create({
        data: {
          id: 1,
          content: defaultCopywriting,
        },
      });
    }

    return NextResponse.json(copywriting.content);
  } catch (error) {
    console.error("Get copywriting error:", error);
    return NextResponse.json({ error: "Failed to fetch copywriting" }, { status: 500 });
  }
}

// PUT update copywriting content
export async function PUT(request) {
  try {
    const body = await request.json();

    // Validate that body is an object
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid copywriting data" }, { status: 400 });
    }

    // Upsert (create if doesn't exist, update if exists)
    const copywriting = await prisma.copywriting.upsert({
      where: { id: 1 },
      update: {
        content: body,
      },
      create: {
        id: 1,
        content: body,
      },
    });

    return NextResponse.json(copywriting.content);
  } catch (error) {
    console.error("Update copywriting error:", error);
    return NextResponse.json({ error: "Failed to update copywriting" }, { status: 500 });
  }
}

// PATCH partial update of copywriting content
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { section, data } = body;

    if (!section || !data) {
      return NextResponse.json({ error: "Section and data are required" }, { status: 400 });
    }

    // Get current copywriting
    let copywriting = await prisma.copywriting.findUnique({
      where: { id: 1 },
    });

    if (!copywriting) {
      copywriting = await prisma.copywriting.create({
        data: {
          id: 1,
          content: defaultCopywriting,
        },
      });
    }

    // Update only the specified section
    const updatedContent = {
      ...copywriting.content,
      [section]: data,
    };

    // Save updated content
    const updated = await prisma.copywriting.update({
      where: { id: 1 },
      data: {
        content: updatedContent,
      },
    });

    return NextResponse.json(updated.content);
  } catch (error) {
    console.error("Patch copywriting error:", error);
    return NextResponse.json({ error: "Failed to update copywriting section" }, { status: 500 });
  }
}
