import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const isAuthPage =
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/signup";

  if (!token && !isAuthPage) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/tasks/:path*",
    "/attendance/:path*",
    "/notes/:path*",
    "/notices/:path*",
    "/timetable/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
  ],
};