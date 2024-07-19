/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authenticate
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

export const adminRoutes = ["/admin"];
export const clientRoutes = ["/clientProfile"];
export const dashboardRoutes= ["/admin/dashboard"];
export const freeLancerRoutes= ["/freeLancerProfile"];
export const freelancerdahboard= ["/freelancerdashoard"];
export const clientdashboard= ["/clientdashboard"];

export const jobRoutes= ["/jobs/bestmatches"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/jobs/bestmatches";
//export const DEFAULT_CLIENT_REDIRECT = "/clientdashboard";
export const DEFAULT_LOGIN = "/login";

