/**
 * API Helper Functions
 * Centralized API calls for the application
 */

const API_BASE = "/api";

// Generic fetch wrapper with error handling
async function apiFetch(url, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// ============================================================================
// AUTHENTICATION
// ============================================================================

export const auth = {
  login: async (username, password) => {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  logout: async () => {
    return apiFetch("/auth/logout", {
      method: "POST",
    });
  },

  checkSession: async (userId) => {
    return apiFetch("/auth/session", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
  },

  register: async (userData) => {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  changePassword: async (userId, currentPassword, newPassword) => {
    return apiFetch("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ userId, currentPassword, newPassword }),
    });
  },
};

// ============================================================================
// PRODUCTS
// ============================================================================

export const products = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiFetch(`/products${query}`);
  },

  getById: async (id) => {
    return apiFetch(`/products/${id}`);
  },

  create: async (productData) => {
    return apiFetch("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  },

  update: async (id, productData) => {
    return apiFetch(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  },

  delete: async (id) => {
    return apiFetch(`/products/${id}`, {
      method: "DELETE",
    });
  },
};

// ============================================================================
// CATEGORIES
// ============================================================================

export const categories = {
  getAll: async () => {
    return apiFetch("/categories");
  },

  getById: async (id) => {
    return apiFetch(`/categories/${id}`);
  },

  create: async (categoryData) => {
    return apiFetch("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  },

  update: async (id, categoryData) => {
    return apiFetch(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
  },

  delete: async (id) => {
    return apiFetch(`/categories/${id}`, {
      method: "DELETE",
    });
  },
};

// ============================================================================
// REVIEWS
// ============================================================================

export const reviews = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiFetch(`/reviews${query}`);
  },

  getById: async (id) => {
    return apiFetch(`/reviews/${id}`);
  },

  create: async (reviewData) => {
    return apiFetch("/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
    });
  },

  update: async (id, reviewData) => {
    return apiFetch(`/reviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(reviewData),
    });
  },

  delete: async (id) => {
    return apiFetch(`/reviews/${id}`, {
      method: "DELETE",
    });
  },
};

// ============================================================================
// CONTACT
// ============================================================================

export const contact = {
  get: async () => {
    return apiFetch("/contact");
  },

  update: async (contactData) => {
    return apiFetch("/contact", {
      method: "PUT",
      body: JSON.stringify(contactData),
    });
  },
};

// ============================================================================
// COPYWRITING
// ============================================================================

export const copywriting = {
  get: async () => {
    return apiFetch("/copywriting");
  },

  updateAll: async (copywritingData) => {
    return apiFetch("/copywriting", {
      method: "PUT",
      body: JSON.stringify(copywritingData),
    });
  },

  updateSection: async (section, data) => {
    return apiFetch("/copywriting", {
      method: "PATCH",
      body: JSON.stringify({ section, data }),
    });
  },
};

// ============================================================================
// FILE UPLOAD
// ============================================================================

export const upload = {
  file: async (file, category = "general") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const response = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Upload failed");
    }

    return data;
  },

  multiple: async (files, category = "general") => {
    const uploadPromises = files.map((file) => upload.file(file, category));
    return Promise.all(uploadPromises);
  },
};

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// Authentication
const user = await auth.login("admin", "admin123");
localStorage.setItem("user", JSON.stringify(user));

// Products
const allProducts = await products.getAll();
const featuredProducts = await products.getAll({ featured: "true" });
const product = await products.getById(1);
const newProduct = await products.create({ name: "New Product", ... });
await products.update(1, { name: "Updated Name" });
await products.delete(1);

// Categories
const allCategories = await categories.getAll();
const category = await categories.create({ name: "New Category", slug: "new-category" });

// Reviews
const allReviews = await reviews.getAll();
const topReviews = await reviews.getAll({ minRating: "4" });
await reviews.create({ name: "John", location: "Jakarta", rating: 5, text: "Great!" });

// Contact
const contactInfo = await contact.get();
await contact.update({ name: "New Brand Name", ... });

// Copywriting
const copywritingContent = await copywriting.get();
await copywriting.updateSection("hero", { heading1: "New Heading" });

// File Upload
const result = await upload.file(imageFile, "products");
console.log(result.path); // "/uploads/products/123-abc.jpg"

// Upload multiple files
const files = [file1, file2, file3];
const results = await upload.multiple(files, "products");
const imagePaths = results.map(r => r.path);
*/
