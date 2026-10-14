"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Smartphone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductItem } from "@/lib/store";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

interface HomeFeaturedMobilesProps {
  initialPhones: ProductItem[];
  whatsappNumber: string;
}

export function HomeFeaturedMobiles({
  initialPhones,
  whatsappNumber,
}: HomeFeaturedMobilesProps) {
  const [phones, setPhones] = useState<ProductItem[]>(initialPhones);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.products)) {
          // Strictly only active phones
          const activeOnly = data.products.filter((p: ProductItem) => p.isActive !== false);
          setPhones(activeOnly);
        }
      })
      .catch((err) => console.error("Error fetching live phones:", err));
  }, []);

  const featured = phones.filter((p) => p.isFeatured && p.isActive !== false);
  const displayPhones = (featured.length > 0 ? featured : phones.filter((p) => p.isActive !== false)).slice(0, 6);

  if (displayPhones.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayPhones.map((phone) => (
        <div
          key={phone.id || phone.slug}
          className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-rk-purple-100 transition-all duration-300 flex flex-col justify-between"
        >
          {/* Card Header / Image */}
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
            <Smartphone className="h-24 w-24 text-gray-300 group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute top-3 left-3">
              <Badge
                className={`text-white border-0 ${
                  phone.availability === "in_stock"
                    ? "bg-rk-green"
                    : phone.availability === "low_stock"
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
              >
                {phone.availability === "in_stock"
                  ? "Available"
                  : phone.availability === "low_stock"
                  ? "Low Stock"
                  : "Out of Stock"}
              </Badge>
            </div>
          </div>

          {/* Details */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-xs text-rk-purple font-semibold uppercase tracking-wider mb-1">
                {phone.brand}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-rk-purple transition-colors">
                {phone.model || phone.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {phone.ram} RAM • {phone.storage}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-rk-purple">
                  {formatPrice(phone.price)}
                </span>
                {phone.originalPrice && phone.originalPrice > phone.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(phone.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Link href={`/mobiles/${phone.slug}`} className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-rk-purple/30 text-rk-purple hover:bg-rk-purple hover:text-white transition-all"
                  >
                    View Details
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hi RK MOBILES, I am interested in ${phone.brand} ${phone.model || phone.name}. Is it available at your shop?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    className="bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
