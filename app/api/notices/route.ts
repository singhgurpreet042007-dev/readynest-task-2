import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/get-auth-user";

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
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Only admins can create notices" },
        { status: 403 }
      );
    }

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