"use client";

import { useState } from "react";
import {
  Settings,
  Building2,
  Phone,
  MapPin,
  Save,
  CheckCircle2,
  Lock,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BusinessSettingsPage() {
  const [formData, setFormData] = useState({
    businessName: "RK MOBILES",
    tagline: "Quality Service & Affordable Prices",
    description:
      "RK MOBILES is a trusted local mobile sales and service shop located in Dharapuram. We offer brand new mobile phones, quality accessories, professional hardware/software repairs, and essential digital services.",
    phone1: "+91 98650 13529",
    phone2: "+91 83291 66021",
    whatsappNumber: "919865013529",
    addressLine1: "C.S.I. Boys School Complex",
    addressLine2: "Pollachi Road",
    city: "Dharapuram",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=RK+MOBILES+C.S.I.+Boys+School+Complex+Pollachi+Road+Dharapuram",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSaved, setIsSaved] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus("error:Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setPasswordStatus("error:Password must be at least 8 characters");
      return;
    }
    setPasswordStatus("success:Password updated successfully");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setPasswordStatus(null), 3000);
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Business Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your business information, contact details, store location, and security.
        </p>
      </div>

      <div className="space-y-6">
        {/* Business Profile */}
        <form onSubmit={handleSettingsSubmit}>
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <Building2 className="h-5 w-5 text-rk-purple" />
              <h2 className="text-lg font-semibold text-gray-900">
                Shop Information & Branding
              </h2>
            </div>

            {isSaved && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                Settings saved successfully!
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData({ ...formData, tagline: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">About Business Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                This appears on your homepage & about page to welcome local customers.
              </p>
            </div>

            {/* Contact Details */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 pb-3">
                <Phone className="h-4 w-4 text-rk-purple" />
                <h3 className="font-semibold text-gray-900 text-sm">
                  Contact & Communication
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone1">Primary Phone</Label>
                  <Input
                    id="phone1"
                    value={formData.phone1}
                    onChange={(e) =>
                      setFormData({ ...formData, phone1: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone2">Secondary Phone</Label>
                  <Input
                    id="phone2"
                    value={formData.phone2}
                    onChange={(e) =>
                      setFormData({ ...formData, phone2: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber" className="flex items-center gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5 text-rk-whatsapp" />
                    WhatsApp Number
                  </Label>
                  <Input
                    id="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsappNumber: e.target.value })
                    }
                    placeholder="919865013529"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address & Location */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 pb-3">
                <MapPin className="h-4 w-4 text-rk-purple" />
                <h3 className="font-semibold text-gray-900 text-sm">
                  Physical Store Location
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    value={formData.addressLine1}
                    onChange={(e) =>
                      setFormData({ ...formData, addressLine1: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2 (Road/Area)</Label>
                  <Input
                    id="addressLine2"
                    value={formData.addressLine2}
                    onChange={(e) =>
                      setFormData({ ...formData, addressLine2: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City / Town</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mapLink">Google Maps Direct Link</Label>
                <Input
                  id="mapLink"
                  value={formData.mapLink}
                  onChange={(e) =>
                    setFormData({ ...formData, mapLink: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Used by "Get Directions" buttons across your website.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <Button type="submit" className="gap-2 bg-rk-purple hover:bg-rk-purple-dark">
                <Save className="h-4 w-4" />
                Save Business Settings
              </Button>
            </div>
          </div>
        </form>

        {/* Security / Password Change */}
        <form onSubmit={handlePasswordSubmit}>
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <Lock className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Owner Account Security
              </h2>
            </div>

            {passwordStatus && (
              <div
                className={`flex items-center gap-2 p-3 rounded-lg text-sm border ${
                  passwordStatus.startsWith("success:")
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {passwordStatus.startsWith("success:") ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                {passwordStatus.replace(/^(success:|error:)/, "")}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <Button type="submit" variant="outline" className="gap-2">
                Update Password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
