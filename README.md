# Sahara Attire

A modern, elegant, and minimalist fashion brand website built with Next.js 16, React 19, and Tailwind CSS.

## Brand Identity

Sahara Attire is a premium fashion brand inspired by desert landscapes, featuring:
- Modern, minimalist design
- Earthy color palette (sand, beige, brown, off-white)
- Editorial-style typography
- Premium, sustainable fashion

## Features

- 🏠 **Home Page**: Hero section with featured collection
- 📖 **About Page**: Brand story, philosophy, and values
- 🛍️ **Catalog Page**: Filterable product grid by category
- 👕 **Product Detail Page**: Detailed product information with image gallery
- 📧 **Contact Page**: Contact form and business information
- 📱 **Responsive Design**: Mobile-first approach
- ♿ **Accessible**: Semantic HTML and ARIA labels
- 🎨 **Modern UI**: Clean, elegant interface with smooth transitions

## Tech Stack

- **Framework**: Next.js 16.1.6
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS v4
- **Fonts**: Playfair Display (headings), Inter (body)
- **Images**: Next.js Image optimization with Unsplash

## Project Structure

```
src/
├── app/
│   ├── about/
│   │   └── page.js
│   ├── catalog/
│   │   ├── [slug]/
│   │   │   └── page.js
│   │   └── page.js
│   ├── contact/
│   │   └── page.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── Footer.js
│   ├── Header.js
│   ├── Hero.js
│   ├── ProductCard.js
│   └── Section.js
└── data/
    ├── constants.js
    └── products.js
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

- **/** - Home page with hero and featured products
- **/about** - Brand story and values
- **/catalog** - All products with category filtering
- **/catalog/[slug]** - Individual product details
- **/contact** - Contact form and information

## Data Structure

### Products
Each product includes:
- Name, slug, category
- Price and description
- Multiple images
- Available sizes and colors
- Detailed product information (fabric, care, fit, origin)
- Featured status

### Categories
- All, Shirts, Bottoms, Dresses, Outerwear, Knitwear, Accessories

## Customization

### Brand Information
Edit `src/data/constants.js` to update:
- Brand name and tagline
- Contact information
- Social media links
- Business hours

### Products
Edit `src/data/products.js` to:
- Add/remove products
- Update product details
- Modify categories

### Styling
Customize colors and typography in:
- `src/app/globals.css` - Global styles
- Tailwind classes throughout components

## Build for Production

```bash
npm run build
npm start
```

## License

Private project for Sahara Attire.
