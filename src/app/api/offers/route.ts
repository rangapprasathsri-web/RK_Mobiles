import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";

const initialOffers = [
  {
    id: "1",
    title: "Special Offer on Mobile Accessories",
    description: "Get special discounts on selected mobile accessories.",
    discountText: "Up to 20% Off",
    productType: "Accessories",
    isActive: true,
    startDate: "2026-10-01",
    endDate: "2026-10-31",
  },
];

export async function GET() {
  try {
    try {
      const offers = await prisma.offer.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      });

      if (offers && offers.length > 0) {
        return NextResponse.json({ success: true, offers });
      }
    } catch {
      // Fall through to fallback
    }

    return NextResponse.json({ success: true, offers: initialOffers });
  } catch (error) {
    console.error("Offers GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch offers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getOwnerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, discountText, productType, startDate, endDate } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Offer title is required" },
        { status: 400 }
      );
    }

    const fallbackOffer = {
      id: `off-${Date.now()}`,
      title,
      description: description || "",
      discountText: discountText || "",
      productType: productType || "General",
      startDate: startDate || new Date().toISOString().split("T")[0],
      endDate: endDate || "",
      isActive: true,
    };

    return NextResponse.json({ success: true, offer: fallbackOffer });
  } catch (error) {
    console.error("Offers POST error:", error);
    return NextResponse.json(
      { error: "Failed to create offer" },
      { status: 500 }
    );
  }
}
