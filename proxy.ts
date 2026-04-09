import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isAgentProtected = pathname.startsWith("/agent/dashboard");
  const isAdminProtected = pathname.startsWith("/admin");

  if (isAgentProtected || isAdminProtected) {
    if (!req.auth) {
      const loginUrl = new URL("/agent/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isAdminProtected && req.auth.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/agent/dashboard", req.url));
    }
  }
});

export const config = {
  matcher: ["/agent/dashboard/:path*", "/admin/:path*"],
};
