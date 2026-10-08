"use client";

import { Phone, MessageCircle, MapPin, Send } from "lucide-react";

export default function MobileStickyActions() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-4 divide-x divide-gray-100">
        <a
          href="tel:+919865013529"
          className="flex flex-col items-center justify-center py-2.5 gap-1 text-rk-purple hover:bg-rk-purple-50 transition-colors active:bg-rk-purple-100"
        >
          <Phone className="h-5 w-5" />
          <span className="text-[10px] font-medium">Call</span>
        </a>
        <a
          href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20contact%20RK%20MOBILES."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 gap-1 text-rk-whatsapp hover:bg-green-50 transition-colors active:bg-green-100"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>
        <a
          href="https://www.google.com/maps/search/?api=1&query=RK+MOBILES+Dharapuram+Pollachi+Road"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 gap-1 text-rk-orange hover:bg-orange-50 transition-colors active:bg-orange-100"
        >
          <MapPin className="h-5 w-5" />
          <span className="text-[10px] font-medium">Directions</span>
        </a>
        <a
          href="/services/enquiry"
          className="flex flex-col items-center justify-center py-2.5 gap-1 text-rk-green hover:bg-rk-green-50 transition-colors active:bg-green-100"
        >
          <Send className="h-5 w-5" />
          <span className="text-[10px] font-medium">Enquiry</span>
        </a>
      </div>
    </div>
  );
}
