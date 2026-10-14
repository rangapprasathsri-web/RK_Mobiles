import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";
import { rkStore, OfferItem } from "@/lib/store";

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
      // Fall through to real in-memory store
    }

    return NextResponse.json({ success: true, offers: rkStore.offers });
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

    const newOffer: OfferItem = {
      id: `off-${Date.now()}`,
      title,
      description: description || "",
      discountText: discountText || "",
      productType: productType || "General",
      startDate: startDate || new Date().toISOString().split("T")[0],
      endDate: endDate || "",
      isActive: true,
    };

    rkStore.offers.unshift(newOffer);

    return NextResponse.json({ success: true, offer: newOffer });
  } catch (error) {
    console.error("Offers POST error:", error);
    return NextResponse.json(
      { error: "Failed to create offer" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getOwnerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, isActive } = body;

    const offer = rkStore.offers.find((o) => o.id === id);
    if (offer && isActive !== undefined) {
      offer.isActive = Boolean(isActive);
    }

    return NextResponse.json({ success: true, offer });
  } catch (error) {
    console.error("Offers PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update offer" },
      { status: 500 }
    );
  }
}
