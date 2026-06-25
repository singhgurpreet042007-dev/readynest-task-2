import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const task = await prisma.task.create({
    data: {
      title: "Complete Smart Campus Project",
      description: "Finish internship project",
      userId: "cmqs3v6y600002wu0mroxt3j7",
    },
  });

  return NextResponse.json(task);
}