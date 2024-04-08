import authConfig from "./auth.config";
import NextAuth from "next-auth"
import { UserRole } from "@prisma/client";


import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  jobRoutes,
  publicRoutes,
  adminRoutes,
  clientRoutes,
  freeLancerRoutes,
  dashboardRoutes
} from "@/route";



const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isDashboardRoute = dashboardRoutes.includes(nextUrl.pathname);
 //const isJobsRoute = jobRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isClientRoute = clientRoutes.includes(nextUrl.pathname);
  const isFreelancerRoute = freeLancerRoutes.includes(nextUrl.pathname);


  

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
  //console.log("auth route",isAuthRoute)
    if (isLoggedIn) {
     
       const userRole = req.auth?.user?.role || null;
         console.log('User Role:', userRole); 
        if (userRole === UserRole.Freelancer) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  else if (userRole === UserRole.Client) {
    return Response.redirect(new URL("/clientdashboard", nextUrl));
  }
   
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

  if (isLoggedIn && nextUrl.pathname === "/" && req.auth?.user.role === UserRole.Freelancer) {
    return Response.redirect(new URL("/jobs/bestmatches", nextUrl));
  }


  if (isLoggedIn && nextUrl.pathname === "/" && req.auth?.user.role === UserRole.Client) {
    return Response.redirect(new URL("/clientdashboard", nextUrl));
  }

  if(isLoggedIn){
     const userRole = req.auth?.user.role;
     //console.log(req.auth?.user.role)

//  if (isPublicRoute) {
//       return null;
//     }
//     if(
//       (
//         isAdminRoute || isDashboardRoute
//       ) && userRole !== UserRole.ADMIN
//     ){
//        return Response.redirect(new URL("/dashboard/users", nextUrl));
//     }
    
//     if (isClientRoute && userRole === UserRole.Client) {
//       return Response.redirect(new URL("/clientdashboard", nextUrl));
//     }
//      if (isFreelancerRoute && userRole !== UserRole.Freelancer) {
//       return Response.redirect(new URL("/", nextUrl));
//     }

  }

  
     
  return null;
});




// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|assets|_next/static|_next/image|favicon.ico).*)"],
};

// export const { auth: middleware } = NextAuth(authConfig)