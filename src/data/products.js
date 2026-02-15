export const products = [
  {
    id: 1,
    name: "Desert Linen Shirt",
    slug: "desert-linen-shirt",
    category: "Shirts",
    price: 129,
    description: "Crafted from premium European linen, this relaxed-fit shirt embodies effortless elegance. The breathable fabric and earthy tone make it perfect for any occasion.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sand", "Stone", "Beige"],
    featured: true,
    details: {
      fabric: "100% European Linen",
      care: "Machine wash cold, tumble dry low",
      fit: "Relaxed fit",
      origin: "Made in Portugal"
    }
  },
  {
    id: 2,
    name: "Dunes Wide-Leg Trousers",
    slug: "dunes-wide-leg-trousers",
    category: "Bottoms",
    price: 165,
    description: "Flowing wide-leg trousers that blend comfort with sophistication. Cut from premium cotton blend with a high-rise waist and elegant drape.",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Taupe", "Olive"],
    featured: true,
    details: {
      fabric: "68% Cotton, 30% Lyocell, 2% Elastane",
      care: "Dry clean recommended",
      fit: "High-rise, wide leg",
      origin: "Made in Italy"
    }
  },
  {
    id: 3,
    name: "Oasis Cotton Dress",
    slug: "oasis-cotton-dress",
    category: "Dresses",
    price: 189,
    description: "A timeless midi dress in organic cotton with subtle pleating and a flattering silhouette. Perfect for warm days and elegant evenings.",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Natural", "Sand", "Terracotta"],
    featured: true,
    details: {
      fabric: "100% Organic Cotton",
      care: "Hand wash cold, line dry",
      fit: "Relaxed fit, midi length",
      origin: "Made in France"
    }
  },
  {
    id: 4,
    name: "Nomad Linen Blazer",
    slug: "nomad-linen-blazer",
    category: "Outerwear",
    price: 245,
    description: "Structured yet breathable, this linen blazer is tailored for the modern minimalist. Features natural buttons and unlined construction.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Camel", "Stone", "Sage"],
    featured: false,
    details: {
      fabric: "100% Italian Linen",
      care: "Dry clean only",
      fit: "Tailored fit",
      origin: "Made in Italy"
    }
  },
  {
    id: 5,
    name: "Sahara Knit Sweater",
    slug: "sahara-knit-sweater",
    category: "Knitwear",
    price: 155,
    description: "Soft merino wool sweater with a relaxed crew neck. Lightweight yet warm, perfect for layering or wearing alone.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Oatmeal", "Camel", "Charcoal"],
    featured: false,
    details: {
      fabric: "100% Merino Wool",
      care: "Hand wash cold, lay flat to dry",
      fit: "Relaxed fit",
      origin: "Made in Scotland"
    }
  },
  {
    id: 6,
    name: "Horizon Silk Blouse",
    slug: "horizon-silk-blouse",
    category: "Shirts",
    price: 195,
    description: "Luxurious silk blouse with subtle sheen and elegant drape. Features mother-of-pearl buttons and French seams.",
    images: [
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&q=80",
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Champagne", "Taupe"],
    featured: true,
    details: {
      fabric: "100% Mulberry Silk",
      care: "Dry clean only",
      fit: "Relaxed fit",
      origin: "Made in France"
    }
  },
  {
    id: 7,
    name: "Terra Cotta Midi Skirt",
    slug: "terra-cotta-midi-skirt",
    category: "Bottoms",
    price: 139,
    description: "A-line midi skirt in premium cotton with invisible side zip. The perfect versatile piece for any wardrobe.",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Terracotta", "Sand", "Black"],
    featured: false,
    details: {
      fabric: "97% Cotton, 3% Elastane",
      care: "Machine wash cold, hang to dry",
      fit: "Mid-rise, A-line",
      origin: "Made in Portugal"
    }
  },
  {
    id: 8,
    name: "Mirage Cashmere Wrap",
    slug: "mirage-cashmere-wrap",
    category: "Accessories",
    price: 215,
    description: "Ultra-soft cashmere wrap that doubles as a scarf or shawl. Lightweight and luxuriously warm.",
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80"
    ],
    sizes: ["One Size"],
    colors: ["Camel", "Cream", "Charcoal"],
    featured: false,
    details: {
      fabric: "100% Cashmere",
      care: "Dry clean only",
      fit: "170cm x 70cm",
      origin: "Made in Scotland"
    }
  }
];

export const categories = [
  { name: "All", slug: "all" },
  { name: "Shirts", slug: "shirts" },
  { name: "Bottoms", slug: "bottoms" },
  { name: "Dresses", slug: "dresses" },
  { name: "Outerwear", slug: "outerwear" },
  { name: "Knitwear", slug: "knitwear" },
  { name: "Accessories", slug: "accessories" }
];
