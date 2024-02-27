import authConfig from "./auth.config";
import NextAuth from "next-auth"
import { UserRole } from "@prisma/client";
import {
  DEFAULT_LOGIN,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  jobRoutes,
  publicRoutes,
} from "@/route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  // console.log("Route",req.nextUrl.pathname)
  //   console.log("Login state",isLoggedIn)
  // req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isDashboardRoute = authRoutes.includes(nextUrl.pathname);
  const isJobsRoute = jobRoutes.includes(nextUrl.pathname);

  if (isDashboardRoute) {
    if(UserRole !=='ADMIN'){
 return Response.redirect(new URL(DEFAULT_LOGIN, nextUrl));
    }
   
  }

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {

    //console.log("auth route",isAuthRoute)
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  




  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|assets|_next/static|_next/image|favicon.ico).*)"],
};

// export const { auth: middleware } = NextAuth(authConfig)
