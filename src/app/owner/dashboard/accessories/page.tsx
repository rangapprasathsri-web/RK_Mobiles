"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Plus,
  Search,
  Eye,
  EyeOff,
  Package,
  RefreshCw,
} from "lucide-react";
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

interface Accessory {
  id: string;
  name: string;
  category: string;
  brand?: string;
  price: number;
  stock: number;
  isActive: boolean;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function AccessoriesManagementPage() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Mobile Covers",
    brand: "Generic",
    price: "",
    stock: "10",
  });

  const fetchAccessories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/accessories");
      if (res.ok) {
        const data = await res.json();
        setAccessories(data.accessories || []);
      }
    } catch (err) {
      console.error("Failed to fetch accessories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/accessories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setAccessories([data.accessory, ...accessories]);
        setIsAddOpen(false);
        setFormData({
          name: "",
          category: "Mobile Covers",
          brand: "Generic",
          price: "",
          stock: "10",
        });
      }
    } catch (err) {
      console.error("Failed to add accessory:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleActive = async (id: string) => {
    const target = accessories.find((a) => a.id === id);
    const newVal = !target?.isActive;
    setAccessories((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: newVal } : a))
    );
    try {
      await fetch("/api/accessories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: newVal }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = accessories.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Accessories Catalogue</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage mobile cases, tempered glass, fast chargers, and accessories shown on the website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchAccessories}
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
            Add Accessory
          </Button>
        </div>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search accessories by name or category..."
          className="pl-9 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-gray-900">{item.name}</td>
                  <td className="px-4 py-4 text-gray-600 text-xs">{item.category}</td>
                  <td className="px-4 py-4 text-gray-600 text-xs">{item.brand || "Generic"}</td>
                  <td className="px-4 py-4 font-bold text-gray-900">{formatPrice(item.price)}</td>
                  <td className="px-4 py-4">
                    <Badge variant="outline" className="text-xs">
                      {item.stock} in stock
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      className={`text-[10px] ${
                        item.isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.isActive ? "Active on Site" : "Hidden"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActive(item.id)}
                      className="gap-1 text-xs text-gray-600"
                    >
                      {item.isActive ? (
                        <>
                          <EyeOff className="h-3.5 w-3.5" /> Hide
                        </>
                      ) : (
                        <>
                          <Eye className="h-3.5 w-3.5" /> Show
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {filtered.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.category} • {formatPrice(item.price)}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleActive(item.id)}
                className="text-xs"
              >
                {item.isActive ? "Hide" : "Show"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Accessory Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Add New Accessory</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-semibold">Accessory Name *</Label>
              <Input
                required
                placeholder="e.g. 65W GaN Fast Charger"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Category</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 w-full bg-white border border-gray-200 rounded-lg p-2 text-sm"
                >
                  <option value="Mobile Covers">Mobile Covers</option>
                  <option value="Tempered Glass">Tempered Glass</option>
                  <option value="Chargers">Chargers</option>
                  <option value="Cables">Cables</option>
                  <option value="Power Banks">Power Banks</option>
                  <option value="TWS Earbuds">TWS Earbuds</option>
                  <option value="Smart Watches">Smart Watches</option>
                </select>
              </div>
              <div>
                <Label className="text-xs font-semibold">Brand</Label>
                <Input
                  placeholder="e.g. boAt, Samsung"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="mt-1 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Price (₹) *</Label>
                <Input
                  required
                  type="number"
                  placeholder="299"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">Stock Quantity</Label>
                <Input
                  type="number"
                  placeholder="10"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="mt-1 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={isSubmitting} className="bg-rk-purple hover:bg-rk-purple-dark text-white">
                {isSubmitting ? "Adding..." : "Add to Catalogue"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
