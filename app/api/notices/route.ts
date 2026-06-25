import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notices);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to fetch notices" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const notice = await prisma.notice.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(notice);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to create notice" },
      { status: 500 }
    );
  }
}