import { products as defaultProducts, categories as defaultCategories } from "@/data/products";
import { BRAND as defaultBrand, REVIEWS as defaultReviews } from "@/data/constants";

const KEYS = {
  products: "sahara_products",
  categories: "sahara_categories",
  reviews: "sahara_reviews",
  contact: "sahara_contact",
  copywriting: "sahara_copywriting",
};

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

function getStore(key, defaultValue) {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultValue;
    }
  }
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
}

function setStore(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Products
export function getProducts() {
  return getStore(KEYS.products, defaultProducts);
}
export function setProducts(data) {
  setStore(KEYS.products, data);
}
export function addProduct(product) {
  const items = getProducts();
  const maxId = items.reduce((max, p) => Math.max(max, p.id), 0);
  product.id = maxId + 1;
  items.push(product);
  setProducts(items);
  return product;
}
export function updateProduct(id, updates) {
  const items = getProducts().map((p) => (p.id === id ? { ...p, ...updates } : p));
  setProducts(items);
}
export function deleteProduct(id) {
  setProducts(getProducts().filter((p) => p.id !== id));
}

// Categories
export function getCategories() {
  return getStore(KEYS.categories, defaultCategories);
}
export function setCategories(data) {
  setStore(KEYS.categories, data);
}
export function addCategory(category) {
  const items = getCategories();
  items.push(category);
  setCategories(items);
}
export function updateCategory(oldSlug, updates) {
  const items = getCategories().map((c) => (c.slug === oldSlug ? { ...c, ...updates } : c));
  setCategories(items);
}
export function deleteCategory(slug) {
  setCategories(getCategories().filter((c) => c.slug !== slug));
}

// Reviews
export function getReviews() {
  return getStore(KEYS.reviews, defaultReviews);
}
export function setReviews(data) {
  setStore(KEYS.reviews, data);
}
export function addReview(review) {
  const items = getReviews();
  const maxId = items.reduce((max, r) => Math.max(max, r.id), 0);
  review.id = maxId + 1;
  items.push(review);
  setReviews(items);
  return review;
}
export function updateReview(id, updates) {
  const items = getReviews().map((r) => (r.id === id ? { ...r, ...updates } : r));
  setReviews(items);
}
export function deleteReview(id) {
  setReviews(getReviews().filter((r) => r.id !== id));
}

// Contact / Brand
export function getContact() {
  return getStore(KEYS.contact, defaultBrand);
}
export function setContact(data) {
  setStore(KEYS.contact, data);
}

// Copywriting
export function getCopywriting() {
  return getStore(KEYS.copywriting, defaultCopywriting);
}
export function setCopywriting(data) {
  setStore(KEYS.copywriting, data);
}
