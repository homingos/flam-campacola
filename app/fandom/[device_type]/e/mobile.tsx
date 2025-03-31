"use client";

import NextCircle from "@/components/next-circle";
import { DEFAULT_META, FANDOM_IPL_IMAGES } from "@/lib/config";
import { cn } from "@/lib/functions/cn";
import Image from "next/image";

const Mobile = ({ OID }: { OID: string }) => {
  return (
    <a
      href={`https://f.flamapp.co/e&o=${OID}`}
      className="relative h-full select-none w-full rounded-2xl bg-gradient-to-b from-[#414740] via-[#212620] to-[#181E16] flex flex-col items-center justify-between shadow-md p-4 overflow-hidden"
    >
      <Image
        alt="exp redirection image"
        src={
          (FANDOM_IPL_IMAGES["4/10/2025"] as any)?.[OID as any]?.url ??
          DEFAULT_META.redirection_image_url
        }
        fill
        className={cn("rounded-2xl", "object-contain")}
      />
      <div className="absolute bottom-0 left-0 w-full h-4/5 bg-gradient-to-t from-black via-transparent"></div>
      <div className="flex items-center justify-between mb-8 w-full absolute bottom-2 px-6">
        <span className="w-2/3 font-bold text-2xl text-white z-10">
          {"Tap to Play The Experience"}
        </span>
        <NextCircle />
      </div>
    </a>
  );
};

export default Mobile;
