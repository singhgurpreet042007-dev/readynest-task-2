import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/get-auth-user";

export async function GET() {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(notes);
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
      { message: "Only admins can upload notes" },
      { status: 403 }
    );
  }

  const body = await req.json();

  const note = await prisma.note.create({
    data: {
      title: body.title,
      fileUrl: body.fileUrl,
    },
  });

  return NextResponse.json(note);
}