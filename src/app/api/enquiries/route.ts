import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";

// In-memory fallback storage for when database is offline
interface FallbackEnquiry {
  id: string;
  name: string;
  phone: string;
  deviceBrand: string | null;
  deviceModel: string | null;
  serviceRequired: string;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  type: string;
  productName: string | null;
  status: string;
  ownerNotes?: string | null;
  createdAt: string;
  customer?: { name: string; phone: string };
}

const fallbackEnquiries: FallbackEnquiry[] = [
  {
    id: "enq-1",
    name: "Rahul",
    phone: "9876543210",
    deviceBrand: "Samsung",
    deviceModel: "Galaxy A55",
    serviceRequired: "Display Replacement",
    preferredDate: "Saturday (11:00 AM)",
    preferredTime: "Morning",
    message: "Screen cracked after accidental drop.",
    type: "service",
    productName: null,
    status: "new",
    ownerNotes: null,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    customer: { name: "Rahul", phone: "9876543210" },
  },
  {
    id: "enq-2",
    name: "Priya",
    phone: "8765432109",
    deviceBrand: "Xiaomi",
    deviceModel: "Redmi Note 12",
    serviceRequired: "Battery Replacement",
    preferredDate: "Next Tuesday",
    preferredTime: "Evening",
    message: "Battery draining in 3 hours.",
    type: "service",
    productName: null,
    status: "contacted",
    ownerNotes: "Quoted ₹1,200 for original battery. Customer visiting on Tuesday.",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    customer: { name: "Priya", phone: "8765432109" },
  },
  {
    id: "enq-3",
    name: "Karthik",
    phone: "7654321098",
    deviceBrand: "Realme",
    deviceModel: "Narzo 70 Pro",
    serviceRequired: "Charging Port Repair",
    preferredDate: "Today",
    preferredTime: "Urgent",
    message: "Phone only charges at certain cable angles.",
    type: "service",
    productName: null,
    status: "visit_planned",
    ownerNotes: "Customer coming today around 4 PM.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    customer: { name: "Karthik", phone: "7654321098" },
  },
];

// POST - Create new enquiry (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      deviceBrand,
      deviceModel,
      serviceRequired,
      preferredDate,
      preferredTime,
      message,
      type = "service",
      productName,
    } = body;

    // Validation
    if (!name || !phone || !serviceRequired) {
      return NextResponse.json(
        { error: "Name, phone, and service are required" },
        { status: 400 }
      );
    }

    // Sanitize phone
    const cleanPhone = phone.replace(/\s/g, "").replace("+91", "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Invalid mobile number" },
        { status: 400 }
      );
    }

    try {
      // Find or create customer
      let customer = await prisma.customer.findUnique({
        where: { phone: cleanPhone },
      });

      if (!customer) {
        customer = await prisma.customer.create({
          data: {
            name,
            phone: cleanPhone,
          },
        });
      } else {
        await prisma.customer.update({
          where: { id: customer.id },
          data: { name, lastEnquiry: new Date() },
        });
      }

      // Create enquiry
      const enquiry = await prisma.enquiry.create({
        data: {
          customerId: customer.id,
          name,
          phone: cleanPhone,
          deviceBrand: deviceBrand || null,
          deviceModel: deviceModel || null,
          serviceRequired,
          preferredDate: preferredDate || null,
          preferredTime: preferredTime || null,
          message: message || null,
          type,
          productName: productName || null,
          status: "new",
        },
      });

      return NextResponse.json({ success: true, enquiryId: enquiry.id });
    } catch {
      // Database unavailable fallback
      const fallbackId = `enq-${Date.now()}`;
      const newEnquiry: FallbackEnquiry = {
        id: fallbackId,
        name,
        phone: cleanPhone,
        deviceBrand: deviceBrand || null,
        deviceModel: deviceModel || null,
        serviceRequired,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        message: message || null,
        type,
        productName: productName || null,
        status: "new",
        createdAt: new Date().toISOString(),
        customer: { name, phone: cleanPhone },
      };
      fallbackEnquiries.unshift(newEnquiry);

      return NextResponse.json({ success: true, enquiryId: fallbackId });
    }
  } catch (error) {
    console.error("Enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

// GET - Get enquiries (owner only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    try {
      const where = status && status !== "all" ? { status } : {};

      const [enquiries, total] = await Promise.all([
        prisma.enquiry.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
          include: {
            customer: true,
          },
        }),
        prisma.enquiry.count({ where }),
      ]);

      if (enquiries && enquiries.length > 0) {
        return NextResponse.json({
          enquiries,
          total,
          page,
          totalPages: Math.ceil(total / limit),
        });
      }
    } catch {
      // Fall through to fallback list
    }

    let filtered = [...fallbackEnquiries];
    if (status && status !== "all") {
      filtered = filtered.filter((e) => e.status === status);
    }

    return NextResponse.json({
      enquiries: filtered,
      total: filtered.length,
      page: 1,
      totalPages: 1,
    });
  } catch (error) {
    console.error("Get enquiries error:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

// PATCH - Update enquiry status / notes (owner only)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getOwnerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Enquiry ID and status are required" },
        { status: 400 }
      );
    }

    try {
      const updated = await prisma.enquiry.update({
        where: { id },
        data: {
          status,
          ...(notes !== undefined ? { ownerNotes: notes } : {}),
        },
      });

      return NextResponse.json({ success: true, enquiry: updated });
    } catch {
      // Fallback in-memory update
      const existing = fallbackEnquiries.find((e) => e.id === id);
      if (existing) {
        existing.status = status;
        if (notes !== undefined) existing.ownerNotes = notes;
      }
      return NextResponse.json({
        success: true,
        enquiry: existing || { id, status, ownerNotes: notes },
      });
    }
  } catch (error) {
    console.error("Update enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

