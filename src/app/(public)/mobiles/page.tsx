import Link from "next/link";
import {
  Smartphone,
  MessageCircle,
  Search,
  Filter,
  Phone,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Phones",
  description:
    "Explore mobile phones available at RK MOBILES, Dharapuram. Samsung, Xiaomi, Realme, Vivo, OPPO and more brands at affordable prices.",
};

import { getLiveProducts } from "@/lib/data";

const brands = [
  "All",
  "Samsung",
  "Xiaomi",
  "Realme",
  "OPPO",
  "Vivo",
  "OnePlus",
  "Apple",
  "Motorola",
  "Nokia",
  "POCO",
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function MobilesPage() {
  const phones = await getLiveProducts();
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-rk-purple-dark to-rk-purple py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Mobile Phones
            </h1>
            <p className="text-white/80 text-lg">
              Explore mobile phones from top brands available at RK MOBILES.
              Contact us or visit the shop to purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-16 md:top-[calc(4rem+2rem)] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Filter:
              </span>
            </div>
            {brands.map((brand) => (
              <button
                key={brand}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  brand === "All"
                    ? "bg-rk-purple text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-rk-purple-50 hover:text-rk-purple"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 lg:py-12 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {phones.length} mobile phones
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {phones.map((phone) => (
              <div
                key={phone.slug}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-rk-purple-100 transition-all duration-300"
              >
                {/* Image area */}
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                  <Smartphone className="h-24 w-24 text-gray-300" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-rk-green text-white border-0">
                      {phone.availability === "in_stock"
                        ? "Available"
                        : phone.availability === "low_stock"
                        ? "Low Stock"
                        : "Out of Stock"}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-rk-purple font-semibold uppercase tracking-wider mb-1">
                    {phone.brand}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-rk-purple transition-colors">
                    {phone.model || phone.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {phone.ram} RAM • {phone.storage}
                  </p>
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
                      href={`https://wa.me/919865013529?text=${encodeURIComponent(`Hi, I am interested in ${phone.brand} ${phone.model}. Is it available at RK MOBILES?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white gap-1.5"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Enquire</span>
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground bg-rk-purple-50 inline-block rounded-lg px-6 py-3">
              Availability and pricing may be confirmed by contacting RK
              MOBILES.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Looking for a specific phone?
          </h2>
          <p className="text-muted-foreground mb-6">
            Contact RK MOBILES to check availability and pricing of any mobile
            phone.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+919865013529">
              <Button className="gap-2 bg-rk-purple hover:bg-rk-purple-dark">
                <Phone className="h-4 w-4" />
                Call RK MOBILES
              </Button>
            </a>
            <a
              href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20a%20mobile%20phone%20at%20RK%20MOBILES."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2 bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
