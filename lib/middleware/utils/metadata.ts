import { DEFAULT_META } from "@/lib/config";
import type { Metadata } from "next";

export function constructMetadata({
  title = DEFAULT_META.title,
  description = DEFAULT_META.description,
  image = DEFAULT_META.og_image_url,
  icons = "/favicon.ico",
  metadataBase = "https://e.flamapp.com",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  metadataBase?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image && {
        images: image,
      }),
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: "summary_large_image",
        images: [image],
      }),
      creator: "@flamappofficial",
    },
    icons,
    metadataBase: new URL(metadataBase),
    // themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}