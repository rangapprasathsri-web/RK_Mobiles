"use client";

import { useState } from "react";
import { Wrench, Plus, Edit, Eye, EyeOff, Star, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sampleServices = [
  { id: "1", name: "Display Replacement", shortDescription: "Screen repair for cracked or damaged displays", isFeatured: true, isActive: true, sortOrder: 1 },
  { id: "2", name: "Battery Replacement", shortDescription: "Battery service for phones with poor battery life", isFeatured: true, isActive: true, sortOrder: 2 },
  { id: "3", name: "Charging Port Repair", shortDescription: "Repair or replacement of damaged charging ports", isFeatured: true, isActive: true, sortOrder: 3 },
  { id: "4", name: "Charging Problems", shortDescription: "Diagnosis and repair of all charging issues", isFeatured: true, isActive: true, sortOrder: 4 },
  { id: "5", name: "Software Service", shortDescription: "Software troubleshooting and optimization", isFeatured: true, isActive: true, sortOrder: 5 },
  { id: "6", name: "Operating System Issues", shortDescription: "OS repair for boot issues and system failures", isFeatured: true, isActive: true, sortOrder: 6 },
  { id: "7", name: "Camera Repair", shortDescription: "Front and rear camera repair and replacement", isFeatured: false, isActive: true, sortOrder: 7 },
  { id: "8", name: "Speaker Repair", shortDescription: "Speaker diagnosis and repair", isFeatured: false, isActive: true, sortOrder: 8 },
  { id: "9", name: "Microphone Repair", shortDescription: "Microphone repair for call issues", isFeatured: false, isActive: true, sortOrder: 9 },
  { id: "10", name: "Network Issues", shortDescription: "Network and connectivity fixes", isFeatured: false, isActive: true, sortOrder: 10 },
  { id: "11", name: "Water Damage Inspection", shortDescription: "Inspection for water-damaged phones", isFeatured: false, isActive: true, sortOrder: 14 },
  { id: "12", name: "Other Mobile Repairs", shortDescription: "All other mobile repair services", isFeatured: false, isActive: true, sortOrder: 18 },
];

export default function ServicesManagementPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-muted-foreground mt-1">Manage mobile repair and service categories.</p>
        </div>
        <Button className="gap-2 bg-rk-purple hover:bg-rk-purple-dark shrink-0">
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {sampleServices.map((service) => (
            <div key={service.id} className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors">
              <div className="text-muted-foreground cursor-grab hidden sm:block">
                <GripVertical className="h-4 w-4" />
              </div>
              <div className="w-10 h-10 bg-rk-purple-50 rounded-lg flex items-center justify-center shrink-0">
                <Wrench className="h-5 w-5 text-rk-purple" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-900">{service.name}</h3>
                  {service.isFeatured && (
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                  )}
                  {!service.isActive && (
                    <Badge variant="outline" className="text-xs border-gray-200">Inactive</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{service.shortDescription}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5 text-muted-foreground" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  {service.isActive ? <Eye className="h-3.5 w-3.5 text-muted-foreground" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
