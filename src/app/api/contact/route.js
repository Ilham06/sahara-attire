import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET contact/brand information
export async function GET() {
  try {
    let contact = await prisma.contact.findUnique({
      where: { id: 1 },
    });

    // If contact doesn't exist, create default one
    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          id: 1,
          name: "Sahara Attire",
          tagline: "Elegansi abadi terinspirasi dari gurun pasir",
          description: "Sahara Attire adalah rumah mode modern yang merayakan desain minimalis dan keahlian premium.",
          email: "hello@saharaattire.com",
          phone: "+1 (555) 123-4567",
          whatsapp: "+15551234567",
          whatsappDisplay: "+1 (555) 123-4567",
        },
      });
    }

    // Transform to original structure
    const transformed = {
      name: contact.name,
      tagline: contact.tagline,
      description: contact.description,
      email: contact.email,
      phone: contact.phone,
      whatsapp: contact.whatsapp,
      whatsappDisplay: contact.whatsappDisplay,
      address: {
        street: contact.addressStreet,
        city: contact.addressCity,
        state: contact.addressState,
        zip: contact.addressZip,
        country: contact.addressCountry,
      },
      social: {
        instagram: contact.socialInstagram,
        tiktok: contact.socialTiktok,
        facebook: contact.socialFacebook,
        pinterest: contact.socialPinterest,
        twitter: contact.socialTwitter,
      },
      hours: {
        weekdays: contact.hoursWeekdays,
        saturday: contact.hoursSaturday,
        sunday: contact.hoursSunday,
      },
    };

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Get contact error:", error);
    return NextResponse.json({ error: "Failed to fetch contact information" }, { status: 500 });
  }
}

// PUT update contact/brand information
export async function PUT(request) {
  try {
    const body = await request.json();

    // Flatten the nested structure for database storage
    const data = {
      name: body.name,
      tagline: body.tagline,
      description: body.description,
      email: body.email,
      phone: body.phone,
      whatsapp: body.whatsapp,
      whatsappDisplay: body.whatsappDisplay,
      addressStreet: body.address?.street,
      addressCity: body.address?.city,
      addressState: body.address?.state,
      addressZip: body.address?.zip,
      addressCountry: body.address?.country,
      socialInstagram: body.social?.instagram,
      socialTiktok: body.social?.tiktok,
      socialFacebook: body.social?.facebook,
      socialPinterest: body.social?.pinterest,
      socialTwitter: body.social?.twitter,
      hoursWeekdays: body.hours?.weekdays,
      hoursSaturday: body.hours?.saturday,
      hoursSunday: body.hours?.sunday,
    };

    // Upsert (create if doesn't exist, update if exists)
    const contact = await prisma.contact.upsert({
      where: { id: 1 },
      update: data,
      create: {
        id: 1,
        ...data,
      },
    });

    // Transform back to original structure
    const transformed = {
      name: contact.name,
      tagline: contact.tagline,
      description: contact.description,
      email: contact.email,
      phone: contact.phone,
      whatsapp: contact.whatsapp,
      whatsappDisplay: contact.whatsappDisplay,
      address: {
        street: contact.addressStreet,
        city: contact.addressCity,
        state: contact.addressState,
        zip: contact.addressZip,
        country: contact.addressCountry,
      },
      social: {
        instagram: contact.socialInstagram,
        tiktok: contact.socialTiktok,
        facebook: contact.socialFacebook,
        pinterest: contact.socialPinterest,
        twitter: contact.socialTwitter,
      },
      hours: {
        weekdays: contact.hoursWeekdays,
        saturday: contact.hoursSaturday,
        sunday: contact.hoursSunday,
      },
    };

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Update contact error:", error);
    return NextResponse.json({ error: "Failed to update contact information" }, { status: 500 });
  }
}
