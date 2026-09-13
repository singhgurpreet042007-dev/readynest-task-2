import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/get-auth-user";

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
      { message: "Only admins can delete notes" },
      { status: 403 }
    );
  }

  const { id } = await params;

  await prisma.note.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}