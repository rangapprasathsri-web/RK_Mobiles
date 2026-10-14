import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  MapPin,
  Smartphone,
  Wrench,
  ShoppingBag,
  Lock,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/mobiles", label: "Mobiles" },
  { href: "/accessories", label: "Accessories" },
  { href: "/services", label: "Services" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services", label: "Mobile Repair" },
  { href: "/services", label: "Display Replacement" },
  { href: "/services", label: "Battery Replacement" },
  { href: "/accessories", label: "Accessories" },
  { href: "/services", label: "Recharge" },
  { href: "/services", label: "Money Transfer" },
  { href: "/services", label: "Xerox / Printing" },
  { href: "/services", label: "Stationery" },
];

export default function Footer() {
  return (
    <footer className="bg-rk-purple-dark text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative overflow-hidden rounded-xl bg-slate-950 p-1.5 ring-1 ring-white/20 shadow-md flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="RK MOBILES Logo"
                  width={44}
                  height={54}
                  className="h-11 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-white">
                  RK MOBILES
                </h3>
                <p className="text-xs text-white/70 font-medium">
                  Quality Service & Affordable Prices
                </p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Your local destination for mobile phones, professional mobile
              repair services, accessories and everyday digital services.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-white/80">
                <Smartphone className="h-4 w-4 text-rk-green-light" />
                <span>Sales</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1.5 text-sm text-white/80">
                <Wrench className="h-4 w-4 text-rk-green-light" />
                <span>Service</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1.5 text-sm text-white/80">
                <ShoppingBag className="h-4 w-4 text-rk-green-light" />
                <span>Accessories</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-rk-green-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link, index) => (
                <li key={`${link.label}-${index}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-rk-green-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4">
              Contact
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex items-start gap-2.5 mb-3">
                  <MapPin className="h-4 w-4 text-rk-green-light mt-0.5 shrink-0" />
                  <div className="text-sm text-white/70 leading-relaxed">
                    <p>C.S.I. Boys School Complex</p>
                    <p>Pollachi Road</p>
                    <p>Dharapuram</p>
                  </div>
                </div>
              </div>
              <a
                href="tel:+919865013529"
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-rk-green-light transition-colors"
              >
                <Phone className="h-4 w-4 text-rk-green-light shrink-0" />
                +91 98650 13529
              </a>
              <a
                href="tel:+918329166021"
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-rk-green-light transition-colors"
              >
                <Phone className="h-4 w-4 text-rk-green-light shrink-0" />
                +91 83291 66021
              </a>
              <a
                href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20contact%20RK%20MOBILES."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-rk-green-light transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-rk-green-light shrink-0" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © 2026 RK MOBILES. All Rights Reserved. • Pollachi Road, Dharapuram
          </p>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span>Sales • Service • Accessories</span>
            <span className="text-white/20">|</span>
            <Link
              href="/owner/login"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white transition-colors py-1 px-2 rounded hover:bg-white/5"
            >
              <Lock className="h-3 w-3 text-rk-green-light" />
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
