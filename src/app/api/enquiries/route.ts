import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";

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

    return NextResponse.json({
      enquiries,
      total,
      page,
      totalPages: Math.ceil(total / limit),
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

    const updated = await prisma.enquiry.update({
      where: { id },
      data: {
        status,
        ...(notes ? { notes } : {}),
      },
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    console.error("Update enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

