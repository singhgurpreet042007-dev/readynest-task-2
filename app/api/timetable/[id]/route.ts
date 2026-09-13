import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/get-auth-user";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Only admins can update timetable" },
      { status: 403 }
    );
  }

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
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Only admins can delete timetable entries" },
      { status: 403 }
    );
  }

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