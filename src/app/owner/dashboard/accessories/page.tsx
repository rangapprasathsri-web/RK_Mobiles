"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Plus,
  Search,
  Edit,
  Eye,
  EyeOff,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const sampleAccessories = [
  { id: "1", name: "Samsung Galaxy A55 Back Cover", category: "Mobile Covers", brand: "Generic", price: 299, stock: 25, isActive: true },
  { id: "2", name: "iPhone 15 Tempered Glass", category: "Tempered Glass", brand: "Generic", price: 199, stock: 30, isActive: true },
  { id: "3", name: "20W Fast Charger", category: "Chargers", brand: "Samsung", price: 899, stock: 10, isActive: true },
  { id: "4", name: "10000mAh Power Bank", category: "Power Banks", brand: "Xiaomi", price: 1499, stock: 5, isActive: true },
  { id: "5", name: "TWS Earbuds Pro", category: "TWS Earbuds", brand: "boAt", price: 1999, stock: 8, isActive: true },
  { id: "6", name: "Smart Watch Lite", category: "Smart Watches", brand: "Noise", price: 2499, stock: 3, isActive: true },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(price);
}

export default function AccessoriesManagementPage() {
  const [search, setSearch] = useState("");
  const filtered = sampleAccessories.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accessories</h1>
          <p className="text-muted-foreground mt-1">Manage mobile accessories in your catalogue.</p>
        </div>
        <Button className="gap-2 bg-rk-purple hover:bg-rk-purple-dark shrink-0">
          <Plus className="h-4 w-4" />
          Add Accessory
        </Button>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search accessories..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Product</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Category</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Brand</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Price</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Stock</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((accessory) => (
                <tr key={accessory.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <ShoppingBag className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">{accessory.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant="outline" className="text-xs">{accessory.category}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">{accessory.brand}</td>
                  <td className="px-4 py-3.5 text-sm font-medium text-gray-900">{formatPrice(accessory.price)}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Package className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{accessory.stock}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5 text-muted-foreground" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {accessory.isActive ? <Eye className="h-3.5 w-3.5 text-muted-foreground" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-gray-100">
          {filtered.map((accessory) => (
            <div key={accessory.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{accessory.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{accessory.category} • {accessory.brand}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-sm font-semibold text-rk-purple">{formatPrice(accessory.price)}</span>
                    <span className="text-xs text-muted-foreground">Stock: {accessory.stock}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No accessories found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
