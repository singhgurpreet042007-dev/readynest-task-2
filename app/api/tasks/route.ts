import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: payload.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    const body = await req.json();

    const { title, description, dueDate, dueTime } = body;

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    
    const taskDueDate = dueDate ? new Date(dueDate) : null;

    
    const reminderAt =
      dueDate && dueTime
        ? new Date(`${dueDate}T${dueTime}:00`)
        : null;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: taskDueDate,
        reminderAt,
        userId: payload.userId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 }
    );
  }
}