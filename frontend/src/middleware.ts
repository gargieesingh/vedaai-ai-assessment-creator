import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl;

  // Root → redirect based on auth state
  if (url.pathname === "/") {
    if (userId) {
      return NextResponse.redirect(new URL("/assignments", req.url));
    } else {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
