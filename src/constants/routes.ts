export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
  "/terms",
  "/privacy",
  "/explicit-consent",
  "/learn",
  "/tools",
];
export const PROTECTED_ROUTES = ["/worship", "/search", "/profile", "/settings"];
export const KNOWN_ROUTE_PREFIXES = [...PUBLIC_ROUTES, ...PROTECTED_ROUTES];
export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];
export const DEFAULT_AUTHENTICATED_REDIRECT = "/";
export const DEFAULT_UNAUTHENTICATED_REDIRECT = "/";
export const AUTH_COOKIE_NAME = "auth-token";

export function matchesRoute(pathname: string, routes: readonly string[]): boolean {
  return routes.some((route) =>
    route === "/"
      ? pathname === "/"
      : pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function sanitizeCallbackUrl(value: string | null | undefined): string {
  if (!value) return DEFAULT_AUTHENTICATED_REDIRECT;
  if (!value.startsWith("/")) return DEFAULT_AUTHENTICATED_REDIRECT;
  if (value.startsWith("//")) return DEFAULT_AUTHENTICATED_REDIRECT;
  if (value.startsWith("/\\")) return DEFAULT_AUTHENTICATED_REDIRECT;
  return value;
}
