"use client";

import { useEffect, useState } from "react";
import Section from "@/components/Section";
import Image from "next/image";
import { getContact, getCopywriting } from "@/lib/dataStore";

export default function About() {
  const [brand, setBrand] = useState(null);
  const [copy, setCopy] = useState(null);

  useEffect(() => {
    setBrand(getContact());
    setCopy(getCopywriting());
  }, []);

  if (!brand || !copy) return null;

  const about = copy.about;

  return (
    <div className="pt-24 md:pt-32">
      <section className="relative flex h-[74vh] items-center justify-center overflow-hidden text-center">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
          alt="Sahara Attire Bridal"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 text-white px-6">
          <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-white/70">{about.heroKicker}</p>
          <h1 className="font-display text-6xl tracking-tight md:text-8xl">
            {about.heroTitle}
          </h1>
          <div className="mx-auto mb-7 mt-7 h-px w-24 bg-[#d9a1a2]" />
          <p className="mx-auto max-w-xl text-lg font-light text-white/80 md:text-xl">
            {about.heroSubtitle}
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-[#eaded9]">
            <Image
              src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80"
              alt="Bridal Collection"
              fill
              className="object-cover"
            />
          </div>

          <div className="editorial-card">
            <p className="section-kicker">{about.storyKicker}</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-[#191313] md:text-5xl whitespace-pre-line">
              {about.storyTitle}
            </h2>
            <p className="mt-6 text-[#645652]">
              {about.storyP1}
            </p>
            <p className="mt-4 text-[#645652]">
              {about.storyP2}
            </p>
          </div>
        </div>
      </Section>

      <Section background="blushSoft">
        <div className="mx-auto max-w-5xl text-center">
          <p className="section-kicker">{about.philosophyKicker}</p>
          <h2 className="mt-5 font-display text-4xl leading-snug text-[#1a1312] md:text-6xl whitespace-pre-line">
            {about.philosophyTitle}
          </h2>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {about.values.map((val) => (
              <div key={val.number} className="editorial-card">
                <span className="font-display text-5xl text-[#a26769]">{val.number}</span>
                <h3 className="mt-4 font-display text-2xl text-[#1f1816]">{val.title}</h3>
                <p className="mt-3 text-[#665854]">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section background="stone">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl text-[#1e1715] md:text-5xl">{about.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#665854]">{brand.description}</p>
          <a
            href={`https://wa.me/${brand.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            {about.ctaButton}
          </a>
        </div>
      </Section>
    </div>
  );
}
