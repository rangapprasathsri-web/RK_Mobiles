import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";
import { rkStore, OfferItem, saveStoreToDisk } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");

    try {
      const where: Record<string, unknown> = {};
      if (all !== "true") {
        where.isActive = true;
      }
      const offers = await prisma.offer.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      if (offers && offers.length > 0) {
        return NextResponse.json(
          { success: true, offers },
          {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          }
        );
      }
    } catch {
      // Fall through to real in-memory store
    }

    let result = [...rkStore.offers];
    if (all !== "true") {
      result = result.filter((o) => o.isActive !== false);
    }

    return NextResponse.json(
      { success: true, offers: result },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
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
    saveStoreToDisk();

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
    const { id, isActive, title, description, discountText } = body;

    const offer = rkStore.offers.find((o) => o.id === id);
    if (offer) {
      if (title) offer.title = title;
      if (description) offer.description = description;
      if (discountText) offer.discountText = discountText;
      if (isActive !== undefined) offer.isActive = Boolean(isActive);
    }
    saveStoreToDisk();

    return NextResponse.json({ success: true, offer });
  } catch (error) {
    console.error("Offers PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update offer" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getOwnerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Offer ID required" }, { status: 400 });
    }

    const index = rkStore.offers.findIndex((o) => o.id === id);
    if (index !== -1) {
      rkStore.offers.splice(index, 1);
    }
    saveStoreToDisk();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Offers DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete offer" },
      { status: 500 }
    );
  }
}
