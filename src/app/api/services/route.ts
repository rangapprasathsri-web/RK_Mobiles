import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOwnerSession } from "@/lib/auth";
import { rkStore, ServiceItem } from "@/lib/store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const all = searchParams.get("all"); // owner requests all (including inactive)

    try {
      const where: Record<string, unknown> = {};
      if (all !== "true") {
        where.isActive = true;
      }
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
      // Fall through to real in-memory store
    }

    let result = [...rkStore.services];
    if (all !== "true") {
      result = result.filter((s) => s.isActive);
    }
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

    const newService: ServiceItem = {
      id: `svc-${Date.now()}`,
      name,
      shortDescription: shortDescription || "",
      isFeatured: Boolean(isFeatured),
      isActive: true,
      sortOrder: rkStore.services.length + 1,
    };

    rkStore.services.push(newService);

    try {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const created = await prisma.service.create({
        data: {
          name,
          slug: `${slug}-${Date.now().toString().slice(-4)}`,
          shortDescription: shortDescription || "",
          description: shortDescription || "",
          isFeatured: Boolean(isFeatured),
          isActive: true,
          sortOrder: newService.sortOrder,
        },
      });
      return NextResponse.json({ success: true, service: created });
    } catch {
      return NextResponse.json({ success: true, service: newService });
    }
  } catch (error) {
    console.error("Services POST error:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getOwnerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, isActive, isFeatured, name, shortDescription } = body;

    if (!id) {
      return NextResponse.json({ error: "Service ID required" }, { status: 400 });
    }

    const service = rkStore.services.find((s) => s.id === id);
    if (service) {
      if (isActive !== undefined) service.isActive = Boolean(isActive);
      if (isFeatured !== undefined) service.isFeatured = Boolean(isFeatured);
      if (name) service.name = name;
      if (shortDescription !== undefined) service.shortDescription = shortDescription;
    }

    try {
      const updated = await prisma.service.update({
        where: { id },
        data: {
          ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
          ...(isFeatured !== undefined ? { isFeatured: Boolean(isFeatured) } : {}),
          ...(name ? { name } : {}),
          ...(shortDescription !== undefined ? { shortDescription } : {}),
        },
      });
      return NextResponse.json({ success: true, service: updated });
    } catch {
      return NextResponse.json({ success: true, service });
    }
  } catch (error) {
    console.error("Services PATCH error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getOwnerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Service ID required" }, { status: 400 });
    }

    const index = rkStore.services.findIndex((s) => s.id === id);
    if (index !== -1) {
      rkStore.services.splice(index, 1);
    }

    try {
      await prisma.service.delete({ where: { id } });
    } catch {
      // Fall through
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Services DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
