import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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
      fullName,
      phone,
      department,
      semester,
      rollNumber,
    } = body;

    const user = await prisma.user.update({
      where: {
        id: payload.userId,
      },
      data: {
        fullName,
        phone,
        department,
        semester,
        rollNumber,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}