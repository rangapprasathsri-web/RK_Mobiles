import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact RK MOBILES at Pollachi Road, Dharapuram. Call, WhatsApp or visit our shop for mobile phones, repairs and accessories.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-rk-purple-dark to-rk-purple py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Contact Us
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Get in touch with RK MOBILES. Call, WhatsApp, or visit our shop at
            Pollachi Road, Dharapuram.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone 1 */}
              <a href="tel:+919865013529" className="block group">
                <div className="bg-rk-purple-50/50 border border-rk-purple-100/50 rounded-xl p-6 hover:shadow-md hover:border-rk-purple-100 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-rk-purple/10 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-rk-purple" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Phone Number 1
                  </p>
                  <p className="text-lg font-semibold text-gray-900 group-hover:text-rk-purple transition-colors">
                    +91 98650 13529
                  </p>
                </div>
              </a>

              {/* Phone 2 */}
              <a href="tel:+918329166021" className="block group">
                <div className="bg-rk-purple-50/50 border border-rk-purple-100/50 rounded-xl p-6 hover:shadow-md hover:border-rk-purple-100 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-rk-purple/10 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-rk-purple" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Phone Number 2
                  </p>
                  <p className="text-lg font-semibold text-gray-900 group-hover:text-rk-purple transition-colors">
                    +91 83291 66021
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20contact%20RK%20MOBILES."
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-green-50/50 border border-green-100/50 rounded-xl p-6 hover:shadow-md hover:border-green-200 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-rk-whatsapp/10 rounded-lg flex items-center justify-center mb-4">
                    <MessageCircle className="h-6 w-6 text-rk-whatsapp" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    WhatsApp
                  </p>
                  <p className="text-lg font-semibold text-gray-900 group-hover:text-rk-whatsapp transition-colors">
                    Chat with us
                  </p>
                </div>
              </a>

              {/* Location */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=RK+MOBILES+Dharapuram+Pollachi+Road"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-orange-50/50 border border-orange-100/50 rounded-xl p-6 hover:shadow-md hover:border-orange-200 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-rk-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-rk-orange" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Get Directions
                  </p>
                  <p className="text-lg font-semibold text-gray-900 group-hover:text-rk-orange transition-colors">
                    Open in Maps
                  </p>
                </div>
              </a>
            </div>

            {/* Address Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Shop Address
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-rk-purple mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">RK MOBILES</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      C.S.I. Boys School Complex
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Pollachi Road
                    </p>
                    <p className="text-muted-foreground text-sm">Dharapuram</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="h-4 w-4 text-rk-purple shrink-0" />
                    <a
                      href="tel:+919865013529"
                      className="text-sm text-gray-700 hover:text-rk-purple"
                    >
                      +91 98650 13529
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-rk-purple shrink-0" />
                    <a
                      href="tel:+918329166021"
                      className="text-sm text-gray-700 hover:text-rk-purple"
                    >
                      +91 83291 66021
                    </a>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <a href="tel:+919865013529" className="block">
                    <Button className="w-full gap-2 bg-rk-purple hover:bg-rk-purple-dark">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20contact%20RK%20MOBILES."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2 bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </Button>
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=RK+MOBILES+Dharapuram+Pollachi+Road"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-rk-purple/30 text-rk-purple"
                    >
                      <Navigation className="h-4 w-4" />
                      Get Directions
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="py-12 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Send className="h-10 w-10 text-rk-purple mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Need a Service? Request a Visit
          </h2>
          <p className="text-muted-foreground mb-6">
            Submit a visit request and we will contact you using the mobile
            number provided.
          </p>
          <Link href="/services/enquiry">
            <Button className="gap-2 bg-rk-purple hover:bg-rk-purple-dark font-semibold">
              <Send className="h-4 w-4" />
              Request a Visit
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
