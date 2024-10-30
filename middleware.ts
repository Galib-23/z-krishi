import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  LOGIN,
  PROTECTED_SUB_ROUTES,
  PUBLIC_ROUTES,
  ROOT,
} from "./constants/routes";
import { NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();

  const isAuthenticated = !!session?.user;
  //console.log(isAuthenticated, nextUrl.pathname);

  const isPublicRoute =
    PUBLIC_ROUTES.find(
      (route) =>
        nextUrl.pathname.startsWith(route) || nextUrl.pathname === ROOT,
    ) &&
    !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }
}

//without these route, in every route middleware will be invoked
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
