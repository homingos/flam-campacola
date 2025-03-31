import { NextRequest } from "next/server";

export const getFinalUrl = (
  url: string,
  { req, geo, ipAddress }: { req: NextRequest; geo?: any; ipAddress?: string }
) => {
  // query is the query string (e.g. d.to/github?utm_source=twitter -> ?utm_source=twitter)
  const searchParams = req.nextUrl.searchParams;

  // get the query params of the target url
  const urlObj = new URL(url);

  if (ipAddress) {
    // add clickId to the final url if it exists
    urlObj.searchParams.set("ip", ipAddress);
  }

  if (geo) {
    urlObj.searchParams.set("country", geo.country);
    urlObj.searchParams.set("city", geo.city);
    urlObj.searchParams.set("latitude", geo.latitude);
    urlObj.searchParams.set("longitude", geo.longitude);
  }

  // if there are no query params, then return the target url as is (no need to parse it)
  // @ts-ignore – until https://github.com/microsoft/TypeScript/issues/54466 is fixed
  if (searchParams.size === 0) return urlObj.toString();

  return urlObj.toString();
};
