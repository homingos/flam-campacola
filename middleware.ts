import { NextFetchEvent, NextRequest, NextResponse, userAgent } from "next/server";
import { parse } from "./lib/middleware/utils/parse";
import { getRequestDetails } from "./lib/middleware/utils/request";

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { fullPath } = parse(req);
  const { isAndroid, isIOS } = getRequestDetails(req);

  // Get user agent details
  const ua = userAgent(req);
  const isMobile = ua.device.type === "mobile" || isAndroid || isIOS;

  const deviceType = isMobile ? "mobile" : "desktop";
  return NextResponse.rewrite(
    new URL(`/${deviceType}${fullPath}`, req.url)
  );
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
