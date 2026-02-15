"use client";

import { useState } from "react";
import Section from "@/components/Section";
import { BRAND } from "@/data/constants";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-24 md:pt-32">
      {/* Header */}
      <Section>
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-stone-900">
            Get in Touch
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            We'd love to hear from you. Whether you have a question about our
            products, need styling advice, or just want to chat, we're here to
            help.
          </p>
        </div>
      </Section>

      <Section background="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-light tracking-wide mb-6 text-stone-900">
                Send us a Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-stone-900 mb-2 tracking-wider uppercase"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-stone-900 mb-2 tracking-wider uppercase"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-stone-900 mb-2 tracking-wider uppercase"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-stone-900 text-white hover:bg-stone-700 transition-colors tracking-wider text-sm uppercase"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-light tracking-wide mb-6 text-stone-900">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-stone-900 mb-2 tracking-wider uppercase">
                      Email
                    </h3>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      {BRAND.email}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-stone-900 mb-2 tracking-wider uppercase">
                      Phone
                    </h3>
                    <a
                      href={`tel:${BRAND.phone}`}
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      {BRAND.phone}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-stone-900 mb-2 tracking-wider uppercase">
                      Address
                    </h3>
                    <address className="text-stone-600 not-italic">
                      {BRAND.address.street}
                      <br />
                      {BRAND.address.city}, {BRAND.address.state}{" "}
                      {BRAND.address.zip}
                      <br />
                      {BRAND.address.country}
                    </address>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-stone-900 mb-2 tracking-wider uppercase">
                      Store Hours
                    </h3>
                    <div className="text-stone-600 space-y-1">
                      <p>Monday - Friday: {BRAND.hours.weekdays}</p>
                      <p>Saturday: {BRAND.hours.saturday}</p>
                      <p>Sunday: {BRAND.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-sm font-medium text-stone-900 mb-4 tracking-wider uppercase">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href={BRAND.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-500 hover:text-stone-900 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href={BRAND.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-500 hover:text-stone-900 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href={BRAND.social.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-500 hover:text-stone-900 transition-colors"
                    aria-label="Pinterest"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
