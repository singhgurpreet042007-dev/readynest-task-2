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

    const [todo, inProgress, completed] =
      await Promise.all([
        prisma.task.count({
          where: {
            userId: payload.userId,
            status: "TODO",
          },
        }),

        prisma.task.count({
          where: {
            userId: payload.userId,
            status: "IN_PROGRESS",
          },
        }),

        prisma.task.count({
          where: {
            userId: payload.userId,
            status: "COMPLETED",
          },
        }),
      ]);

    return NextResponse.json({
      todo,
      inProgress,
      completed,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed" },
      { status: 500 }
    );
  }
}