import Link from "next/link";
import {
  Smartphone,
  Wrench,
  ShoppingBag,
  Shield,
  BadgeCheck,
  IndianRupee,
  Phone,
  MessageCircle,
  MapPin,
  ArrowRight,
  CreditCard,
  Send,
  Printer,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About RK MOBILES - A local mobile sales and service shop at Pollachi Road, Dharapuram providing mobile phones, accessories, repair services and digital services.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-rk-purple-dark to-rk-purple py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            About RK MOBILES
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Your local destination for mobile phones, professional mobile repair
            services, accessories and everyday digital services.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Who We Are
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              RK MOBILES is a local mobile sales and service shop providing
              mobile phones, accessories, mobile repair services and everyday
              digital services. Located at C.S.I. Boys School Complex, Pollachi
              Road, Dharapuram — we are committed to providing quality service at
              affordable prices.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We stock mobile phones from leading brands and provide professional
              repair services for all types of mobile issues. Our shop also
              offers a range of mobile accessories and everyday digital services
              including mobile recharge, money transfer, xerox and printing, and
              stationery.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 lg:py-16 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-rk-purple-50 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-rk-purple" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mobile Phones
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mobile phones from top brands including Samsung, Xiaomi, Realme,
                Vivo, OPPO, and more at competitive prices.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-rk-purple-50 rounded-xl flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-rk-purple" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mobile Repair
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional mobile repair services including display
                replacement, battery replacement, charging repair, software
                service and more.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-rk-purple-50 rounded-xl flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-rk-purple" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Accessories
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wide range of mobile accessories including covers, tempered
                glass, chargers, power banks, earphones, smart watches and more.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-rk-purple-50 rounded-xl flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-rk-purple" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Digital Services
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Everyday digital services including mobile recharge, money
                transfer, xerox and printing, and stationery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-rk-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BadgeCheck className="h-7 w-7 text-rk-purple" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quality Service
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We are committed to providing quality repair services and genuine
                products to our customers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-rk-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <IndianRupee className="h-7 w-7 text-rk-purple" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Affordable Prices
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Competitive pricing on all products and services to ensure value
                for our customers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-rk-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-rk-purple" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Customer Trust
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building lasting relationships with our customers through
                reliable service and honest business practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-rk-purple-dark to-rk-purple">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin className="h-10 w-10 text-rk-green-light mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Visit Us Today</h2>
          <p className="text-white/80 mb-2">RK MOBILES</p>
          <p className="text-white/70 mb-1">C.S.I. Boys School Complex</p>
          <p className="text-white/70 mb-1">Pollachi Road, Dharapuram</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <a href="tel:+919865013529">
              <Button className="bg-white text-rk-purple-dark hover:bg-white/90 gap-2 font-semibold">
                <Phone className="h-4 w-4" />
                Call Now
              </Button>
            </a>
            <a
              href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20contact%20RK%20MOBILES."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white gap-2 font-semibold">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=RK+MOBILES+Dharapuram+Pollachi+Road"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 gap-2 bg-white/5"
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
