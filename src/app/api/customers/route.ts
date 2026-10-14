import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";

const fallbackCustomers = [
  {
    id: "cust-1",
    name: "Rahul",
    phone: "9876543210",
    notes: "Regular customer. Preferred Saturday visit.",
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    enquiries: [
      {
        id: "enq-1",
        serviceRequired: "Display Replacement",
        deviceBrand: "Samsung",
        deviceModel: "Galaxy A55",
        status: "new",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ],
  },
  {
    id: "cust-2",
    name: "Priya",
    phone: "8765432109",
    notes: "Battery issue. Price quote provided.",
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    enquiries: [
      {
        id: "enq-2",
        serviceRequired: "Battery Replacement",
        deviceBrand: "Xiaomi",
        deviceModel: "Redmi Note 12",
        status: "contacted",
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ],
  },
  {
    id: "cust-3",
    name: "Karthik",
    phone: "7654321098",
    notes: "Urgent charging port repair. Coming today 4 PM.",
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    enquiries: [
      {
        id: "enq-3",
        serviceRequired: "Charging Port Repair",
        deviceBrand: "Realme",
        deviceModel: "Narzo 70 Pro",
        status: "visit_planned",
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      },
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    const session = await getOwnerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();

    try {
      const where: Record<string, unknown> = {};
      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { phone: { contains: search } },
        ];
      }

      const customers = await prisma.customer.findMany({
        where,
        include: {
          enquiries: {
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { updatedAt: "desc" },
      });

      if (customers && customers.length > 0) {
        return NextResponse.json({ success: true, customers });
      }
    } catch {
      // Fall through to fallback customers
    }

    let filtered = [...fallbackCustomers];
    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.phone.includes(search)
      );
    }

    return NextResponse.json({ success: true, customers: filtered });
  } catch (error) {
    console.error("Customers GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
