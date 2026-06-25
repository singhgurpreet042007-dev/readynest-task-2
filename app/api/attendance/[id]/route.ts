import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const attendance =
      await prisma.attendance.update({
        where: {
          id,
        },
        data: {
          subject: body.subject,
          percentage: Number(body.percentage),
        },
      });

    return NextResponse.json(attendance);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to update attendance" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.attendance.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to delete attendance" },
      { status: 500 }
    );
  }
}