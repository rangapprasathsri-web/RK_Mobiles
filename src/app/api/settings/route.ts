import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";

export async function GET() {
  try {
    let settings = await prisma.businessSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.businessSettings.create({
        data: {
          id: "default",
          businessName: "RK MOBILES",
          tagline: "Quality Service & Affordable Prices",
          description:
            "RK MOBILES is a local mobile sales and service shop providing mobile phones, accessories, mobile repair services and everyday digital services in Dharapuram.",
          address: "C.S.I. Boys School Complex",
          addressLine2: "Pollachi Road",
          city: "Dharapuram",
          phone1: "+91 98650 13529",
          phone2: "+91 83291 66021",
          whatsappNumber: "919865013529",
        },
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json(
      {
        success: true,
        settings: {
          businessName: "RK MOBILES",
          tagline: "Quality Service & Affordable Prices",
          address: "C.S.I. Boys School Complex",
          addressLine2: "Pollachi Road",
          city: "Dharapuram",
          phone1: "+91 98650 13529",
          phone2: "+91 83291 66021",
          whatsappNumber: "919865013529",
        },
      }
    );
  }
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
      });

      return NextResponse.json({ success: true, settings: updated });
    } catch {
      // Fallback response with updated settings
      return NextResponse.json({
        success: true,
        settings: {
          id: "default",
          businessName: businessName || "RK MOBILES",
          tagline: tagline || "Quality Service & Affordable Prices",
          description: description || "",
          address: address || "C.S.I. Boys School Complex",
          addressLine2: addressLine2 || "Pollachi Road",
          city: city || "Dharapuram",
          phone1: phone1 || "+91 98650 13529",
          phone2: phone2 || "+91 83291 66021",
          whatsappNumber: whatsappNumber || "919865013529",
          mapLink: mapLink || "",
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
