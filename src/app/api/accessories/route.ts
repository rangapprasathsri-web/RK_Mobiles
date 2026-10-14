import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";
import { rkStore, AccessoryItem } from "@/lib/store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const category = searchParams.get("category");

    try {
      const where: Record<string, unknown> = { isActive: true };
      if (category && category !== "all") {
        where.category = { name: { equals: category, mode: "insensitive" } };
      }
      if (search) {
        where.name = { contains: search, mode: "insensitive" };
      }

      const accessories = await prisma.accessory.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });

      if (accessories && accessories.length > 0) {
        return NextResponse.json({ success: true, accessories });
      }
    } catch {
      // Fall through to real in-memory store
    }

    let result = [...rkStore.accessories];
    if (category && category !== "all") {
      result = result.filter((a) => a.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(search) ||
          a.category.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, accessories: result });
  } catch (error) {
    console.error("Accessories GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch accessories" },
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
    const { name, category, price, brand, stock } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const newAccessory: AccessoryItem = {
      id: `acc-${Date.now()}`,
      name,
      category: category || "Accessories",
      brand: brand || "Generic",
      price: Number(price),
      stock: Number(stock) || 10,
      isActive: true,
    };

    rkStore.accessories.unshift(newAccessory);

    return NextResponse.json({ success: true, accessory: newAccessory });
  } catch (error) {
    console.error("Accessories POST error:", error);
    return NextResponse.json(
      { error: "Failed to create accessory" },
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
    const { id, stock, price, isActive } = body;

    const accessory = rkStore.accessories.find((a) => a.id === id);
    if (accessory) {
      if (stock !== undefined) accessory.stock = Number(stock);
      if (price !== undefined) accessory.price = Number(price);
      if (isActive !== undefined) accessory.isActive = Boolean(isActive);
    }

    return NextResponse.json({ success: true, accessory });
  } catch (error) {
    console.error("Accessories PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update accessory" },
      { status: 500 }
    );
  }
}
