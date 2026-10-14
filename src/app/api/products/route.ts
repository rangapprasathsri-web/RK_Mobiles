import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";
import { rkStore, ProductItem, saveStoreToDisk } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const brand = searchParams.get("brand");
    const featured = searchParams.get("featured");
    const all = searchParams.get("all");

    try {
      const where: Record<string, unknown> = {};
      if (all !== "true") {
        where.isActive = true;
      }
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
        return NextResponse.json(
          { success: true, products },
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

    let result = [...rkStore.products];
    if (all !== "true") {
      result = result.filter((p) => p.isActive !== false);
    }
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

    return NextResponse.json(
      { success: true, products: result },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
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

    const newProductItem: ProductItem = {
      id: `prod-${Date.now()}`,
      name,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      brand: brand || "Generic",
      price: Number(price),
      ram: ram || "8GB",
      storage: storage || "128GB",
      stock: Number(stock) || 5,
      availability: (availability as ProductItem["availability"]) || "in_stock",
      isFeatured: Boolean(isFeatured),
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    // Store in global memory store so website updates immediately
    rkStore.products.unshift(newProductItem);
    saveStoreToDisk();

    try {
      // Try database sync as well
      let brandRecord = await prisma.brand.findUnique({ where: { name: brand || "Generic" } });
      if (!brandRecord) {
        brandRecord = await prisma.brand.create({
          data: {
            name: brand || "Generic",
            slug: (brand || "generic").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          },
        });
      }

      await prisma.product.create({
        data: {
          name,
          slug: newProductItem.slug,
          brandId: brandRecord.id,
          price: Number(price),
          ram: ram || null,
          storage: storage || null,
          stock: Number(stock) || 0,
          availability: availability || "in_stock",
          isFeatured: Boolean(isFeatured),
        },
      });
    } catch {
      // Memory store already updated
    }

    return NextResponse.json({ success: true, product: newProductItem });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
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
    const { id, name, brand, ram, storage, stock, price, availability, isActive, isFeatured } = body;

    const product = rkStore.products.find((p) => p.id === id);
    if (product) {
      if (name) product.name = name;
      if (brand) product.brand = brand;
      if (ram !== undefined) product.ram = ram;
      if (storage !== undefined) product.storage = storage;
      if (stock !== undefined) product.stock = Number(stock);
      if (price !== undefined) product.price = Number(price);
      if (availability !== undefined) product.availability = availability;
      if (isActive !== undefined) product.isActive = Boolean(isActive);
      if (isFeatured !== undefined) product.isFeatured = Boolean(isFeatured);
    }
    saveStoreToDisk();

    try {
      let brandId: string | undefined = undefined;
      if (brand) {
        let brandRecord = await prisma.brand.findUnique({ where: { name: brand } });
        if (!brandRecord) {
          brandRecord = await prisma.brand.create({
            data: {
              name: brand,
              slug: brand.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            },
          });
        }
        brandId = brandRecord.id;
      }

      await prisma.product.update({
        where: { id },
        data: {
          ...(name ? { name } : {}),
          ...(brandId ? { brandId } : {}),
          ...(ram !== undefined ? { ram } : {}),
          ...(storage !== undefined ? { storage } : {}),
          ...(stock !== undefined ? { stock: Number(stock) } : {}),
          ...(price !== undefined ? { price: Number(price) } : {}),
          ...(availability !== undefined ? { availability } : {}),
          ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
          ...(isFeatured !== undefined ? { isFeatured: Boolean(isFeatured) } : {}),
        },
      });
    } catch {
      // Memory store already updated
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Products PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
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
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const index = rkStore.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      rkStore.products.splice(index, 1);
    }
    saveStoreToDisk();

    try {
      await prisma.product.delete({ where: { id } });
    } catch {
      // Memory store already updated
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Products DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
