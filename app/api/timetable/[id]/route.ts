import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const timetable = await prisma.timetable.update({
    where: {
      id,
    },
    data: {
      subject: body.subject,
      day: body.day,
      startTime: body.startTime,
      endTime: body.endTime,
    },
  });

  return NextResponse.json(timetable);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.timetable.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}