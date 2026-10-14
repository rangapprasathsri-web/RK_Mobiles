import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { getLiveProducts } from "@/lib/data";
import { MobilesCatalogue } from "@/components/mobiles-catalogue";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Mobile Phones",
  description:
    "Explore mobile phones available at RK MOBILES, Dharapuram. Samsung, Xiaomi, Realme, Vivo, OPPO and more brands at affordable prices.",
};

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

      {/* Live Interactive Catalogue with Real-time sync & brand filter */}
      <MobilesCatalogue initialPhones={phones} />

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
