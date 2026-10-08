"use client";

import { useState } from "react";
import { Tag, Plus, Edit, Eye, EyeOff, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sampleOffers = [
  {
    id: "1",
    title: "Special Offer on Mobile Accessories",
    description: "Get special discounts on selected mobile accessories.",
    discountText: "Up to 20% Off",
    productType: "Accessories",
    isActive: true,
    startDate: "2026-10-01",
    endDate: "2026-10-31",
  },
];

export default function OffersManagementPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offers</h1>
          <p className="text-muted-foreground mt-1">Manage offers and promotions.</p>
        </div>
        <Button className="gap-2 bg-rk-purple hover:bg-rk-purple-dark shrink-0">
          <Plus className="h-4 w-4" />
          Create Offer
        </Button>
      </div>

      <div className="space-y-4">
        {sampleOffers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-12 h-12 bg-rk-purple-50 rounded-xl flex items-center justify-center shrink-0">
                  <Tag className="h-6 w-6 text-rk-purple" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                    <Badge className={`text-xs border-0 ${offer.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                      {offer.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-medium text-rk-red">{offer.discountText}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs border-gray-200">{offer.productType}</Badge>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{offer.startDate} — {offer.endDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5 text-muted-foreground" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  {offer.isActive ? <Eye className="h-3.5 w-3.5 text-muted-foreground" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {sampleOffers.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <Tag className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No offers created yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
