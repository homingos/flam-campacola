import { getSearchUrl } from "@/app/api/http";
import { DEFAULT_META } from "@/lib/config";
import { headers } from "next/headers";
import Desktop from "./desktop";
import Mobile from "./mobile";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data } = await getSearchUrl(searchParams?.o as string);
  const headersList = await headers();
  const host = headersList.get("host");

  return {
    title: data?.experiences[0]?.share_meta?.title ?? DEFAULT_META.title,
    description:
      data?.experiences[0]?.share_meta?.description ?? DEFAULT_META.description,
    image:
      data?.experiences[0]?.share_meta?.og_image_url ??
      DEFAULT_META.og_image_url,
    metadataBase: `https://${host}`,
  };
}

const Page = async ({
  params,
  searchParams,
}: {
  params?: {
    device_type: "mobile" | "desktop";
  };
  searchParams?: {
    o: string;
  };
}) => {
  const OID = searchParams?.o ?? "";
  const DEVICE_TYPE = params?.device_type ?? "";

  // const { data } = await getSearchUrl(OID);

  // if (!OID || !data) {
  //   return <NoShortcode />;
  // }

  return (
    <div className="relative p-4 h-[100dvh] w-[100dvw]">
      {DEVICE_TYPE === "mobile" && <Mobile OID={OID} />}
      {DEVICE_TYPE === "desktop" && <Desktop OID={OID} />}
    </div>
  );
};

export default Page;
