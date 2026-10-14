import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";
import { rkStore } from "@/lib/store";

export async function GET() {
  try {
    let settings = await prisma.businessSettings.findUnique({
      where: { id: "default" },
    });

    if (settings) {
      return NextResponse.json({ success: true, settings });
    }
  } catch {
    // Fall through to real in-memory store
  }

  return NextResponse.json({
    success: true,
    settings: rkStore.settings,
  });
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getOwnerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      businessName,
      tagline,
      description,
      address,
      addressLine2,
      city,
      phone1,
      phone2,
      whatsappNumber,
      mapLink,
    } = body;

    // Update in-memory store
    if (businessName) rkStore.settings.businessName = businessName;
    if (tagline) rkStore.settings.tagline = tagline;
    if (description !== undefined) rkStore.settings.description = description;
    if (address) rkStore.settings.address = address;
    if (addressLine2 !== undefined) rkStore.settings.addressLine2 = addressLine2;
    if (city) rkStore.settings.city = city;
    if (phone1) rkStore.settings.phone1 = phone1;
    if (phone2 !== undefined) rkStore.settings.phone2 = phone2;
    if (whatsappNumber) rkStore.settings.whatsappNumber = whatsappNumber;
    if (mapLink !== undefined) rkStore.settings.mapLink = mapLink;

    try {
      const updated = await prisma.businessSettings.upsert({
        where: { id: "default" },
        update: {
          businessName,
          tagline,
          description,
          address,
          addressLine2,
          city,
          phone1,
          phone2,
          whatsappNumber,
          mapLink,
        },
        create: {
          id: "default",
          businessName: businessName || rkStore.settings.businessName,
          tagline: tagline || rkStore.settings.tagline,
          description: description || rkStore.settings.description,
          address: address || rkStore.settings.address,
          addressLine2: addressLine2 || rkStore.settings.addressLine2,
          city: city || rkStore.settings.city,
          phone1: phone1 || rkStore.settings.phone1,
          phone2: phone2 || rkStore.settings.phone2,
          whatsappNumber: whatsappNumber || rkStore.settings.whatsappNumber,
          mapLink: mapLink || rkStore.settings.mapLink,
        },
      });

      return NextResponse.json({ success: true, settings: updated });
    } catch {
      return NextResponse.json({
        success: true,
        settings: {
          id: "default",
          ...rkStore.settings,
        },
      });
    }
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
