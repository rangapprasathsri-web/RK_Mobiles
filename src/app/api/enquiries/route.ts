import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";
import { rkStore, saveEnquiry, EnquiryItem } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// POST - Create new enquiry (public submission from website)
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
        { error: "Invalid mobile number. Please enter a 10-digit number." },
        { status: 400 }
      );
    }

    let savedEnquiryId: string;

    try {
      // Try database first
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

      savedEnquiryId = enquiry.id;
    } catch {
      // Save to unified store
      const local = saveEnquiry({
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
      });
      savedEnquiryId = local.id;
    }

    return NextResponse.json({ success: true, enquiryId: savedEnquiryId });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

// GET - Get enquiries (owner dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

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
      // Fall through to real in-memory store
    }

    let filtered = [...rkStore.enquiries];
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

    // Always update in-memory store
    const existing = rkStore.enquiries.find((e) => e.id === id);
    if (existing) {
      existing.status = status as EnquiryItem["status"];
      if (notes !== undefined) existing.ownerNotes = notes;
    }

    // Also update customer history in store
    for (const cust of rkStore.customers) {
      const linkedEnq = cust.enquiries?.find((e) => e.id === id);
      if (linkedEnq) {
        linkedEnq.status = status;
        if (notes) linkedEnq.notes = notes;
        cust.status = status;
      }
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
