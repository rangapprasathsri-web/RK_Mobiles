import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword, createToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find owner by email or phone
    let owner = null;
    try {
      owner = await prisma.owner.findFirst({
        where: {
          OR: [{ email: email }, { phone: email }],
        },
      });
    } catch (dbErr) {
      console.warn("Database lookup failed, checking fallback credentials", dbErr);
    }

    if (!owner) {
      const defaultEmail = process.env.OWNER_EMAIL || "owner@rkmobiles.com";
      const defaultPassword = process.env.OWNER_PASSWORD || "RKMobiles@2026";
      const defaultPhone = "9865013529";

      const isEmailMatch =
        email.trim().toLowerCase() === defaultEmail.toLowerCase() ||
        email.replace(/\s|\+/g, "").endsWith(defaultPhone);
      const isPasswordMatch =
        password === defaultPassword ||
        password.toLowerCase() === defaultPassword.toLowerCase();

      if (isEmailMatch && isPasswordMatch) {
        const token = await createToken({
          id: "default-owner",
          email: defaultEmail,
          name: process.env.OWNER_NAME || "RK Mobiles Owner",
        });
        await setAuthCookie(token);
        return NextResponse.json({
          success: true,
          owner: {
            id: "default-owner",
            name: process.env.OWNER_NAME || "RK Mobiles Owner",
            email: defaultEmail,
          },
        });
      }

      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, owner.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken({
      id: owner.id,
      email: owner.email,
      name: owner.name,
    });

    // Set HTTP-only cookie
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      owner: {
        id: owner.id,
        name: owner.name,
        email: owner.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
