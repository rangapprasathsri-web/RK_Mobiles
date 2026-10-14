"use client";

import { useEffect, useState } from "react";
import { Tag, Plus, Eye, EyeOff, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Offer {
  id: string;
  title: string;
  description: string;
  discountText: string;
  productType: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function OffersManagementPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountText: "",
    productType: "Accessories",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
  });

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/offers");
      if (res.ok) {
        const data = await res.json();
        setOffers(data.offers || []);
      }
    } catch (err) {
      console.error("Failed to fetch offers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setOffers([data.offer, ...offers]);
        setIsAddOpen(false);
        setFormData({
          title: "",
          description: "",
          discountText: "",
          productType: "Accessories",
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
        });
      }
    } catch (err) {
      console.error("Failed to create offer:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleActive = async (id: string) => {
    const target = offers.find((o) => o.id === id);
    const newVal = !target?.isActive;
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isActive: newVal } : o))
    );
    try {
      await fetch("/api/offers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: newVal }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Special Offers & Deals</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage promotional banners and discounts displayed on the website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchOffers}
            disabled={isLoading}
            className="gap-1.5 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="gap-2 bg-rk-purple hover:bg-rk-purple-dark shrink-0 text-xs font-semibold"
          >
            <Plus className="h-4 w-4" />
            Create Offer
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-sm text-muted-foreground">
          Loading active offers...
        </div>
      ) : offers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Tag className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-900 mb-1">No Active Offers</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Create promotional discounts or seasonal deals to display on the website offers page.
          </p>
          <Button onClick={() => setIsAddOpen(true)} size="sm" className="bg-rk-purple hover:bg-rk-purple-dark text-xs">
            Create First Offer
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 bg-rk-purple-50 rounded-xl flex items-center justify-center shrink-0">
                    <Tag className="h-6 w-6 text-rk-purple" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-base">{offer.title}</h3>
                      <Badge
                        className={`text-[10px] border-0 ${
                          offer.isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {offer.isActive ? "Active on Website" : "Hidden"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {offer.discountText}
                      </span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {offer.productType}
                      </Badge>
                      <span>•</span>
                      <div className="flex items-center gap-1 font-mono text-gray-600">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{offer.startDate} to {offer.endDate || "Ongoing"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(offer.id)}
                    className="gap-1.5 text-xs text-gray-700"
                  >
                    {offer.isActive ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" /> Deactivate
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" /> Activate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Offer Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Create New Offer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-semibold">Offer Title *</Label>
              <Input
                required
                placeholder="e.g. Festival Mobile Screen Combo Deal"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Discount Badge Text *</Label>
              <Input
                required
                placeholder="e.g. Flat 15% Off or Buy 1 Get 1"
                value={formData.discountText}
                onChange={(e) => setFormData({ ...formData, discountText: e.target.value })}
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Description</Label>
              <Input
                placeholder="Details of what the customer receives at the shop"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Product Type</Label>
                <select
                  value={formData.productType}
                  onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                  className="mt-1 w-full bg-white border border-gray-200 rounded-lg p-2 text-sm"
                >
                  <option value="Accessories">Accessories</option>
                  <option value="Mobile Phones">Mobile Phones</option>
                  <option value="Repair Services">Repair Services</option>
                  <option value="General">General Offer</option>
                </select>
              </div>
              <div>
                <Label className="text-xs font-semibold">End Date</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="mt-1 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={isSubmitting} className="bg-rk-purple hover:bg-rk-purple-dark text-white">
                {isSubmitting ? "Publishing..." : "Publish Offer"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
