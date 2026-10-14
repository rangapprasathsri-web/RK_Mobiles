"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Phone,
  MessageCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  CalendarDays,
  User,
  Smartphone,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  deviceBrand: string | null;
  deviceModel: string | null;
  serviceRequired: string;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  type: string;
  productName: string | null;
  status: "new" | "contacted" | "visit_planned" | "completed" | "cancelled";
  ownerNotes?: string | null;
  createdAt: string;
}

const statusOptions = [
  { value: "all", label: "All Enquiries" },
  { value: "new", label: "New / Pending" },
  { value: "contacted", label: "Contacted" },
  { value: "visit_planned", label: "Visit Planned" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const statusColors: Record<string, string> = {
  new: "bg-amber-100 text-amber-800 border-amber-200",
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  visit_planned: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Enquiry["status"]) => {
    setUpdatingId(id);
    try {
      // Optimistic update
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchesFilter = filter === "all" || e.status === filter;
    const matchesSearch =
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      (e.deviceModel?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      e.serviceRequired.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Customer Enquiries</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real customer visit requests and repair enquiries received through the website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchEnquiries}
            disabled={isLoading}
            className="gap-1.5 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link href="/services/enquiry" target="_blank">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs border-rk-purple/30 text-rk-purple">
              <ExternalLink className="h-3.5 w-3.5" />
              Website Form
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer name, phone number, or device..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filter === opt.value
                  ? "bg-rk-purple text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200/70"
              }`}
            >
              {opt.label}
              {opt.value !== "all" && (
                <span className="ml-1.5 opacity-80 text-[10px]">
                  ({enquiries.filter((e) => e.status === opt.value).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries List */}
      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-sm text-muted-foreground">
          Loading real customer enquiries...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3 border border-slate-100">
            <MessageSquare className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">
            {enquiries.length === 0 ? "No Customer Enquiries Yet" : "No Enquiries Match Your Filter"}
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto mb-5 leading-relaxed">
            {enquiries.length === 0
              ? "All fake demo records have been cleared. When customers submit requests on your main website, they will appear here live with customer phone numbers and issue descriptions."
              : "Try switching the status filter above to 'All Enquiries' or clearing your search keywords."}
          </p>
          {enquiries.length === 0 && (
            <Link href="/services/enquiry" target="_blank">
              <Button size="sm" className="gap-1.5 bg-rk-purple hover:bg-rk-purple-dark text-xs font-semibold">
                <ExternalLink className="h-3.5 w-3.5" />
                Submit Test Enquiry on Website
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((enquiry) => (
            <div
              key={enquiry.id}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs hover:border-gray-200 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Customer & Device details */}
                <div className="space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-gray-900 text-base">{enquiry.name}</span>
                    <Badge className={`text-xs px-2.5 py-0.5 border ${statusColors[enquiry.status] || "bg-gray-100 text-gray-700"}`}>
                      {enquiry.status.replace("_", " ").toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(enquiry.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 font-mono text-gray-800 font-semibold">
                      <Phone className="h-3.5 w-3.5 text-rk-purple" />
                      {enquiry.phone}
                    </span>
                    {(enquiry.deviceBrand || enquiry.deviceModel) && (
                      <span className="flex items-center gap-1 text-gray-700">
                        <Smartphone className="h-3.5 w-3.5 text-blue-500" />
                        {enquiry.deviceBrand} {enquiry.deviceModel}
                      </span>
                    )}
                    <span className="flex items-center gap-1 font-semibold text-rk-purple-dark">
                      Service: {enquiry.serviceRequired}
                    </span>
                  </div>

                  {enquiry.preferredDate && (
                    <div className="text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 border border-amber-200">
                      <CalendarDays className="h-3.5 w-3.5 text-amber-600" />
                      <span>Preferred Visit: <strong>{enquiry.preferredDate}</strong> {enquiry.preferredTime ? `(${enquiry.preferredTime})` : ""}</span>
                    </div>
                  )}

                  {enquiry.message && (
                    <div className="text-xs text-gray-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 max-w-2xl mt-1">
                      <span className="font-semibold text-gray-500">Customer Note: </span>
                      {enquiry.message}
                    </div>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0">
                  <a href={`tel:${enquiry.phone}`}>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs text-rk-purple border-rk-purple/30 hover:bg-rk-purple hover:text-white">
                      <Phone className="h-3.5 w-3.5" />
                      Call
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/91${enquiry.phone.replace(/[^0-9]/g, "").slice(-10)}?text=Hello%20${encodeURIComponent(enquiry.name)}%2C%20regarding%20your%20${encodeURIComponent(enquiry.serviceRequired)}%20service%20enquiry%20at%20RK%20MOBILES.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="gap-1.5 text-xs bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white">
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </Button>
                  </a>

                  {/* Status Dropdown */}
                  <select
                    value={enquiry.status}
                    disabled={updatingId === enquiry.id}
                    onChange={(e) => handleStatusChange(enquiry.id, e.target.value as Enquiry["status"])}
                    className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-2 font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-rk-purple cursor-pointer"
                  >
                    <option value="new">Mark as New</option>
                    <option value="contacted">Mark as Contacted</option>
                    <option value="visit_planned">Mark as Visit Planned</option>
                    <option value="completed">Mark as Completed</option>
                    <option value="cancelled">Mark as Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
