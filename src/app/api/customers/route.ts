import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";
import { rkStore } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
      // Fall through to real in-memory store
    }

    let filtered = [...rkStore.customers];
    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.phone.includes(search) ||
          (c.device && c.device.toLowerCase().includes(search)) ||
          (c.issue && c.issue.toLowerCase().includes(search))
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
