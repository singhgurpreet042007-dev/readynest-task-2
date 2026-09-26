import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Try DB if configured
    if (process.env.DATABASE_URL) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: cleanEmail },
        });

        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            const token = generateToken(user.id, user.role);
            const response = NextResponse.json({
              success: true,
              user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
              },
            });

            response.cookies.set("token", token, {
              httpOnly: true,
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });

            return response;
          } else {
            return NextResponse.json(
              { message: "Invalid password" },
              { status: 401 }
            );
          }
        }
      } catch (dbErr) {
        console.warn("DB login error, checking demo fallback:", dbErr);
      }
    }

    // Demo fallback for instant preview without live DB
    if (cleanEmail === "admin@campus.edu" || cleanEmail === "student@campus.edu") {
      const isDemoAdmin = cleanEmail === "admin@campus.edu" && password === "admin123";
      const isDemoStudent = cleanEmail === "student@campus.edu" && password === "student123";

      if (isDemoAdmin || isDemoStudent) {
        const role = isDemoAdmin ? "ADMIN" : "STUDENT";
        const token = generateToken(`demo_${role.toLowerCase()}`, role);

        const response = NextResponse.json({
          success: true,
          user: {
            id: `demo_${role.toLowerCase()}`,
            fullName: isDemoAdmin ? "Dr. Rajesh Verma" : "Aarav Sharma",
            email: cleanEmail,
            role,
          },
        });

        response.cookies.set("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        return response;
      } else {
        return NextResponse.json(
          { message: "Invalid password. Use admin123 or student123" },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { message: "User not found. Use demo accounts: admin@campus.edu or student@campus.edu" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}