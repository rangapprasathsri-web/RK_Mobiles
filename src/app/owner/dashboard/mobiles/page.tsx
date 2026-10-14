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
  DialogDescription,
} from "@/components/ui/dialog";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

const stockColors: Record<string, string> = {
  in_stock: "bg-green-100 text-green-800",
  low_stock: "bg-yellow-100 text-yellow-800",
  out_of_stock: "bg-red-100 text-red-800",
};

export default function MobilesManagementPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit dialog state
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

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
    setIsLoading(true);
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        if (data.products) {
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
      // Failed to fetch
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenEdit = (product: any) => {
    setEditingProduct({
      id: product.id,
      name: product.name,
      brand: product.brand,
      ram: product.ram || "",
      storage: product.storage || "",
      price: product.price,
      stock: product.stock,
      availability: product.availability || "in_stock",
      isFeatured: Boolean(product.isFeatured),
      isActive: product.isActive !== false,
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name || !editingProduct.price) return;

    setIsSubmitting(true);
    try {
      const payload = {
        id: editingProduct.id,
        name: editingProduct.name,
        brand: editingProduct.brand,
        ram: editingProduct.ram,
        storage: editingProduct.storage,
        price: Number(editingProduct.price),
        stock: Number(editingProduct.stock),
        availability: editingProduct.availability,
        isFeatured: Boolean(editingProduct.isFeatured),
        isActive: Boolean(editingProduct.isActive),
      };

      const res = await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...p, ...payload } : p))
        );
        setIsEditOpen(false);
        setEditingProduct(null);
        await fetchProducts();
      }
    } catch (err) {
      console.error("Failed to edit product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        await fetchProducts();
      }
    } catch (err) {
      console.error("Failed to add product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFeatured = async (id: string) => {
    const target = products.find((p) => p.id === id);
    const newVal = !target?.isFeatured;
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: newVal } : p))
    );
    try {
      await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isFeatured: newVal }),
      });
    } catch (err) {
      console.error("Failed to toggle featured:", err);
      fetchProducts();
    }
  };

  const toggleActive = async (id: string) => {
    const target = products.find((p) => p.id === id);
    const newVal = !target?.isActive;
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: newVal } : p))
    );
    try {
      await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: newVal }),
      });
    } catch (err) {
      console.error("Failed to toggle active:", err);
      fetchProducts();
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Remove this mobile phone from the catalogue?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      try {
        await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      } catch (err) {
        console.error("Failed to delete product:", err);
        fetchProducts();
      }
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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchProducts}
            className="gap-1.5 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="gap-2 bg-rk-purple hover:bg-rk-purple-dark shrink-0"
          >
            <Plus className="h-4 w-4" />
            Add Mobile
          </Button>
        </div>
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
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            Loading mobile phones catalogue...
          </div>
        ) : (
          <>
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
                              <button
                                onClick={() => toggleFeatured(product.id)}
                                className="flex items-center gap-1 mt-0.5 group text-left cursor-pointer"
                              >
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs text-yellow-600 group-hover:underline">
                                  Featured
                                </span>
                              </button>
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
                            stockColors[product.availability] || "bg-gray-100 text-gray-700"
                          } border-0`}
                        >
                          {product.availability ? product.availability.replace("_", " ") : "in stock"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEdit(product)}
                            title="Edit Mobile Phone"
                            className="h-8 w-8 hover:text-rk-purple hover:bg-rk-purple-50"
                          >
                            <Edit className="h-3.5 w-3.5 text-muted-foreground hover:text-rk-purple" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleActive(product.id)}
                            title={product.isActive ? "Hide from website" : "Show on website"}
                            className="h-8 w-8"
                          >
                            {product.isActive ? (
                              <Eye className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <EyeOff className="h-3.5 w-3.5 text-gray-400" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteProduct(product.id)}
                            title="Delete Mobile Phone"
                            className="h-8 w-8 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-red-600" />
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
                              stockColors[product.availability] || "bg-gray-100 text-gray-700"
                            } border-0`}
                          >
                            Stock: {product.stock}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(product)}
                        title="Edit Mobile"
                        className="h-8 w-8 hover:text-rk-purple"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleActive(product.id)}
                        className="h-8 w-8"
                      >
                        {product.isActive ? (
                          <Eye className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5 text-gray-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteProduct(product.id)}
                        className="h-8 w-8 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
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
          </>
        )}
      </div>

      {/* Edit Mobile Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">
              Edit Mobile Phone
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Update pricing, specifications, stock, and visibility for this model.
            </DialogDescription>
          </DialogHeader>

          {editingProduct && (
            <form onSubmit={handleEditSubmit} className="space-y-4 text-sm mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="edit-name">Phone Name *</Label>
                <Input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-brand">Brand</Label>
                  <select
                    id="edit-brand"
                    className="w-full text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800"
                    value={editingProduct.brand}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, brand: e.target.value })
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
                  <Label htmlFor="edit-price">Price (₹) *</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-ram">RAM</Label>
                  <Input
                    id="edit-ram"
                    placeholder="8GB"
                    value={editingProduct.ram}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, ram: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-storage">Storage</Label>
                  <Input
                    id="edit-storage"
                    placeholder="128GB"
                    value={editingProduct.storage}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, storage: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-stock">Stock Units</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, stock: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-avail">Availability</Label>
                  <select
                    id="edit-avail"
                    className="w-full text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800"
                    value={editingProduct.availability}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, availability: e.target.value })
                    }
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={editingProduct.isFeatured}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })
                    }
                    className="rounded border-gray-300 text-rk-purple focus:ring-rk-purple"
                  />
                  <Label htmlFor="edit-featured" className="text-xs cursor-pointer">
                    Feature on Homepage
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-active"
                    checked={editingProduct.isActive}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, isActive: e.target.checked })
                    }
                    className="rounded border-gray-300 text-rk-purple focus:ring-rk-purple"
                  />
                  <Label htmlFor="edit-active" className="text-xs cursor-pointer">
                    Visible on Website
                  </Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-rk-purple hover:bg-rk-purple-dark text-white"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

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
