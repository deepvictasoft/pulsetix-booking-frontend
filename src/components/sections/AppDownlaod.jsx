import Image from "next/image";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import appPreview from "@/assets/app-preview.png";
import { STORE_BADGES } from "@/constants/sectionsData";

// Real, scannable QR code — swap `data` for your actual app/download link.
const QR_DATA = "https://pulsetix.com/download";
const QR_CODE_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encodeURIComponent(QR_DATA)}`;

const AppDownload = () => {
  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 mb-10 mt-12 lg:mt-16">
      <div className="rounded-2xl border border-primary-border bg-sidebar-bg/60 overflow-hidden">
        <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-8 lg:gap-10 items-center px-6 sm:px-10 pt-10 pb-4  text-center lg:text-left">
          {/* Phone preview */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src={appPreview}
              alt="Pulsetix app preview"
              width={220}
              height={330}
              className="w-44 sm:w-52 h-auto select-none pointer-events-none"
              priority
            />
          </div>

          {/* Copy + store badges */}
          <div className="flex flex-col items-center lg:items-start">
            <Typography variant="heading2" className="mb-2">
              Take Pulsetix <span className="text-gradient"> Everywhere</span> 
            </Typography>
            <Typography variant="subtitle" className="mb-6 max-w-sm">
              Your events, your tickets, your people. All in your pocket.
            </Typography>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {STORE_BADGES.map((badge) => (
                <a
                  key={badge.title}
                  href={badge.href}
                  className="inline-flex items-center gap-2 rounded-[15px] bg-black border border-primary-border px-3.5 h-11 hover:border-primary/50 transition-colors"
                >
                  <Icon
                    name={badge.icon}
                    width={20}
                    height={20}
                    className={`${badge.iconClass} flex-shrink-0`}
                  />
                  <span className="flex flex-col leading-none">
                    <span className="text-[9px] text-white">
                      {badge.caption}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {badge.title}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Real, scannable QR code */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-28 h-28 rounded-2xl bg-white flex items-center justify-center p-2.5">
              <img
                src={QR_CODE_SRC}
                alt="Scan to download the Pulsetix app"
                className="w-full h-full"
              />
            </div>
            <Typography variant="body2">Scan to Download</Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
