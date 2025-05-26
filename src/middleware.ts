import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server";

const PATH_TO_REDIRECT = '/news';
const HOME_URL = '/';

export function middleware(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  if (redirectUrl.pathname === HOME_URL) {
    redirectUrl.pathname = PATH_TO_REDIRECT;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
};
