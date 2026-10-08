"use client";

import { useState } from "react";
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

// Sample customer records
const initialCustomers = [
  {
    id: "cust-1",
    name: "Rahul",
    phone: "9876543210",
    device: "Samsung Galaxy A55 5G",
    issue: "Display Replacement",
    preferredDate: "Saturday (11:00 AM)",
    status: "new",
    lastContactDate: "2026-10-01",
    enquiriesCount: 1,
    notes: "Cracked AMOLED screen after drop. Requested original screen quote.",
    history: [
      {
        id: "enq-101",
        date: "2026-10-01 10:15 AM",
        service: "Display Replacement",
        status: "new",
        notes: "Enquiry submitted via website form",
      },
    ],
  },
  {
    id: "cust-2",
    name: "Priya",
    phone: "8765432109",
    device: "Xiaomi Redmi Note 12",
    issue: "Battery Replacement",
    preferredDate: "Next Tuesday Morning",
    status: "contacted",
    lastContactDate: "2026-09-30",
    enquiriesCount: 2,
    notes: "Phone powers off at 30%. Informed about battery warranty and shop timing.",
    history: [
      {
        id: "enq-102",
        date: "2026-09-30 02:45 PM",
        service: "Battery Replacement",
        status: "contacted",
        notes: "Owner called and confirmed battery availability in shop",
      },
      {
        id: "enq-089",
        date: "2026-08-14 11:30 AM",
        service: "Tempered Glass Installation",
        status: "completed",
        notes: "Installed 11D tempered glass at store",
      },
    ],
  },
  {
    id: "cust-3",
    name: "Kumar",
    phone: "9012345678",
    device: "Vivo Y200",
    issue: "Charging Port Repair",
    preferredDate: "Tomorrow 4:00 PM",
    status: "visit_planned",
    lastContactDate: "2026-09-29",
    enquiriesCount: 1,
    notes: "Loose Type-C port. Agreed to visit store tomorrow afternoon.",
    history: [
      {
        id: "enq-103",
        date: "2026-09-29 04:20 PM",
        service: "Charging Port Repair",
        status: "visit_planned",
        notes: "Visit confirmed for tomorrow 4 PM",
      },
    ],
  },
  {
    id: "cust-4",
    name: "Suresh",
    phone: "9865012345",
    device: "Realme Narzo 70 Pro",
    issue: "Camera Glass Broken",
    preferredDate: "Sunday Afternoon",
    status: "completed",
    lastContactDate: "2026-09-27",
    enquiriesCount: 1,
    notes: "Camera lens glass replaced and verified clear photos.",
    history: [
      {
        id: "enq-104",
        date: "2026-09-27 01:10 PM",
        service: "Camera Repair",
        status: "completed",
        notes: "Service completed at shop. Customer satisfied.",
      },
    ],
  },
  {
    id: "cust-5",
    name: "Anitha",
    phone: "9789012345",
    device: "OnePlus Nord CE 3",
    issue: "Software Boot Loop",
    preferredDate: "Immediate",
    status: "contacted",
    lastContactDate: "2026-09-28",
    enquiriesCount: 1,
    notes: "Stuck on recovery mode after update. Advised to bring bill & ID to store.",
    history: [
      {
        id: "enq-105",
        date: "2026-09-28 09:40 AM",
        service: "Software Service",
        status: "contacted",
        notes: "Informed diagnostic procedure",
      },
    ],
  },
];

const statusBadgeStyles: Record<string, { label: string; class: string }> = {
  new: { label: "New", class: "bg-amber-100 text-amber-800 border-amber-200" },
  contacted: { label: "Contacted", class: "bg-blue-100 text-blue-800 border-blue-200" },
  visit_planned: { label: "Visit Planned", class: "bg-purple-100 text-purple-800 border-purple-200" },
  completed: { label: "Completed", class: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  cancelled: { label: "Cancelled", class: "bg-gray-100 text-gray-700 border-gray-200" },
};

export default function CustomersManagementPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof initialCustomers)[0] | null>(null);

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.phone.includes(search) ||
      cust.device.toLowerCase().includes(search.toLowerCase()) ||
      cust.issue.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || cust.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-muted-foreground mt-1">
            Directory of customers who contacted RK MOBILES with device and enquiry records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm px-3 py-1 font-normal text-muted-foreground">
            Total Customers: <span className="font-semibold text-gray-900 ml-1">{customers.length}</span>
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name, phone, device..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-xs font-medium text-muted-foreground shrink-0">Status:</span>
          {["all", "new", "contacted", "visit_planned", "completed"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`text-xs px-3 py-1.5 rounded-full capitalize whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? "bg-rk-purple text-white font-medium"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Customers List Table (Desktop) & Cards (Mobile) */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-gray-700 font-medium">No customers found</p>
            <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/75 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-4 py-3">Device & Issue</th>
                    <th className="px-4 py-3">Visit Request</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Enquiries</th>
                    <th className="px-5 py-3 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredCustomers.map((c) => {
                    const badge = statusBadgeStyles[c.status] || {
                      label: c.status,
                      class: "bg-gray-100 text-gray-700 border-gray-200",
                    };
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
                            {c.device}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {c.issue}
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
                          {c.enquiriesCount} request{c.enquiriesCount > 1 ? "s" : ""}
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
                              Details
                            </Button>
                            <a
                              href={`tel:+91${c.phone}`}
                              className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Call customer"
                            >
                              <Phone className="h-3.5 w-3.5" />
                            </a>
                            <a
                              href={`https://wa.me/91${c.phone}?text=Hi%20${encodeURIComponent(
                                c.name
                              )}%2C%20this%20is%20RK%20MOBILES%20regarding%20your%20${encodeURIComponent(
                                c.device
                              )}%20enquiry.`}
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

            {/* Mobile / Tablet Cards */}
            <div className="lg:hidden divide-y divide-gray-100">
              {filteredCustomers.map((c) => {
                const badge = statusBadgeStyles[c.status] || {
                  label: c.status,
                  class: "bg-gray-100 text-gray-700 border-gray-200",
                };
                return (
                  <div key={c.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{c.name}</h3>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">+91 {c.phone}</p>
                      </div>
                      <Badge variant="outline" className={`text-xs border ${badge.class}`}>
                        {badge.label}
                      </Badge>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2.5 space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 font-medium text-gray-800">
                        <Smartphone className="h-3.5 w-3.5 text-rk-purple" />
                        <span>{c.device}</span>
                      </div>
                      <p className="text-gray-600 pl-5">Issue: {c.issue}</p>
                      {c.preferredDate && (
                        <p className="text-gray-500 pl-5 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Slot: {c.preferredDate}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => setSelectedCustomer(c)}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" /> View History
                      </Button>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:+91${c.phone}`}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-medium"
                        >
                          <Phone className="h-3.5 w-3.5" /> Call
                        </a>
                        <a
                          href={`https://wa.me/91${c.phone}?text=Hi%20${encodeURIComponent(
                            c.name
                          )}%2C%20this%20is%20RK%20MOBILES.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-green-50 text-rk-whatsapp font-medium"
                        >
                          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Customer History & Details Modal */}
      {selectedCustomer && (
        <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-gray-900">
                Customer Profile: {selectedCustomer.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Registered offline contact record and service interactions.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-sm mt-2">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100 text-xs">
                <div>
                  <span className="text-muted-foreground block">Phone:</span>
                  <span className="font-semibold text-gray-900 font-mono">+91 {selectedCustomer.phone}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Device:</span>
                  <span className="font-semibold text-gray-900">{selectedCustomer.device}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Service Needed:</span>
                  <span className="font-medium text-gray-800">{selectedCustomer.issue}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Visit Preference:</span>
                  <span className="font-medium text-gray-800">{selectedCustomer.preferredDate || "None"}</span>
                </div>
              </div>

              {selectedCustomer.notes && (
                <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-lg text-xs text-amber-900">
                  <span className="font-semibold block mb-0.5">Staff Notes:</span>
                  {selectedCustomer.notes}
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-rk-purple" />
                  Interaction Timeline
                </h4>
                <div className="border border-gray-100 rounded-xl divide-y divide-gray-100 bg-white">
                  {selectedCustomer.history.map((h) => (
                    <div key={h.id} className="p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">{h.service}</span>
                        <span className="text-gray-400 text-[11px]">{h.date}</span>
                      </div>
                      <p className="text-gray-600">{h.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <a
                  href={`tel:+91${selectedCustomer.phone}`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" /> Call Customer
                </a>
                <a
                  href={`https://wa.me/91${selectedCustomer.phone}?text=Hi%20${encodeURIComponent(
                    selectedCustomer.name
                  )}%2C%20this%20is%20RK%20MOBILES.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rk-whatsapp text-white text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
