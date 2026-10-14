"use client";

import { useEffect, useState } from "react";
import {
  Wrench,
  Plus,
  Eye,
  EyeOff,
  Star,
  Trash2,
  RefreshCw,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
}

export default function ServicesManagementPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    isFeatured: false,
  });

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/services?all=true");
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleActive = async (id: string, current: boolean) => {
    const nextState = !current;
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: nextState } : s))
    );
    try {
      await fetch("/api/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: nextState }),
      });
    } catch (err) {
      console.error("Failed to toggle service status:", err);
      fetchServices();
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    const nextState = !current;
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFeatured: nextState } : s))
    );
    try {
      await fetch("/api/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isFeatured: nextState }),
      });
    } catch (err) {
      console.error("Failed to toggle service featured status:", err);
      fetchServices();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this service category?")) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
    try {
      await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete service:", err);
      fetchServices();
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsAddOpen(false);
        setFormData({ name: "", shortDescription: "", isFeatured: false });
        await fetchServices();
      }
    } catch (err) {
      console.error("Failed to add service:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.shortDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Services & Repairs</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage mobile repair categories displayed on the website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchServices}
            className="gap-1.5 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={() => setIsAddOpen(true)}
            className="gap-1.5 bg-rk-purple hover:bg-rk-purple-dark text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Service
          </Button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service categories..."
            className="pl-9 bg-slate-50 border-gray-200 text-sm"
          />
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            Loading service categories...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3 border border-slate-100">
              <Wrench className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">No Services Found</h3>
            <p className="text-xs text-muted-foreground">
              {search ? "No services match your search." : "No service categories available."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between gap-4 p-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-rk-purple-50 text-rk-purple rounded-lg flex items-center justify-center shrink-0">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900 truncate">{service.name}</h3>
                      {service.isFeatured && (
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 shrink-0" />
                      )}
                      {!service.isActive && (
                        <Badge variant="outline" className="text-[10px] text-gray-500 border-gray-200">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleFeatured(service.id, service.isFeatured)}
                    title={service.isFeatured ? "Remove from featured" : "Feature on homepage"}
                    className="h-8 w-8 text-yellow-500"
                  >
                    <Star className={`h-4 w-4 ${service.isFeatured ? "fill-yellow-500" : ""}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleActive(service.id, service.isActive)}
                    title={service.isActive ? "Hide from website" : "Show on website"}
                    className="h-8 w-8 text-muted-foreground hover:text-gray-900"
                  >
                    {service.isActive ? <Eye className="h-4 w-4 text-emerald-600" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(service.id)}
                    title="Delete service"
                    className="h-8 w-8 text-muted-foreground hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Service Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a repair or service category to display on RK MOBILES website.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="svc-name">Service Name *</Label>
              <Input
                id="svc-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Motherboard Repair"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="svc-desc">Short Description</Label>
              <Textarea
                id="svc-desc"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief description of the service and symptoms..."
                rows={3}
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="svc-feat"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-rk-purple focus:ring-rk-purple"
              />
              <Label htmlFor="svc-feat" className="text-sm font-medium cursor-pointer">
                Feature on Homepage
              </Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-rk-purple hover:bg-rk-purple-dark text-white"
              >
                {isSubmitting ? "Adding..." : "Add Service"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
