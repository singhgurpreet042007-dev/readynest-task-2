import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const notice = await prisma.notice.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(notice);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to update notice" },
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

    await prisma.notice.delete({
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
      { message: "Failed to delete notice" },
      { status: 500 }
    );
  }
}