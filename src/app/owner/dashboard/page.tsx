"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Smartphone,
  Tag,
  Users,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  Plus,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  deviceBrand: string | null;
  deviceModel: string | null;
  serviceRequired: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-amber-100 text-amber-800 border-amber-200",
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  visit_planned: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function DashboardOverviewPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [offersCount, setOffersCount] = useState<number>(0);
  const [customersCount, setCustomersCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [enqRes, prodRes, offRes, custRes] = await Promise.all([
          fetch("/api/enquiries").then((r) => (r.ok ? r.json() : { enquiries: [] })),
          fetch("/api/products").then((r) => (r.ok ? r.json() : { products: [] })),
          fetch("/api/offers").then((r) => (r.ok ? r.json() : { offers: [] })),
          fetch("/api/customers").then((r) => (r.ok ? r.json() : { customers: [] })),
        ]);

        if (enqRes.enquiries) setEnquiries(enqRes.enquiries);
        if (prodRes.products) setProductsCount(prodRes.products.length);
        if (offRes.offers) setOffersCount(offRes.offers.filter((o: any) => o.isActive).length);
        if (custRes.customers) setCustomersCount(custRes.customers.length);
      } catch (err) {
        console.error("Dashboard overview load error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  // Calculate real live metrics
  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;
  const todayStr = new Date().toISOString().split("T")[0];
  const todayEnquiriesCount = enquiries.filter((e) =>
    e.createdAt ? e.createdAt.startsWith(todayStr) : false
  ).length;

  const stats = [
    {
      label: "Total Enquiries",
      value: enquiries.length.toString(),
      subtext: `${newEnquiriesCount} new / pending`,
      icon: MessageSquare,
      color: "text-rk-purple",
      bg: "bg-rk-purple-50",
    },
    {
      label: "New Requests",
      value: newEnquiriesCount.toString(),
      subtext: "Needs owner response",
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Mobiles in Catalogue",
      value: productsCount.toString(),
      subtext: "Active in-store stock",
      icon: Smartphone,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Customer Profiles",
      value: customersCount.toString(),
      subtext: "From website enquiries",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            RK MOBILES Owner Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Connected live to your main website. View customer repair enquiries and manage shop catalogue.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <ExternalLink className="h-3.5 w-3.5" />
              View Live Website
            </Button>
          </Link>
          <Link href="/owner/dashboard/mobiles">
            <Button size="sm" className="gap-1.5 bg-rk-purple hover:bg-rk-purple-dark text-xs">
              <Plus className="h-3.5 w-3.5" />
              Add Mobile
            </Button>
          </Link>
        </div>
      </div>

      {/* Real Live Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs hover:border-gray-200 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {stat.label}
              </span>
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-4.5 w-4.5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isLoading ? "..." : stat.value}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/owner/dashboard/enquiries"
          className="bg-gradient-to-br from-rk-purple-50 to-white border border-rk-purple/20 rounded-xl p-5 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-rk-purple-dark">Manage Enquiries</span>
            <ArrowRight className="h-4 w-4 text-rk-purple group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-muted-foreground">
            Contact customers via Phone or WhatsApp and update appointment visit statuses.
          </p>
        </Link>

        <Link
          href="/owner/dashboard/mobiles"
          className="bg-gradient-to-br from-blue-50/50 to-white border border-blue-200/60 rounded-xl p-5 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-900">Mobile Phones Stock</span>
            <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-muted-foreground">
            Add models, update prices, and set In Stock / Low Stock badges.
          </p>
        </Link>

        <Link
          href="/owner/dashboard/settings"
          className="bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-200/60 rounded-xl p-5 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-900">Shop Contact & Hours</span>
            <ArrowRight className="h-4 w-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-muted-foreground">
            Update Dharapuram shop phone numbers, address, and Google Maps directions.
          </p>
        </Link>
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Recent Customer Enquiries</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live submissions from the website enquiry and visit request forms
            </p>
          </div>
          <Link href="/owner/dashboard/enquiries">
            <Button variant="ghost" size="sm" className="text-xs gap-1 text-rk-purple hover:text-rk-purple-dark">
              View All ({enquiries.length}) <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            Loading real-time enquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3 border border-slate-100">
              <MessageSquare className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              No Customer Enquiries Yet
            </h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto mb-5 leading-relaxed">
              When customers visit your website and submit a service enquiry or shop visit request, their details and phone number will appear here instantly.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/services/enquiry" target="_blank">
                <Button size="sm" variant="outline" className="text-xs gap-1.5 border-rk-purple/30 text-rk-purple">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Test Enquiry Form on Website
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {enquiries.slice(0, 5).map((enq) => (
              <div
                key={enq.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-rk-purple-50 text-rk-purple flex items-center justify-center font-bold text-sm shrink-0">
                    {enq.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{enq.name}</p>
                      <Badge className={`text-[10px] px-2 py-0.5 border ${statusColors[enq.status] || "bg-gray-100 text-gray-700"}`}>
                        {enq.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-rk-purple font-medium mt-0.5">
                      {enq.serviceRequired}
                      {enq.deviceBrand && ` • ${enq.deviceBrand} ${enq.deviceModel || ""}`}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Phone: <span className="font-mono text-gray-700">{enq.phone}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <a href={`tel:${enq.phone}`}>
                    <Button variant="outline" size="sm" className="h-8 gap-1 text-xs text-rk-purple border-rk-purple/30 hover:bg-rk-purple hover:text-white">
                      <Phone className="h-3.5 w-3.5" />
                      Call
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, "").slice(-10)}?text=Hello%20${encodeURIComponent(enq.name)}%2C%20regarding%20your%20enquiry%20at%20RK%20MOBILES.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="h-8 gap-1 text-xs bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white">
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
