import { headers } from "next/headers";
import FlamLogo from "@/components/logo";
import { QRCodeSVG } from "@/components/qr";
import { getCurrentOrPreviousIPLData } from "@/lib/ipl_config";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Desktop = async () => {
  const request = await headers();
  const host = request.get("host");
  const qrData = {
    bgColor: "#ffffff",
    fgColor: "#000000",
    size: 1024,
    level: "Q", // QR Code error correction level: https://blog.qrstuff.com/general/qr-code-error-correction
  };

  const iplData = getCurrentOrPreviousIPLData();

  return (
    <div className="h-full w-full flex items-center justify-center gap-4">
      {iplData &&
        iplData.map((ipl) => (
          <div className="relative h-full w-full rounded-2xl flex flex-col items-center justify-center shadow-md overflow-hidden">
            <div className="absolute bottom-4 left-4">
              <FlamLogo size="lg" color="#ffffff" />
            </div>
            <Image
              alt="exp redirection image"
              src={
                iplData.length === 1 ? ipl.image.horizontal : ipl.image.horizontal
              }
              fill
              className={cn("rounded-2xl absolute -z-10", "object-cover")}
            />
            <div
              className={cn(
                "absolute w-3/4 h-full",
                iplData.length !== 1
                  ? "top-[80%] -translate-y-1/2 left-1/2 -translate-x-1/2"
                  : "top-[70%] -translate-y-1/2 left-1/2 -translate-x-1/2"
              )}
            >
              <Image
                alt="exp redirection image"
                src={ipl.image.avatar}
                fill
                className={cn("w-full h-full", "object-contain")}
              />
            </div>
            <div
              className={cn(
                "text-2xl lg:text-4xl top-10 left-1/2 -translate-x-1/2 px-6 absolute w-full text-center opacity-80 text-white font-extralight",
              )}
            >
              Get ready to{" "}
              <span className="w-full font-black">
                snap a pic with Celebrities
              </span>{" "}
              🎉
            </div>
            <div className="absolute right-4 bottom-4 flex flex-col gap-4 items-center justify-center rounded-xl overflow-hidden">
              <QRCodeSVG
                value={`https://f.flamapp.com/e?o=${ipl.short_code}`}
                size={qrData.size / 6}
                bgColor={qrData.bgColor}
                fgColor={qrData.fgColor}
                level={qrData.level}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Desktop;
