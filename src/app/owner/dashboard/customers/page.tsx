"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Phone,
  MessageCircle,
  Smartphone,
  Calendar,
  Clock,
  Filter,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileText,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  device?: string;
  issue?: string;
  preferredDate?: string;
  status?: string;
  lastContactDate?: string;
  enquiriesCount?: number;
  notes?: string | null;
  history?: Array<{
    id: string;
    date: string;
    service: string;
    status: string;
    notes?: string;
  }>;
  enquiries?: Array<{
    id: string;
    serviceRequired?: string;
    deviceBrand?: string | null;
    deviceModel?: string | null;
    status: string;
    createdAt: string;
    message?: string | null;
    notes?: string | null;
  }>;
}

const statusBadgeStyles: Record<string, { label: string; class: string }> = {
  new: { label: "New", class: "bg-amber-100 text-amber-800 border-amber-200" },
  contacted: { label: "Contacted", class: "bg-blue-100 text-blue-800 border-blue-200" },
  visit_planned: { label: "Visit Planned", class: "bg-purple-100 text-purple-800 border-purple-200" },
  completed: { label: "Completed", class: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  cancelled: { label: "Cancelled", class: "bg-gray-100 text-gray-700 border-gray-200" },
};

export default function CustomersManagementPage() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/customers");
      if (res.ok) {
        const data = await res.json();
        setCustomers(data.customers || []);
      }
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.phone.includes(search) ||
      (cust.device && cust.device.toLowerCase().includes(search.toLowerCase())) ||
      (cust.issue && cust.issue.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      selectedStatus === "all" || cust.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Customer Directory</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real customer records automatically built from website service enquiries.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchCustomers}
            disabled={isLoading}
            className="gap-1.5 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Badge variant="outline" className="text-xs px-3 py-1 font-medium text-gray-700">
            Total Customers: <span className="font-bold text-rk-purple ml-1">{customers.length}</span>
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name, phone, device..."
            className="pl-9 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedStatus === "all"
                ? "bg-rk-purple text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200/70"
            }`}
          >
            All ({customers.length})
          </button>
          {["new", "contacted", "visit_planned", "completed"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors capitalize ${
                selectedStatus === st
                  ? "bg-rk-purple text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200/70"
              }`}
            >
              {st.replace("_", " ")} ({customers.filter((c) => c.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-sm text-muted-foreground">
          Loading customer directory...
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3 border border-slate-100">
            <Users className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">
            {customers.length === 0 ? "No Customer Records Yet" : "No Customers Found"}
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto mb-5 leading-relaxed">
            {customers.length === 0
              ? "All fake demo records have been cleared. Customer profiles are automatically created and tracked whenever a visitor submits an enquiry or shop visit request on the website."
              : "Try adjusting your search terms or filter."}
          </p>
          {customers.length === 0 && (
            <Link href="/services/enquiry" target="_blank">
              <Button size="sm" className="gap-1.5 bg-rk-purple hover:bg-rk-purple-dark text-xs font-semibold">
                <ExternalLink className="h-3.5 w-3.5" />
                Submit Test Enquiry on Website
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-4 py-3">Device & Service</th>
                  <th className="px-4 py-3">Preferred Slot</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Enquiries</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredCustomers.map((c) => {
                  const badge = statusBadgeStyles[c.status || "new"] || statusBadgeStyles.new;
                  return (
                    <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-gray-900">{c.name}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">
                          +91 {c.phone}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-gray-800 font-medium text-xs">
                          <Smartphone className="h-3.5 w-3.5 text-rk-purple shrink-0" />
                          {c.device || "Mobile Device"}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {c.issue || "General Enquiry"}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-600">
                        {c.preferredDate ? (
                          <span className="inline-flex items-center gap-1 text-gray-700 font-medium">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            {c.preferredDate}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">No slot specified</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className={`text-xs border ${badge.class}`}>
                          {badge.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-xs font-medium text-gray-600">
                        {c.enquiriesCount || c.enquiries?.length || 1} request{(c.enquiriesCount || 1) > 1 ? "s" : ""}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1 text-xs border-gray-200"
                            onClick={() => setSelectedCustomer(c)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                            History
                          </Button>
                          <a
                            href={`tel:${c.phone}`}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Call customer"
                          >
                            <Phone className="h-3.5 w-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/91${c.phone.replace(/[^0-9]/g, "").slice(-10)}?text=Hello%20${encodeURIComponent(
                              c.name
                            )}%2C%20this%20is%20RK%20MOBILES%20regarding%20your%20service%20enquiry.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-green-200 text-rk-whatsapp hover:bg-green-50 transition-colors"
                            title="WhatsApp customer"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Dialog */}
      {selectedCustomer && (
        <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between text-lg font-bold">
                <span>{selectedCustomer.name}</span>
                <Badge
                  variant="outline"
                  className={`text-xs border ${
                    statusBadgeStyles[selectedCustomer.status || "new"]?.class || ""
                  }`}
                >
                  {statusBadgeStyles[selectedCustomer.status || "new"]?.label || selectedCustomer.status}
                </Badge>
              </DialogTitle>
              <DialogDescription className="font-mono text-xs">
                Phone: +91 {selectedCustomer.phone}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <div className="bg-slate-50 p-3.5 rounded-lg text-xs space-y-1.5 border border-slate-100">
                <p>
                  <strong className="text-gray-700">Device:</strong>{" "}
                  {selectedCustomer.device || "Mobile Device"}
                </p>
                <p>
                  <strong className="text-gray-700">Primary Service:</strong>{" "}
                  {selectedCustomer.issue || "General Service"}
                </p>
                {selectedCustomer.notes && (
                  <p>
                    <strong className="text-gray-700">Notes:</strong> {selectedCustomer.notes}
                  </p>
                )}
              </div>

              {/* Enquiries History */}
              <div>
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Enquiries Timeline
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {(selectedCustomer.enquiries && selectedCustomer.enquiries.length > 0) ? (
                    selectedCustomer.enquiries.map((h) => (
                      <div key={h.id} className="p-2.5 rounded-lg border border-gray-100 bg-white text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">{h.serviceRequired || "Service Request"}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(h.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        {h.message && <p className="text-gray-600 text-[11px]">{h.message}</p>}
                        <div className="flex items-center gap-2 pt-1">
                          <Badge variant="outline" className="text-[10px] uppercase">
                            {h.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No past history recorded.</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <a href={`tel:${selectedCustomer.phone}`}>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs text-rk-purple border-rk-purple/30">
                    <Phone className="h-3.5 w-3.5" /> Call
                  </Button>
                </a>
                <a
                  href={`https://wa.me/91${selectedCustomer.phone.replace(/[^0-9]/g, "").slice(-10)}?text=Hello%20${encodeURIComponent(
                    selectedCustomer.name
                  )}%2C%20regarding%20your%20enquiry%20at%20RK%20MOBILES.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" className="gap-1.5 text-xs bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
