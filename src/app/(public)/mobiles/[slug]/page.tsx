import Link from "next/link";
import {
  Smartphone,
  MessageCircle,
  Phone,
  MapPin,
  ArrowLeft,
  Check,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Phone Details",
  description:
    "View mobile phone details, specifications and pricing at RK MOBILES, Dharapuram.",
};

import { notFound } from "next/navigation";
import { getLiveProductBySlug } from "@/lib/data";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function MobileDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const livePhone = await getLiveProductBySlug(slug);

  if (!livePhone) {
    notFound();
  }

  const phone = {
    slug: livePhone.slug,
    brand: livePhone.brand,
    model: livePhone.model || livePhone.name,
    variant: "Official India Variant",
    ram: livePhone.ram || "8GB",
    storage: livePhone.storage || "128GB",
    color: "Standard Colors Available",
    network: "4G / 5G",
    price: livePhone.price,
    originalPrice: livePhone.originalPrice || Math.round(livePhone.price * 1.1),
    availability:
      livePhone.availability === "in_stock"
        ? "Available"
        : livePhone.availability === "low_stock"
        ? "Low Stock"
        : "Out of Stock",
    description: `${livePhone.brand} ${livePhone.model || livePhone.name} (${livePhone.ram || "8GB"} RAM, ${livePhone.storage || "128GB"} Storage). Available at RK MOBILES shop in Dharapuram with genuine manufacturer warranty and dedicated local service support.`,
    specifications: {
      Brand: livePhone.brand,
      Model: livePhone.model || livePhone.name,
      RAM: livePhone.ram || "8GB",
      Storage: livePhone.storage || "128GB",
      Availability:
        livePhone.availability === "in_stock"
          ? "In Stock at Dharapuram"
          : livePhone.availability === "low_stock"
          ? "Limited Stock"
          : "Enquire for Stock",
      Network: "4G / 5G VoLTE",
      "Store Location": "RK MOBILES, Pollachi Road, Dharapuram",
      "Warranty / Support": "Brand Warranty + Shop Support",
    },
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-rk-purple">
              Home
            </Link>
            <span>/</span>
            <Link href="/mobiles" className="hover:text-rk-purple">
              Mobiles
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {phone.brand} {phone.model}
            </span>
          </div>
        </div>
      </div>

      <section className="py-8 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center relative">
                <Smartphone className="h-40 w-40 text-gray-300" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-rk-green text-white border-0">
                    {phone.availability}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-white text-rk-purple border-rk-purple/20"
                  >
                    {phone.network}
                  </Badge>
                </div>
              </div>
              {/* Thumbnail placeholders */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-rk-purple/30 transition-all"
                  >
                    <Smartphone className="h-8 w-8 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <p className="text-sm text-rk-purple font-semibold uppercase tracking-wider mb-2">
                {phone.brand}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {phone.model}
              </h1>
              <p className="text-muted-foreground mb-4">
                {phone.ram} RAM • {phone.storage} • {phone.color}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-rk-purple">
                  {formatPrice(phone.price)}
                </span>
                {phone.originalPrice > phone.price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(phone.originalPrice)}
                    </span>
                    <Badge className="bg-rk-red text-white border-0">
                      {Math.round(
                        ((phone.originalPrice - phone.price) /
                          phone.originalPrice) *
                          100
                      )}
                      % OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 text-rk-green font-medium mb-6">
                <Check className="h-5 w-5" />
                <span>{phone.availability} at RK MOBILES</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {phone.description}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href={`https://wa.me/919865013529?text=${encodeURIComponent(`Hi, I am interested in ${phone.brand} ${phone.model} (${phone.ram}/${phone.storage}). Is it available at RK MOBILES?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    size="lg"
                    className="w-full bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white gap-2 font-semibold"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Enquire on WhatsApp
                  </Button>
                </a>
                <a href="tel:+919865013529" className="flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-rk-purple/30 text-rk-purple gap-2 font-semibold"
                  >
                    <Phone className="h-5 w-5" />
                    Call RK MOBILES
                  </Button>
                </a>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=RK+MOBILES+Dharapuram+Pollachi+Road"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="gap-2 text-muted-foreground hover:text-rk-purple"
                >
                  <MapPin className="h-4 w-4" />
                  Visit Store — Pollachi Road, Dharapuram
                </Button>
              </a>

              {/* Note */}
              <div className="mt-6 bg-rk-purple-50 border border-rk-purple-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-rk-purple mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Availability and pricing may be confirmed by contacting RK
                    MOBILES. Visit the shop for the latest stock and offers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-12 lg:mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Key Specifications
            </h2>
            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                <div>
                  {Object.entries(phone.specifications)
                    .slice(0, 5)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between px-6 py-4 border-b border-gray-200 last:border-b-0"
                      >
                        <span className="text-sm text-muted-foreground">
                          {key}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {value}
                        </span>
                      </div>
                    ))}
                </div>
                <div>
                  {Object.entries(phone.specifications)
                    .slice(5)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between px-6 py-4 border-b border-gray-200 last:border-b-0"
                      >
                        <span className="text-sm text-muted-foreground">
                          {key}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
