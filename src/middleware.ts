import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  AUTH_ROUTES,
  KNOWN_ROUTE_PREFIXES,
  PUBLIC_ROUTES,
  DEFAULT_AUTHENTICATED_REDIRECT,
  DEFAULT_UNAUTHENTICATED_REDIRECT,
  matchesRoute,
} from "./constants/routes";
import { buildContentSecurityPolicy } from "./lib/csp";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const csp = buildContentSecurityPolicy();
  const withCsp = <T extends NextResponse>(response: T): T => {
    response.headers.set("Content-Security-Policy", csp);
    return response;
  };
  const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = !!authToken;

  const isAuthRoute = matchesRoute(pathname, AUTH_ROUTES);
  const isPublicRoute = matchesRoute(pathname, PUBLIC_ROUTES);
  const isKnownRoute = matchesRoute(pathname, KNOWN_ROUTE_PREFIXES);

  if (isAuthenticated && isAuthRoute) {
    return withCsp(
      NextResponse.redirect(new URL(DEFAULT_AUTHENTICATED_REDIRECT, request.url))
    );
  }

  if (!isKnownRoute) {
    return withCsp(NextResponse.next());
  }

  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL(DEFAULT_UNAUTHENTICATED_REDIRECT, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return withCsp(NextResponse.redirect(loginUrl));
  }

  return withCsp(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|robots\\.txt|sitemap\\.xml|site\\.webmanifest|manifest\\.json|\\.well-known|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|txt|xml|webmanifest|json|woff|woff2|ttf|otf|mp4|webm)$).*)",
  ],
};
