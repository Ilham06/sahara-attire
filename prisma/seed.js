const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// Import existing data
const { products, categories } = require("../src/data/products.js");
const { BRAND, REVIEWS } = require("../src/data/constants.js");

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

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  console.log("Clearing existing data...");
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.review.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.copywriting.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  console.log("Creating admin user...");
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPassword,
      email: "admin@saharaattire.com",
      role: "admin",
    },
  });

  // Create categories
  console.log("Creating categories...");
  const categoryMap = new Map();

  for (const cat of categories) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
      },
    });
    categoryMap.set(cat.name, created.id);
  }

  // Create products
  console.log("Creating products...");
  for (const product of products) {
    // Find category ID
    const categoryId = categoryMap.get(product.category);

    if (!categoryId) {
      console.warn(`Category not found for product: ${product.name}`);
      continue;
    }

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        categoryId: categoryId,
        price: product.price,
        description: product.description,
        images: product.images || [],
        sizes: product.sizes || [],
        colors: product.colors || [],
        featured: product.featured || false,
        fabric: product.details?.fabric,
        care: product.details?.care,
        fit: product.details?.fit,
        origin: product.details?.origin,
      },
    });
  }

  // Create reviews
  console.log("Creating reviews...");
  for (const review of REVIEWS) {
    await prisma.review.create({
      data: {
        name: review.name,
        location: review.location,
        rating: review.rating,
        text: review.text,
        avatar: review.avatar,
      },
    });
  }

  // Create contact/brand info
  console.log("Creating contact/brand info...");
  await prisma.contact.create({
    data: {
      id: 1,
      name: BRAND.name,
      tagline: BRAND.tagline,
      description: BRAND.description,
      email: BRAND.email,
      phone: BRAND.phone,
      whatsapp: BRAND.whatsapp,
      whatsappDisplay: BRAND.whatsappDisplay,
      addressStreet: BRAND.address?.street,
      addressCity: BRAND.address?.city,
      addressState: BRAND.address?.state,
      addressZip: BRAND.address?.zip,
      addressCountry: BRAND.address?.country,
      socialInstagram: BRAND.social?.instagram,
      socialTiktok: BRAND.social?.tiktok,
      socialFacebook: BRAND.social?.facebook,
      socialPinterest: BRAND.social?.pinterest,
      socialTwitter: BRAND.social?.twitter,
      hoursWeekdays: BRAND.hours?.weekdays,
      hoursSaturday: BRAND.hours?.saturday,
      hoursSunday: BRAND.hours?.sunday,
    },
  });

  // Create copywriting
  console.log("Creating copywriting...");
  await prisma.copywriting.create({
    data: {
      id: 1,
      content: defaultCopywriting,
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
