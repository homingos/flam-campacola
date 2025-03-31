import { NextRequest, NextResponse, userAgent } from "next/server";
import { parse } from "./utils/parse";
import { getRequestDetails } from "./utils/request";

export default function FandomMiddleware(req: NextRequest) {
  const { fullPath } = parse(req);
  const { isAndroid, isIOS } = getRequestDetails(req);

  // Get user agent details
  const ua = userAgent(req);
  const isMobile = ua.device.type === "mobile" || isAndroid || isIOS;

  const deviceType = isMobile ? "mobile" : "desktop";
  return NextResponse.rewrite(
    new URL(`/fandom/${deviceType}${fullPath}`, req.url)
  );
}
