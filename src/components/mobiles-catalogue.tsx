"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Smartphone,
  MessageCircle,
  Search,
  SlidersHorizontal,
  X,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductItem } from "@/lib/store";

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

interface MobilesCatalogueProps {
  initialPhones: ProductItem[];
}

export function MobilesCatalogue({ initialPhones }: MobilesCatalogueProps) {
  const [phones, setPhones] = useState<ProductItem[]>(initialPhones);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Re-fetch client-side to ensure immediate real-time sync with owner actions
  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.products)) {
          setPhones(data.products);
        }
      })
      .catch((err) => console.error("Error fetching live products:", err));
  }, []);

  const filtered = phones.filter((phone) => {
    const matchesBrand =
      selectedBrand === "All" ||
      phone.brand.toLowerCase() === selectedBrand.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (phone.model && phone.model.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (phone.storage && phone.storage.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesBrand && matchesSearch;
  });

  return (
    <>
      {/* Sticky Filters & Search Bar */}
      <section className="sticky top-16 md:top-[calc(4rem+2rem)] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-3 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Brand Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
              <div className="flex items-center gap-1.5 shrink-0 pr-1">
                <SlidersHorizontal className="h-4 w-4 text-rk-purple" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Brand:
                </span>
              </div>
              {brands.map((brand) => {
                const isSelected = selectedBrand.toLowerCase() === brand.toLowerCase();
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrand(brand)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-rk-purple text-white shadow-sm shadow-rk-purple/30 scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-rk-purple-50 hover:text-rk-purple"
                    }`}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative shrink-0 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search phone or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rk-purple/20 focus:border-rk-purple transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 lg:py-12 bg-gray-50/30 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground font-medium">
              Showing <span className="text-gray-900 font-bold">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "mobile phone" : "mobile phones"}
              {selectedBrand !== "All" && ` in ${selectedBrand}`}
            </p>
            {(selectedBrand !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand("All");
                  setSearchQuery("");
                }}
                className="text-xs text-rk-purple font-medium hover:underline flex items-center gap-1"
              >
                Reset filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No mobile phones found</h3>
              <p className="text-sm text-gray-500 mb-6">
                We couldn&apos;t find any phones matching your current filters. Try selecting a different brand or search term.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedBrand("All");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((phone) => (
                <div
                  key={phone.id || phone.slug}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-rk-purple-100 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image area */}
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                    <Smartphone className="h-24 w-24 text-gray-300 group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3 flex gap-2">
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

                  {/* Content */}
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
                          href={`https://wa.me/919865013529?text=${encodeURIComponent(
                            `Hi RK MOBILES, I am interested in ${phone.brand} ${phone.model || phone.name}. Is it available at your shop?`
                          )}`}
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
                </div>
              ))}
            </div>
          )}

          {/* Note */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground bg-rk-purple-50 inline-block rounded-lg px-6 py-3">
              Availability and pricing may be confirmed by contacting RK MOBILES directly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
