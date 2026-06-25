import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const timetable = await prisma.timetable.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(timetable);
}

export async function POST(req: Request) {
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