import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
try {
const cookieStore = await cookies();


const token =
  cookieStore.get("token")?.value;

if (!token) {
  return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}

const payload = verifyToken(token);

if (!payload) {
  return NextResponse.json(
    { message: "Invalid token" },
    { status: 401 }
  );
}

const [tasks, notices, notes] =
  await Promise.all([
    prisma.task.count({
      where: {
        userId: payload.userId,
      },
    }),

    prisma.notice.count(),

    prisma.note.count(),
  ]);

const attendanceData =
  await prisma.attendance.findMany({
    where: {
      userId: payload.userId,
    },
    select: {
      percentage: true,
    },
  });

const attendance =
  attendanceData.length > 0
    ? Math.round(
        attendanceData.reduce(
          (sum, item) =>
            sum + item.percentage,
          0
        ) / attendanceData.length
      )
    : 0;

return NextResponse.json({
  tasks,
  attendance,
  notices,
  notes,
});


} catch (error) {
console.log(error);


return NextResponse.json(
  { message: "Failed" },
  { status: 500 }
);


}
}
