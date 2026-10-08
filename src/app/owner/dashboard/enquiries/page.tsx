"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Phone,
  MessageCircle,
  Search,
  Filter,
  ChevronDown,
  CheckCircle2,
  Clock,
  XCircle,
  CalendarDays,
  User,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const statusOptions = [
  { value: "all", label: "All Enquiries" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "visit_planned", label: "Visit Planned" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

// Sample data
const sampleEnquiries = [
  {
    id: "1",
    name: "Rahul",
    phone: "9876543210",
    deviceBrand: "Samsung",
    deviceModel: "Galaxy A55",
    serviceRequired: "Display Replacement",
    preferredDate: "Saturday",
    message: "My display is broken.",
    status: "new",
    type: "service",
    createdAt: "2026-10-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Priya",
    phone: "8765432109",
    deviceBrand: "Xiaomi",
    deviceModel: "Redmi Note 12",
    serviceRequired: "Battery Replacement",
    preferredDate: null,
    message: "Battery draining fast.",
    status: "contacted",
    type: "service",
    createdAt: "2026-09-30T14:00:00Z",
  },
  {
    id: "3",
    name: "Kumar",
    phone: "9012345678",
    deviceBrand: "Vivo",
    deviceModel: "Y200",
    serviceRequired: "Software Service",
    preferredDate: "Monday",
    message: null,
    status: "new",
    type: "service",
    createdAt: "2026-09-29T09:00:00Z",
  },
  {
    id: "4",
    name: "Anitha",
    phone: "7890123456",
    deviceBrand: "OPPO",
    deviceModel: "A3 Pro",
    serviceRequired: "Charging Problems",
    preferredDate: null,
    message: "Phone charges very slowly.",
    status: "visit_planned",
    type: "service",
    createdAt: "2026-09-28T16:00:00Z",
  },
  {
    id: "5",
    name: "Mani",
    phone: "6789012345",
    deviceBrand: null,
    deviceModel: null,
    serviceRequired: "Product Enquiry",
    preferredDate: null,
    message: "Interested in Samsung Galaxy A16",
    status: "completed",
    type: "product",
    createdAt: "2026-09-27T11:00:00Z",
  },
];

const statusColors: Record<string, string> = {
  new: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  visit_planned: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-800",
};

const statusIcons: Record<string, typeof Clock> = {
  new: Clock,
  contacted: Phone,
  visit_planned: CalendarDays,
  completed: CheckCircle2,
  cancelled: XCircle,
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState(sampleEnquiries);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/enquiries");
      if (res.ok) {
        const data = await res.json();
        if (data.enquiries && data.enquiries.length > 0) {
          // Merge with sample enquiries to keep a rich demo experience
          const dbIds = new Set(data.enquiries.map((e: any) => e.id));
          const nonDupSamples = sampleEnquiries.filter((s) => !dbIds.has(s.id));
          setEnquiries([...data.enquiries, ...nonDupSamples]);
        }
      }
    } catch {
      // Use fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
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
      (e.deviceModel?.toLowerCase().includes(search.toLowerCase()) ?? false);
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer enquiries and visit requests submitted via website.
          </p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1 font-normal text-muted-foreground self-start sm:self-auto">
          Total Enquiries: <span className="font-semibold text-gray-900 ml-1">{enquiries.length}</span>
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, device..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {statusOptions.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === s.value
                  ? "bg-rk-purple text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-rk-purple-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No enquiries found.</p>
          </div>
        ) : (
          filtered.map((enquiry) => {
            const StatusIcon = statusIcons[enquiry.status] || Clock;
            return (
              <div
                key={enquiry.id}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {enquiry.name}
                      </h3>
                      <Badge
                        className={`text-xs ${
                          statusColors[enquiry.status] || "bg-gray-100 text-gray-800"
                        } border-0 capitalize`}
                      >
                        {enquiry.status.replace("_", " ")}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-200 uppercase"
                      >
                        {enquiry.type}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-rk-purple" />
                        <span className="font-mono text-gray-900 font-medium">+91 {enquiry.phone}</span>
                      </div>
                      {enquiry.deviceBrand && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Smartphone className="h-3.5 w-3.5 shrink-0 text-rk-purple" />
                          <span className="text-gray-800">
                            {enquiry.deviceBrand} {enquiry.deviceModel}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <StatusIcon className="h-3.5 w-3.5 shrink-0 text-rk-purple" />
                        <span className="text-gray-800 font-medium">{enquiry.serviceRequired}</span>
                      </div>
                      {enquiry.preferredDate && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5 shrink-0 text-rk-purple" />
                          <span>Slot: {enquiry.preferredDate}</span>
                        </div>
                      )}
                    </div>

                    {enquiry.message && (
                      <p className="text-sm text-gray-700 mt-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                        &ldquo;{enquiry.message}&rdquo;
                      </p>
                    )}

                    <p className="text-xs text-muted-foreground mt-2">
                      Received: {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex sm:flex-col gap-2 shrink-0 items-end sm:items-stretch">
                    <a href={`tel:+91${enquiry.phone}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs w-full text-blue-700 hover:bg-blue-50"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Call
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/91${enquiry.phone}?text=Hi%20${encodeURIComponent(
                        enquiry.name
                      )}%2C%20this%20is%20RK%20MOBILES%20regarding%20your%20enquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="gap-1.5 text-xs bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white w-full"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        WhatsApp
                      </Button>
                    </a>

                    {/* Status change select */}
                    <div className="w-full">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                        disabled={updatingId === enquiry.id}
                        className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-rk-purple"
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
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
