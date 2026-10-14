import prisma from "@/lib/prisma";
import {
  rkStore,
  ProductItem,
  OfferItem,
  AccessoryItem,
  StoreSettings,
  ServiceItem,
} from "@/lib/store";

export async function getLiveProducts(): Promise<ProductItem[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: { brand: true, category: true },
      orderBy: { createdAt: "desc" },
    });
    if (products && products.length > 0) {
      return products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand?.name || "Generic",
        model: p.model || p.name,
        ram: p.ram || "8GB",
        storage: p.storage || "128GB",
        price: Number(p.price),
        originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
        stock: Number(p.stock) || 0,
        availability: (p.availability as ProductItem["availability"]) || "in_stock",
        isFeatured: Boolean(p.isFeatured),
        isActive: p.isActive,
      }));
    }
  } catch {
    // Fall through to live in-memory store
  }
  return rkStore.products.filter((p) => p.isActive);
}

export async function getLiveProductBySlug(slug: string): Promise<ProductItem | null> {
  try {
    const product = await prisma.product.findFirst({
      where: { slug, isActive: true },
      include: { brand: true, category: true },
    });
    if (product) {
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        brand: product.brand?.name || "Generic",
        model: product.model || product.name,
        ram: product.ram || "8GB",
        storage: product.storage || "128GB",
        price: Number(product.price),
        originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
        stock: Number(product.stock) || 0,
        availability: (product.availability as ProductItem["availability"]) || "in_stock",
        isFeatured: Boolean(product.isFeatured),
        isActive: product.isActive,
      };
    }
  } catch {
    // Fall through to in-memory store
  }
  const found = rkStore.products.find((p) => p.slug === slug && p.isActive);
  return found || null;
}

export async function getLiveOffers(): Promise<OfferItem[]> {
  try {
    const offers = await prisma.offer.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    if (offers && offers.length > 0) {
      return offers.map((o) => ({
        id: o.id,
        title: o.title,
        description: o.description || "",
        discountText: o.discountText || "",
        productType: o.productType || "All",
        startDate: o.startDate ? o.startDate.toISOString().split("T")[0] : "",
        endDate: o.endDate ? o.endDate.toISOString().split("T")[0] : "",
        isActive: o.isActive,
      }));
    }
  } catch {
    // Fall through to in-memory store
  }
  return rkStore.offers.filter((o) => o.isActive);
}

export async function getLiveAccessories(): Promise<AccessoryItem[]> {
  try {
    const items = await prisma.accessory.findMany({
      where: { isActive: true },
      include: { category: true },
    });
    if (items && items.length > 0) {
      return items.map((a) => ({
        id: a.id,
        name: a.name,
        category: a.category?.name || "Accessories",
        brand: a.brand || undefined,
        price: Number(a.price),
        stock: Number(a.stock) || 0,
        isActive: a.isActive,
      }));
    }
  } catch {
    // Fall through
  }
  return rkStore.accessories.filter((a) => a.isActive);
}

export async function getLiveSettings(): Promise<StoreSettings> {
  try {
    const s = await prisma.businessSettings.findUnique({ where: { id: "default" } });
    if (s) {
      return {
        businessName: s.businessName,
        tagline: s.tagline || rkStore.settings.tagline,
        description: s.description || rkStore.settings.description,
        address: s.address || rkStore.settings.address,
        addressLine2: s.addressLine2 || rkStore.settings.addressLine2,
        city: s.city || rkStore.settings.city,
        phone1: s.phone1 || rkStore.settings.phone1,
        phone2: s.phone2 || rkStore.settings.phone2,
        whatsappNumber: s.whatsappNumber || rkStore.settings.whatsappNumber,
        mapLink: s.mapLink || rkStore.settings.mapLink,
      };
    }
  } catch {
    // Fall through
  }
  return rkStore.settings;
}

export async function getLiveServices(): Promise<ServiceItem[]> {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    if (services && services.length > 0) {
      return services.map((s) => ({
        id: s.id,
        name: s.name,
        shortDescription: s.shortDescription || "",
        isFeatured: Boolean(s.isFeatured),
        isActive: s.isActive,
        sortOrder: s.sortOrder,
      }));
    }
  } catch {
    // Fall through
  }
  return rkStore.services.filter((s) => s.isActive);
}
