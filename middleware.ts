import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!.*\\..*|_next|static|favicon.ico).*)", // Protect everything except static files
    "/api/:path*", // 🔥 Protect API routes too
  ],
};
