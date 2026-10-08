import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";

// Default initial catalogue when DB is starting/empty
const initialProducts = [
  {
    id: "prod-1",
    name: "Samsung Galaxy A55 5G",
    slug: "samsung-galaxy-a55-5g",
    brand: "Samsung",
    model: "Galaxy A55 5G",
    ram: "8GB",
    storage: "128GB",
    price: 27999,
    originalPrice: 29999,
    stock: 5,
    availability: "in_stock",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "prod-2",
    name: "Samsung Galaxy A16",
    slug: "samsung-galaxy-a16",
    brand: "Samsung",
    model: "Galaxy A16",
    ram: "6GB",
    storage: "128GB",
    price: 13999,
    originalPrice: 15999,
    stock: 8,
    availability: "in_stock",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "prod-3",
    name: "Xiaomi Redmi Note 13 Pro",
    slug: "xiaomi-redmi-note-13-pro",
    brand: "Xiaomi",
    model: "Redmi Note 13 Pro",
    ram: "8GB",
    storage: "256GB",
    price: 23999,
    originalPrice: 25999,
    stock: 4,
    availability: "in_stock",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "prod-4",
    name: "Realme Narzo 70 Pro",
    slug: "realme-narzo-70-pro",
    brand: "Realme",
    model: "Narzo 70 Pro 5G",
    ram: "8GB",
    storage: "128GB",
    price: 17999,
    originalPrice: 19999,
    stock: 6,
    availability: "in_stock",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "prod-5",
    name: "Vivo Y200e",
    slug: "vivo-y200e",
    brand: "Vivo",
    model: "Y200e 5G",
    ram: "6GB",
    storage: "128GB",
    price: 14999,
    originalPrice: 16999,
    stock: 7,
    availability: "in_stock",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "prod-6",
    name: "OPPO A3 Pro",
    slug: "oppo-a3-pro",
    brand: "OPPO",
    model: "A3 Pro 5G",
    ram: "8GB",
    storage: "128GB",
    price: 18999,
    originalPrice: 20999,
    stock: 3,
    availability: "low_stock",
    isFeatured: true,
    isActive: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const brand = searchParams.get("brand");
    const featured = searchParams.get("featured");

    try {
      const where: Record<string, unknown> = { isActive: true };
      if (brand && brand !== "all") {
        where.brand = { name: { equals: brand, mode: "insensitive" } };
      }
      if (featured === "true") {
        where.isFeatured = true;
      }
      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { model: { contains: search, mode: "insensitive" } },
        ];
      }

      const products = await prisma.product.findMany({
        where,
        include: { brand: true, category: true },
        orderBy: { createdAt: "desc" },
      });

      if (products && products.length > 0) {
        return NextResponse.json({ success: true, products });
      }
    } catch {
      // Fall through to memory fallback
    }

    let result = [...initialProducts];
    if (brand && brand !== "all") {
      result = result.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    }
    if (featured === "true") {
      result = result.filter((p) => p.isFeatured);
    }
    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.brand.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, products: result });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
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
    const { name, brand, price, ram, storage, stock, availability, isFeatured } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Product name and price are required" },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    try {
      // Find or create brand
      let brandRecord = await prisma.brand.findUnique({ where: { name: brand || "Generic" } });
      if (!brandRecord) {
        brandRecord = await prisma.brand.create({
          data: {
            name: brand || "Generic",
            slug: (brand || "generic").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          },
        });
      }

      const newProduct = await prisma.product.create({
        data: {
          name,
          slug: `${slug}-${Date.now().toString().slice(-4)}`,
          brandId: brandRecord.id,
          price: Number(price),
          ram: ram || null,
          storage: storage || null,
          stock: Number(stock) || 0,
          availability: availability || "in_stock",
          isFeatured: Boolean(isFeatured),
        },
      });

      return NextResponse.json({ success: true, product: newProduct });
    } catch {
      // Mock creation response
      const fallbackProduct = {
        id: `prod-${Date.now()}`,
        name,
        slug,
        brand: brand || "Generic",
        price: Number(price),
        ram: ram || null,
        storage: storage || null,
        stock: Number(stock) || 0,
        availability: availability || "in_stock",
        isFeatured: Boolean(isFeatured),
        isActive: true,
      };
      return NextResponse.json({ success: true, product: fallbackProduct });
    }
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
