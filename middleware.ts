import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: any) {
  const token = req.cookies.get("token")?.value;

  const isAuthPage =
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/signup";

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);

      const { payload } = await jwtVerify(token, secret);

      const role = payload.role;

      // 🚫 STUDENT cannot access admin
      if (req.nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // 🚫 ADMIN cannot go to student dashboard (optional)
      if (req.nextUrl.pathname.startsWith("/dashboard") && role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }

    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup"],
};