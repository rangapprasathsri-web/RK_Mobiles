import Link from "next/link";
import {
  Tag,
  MessageCircle,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offers",
  description:
    "Check out the latest offers and deals at RK MOBILES, Dharapuram. Special discounts on mobiles, accessories and services.",
};

// Sample offers - in production from database
const offers = [
  {
    slug: "accessory-special",
    title: "Special Offer on Mobile Accessories",
    description:
      "Get special discounts on selected mobile accessories. Visit RK MOBILES to avail the offer.",
    discountText: "Up to 20% Off on Accessories",
    type: "Accessories",
    isActive: true,
  },
];

export default function OffersPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-rk-purple-dark to-rk-purple py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-6 w-6 text-yellow-300" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Latest Offers
              </h1>
            </div>
            <p className="text-white/80 text-lg">
              Check out our latest offers and deals. Visit RK MOBILES to avail
              these offers.
            </p>
          </div>
        </div>
      </section>

      {/* Offers List */}
      <section className="py-10 lg:py-16 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {offers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer.slug}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Banner placeholder */}
                  <div className="h-48 bg-gradient-to-br from-rk-purple via-rk-purple-light to-rk-green flex items-center justify-center relative">
                    <div className="text-center text-white">
                      <Tag className="h-10 w-10 mx-auto mb-2" />
                      <p className="text-xl font-bold">
                        {offer.discountText}
                      </p>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-rk-red text-white border-0">
                        Active
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <Badge
                      variant="outline"
                      className="mb-3 text-rk-purple border-rk-purple/20"
                    >
                      {offer.type}
                    </Badge>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {offer.description}
                    </p>
                    <div className="flex gap-2">
                      <a
                        href={`https://wa.me/919865013529?text=${encodeURIComponent(`Hi, I am interested in the offer: ${offer.title}. Is it still available?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button className="w-full gap-2 bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white">
                          <MessageCircle className="h-4 w-4" />
                          Enquire Now
                        </Button>
                      </a>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=RK+MOBILES+Dharapuram+Pollachi+Road"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="gap-2 border-rk-purple/30 text-rk-purple"
                        >
                          <MapPin className="h-4 w-4" />
                          Visit Store
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Tag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Active Offers
              </h3>
              <p className="text-muted-foreground mb-6">
                Check back soon for new offers and deals from RK MOBILES.
              </p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="gap-2 border-rk-purple/30 text-rk-purple"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Want to know about upcoming offers?
          </h2>
          <p className="text-muted-foreground mb-6">
            Contact RK MOBILES to know about the latest deals and offers.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+919865013529">
              <Button className="gap-2 bg-rk-purple hover:bg-rk-purple-dark">
                <Phone className="h-4 w-4" />
                Call RK MOBILES
              </Button>
            </a>
            <a
              href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20know%20about%20the%20latest%20offers%20at%20RK%20MOBILES."
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
