import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { FANDOM_HOSTNAMES } from "./lib/config";
import FandomMiddleware from "./lib/middleware/fandom-middleware";
import { parse } from "./lib/middleware/utils/parse";

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, path } = parse(req);

  if (path.startsWith("/.well-known")) {
    return NextResponse.next();
  }

  if (FANDOM_HOSTNAMES.has(domain)) {
    return FandomMiddleware(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. /_static/ (static files inside /public folder)
     * 5. Metadata files: favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest, .well-known
     */
    "/((?!api/|_next/|_proxy/|_static/|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|.well-known).*)",
  ],
};
