"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/mobiles", label: "Mobiles" },
  { href: "/accessories", label: "Accessories" },
  { href: "/services", label: "Services" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-rk-purple-100"
          : "bg-white border-b border-gray-100"
      }`}
    >
      {/* Top bar - contact info */}
      <div className="bg-rk-purple-dark text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="tel:+919865013529"
              className="flex items-center gap-1.5 hover:text-rk-green-light transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+91 98650 13529</span>
            </a>
            <a
              href="tel:+918329166021"
              className="flex items-center gap-1.5 hover:text-rk-green-light transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+91 83291 66021</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>Pollachi Road, Dharapuram</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative overflow-hidden rounded-lg bg-slate-950 p-1 ring-1 ring-slate-800 shadow-sm flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="RK MOBILES Logo"
                width={36}
                height={44}
                className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-black text-rk-purple-dark tracking-tight leading-tight">
                RK MOBILES
              </span>
              <span className="text-[10px] lg:text-xs text-muted-foreground leading-tight hidden sm:block font-medium">
                Quality Service & Affordable Prices
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-rk-purple transition-colors rounded-md hover:bg-rk-purple-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <a href="tel:+919865013529">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-rk-purple/30 text-rk-purple hover:bg-rk-purple hover:text-white transition-all"
              >
                <Phone className="h-4 w-4" />
                Call
              </Button>
            </a>
            <a
              href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20contact%20RK%20MOBILES."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                className="gap-1.5 bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <a href="tel:+919865013529">
              <Button
                variant="ghost"
                size="icon"
                className="text-rk-purple"
              >
                <Phone className="h-5 w-5" />
              </Button>
            </a>
            <a
              href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20contact%20RK%20MOBILES."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-rk-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </a>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile menu header */}
                  <div className="p-6 border-b bg-rk-purple-50">
                    <div className="flex items-center gap-3">
                      <div className="relative overflow-hidden rounded-lg bg-slate-950 p-1.5 ring-1 ring-slate-800 shadow-sm flex items-center justify-center">
                        <Image
                          src="/logo.png"
                          alt="RK MOBILES Logo"
                          width={40}
                          height={48}
                          className="h-10 w-auto object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-extrabold text-rk-purple-dark">
                          RK MOBILES
                        </p>
                        <p className="text-xs text-muted-foreground font-medium">
                          Quality Service & Affordable Prices
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation links */}
                  <nav className="flex-1 py-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between px-6 py-3.5 text-gray-700 hover:text-rk-purple hover:bg-rk-purple-50 transition-colors"
                      >
                        <span className="font-medium">{link.label}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile menu footer */}
                  <div className="p-6 border-t bg-gray-50 space-y-3">
                    <a href="tel:+919865013529" className="block">
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-rk-purple/30 text-rk-purple"
                      >
                        <Phone className="h-4 w-4" />
                        Call +91 98650 13529
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
                    <div className="pt-2 text-center border-t border-gray-200/60">
                      <Link
                        href="/owner/login"
                        onClick={() => setIsOpen(false)}
                        className="text-xs text-muted-foreground hover:text-rk-purple inline-flex items-center gap-1.5 py-1"
                      >
                        <Lock className="h-3 w-3" />
                        <span>Owner Portal Login</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
