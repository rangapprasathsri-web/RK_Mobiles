"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  Send,
  Check,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const serviceOptions = [
  "Display Replacement",
  "Battery Replacement",
  "Charging Port Repair",
  "Charging Problems",
  "Software Service",
  "Operating System Issues",
  "Camera Repair",
  "Speaker Repair",
  "Microphone Repair",
  "Network Issues",
  "Signal Problems",
  "Power Issues",
  "Phone Not Turning On",
  "Water Damage Inspection",
  "Performance Issues",
  "Heating Problems",
  "Button Problems",
  "Other Mobile Repairs",
];

export default function ServiceEnquiryPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    deviceBrand: "",
    deviceModel: "",
    serviceRequired: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Mobile number is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, "").replace("+91", "")))
      newErrors.phone = "Enter a valid 10-digit mobile number";
    if (!formData.serviceRequired)
      newErrors.serviceRequired = "Please select a service";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "service",
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setErrors({ form: "Something went wrong. Please try again or contact us directly." });
      }
    } catch {
      setErrors({ form: "Network error. Please try again or call us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-rk-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-rk-green" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Your request has been received
            </h1>
            <p className="text-muted-foreground mb-2">
              We will contact you using the mobile number provided.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Please visit RK MOBILES at Pollachi Road, Dharapuram for
              inspection and service.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/">
                <Button
                  variant="outline"
                  className="gap-2 border-rk-purple/30 text-rk-purple"
                >
                  Back to Home
                </Button>
              </Link>
              <a href="tel:+919865013529">
                <Button className="gap-2 bg-rk-purple hover:bg-rk-purple-dark">
                  <Phone className="h-4 w-4" />
                  Call RK MOBILES
                </Button>
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-rk-purple-dark to-rk-purple py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Request a Visit
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Tell us what you need and plan your visit to RK MOBILES. We will
            contact you using the mobile number provided.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10 lg:py-14 bg-gray-50/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            {errors.form && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-rk-red shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errors.form}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">
                    Name <span className="text-rk-red">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={errors.name ? "border-rk-red" : ""}
                  />
                  {errors.name && (
                    <p className="text-xs text-rk-red mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium mb-1.5 block">
                    Mobile Number <span className="text-rk-red">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={errors.phone ? "border-rk-red" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-rk-red mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Device Brand */}
                <div>
                  <Label htmlFor="deviceBrand" className="text-sm font-medium mb-1.5 block">
                    Device Brand
                  </Label>
                  <Input
                    id="deviceBrand"
                    placeholder="e.g. Samsung, Xiaomi"
                    value={formData.deviceBrand}
                    onChange={(e) =>
                      setFormData({ ...formData, deviceBrand: e.target.value })
                    }
                  />
                </div>

                {/* Device Model */}
                <div>
                  <Label htmlFor="deviceModel" className="text-sm font-medium mb-1.5 block">
                    Device Model
                  </Label>
                  <Input
                    id="deviceModel"
                    placeholder="e.g. Galaxy A55, Redmi Note 13"
                    value={formData.deviceModel}
                    onChange={(e) =>
                      setFormData({ ...formData, deviceModel: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Service Required */}
              <div>
                <Label htmlFor="serviceRequired" className="text-sm font-medium mb-1.5 block">
                  Service Required <span className="text-rk-red">*</span>
                </Label>
                <select
                  id="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      serviceRequired: e.target.value,
                    })
                  }
                  className={`w-full rounded-md border bg-background px-3 py-2.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    errors.serviceRequired
                      ? "border-rk-red"
                      : "border-input"
                  }`}
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.serviceRequired && (
                  <p className="text-xs text-rk-red mt-1">
                    {errors.serviceRequired}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Preferred Date */}
                <div>
                  <Label htmlFor="preferredDate" className="text-sm font-medium mb-1.5 block">
                    Preferred Visit Date
                  </Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredDate: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Preferred Time */}
                <div>
                  <Label htmlFor="preferredTime" className="text-sm font-medium mb-1.5 block">
                    Preferred Visit Time
                  </Label>
                  <Input
                    id="preferredTime"
                    type="time"
                    value={formData.preferredTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-sm font-medium mb-1.5 block">
                  Additional Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue or requirement..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-rk-purple hover:bg-rk-purple-dark gap-2 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit Request
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                This is an enquiry / visit request. The actual service will be
                performed at the physical RK MOBILES shop after inspection.
              </p>
            </form>
          </div>

          {/* Alternative contact */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              You can also contact us directly
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="tel:+919865013529">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-rk-purple/30 text-rk-purple"
                >
                  <Phone className="h-4 w-4" />
                  Call +91 98650 13529
                </Button>
              </a>
              <a
                href="https://wa.me/919865013529?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20mobile%20repair%20at%20RK%20MOBILES."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="gap-2 bg-rk-whatsapp hover:bg-rk-whatsapp/90 text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
