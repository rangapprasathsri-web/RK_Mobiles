import Link from "next/link";
import {
  Shield,
  Smartphone,
  Zap,
  Battery,
  Headphones,
  Clock,
  Cable,
  Speaker,
  Watch,
  Plug,
  MessageCircle,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Accessories",
  description:
    "Wide range of mobile accessories available at RK MOBILES, Dharapuram. Covers, chargers, earphones, power banks and more.",
};

const categories = [
  { name: "Mobile Covers", icon: Shield, count: "50+" },
  { name: "Tempered Glass", icon: Smartphone, count: "40+" },
  { name: "Camera Lens Protectors", icon: Smartphone, count: "20+" },
  { name: "Chargers", icon: Zap, count: "30+" },
  { name: "USB Cables", icon: Cable, count: "25+" },
  { name: "Lightning Cables", icon: Cable, count: "10+" },
  { name: "Adapters", icon: Plug, count: "15+" },
  { name: "Power Banks", icon: Battery, count: "15+" },
  { name: "Wired Earphones", icon: Headphones, count: "20+" },
  { name: "TWS Earbuds", icon: Headphones, count: "15+" },
  { name: "Bluetooth Speakers", icon: Speaker, count: "10+" },
  { name: "Headphones", icon: Headphones, count: "10+" },
  { name: "Smart Watches", icon: Watch, count: "10+" },
  { name: "Fitness Bands", icon: Clock, count: "8+" },
  { name: "Batteries", icon: Battery, count: "15+" },
  { name: "Other Accessories", icon: ShoppingBag, count: "20+" },
];

export default function AccessoriesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-rk-purple-dark to-rk-purple py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Mobile Accessories
            </h1>
            <p className="text-white/80 text-lg">
              Wide range of mobile accessories available at RK MOBILES. Visit
              the shop to purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-10 lg:py-16 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Accessory Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="group bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-rk-purple-100 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-rk-purple-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-rk-purple transition-colors duration-300">
                  <cat.icon className="h-5 w-5 text-rk-purple group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-rk-purple transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {cat.count} items
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="h-10 w-10 text-rk-purple mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Looking for a specific accessory?
          </h2>
          <p className="text-muted-foreground mb-6">
            Contact RK MOBILES to check availability and pricing. We stock
            accessories for all major mobile phone brands.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+919865013529">
              <Button className="gap-2 bg-rk-purple hover:bg-rk-purple-dark">
                <Phone className="h-4 w-4" />
                Call RK MOBILES
              </Button>
            </a>
            <a
              href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20mobile%20accessories%20at%20RK%20MOBILES."
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
