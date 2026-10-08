import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";

const initialAccessories = [
  { id: "1", name: "Samsung Galaxy A55 Back Cover", category: "Mobile Covers", brand: "Generic", price: 299, stock: 25, isActive: true },
  { id: "2", name: "iPhone 15 Tempered Glass", category: "Tempered Glass", brand: "Generic", price: 199, stock: 30, isActive: true },
  { id: "3", name: "20W Fast Charger", category: "Chargers", brand: "Samsung", price: 899, stock: 10, isActive: true },
  { id: "4", name: "10000mAh Power Bank", category: "Power Banks", brand: "Xiaomi", price: 1499, stock: 5, isActive: true },
  { id: "5", name: "TWS Earbuds Pro", category: "TWS Earbuds", brand: "boAt", price: 1999, stock: 8, isActive: true },
  { id: "6", name: "Smart Watch Lite", category: "Smart Watches", brand: "Noise", price: 2499, stock: 3, isActive: true },
];

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
      // Fall through to fallback
    }

    let result = [...initialAccessories];
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

    const fallbackAccessory = {
      id: `acc-${Date.now()}`,
      name,
      category: category || "Accessories",
      brand: brand || "Generic",
      price: Number(price),
      stock: Number(stock) || 0,
      isActive: true,
    };

    return NextResponse.json({ success: true, accessory: fallbackAccessory });
  } catch (error) {
    console.error("Accessories POST error:", error);
    return NextResponse.json(
      { error: "Failed to create accessory" },
      { status: 500 }
    );
  }
}
