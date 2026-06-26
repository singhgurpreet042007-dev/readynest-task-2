import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json([], { status: 401 });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json([], { status: 401 });
    }

    const now = new Date();

    const after30Min = new Date(
      now.getTime() + 30 * 60 * 1000
    );

    const reminders = await prisma.task.findMany({
      where: {
        userId: payload.userId,
        reminderAt: {
          gte: now,
          lte: after30Min,
        },
        status: {
          not: "COMPLETED",
        },
      },
      orderBy: {
        reminderAt: "asc",
      },
    });

    return NextResponse.json(reminders);
  } catch (error) {
    console.log(error);

    return NextResponse.json([], { status: 500 });
  }
}