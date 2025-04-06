import NextCircle from "@/components/next-circle";
import { cn } from "@/lib/functions/cn";
import { getCurrentOrPreviousIPLData } from "@/lib/ipl_config";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

const Mobile = async () => {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const isIOS = /iPhone|iPad|iPod/.test(userAgent);

  const iplData = getCurrentOrPreviousIPLData();

  return (
    <div className="relative h-full w-full gap-4 flex flex-col items-center justify-start overflow-y-auto">
      {iplData && iplData.map((ipl) => (
        <Link
          href={isIOS
            ? `https://appclip.apple.com/id?p=com.flam.fandom.Clip&o=${ipl.short_code}`
            : `https://f.flamapp.com/e?o=${ipl.short_code}`}
          className={cn("relative h-full select-none w-full rounded-2xl bg-gradient-to-b from-[#414740] via-[#212620] to-[#181E16] flex flex-col items-center justify-between shadow-md p-4 overflow-hidden")}
        >
          <Image
            alt="exp redirection image"
            src={iplData.length === 1 ? ipl.image.vertical : ipl.image.horizontal}
            fill
            className={cn("rounded-2xl", "object-cover")}
          />
          <div className={cn("absolute w-3/4 h-full", iplData.length !== 1 ? "top-[80%] -translate-y-1/2 left-1/2 -translate-x-1/2" : "top-[70%] -translate-y-1/2 left-1/2 -translate-x-1/2")}>
            <Image
              alt="exp redirection image"
              src={ipl.image.avatar}
              fill
              className={cn("w-full h-full", "object-contain")}
            />
          </div>
          <div className={cn("px-6 absolute w-full text-center opacity-80 text-white font-extralight", iplData.length !== 1 ? "top-10 left-1/2 -translate-x-1/2 text-base" : "top-10 left-1/2 -translate-x-1/2 text-xl")}>
            Get ready to <span className="w-full font-black">snap a pic with Celebrities</span> 🎉
          </div>
          <div className="absolute bottom-0 left-0 w-full h-4/5 bg-gradient-to-t from-black via-transparent"></div>
          <div className="flex items-center justify-between mb-8 w-full absolute bottom-2 px-6">
            <span className="w-2/3 font-bold text-xl md:text-2xl text-white z-10">
              {"Tap to Play The Experience"}
            </span>
            <NextCircle />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Mobile;
