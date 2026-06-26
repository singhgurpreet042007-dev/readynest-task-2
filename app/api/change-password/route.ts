import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { message: "Invalid Token" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      currentPassword,
      newPassword,
    } = body;

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const match = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!match) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(
      newPassword,
      10
    );

    await prisma.user.update({
      where: {
        id: payload.userId,
      },
      data: {
        password: hashed,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}