import NextCircle from "@/components/next-circle";
import { cn } from "@/lib/functions/cn";
import { getCurrentOrPreviousIPLData } from "@/lib/ipl_config";
import Image from "next/image";
import Link from "next/link";

const Mobile = async () => {
  const iplData = getCurrentOrPreviousIPLData();

  return (
    <div className="relative h-full w-full gap-4 flex flex-col items-center justify-center overflow-y-auto">
      {iplData && iplData.map((ipl) => (
        <Link
          href={`https://f.flamapp.co/e&o=${ipl.short_code}`}
          className={cn("relative h-full select-none w-full rounded-2xl bg-gradient-to-b from-[#414740] via-[#212620] to-[#181E16] flex flex-col items-center justify-between shadow-md p-4 overflow-hidden", iplData.length === 1 ? "h-full" : "h-[400px]")}
        >
          <Image
            alt="exp redirection image"
            src={iplData.length === 1 ? ipl.image.vertical : ipl.image.vertical}
            fill
            className={cn("rounded-2xl", "object-cover")}
          />
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
