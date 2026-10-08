import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";

const initialServices = [
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    try {
      const where: Record<string, unknown> = { isActive: true };
      if (featured === "true") {
        where.isFeatured = true;
      }

      const services = await prisma.service.findMany({
        where,
        orderBy: { sortOrder: "asc" },
      });

      if (services && services.length > 0) {
        return NextResponse.json({ success: true, services });
      }
    } catch {
      // Fall through to fallback
    }

    let result = [...initialServices];
    if (featured === "true") {
      result = result.filter((s) => s.isFeatured);
    }

    return NextResponse.json({ success: true, services: result });
  } catch (error) {
    console.error("Services GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getOwnerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, shortDescription, isFeatured } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Service name is required" },
        { status: 400 }
      );
    }

    const fallbackService = {
      id: `svc-${Date.now()}`,
      name,
      shortDescription: shortDescription || "",
      isFeatured: Boolean(isFeatured),
      isActive: true,
      sortOrder: 99,
    };

    return NextResponse.json({ success: true, service: fallbackService });
  } catch (error) {
    console.error("Services POST error:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
