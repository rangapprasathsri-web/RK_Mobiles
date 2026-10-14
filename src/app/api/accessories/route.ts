import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";
import { rkStore, AccessoryItem, saveStoreToDisk } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const category = searchParams.get("category");
    const all = searchParams.get("all");

    try {
      const where: Record<string, unknown> = {};
      if (all !== "true") {
        where.isActive = true;
      }
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
        return NextResponse.json(
          { success: true, accessories },
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

    let result = [...rkStore.accessories];
    if (all !== "true") {
      result = result.filter((a) => a.isActive !== false);
    }
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

    return NextResponse.json(
      { success: true, accessories: result },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
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
    saveStoreToDisk();

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
    const { id, stock, price, isActive, name, category } = body;

    const accessory = rkStore.accessories.find((a) => a.id === id);
    if (accessory) {
      if (name) accessory.name = name;
      if (category) accessory.category = category;
      if (stock !== undefined) accessory.stock = Number(stock);
      if (price !== undefined) accessory.price = Number(price);
      if (isActive !== undefined) accessory.isActive = Boolean(isActive);
    }
    saveStoreToDisk();

    return NextResponse.json({ success: true, accessory });
  } catch (error) {
    console.error("Accessories PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update accessory" },
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
      return NextResponse.json({ error: "Accessory ID required" }, { status: 400 });
    }

    const index = rkStore.accessories.findIndex((a) => a.id === id);
    if (index !== -1) {
      rkStore.accessories.splice(index, 1);
    }
    saveStoreToDisk();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Accessories DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete accessory" },
      { status: 500 }
    );
  }
}
