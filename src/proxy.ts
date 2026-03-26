// this needs to be understand

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/signin" ||
    path === "/signup" ||
    path === "/verify-email" ||
    path === "/" ||
    path === "/forgot-password" ||
    path === "/reset-password";

  const token = request.cookies.get("token")?.value || "";

  if ((path === "/signin" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/signin",
    "/signup",
    "/verifyemail",
    "/dashboard",
    "/change-password",
    "/forgot-password",
    "/reset-password",
  ],
};

