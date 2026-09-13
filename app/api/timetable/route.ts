import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/get-auth-user";

export async function GET() {
  const timetable = await prisma.timetable.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(timetable);
}

export async function POST(req: Request) {
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Only admins can add timetable entries" },
      { status: 403 }
    );
  }

  const body = await req.json();

  const timetable = await prisma.timetable.create({
    data: {
      subject: body.subject,
      day: body.day,
      startTime: body.startTime,
      endTime: body.endTime,
    },
  });

  return NextResponse.json(timetable);
}