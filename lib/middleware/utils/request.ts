import { NextRequest, userAgent } from "next/server";

export const LOCALHOST_GEO_DATA = {
  continent: "NA",
  country: "US",
  city: "San Francisco",
  region: "CA",
  latitude: "37.7695",
  longitude: "-122.385",
};

export const getRequestDetails = (req: NextRequest) => {
  const geo =
    process.env.VERCEL === "1" && req.geo ? req.geo : LOCALHOST_GEO_DATA;

  const ipAddress =
    req.headers.get("x-forwarded-for") ||
    // Fallback for localhost or non Vercel deployments
    "0.0.0.0";

  return {
    os: userAgent(req).os?.name,
    browser: userAgent(req).browser?.name,
    geo: geo,
    ip: ipAddress,
    isAndroid: userAgent(req).os?.name === "Android",
    isIOS: userAgent(req).os?.name === "iOS",
  };
};
