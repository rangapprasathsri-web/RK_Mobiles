import Link from "next/link";
import Image from "next/image";
import {
  Smartphone,
  Shield,
  Award,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  ChevronRight,
  Wrench,
  ShoppingBag,
  ArrowRight,
  BadgeCheck,
  IndianRupee,
  Headphones,
  Zap,
  Battery,
  Monitor,
  Camera,
  Wifi,
  Settings,
  CreditCard,
  Printer,
  BookOpen,
  Send,
  Tag,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLiveProducts, getLiveOffers, getLiveSettings } from "@/lib/data";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "RK MOBILES - Mobile Sales & Service | Dharapuram",
  description:
    "RK MOBILES - Your local destination for mobile phones, professional mobile repair services, accessories and everyday digital services at Pollachi Road, Dharapuram.",
};

const whyChooseUs = [
  {
    icon: BadgeCheck,
    title: "Quality Service",
    description:
      "Professional mobile repair and service using quality parts for reliable results.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Prices",
    description:
      "Competitive pricing on mobile phones, accessories and repair services.",
  },
  {
    icon: Smartphone,
    title: "Wide Selection",
    description:
      "Mobile phones from top brands, accessories and essential digital services.",
  },
  {
    icon: Shield,
    title: "Trusted Shop",
    description:
      "A reliable local mobile shop committed to customer satisfaction.",
  },
];

const featuredServices = [
  {
    icon: Monitor,
    title: "Display Replacement",
    description: "Screen repair for cracked or damaged displays",
    href: "/services",
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    description: "Battery service for phones with poor battery life",
    href: "/services",
  },
  {
    icon: Zap,
    title: "Charging Repair",
    description: "Charging port and charging problem fixes",
    href: "/services",
  },
  {
    icon: Settings,
    title: "Software Service",
    description: "Software troubleshooting and system optimization",
    href: "/services",
  },
  {
    icon: Camera,
    title: "Camera Repair",
    description: "Front and rear camera repair and replacement",
    href: "/services",
  },
  {
    icon: Wifi,
    title: "Network Issues",
    description: "Network, signal and connectivity problem fixes",
    href: "/services",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Browse Online",
    description:
      "Explore our mobile phones, accessories and services on this website.",
    icon: Smartphone,
  },
  {
    step: "02",
    title: "Contact Us",
    description:
      "Call or WhatsApp RK MOBILES to enquire about products or services.",
    icon: Phone,
  },
  {
    step: "03",
    title: "Visit the Shop",
    description:
      "Visit RK MOBILES at Pollachi Road, Dharapuram for the product or service.",
    icon: MapPin,
  },
  {
    step: "04",
    title: "Get Served",
    description:
      "Get your mobile phone, accessory, repair or service at the shop.",
    icon: Award,
  },
];

const digitalServices = [
  {
    icon: CreditCard,
    title: "Mobile Recharge",
    description: "Recharge your mobile at RK MOBILES.",
  },
  {
    icon: Send,
    title: "Money Transfer",
    description: "Quick and reliable money transfer services.",
  },
  {
    icon: Printer,
    title: "Xerox & Printing",
    description: "Photocopying and printing services available.",
  },
  {
    icon: BookOpen,
    title: "Stationery",
    description: "Everyday stationery items available at the shop.",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function HomePage() {
  const [products, offers, settings] = await Promise.all([
    getLiveProducts(),
    getLiveOffers(),
    getLiveSettings(),
  ]);

  const featuredPhones = products.filter((p) => p.isFeatured).slice(0, 6);
  const displayPhones = featuredPhones.length > 0 ? featuredPhones : products.slice(0, 6);

  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section className="relative bg-gradient-to-br from-rk-purple-dark via-rk-purple to-rk-purple-light overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-rk-green rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 rounded-full px-4 py-1.5 text-sm mb-6 border border-white/15">
                <Smartphone className="h-4 w-4 text-cyan-300" />
                <span>Sales • Service • Accessories</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
                RK MOBILES
              </h1>
              <p className="text-lg sm:text-xl text-rk-green-light font-semibold mb-4">
                Quality Service & Affordable Prices
              </p>
              <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
                Your local physical mobile shop in Dharapuram for quality mobile phones, professional hardware & software repair services, genuine accessories, and everyday digital services.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/mobiles">
                  <Button
                    size="lg"
                    className="bg-white text-rk-purple-dark hover:bg-white/90 font-semibold gap-2 shadow-lg shadow-black/20"
                  >
                    <Smartphone className="h-5 w-5" />
                    Explore Mobiles
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 font-semibold gap-2 bg-white/5"
                  >
                    <Wrench className="h-5 w-5" />
                    Explore Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 font-semibold gap-2 bg-white/5"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>

              {/* Quick contact */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="tel:+919865013529"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium"
                >
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  Call: +91 98650 13529
                </a>
                <a
                  href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20contact%20RK%20MOBILES."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium"
                >
                  <div className="w-9 h-9 rounded-full bg-rk-whatsapp/30 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-emerald-300" />
                  </div>
                  WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Official Logo Showcase Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-400 via-rk-green to-orange-400 opacity-30 blur-2xl group-hover:opacity-50 transition duration-700 pointer-events-none" />
                <div className="relative bg-slate-950/85 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center max-w-sm">
                  <div className="relative mb-5 p-3 rounded-2xl bg-slate-900/90 ring-1 ring-cyan-400/30 shadow-inner">
                    <Image
                      src="/logo.png"
                      alt="RK MOBILES Official Brand Logo"
                      width={220}
                      height={270}
                      className="w-44 sm:w-52 h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,180,255,0.25)]"
                      priority
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full mb-3">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    <span>Official Offline Store • Dharapuram</span>
                  </div>
                  <p className="text-xs text-white/70">
                    C.S.I. Boys School Complex, Pollachi Road
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE US ====== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Why Choose RK MOBILES
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your trusted local mobile shop for phones, repairs, accessories
              and everyday digital services.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-rk-purple-100 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-rk-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-rk-purple group-hover:text-white transition-all duration-300">
                  <item.icon className="h-6 w-6 text-rk-purple group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== MOBILE PHONES ====== */}
      <section className="py-16 lg:py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Mobile Phones
              </h2>
              <p className="text-muted-foreground">
                Explore mobile phones available at RK MOBILES
              </p>
            </div>
            <Link
              href="/mobiles"
              className="hidden sm:flex items-center gap-1 text-rk-purple font-medium hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Live Mobile Phones Catalogue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPhones.map((phone) => (
              <div
                key={phone.id || phone.slug}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-rk-purple-100 transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                  <Smartphone className="h-24 w-24 text-gray-300" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-rk-green text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {phone.availability === "in_stock"
                        ? "Available"
                        : phone.availability === "low_stock"
                        ? "Low Stock"
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-rk-purple font-semibold uppercase tracking-wider mb-1">
                    {phone.brand}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
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
                        className="w-full border-rk-purple/30 text-rk-purple hover:bg-rk-purple hover:text-white"
                      >
                        View Details
                      </Button>
                    </Link>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(`Hi, I am interested in ${phone.brand} ${phone.model || phone.name}. Is it available at RK MOBILES?`)}`}
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
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/mobiles">
              <Button
                variant="outline"
                className="gap-2 border-rk-purple/30 text-rk-purple"
              >
                View All Mobiles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== ACTIVE OFFERS & DEALS (Live From Dashboard) ====== */}
      {offers.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-emerald-500/10 border-y border-amber-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-rk-purple flex items-center justify-center text-white shrink-0 shadow-md">
                  <Sparkles className="h-7 w-7 text-yellow-200" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
                    <Tag className="h-3 w-3" />
                    Special Shop Offer
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    {offers[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {offers[0].description} — <span className="font-bold text-rk-purple">{offers[0].discountText}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link href="/offers">
                  <Button className="bg-rk-purple hover:bg-rk-purple-dark text-white font-semibold gap-2 shadow-sm">
                    View All Offers
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(`Hi, I would like to avail the offer: ${offers[0].title} at RK MOBILES.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="bg-white gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                    <MessageCircle className="h-4 w-4" />
                    Claim on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====== MOBILE REPAIR & SERVICES ====== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Mobile Repair & Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional mobile repair services for all types of mobile
              issues. Visit RK MOBILES for expert service.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-rk-purple-100 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-rk-purple-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-rk-purple transition-colors duration-300">
                  <service.icon className="h-5 w-5 text-rk-purple group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-rk-purple transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 shrink-0 mt-0.5 group-hover:text-rk-purple transition-colors" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services">
              <Button className="gap-2 bg-rk-purple hover:bg-rk-purple-dark">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== ACCESSORIES ====== */}
      <section className="py-16 lg:py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Mobile Accessories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Wide range of mobile accessories available at RK MOBILES.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Shield, label: "Mobile Covers" },
              { icon: Smartphone, label: "Tempered Glass" },
              { icon: Zap, label: "Chargers" },
              { icon: Battery, label: "Power Banks" },
              { icon: Headphones, label: "Earphones & TWS" },
              { icon: Clock, label: "Smart Watches" },
            ].map((cat) => (
              <Link
                key={cat.label}
                href="/accessories"
                className="group flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-rk-purple-100 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-rk-purple-50 rounded-full flex items-center justify-center group-hover:bg-rk-purple transition-colors duration-300">
                  <cat.icon className="h-5 w-5 text-rk-purple group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-rk-purple transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/accessories">
              <Button
                variant="outline"
                className="gap-2 border-rk-purple/30 text-rk-purple"
              >
                Browse All Accessories
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== DIGITAL & EVERYDAY SERVICES ====== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Digital & Everyday Services
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Convenient everyday services available at RK MOBILES. Visit the
              shop to avail these services.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-3xl mx-auto">
            {digitalServices.map((service) => (
              <div
                key={service.title}
                className="bg-rk-purple-50/50 border border-rk-purple-100/50 rounded-xl p-5 text-center"
              >
                <div className="w-12 h-12 bg-rk-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <service.icon className="h-5 w-5 text-rk-purple" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Visit RK MOBILES to avail these services.
            </p>
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="py-16 lg:py-20 bg-rk-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Simple steps to get what you need from RK MOBILES
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-rk-purple-100" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-rk-purple-100 rounded-2xl mb-4 relative z-10">
                  <step.icon className="h-7 w-7 text-rk-purple" />
                </div>
                <div className="text-xs font-bold text-rk-purple mb-2">
                  STEP {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== ABOUT RK MOBILES ====== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              About RK MOBILES
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              RK MOBILES is a local mobile sales and service shop providing
              mobile phones, accessories, mobile repair services and everyday
              digital services. Located at C.S.I. Boys School Complex, Pollachi
              Road, Dharapuram — we are committed to providing quality service at
              affordable prices.
            </p>
            <Link href="/about">
              <Button
                variant="outline"
                className="gap-2 border-rk-purple/30 text-rk-purple"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== VISIT OUR STORE ====== */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-rk-purple-dark via-rk-purple to-rk-purple-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <MapPin className="h-10 w-10 mx-auto mb-4 text-rk-green-light" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Visit Our Store
            </h2>
            <p className="text-white/80 mb-2 text-lg">{settings.businessName}</p>
            <p className="text-white/70 mb-1">{settings.address}</p>
            <p className="text-white/70 mb-1">{settings.addressLine2}</p>
            <p className="text-white/70 mb-6">{settings.city}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={`tel:${settings.phone1.replace(/\s/g, "")}`}>
                <Button
                  size="lg"
                  className="bg-white text-rk-purple-dark hover:bg-white/90 gap-2 font-semibold"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </Button>
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%2C%20I%20would%20like%20to%20contact%20RK%20MOBILES.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white gap-2 font-semibold"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
              <a
                href={settings.mapLink || "https://www.google.com/maps/search/?api=1&query=RK+MOBILES+Dharapuram+Pollachi+Road"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 gap-2 font-semibold bg-white/5"
                >
                  <MapPin className="h-5 w-5" />
                  Get Directions
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CONTACT CTA ====== */}
      <section className="py-16 lg:py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 lg:p-12 text-center shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Need Help? Contact RK MOBILES
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Whether you need a new mobile phone, repair service, or
              accessories — we are here to help. Contact us or visit our shop.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={`tel:${settings.phone1.replace(/\s/g, "")}`}>
                <Button
                  size="lg"
                  className="bg-rk-purple hover:bg-rk-purple-dark gap-2 font-semibold"
                >
                  <Phone className="h-5 w-5" />
                  Call {settings.phone1}
                </Button>
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%2C%20I%20would%20like%20to%20contact%20RK%20MOBILES.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white gap-2 font-semibold"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
              <Link href="/services/enquiry">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-rk-purple/30 text-rk-purple gap-2 font-semibold"
                >
                  <Send className="h-5 w-5" />
                  Request a Visit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
