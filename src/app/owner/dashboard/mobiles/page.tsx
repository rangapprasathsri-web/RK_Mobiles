"use client";

import { useEffect, useState } from "react";
import {
  Smartphone,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Package,
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
  DialogDescription,
} from "@/components/ui/dialog";

// Sample products fallback
const initialProducts = [
  {
    id: "1",
    name: "Samsung Galaxy A55 5G",
    brand: "Samsung",
    ram: "8GB",
    storage: "128GB",
    price: 27999,
    stock: 5,
    availability: "in_stock",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy A16",
    brand: "Samsung",
    ram: "6GB",
    storage: "128GB",
    price: 13999,
    stock: 8,
    availability: "in_stock",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "3",
    name: "Xiaomi Redmi Note 13 Pro",
    brand: "Xiaomi",
    ram: "8GB",
    storage: "256GB",
    price: 23999,
    stock: 4,
    availability: "in_stock",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "4",
    name: "Realme Narzo 70 Pro",
    brand: "Realme",
    ram: "8GB",
    storage: "128GB",
    price: 17999,
    stock: 6,
    availability: "in_stock",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "5",
    name: "Vivo Y200e",
    brand: "Vivo",
    ram: "6GB",
    storage: "128GB",
    price: 14999,
    stock: 7,
    availability: "in_stock",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "6",
    name: "OPPO A3 Pro",
    brand: "OPPO",
    ram: "8GB",
    storage: "128GB",
    price: 18999,
    stock: 3,
    availability: "low_stock",
    isFeatured: true,
    isActive: true,
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price);
}

const stockColors: Record<string, string> = {
  in_stock: "bg-green-100 text-green-800",
  low_stock: "bg-yellow-100 text-yellow-800",
  out_of_stock: "bg-red-100 text-red-800",
};

export default function MobilesManagementPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "Samsung",
    ram: "8GB",
    storage: "128GB",
    price: "",
    stock: "5",
    availability: "in_stock",
    isFeatured: false,
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          const dbItems = data.products.map((p: any) => ({
            id: p.id,
            name: p.name,
            brand: typeof p.brand === "object" ? p.brand?.name : p.brand || "Generic",
            ram: p.ram || "8GB",
            storage: p.storage || "128GB",
            price: Number(p.price),
            stock: Number(p.stock) || 0,
            availability: p.availability || "in_stock",
            isFeatured: Boolean(p.isFeatured),
            isActive: p.isActive !== false,
          }));
          setProducts(dbItems);
        }
      }
    } catch {
      // Use fallback
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        brand: formData.brand,
        ram: formData.ram,
        storage: formData.storage,
        price: Number(formData.price),
        stock: Number(formData.stock),
        availability: formData.availability,
        isFeatured: formData.isFeatured,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const created = {
          id: data.product?.id || `p-${Date.now()}`,
          name: formData.name,
          brand: formData.brand,
          ram: formData.ram,
          storage: formData.storage,
          price: Number(formData.price),
          stock: Number(formData.stock),
          availability: formData.availability,
          isFeatured: formData.isFeatured,
          isActive: true,
        };
        setProducts([created, ...products]);
        setIsAddOpen(false);
        setFormData({
          name: "",
          brand: "Samsung",
          ram: "8GB",
          storage: "128GB",
          price: "",
          stock: "5",
          availability: "in_stock",
          isFeatured: false,
        });
      }
    } catch (err) {
      console.error("Failed to add product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const toggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const deleteProduct = (id: string) => {
    if (confirm("Remove this mobile phone from the catalogue?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mobile Phones</h1>
          <p className="text-muted-foreground mt-1">
            Manage mobile phones in your catalogue.
          </p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="gap-2 bg-rk-purple hover:bg-rk-purple-dark shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add Mobile
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search mobiles..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products Table/Cards */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">
                  Brand
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">
                  Specs
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">
                  Stock
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <Smartphone className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        {product.isFeatured && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-yellow-600">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">
                    {product.brand}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">
                    {product.ram} / {product.storage}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-medium text-gray-900">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Package className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{product.stock}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge
                      className={`text-xs ${
                        stockColors[product.availability]
                      } border-0`}
                    >
                      {product.availability.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {product.isActive ? (
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {filtered.map((product) => (
            <div key={product.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {product.brand} • {product.ram} / {product.storage}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-sm font-semibold text-rk-purple">
                        {formatPrice(product.price)}
                      </span>
                      <Badge
                        className={`text-[10px] ${
                          stockColors[product.availability]
                        } border-0`}
                      >
                        Stock: {product.stock}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <Smartphone className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No mobiles found.</p>
          </div>
        )}
      </div>

      {/* Add Mobile Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">
              Add Mobile Phone
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Add a new mobile phone model to your shop catalogue.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddSubmit} className="space-y-4 text-sm mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="m-name">Phone Name *</Label>
              <Input
                id="m-name"
                placeholder="e.g. Samsung Galaxy S24"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="m-brand">Brand</Label>
                <select
                  id="m-brand"
                  className="w-full text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                >
                  <option value="Samsung">Samsung</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Realme">Realme</option>
                  <option value="Vivo">Vivo</option>
                  <option value="OPPO">OPPO</option>
                  <option value="OnePlus">OnePlus</option>
                  <option value="Apple">Apple</option>
                  <option value="Motorola">Motorola</option>
                  <option value="POCO">POCO</option>
                  <option value="iQOO">iQOO</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="m-price">Price (₹) *</Label>
                <Input
                  id="m-price"
                  type="number"
                  placeholder="24999"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="m-ram">RAM</Label>
                <Input
                  id="m-ram"
                  placeholder="8GB"
                  value={formData.ram}
                  onChange={(e) =>
                    setFormData({ ...formData, ram: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-storage">Storage</Label>
                <Input
                  id="m-storage"
                  placeholder="128GB"
                  value={formData.storage}
                  onChange={(e) =>
                    setFormData({ ...formData, storage: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="m-stock">Stock Units</Label>
                <Input
                  id="m-stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-avail">Availability</Label>
                <select
                  id="m-avail"
                  className="w-full text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800"
                  value={formData.availability}
                  onChange={(e) =>
                    setFormData({ ...formData, availability: e.target.value })
                  }
                >
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="m-featured"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
                className="rounded border-gray-300 text-rk-purple focus:ring-rk-purple"
              />
              <Label htmlFor="m-featured" className="text-xs cursor-pointer">
                Feature on Homepage Showcase
              </Label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsAddOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-rk-purple hover:bg-rk-purple-dark text-white"
              >
                {isSubmitting ? "Saving..." : "Save Mobile"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
