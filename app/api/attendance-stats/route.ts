import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    const attendance =
      await prisma.attendance.findMany({
        where: {
          userId: payload.userId,
        },
        select: {
          subject: true,
          percentage: true,
        },
      });

    return NextResponse.json(attendance);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed" },
      { status: 500 }
    );
  }
}