import Link from "next/link";
import {
  Smartphone,
  MessageCircle,
  Phone,
  MapPin,
  ChevronRight,
  ArrowRight,
  Wrench,
  Monitor,
  Battery,
  Zap,
  Plug,
  Settings,
  Camera,
  Volume2,
  Mic,
  Wifi,
  Signal,
  Power,
  PowerOff,
  Droplets,
  Gauge,
  Thermometer,
  ToggleLeft,
  Send,
  CreditCard,
  Printer,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Mobile Repair & Services",
  description:
    "Professional mobile repair and service at RK MOBILES, Dharapuram. Display replacement, battery replacement, charging repair and all mobile repairs.",
};

const services = [
  {
    icon: Monitor,
    name: "Display Replacement",
    description:
      "Professional display replacement for damaged, cracked or malfunctioning mobile screens.",
    symptoms: [
      "Cracked screen",
      "Touch not working",
      "Display flickering",
      "Black screen",
    ],
  },
  {
    icon: Battery,
    name: "Battery Replacement",
    description:
      "Battery replacement service for phones with poor battery life or swollen batteries.",
    symptoms: [
      "Battery draining fast",
      "Unexpected shutdowns",
      "Battery swelling",
    ],
  },
  {
    icon: Plug,
    name: "Charging Port Repair",
    description:
      "Repair or replacement of damaged charging ports for reliable charging.",
    symptoms: [
      "Charger not connecting",
      "Loose port",
      "Intermittent charging",
    ],
  },
  {
    icon: Zap,
    name: "Charging Problems",
    description: "Diagnosis and repair of all types of charging issues.",
    symptoms: ["Slow charging", "Phone not charging", "Charging stops early"],
  },
  {
    icon: Settings,
    name: "Software Service",
    description:
      "Software troubleshooting, updates, and optimization services.",
    symptoms: ["Phone running slow", "Apps crashing", "Software glitches"],
  },
  {
    icon: Monitor,
    name: "Operating System Issues",
    description:
      "OS repair including boot issues, stuck screens, and system failures.",
    symptoms: ["Stuck on logo", "Boot loop", "System not responding"],
  },
  {
    icon: Camera,
    name: "Camera Repair",
    description: "Front and rear camera repair and replacement services.",
    symptoms: [
      "Blurry photos",
      "Camera not opening",
      "Autofocus issues",
    ],
  },
  {
    icon: Volume2,
    name: "Speaker Repair",
    description:
      "Speaker diagnosis and repair for distorted or no audio output.",
    symptoms: ["No sound", "Distorted audio", "Low volume"],
  },
  {
    icon: Mic,
    name: "Microphone Repair",
    description: "Microphone repair for voice call and recording issues.",
    symptoms: [
      "Others cannot hear you",
      "Muffled voice",
      "Recording not working",
    ],
  },
  {
    icon: Wifi,
    name: "Network Issues",
    description:
      "Diagnosis and fix for mobile network and connectivity problems.",
    symptoms: ["No network signal", "SIM not detected", "Wi-Fi issues"],
  },
  {
    icon: Signal,
    name: "Signal Problems",
    description:
      "Signal strength improvement and antenna-related repairs.",
    symptoms: ["Weak signal", "Call drops", "Signal fluctuation"],
  },
  {
    icon: Power,
    name: "Power Issues",
    description:
      "Power-related repairs including motherboard and component issues.",
    symptoms: [
      "Phone not turning on",
      "Random shutdowns",
      "Power button issues",
    ],
  },
  {
    icon: PowerOff,
    name: "Phone Not Turning On",
    description: "Dead phone diagnosis and repair services.",
    symptoms: [
      "Phone completely dead",
      "No response to charging",
      "Screen stays black",
    ],
  },
  {
    icon: Droplets,
    name: "Water Damage Inspection",
    description:
      "Inspection and recovery services for water-damaged phones.",
    symptoms: [
      "Phone fell in water",
      "Water damage indicators",
      "Erratic behavior",
    ],
  },
  {
    icon: Gauge,
    name: "Performance Issues",
    description: "Performance optimization for slow or lagging phones.",
    symptoms: ["Very slow phone", "Apps take long to open", "Freezing"],
  },
  {
    icon: Thermometer,
    name: "Heating Problems",
    description: "Diagnosis and fix for overheating phones.",
    symptoms: [
      "Phone gets very hot",
      "Overheating during charging",
      "Heat during calls",
    ],
  },
  {
    icon: ToggleLeft,
    name: "Button Problems",
    description:
      "Physical button repair including power, volume, and home buttons.",
    symptoms: [
      "Power button stuck",
      "Volume button not working",
      "Home button broken",
    ],
  },
  {
    icon: Wrench,
    name: "Other Mobile Repairs",
    description:
      "All other mobile repair services not listed above. Contact us for any mobile issue.",
    symptoms: [
      "Any issue not listed",
      "Multiple issues",
      "General inspection",
    ],
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
    description: "Photocopying and printing services.",
  },
  {
    icon: BookOpen,
    title: "Stationery",
    description: "Everyday stationery items available.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-rk-purple-dark to-rk-purple py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Mobile Repair & Services
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Professional mobile repair services for all types of mobile
              issues. All repairs are performed at the RK MOBILES shop.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/services/enquiry">
                <Button className="bg-white text-rk-purple-dark hover:bg-white/90 gap-2 font-semibold">
                  <Send className="h-4 w-4" />
                  Request a Visit
                </Button>
              </Link>
              <a href="tel:+919865013529">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 gap-2 bg-white/5"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-10 lg:py-16 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            All Mobile Services
          </h2>
          <p className="text-muted-foreground mb-8">
            RK MOBILES provides all kinds of mobile service. Select a service to
            learn more.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div
                key={service.name}
                className="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-rk-purple-100 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 bg-rk-purple-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-rk-purple transition-colors duration-300">
                    <service.icon className="h-5 w-5 text-rk-purple group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-rk-purple transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Common symptoms */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Common Symptoms
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.symptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/services/enquiry?service=${encodeURIComponent(service.name)}`} className="flex-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-rk-purple/30 text-rk-purple hover:bg-rk-purple hover:text-white text-xs"
                    >
                      Request a Visit
                    </Button>
                  </Link>
                  <a
                    href={`https://wa.me/919865013529?text=${encodeURIComponent(`Hi, I would like to enquire about ${service.name}.`)}`}
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
            ))}
          </div>
        </div>
      </section>

      {/* Digital & Everyday Services */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Digital & Everyday Services
            </h2>
            <p className="text-muted-foreground">
              Additional services available at RK MOBILES. Visit the shop to
              avail these services.
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
            <p className="text-sm text-muted-foreground mb-4">
              These services are available at the physical RK MOBILES shop.
            </p>
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
                Visit RK MOBILES
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-rk-purple-dark to-rk-purple">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Need Mobile Repair?
          </h2>
          <p className="text-white/80 mb-6">
            Contact RK MOBILES or submit a visit request. All repairs are
            performed at the physical shop.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/services/enquiry">
              <Button className="bg-white text-rk-purple-dark hover:bg-white/90 gap-2 font-semibold">
                <Send className="h-4 w-4" />
                Request a Visit
              </Button>
            </Link>
            <a href="tel:+919865013529">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 gap-2 bg-white/5"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </Button>
            </a>
            <a
              href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20mobile%20repair%20at%20RK%20MOBILES."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 gap-2 bg-white/5"
              >
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
