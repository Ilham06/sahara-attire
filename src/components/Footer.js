import Link from "next/link";
import { BRAND, NAVIGATION } from "@/data/constants";

export default function Footer() {
  return (
    <footer className="bg-[#FBF6F7] border-t border-stone-200">
      <div className="container mx-auto px-4 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-display tracking-[0.2em] mb-4 text-black">
              {BRAND.name.toUpperCase()}
            </h3>
            <p className="text-stone-600 leading-relaxed max-w-md font-light">
              Koleksi gaun pernikahan untuk pembelian dan penyewaan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase mb-6 text-stone-500">
              Menu
            </h4>
            <ul className="space-y-3">
              {NAVIGATION.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-stone-600 font-light transition-colors duration-300 hover:text-[#A26769]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase mb-6 text-stone-500">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-stone-600 font-light">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-colors duration-300 hover:text-[#A26769]"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="transition-colors duration-300 hover:text-[#A26769]"
                >
                  {BRAND.phone}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-sm text-stone-500 font-light">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">

            <a
              href={BRAND.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 transition-colors duration-300 hover:text-[#A26769]"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
              </svg>
            </a>

            <a
              href={BRAND.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 transition-colors duration-300 hover:text-[#A26769]"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href={BRAND.social.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 transition-colors duration-300 hover:text-[#A26769]"
              aria-label="Pinterest"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}
