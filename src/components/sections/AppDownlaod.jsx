import Image from "next/image";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import appPreview from "@/assets/app-preview.png";
import { APP_DOWNLOAD_FEATURES, STORE_BADGES } from "@/constants/sectionsData";

// Real, scannable QR code — swap `data` for your actual app/download link.
const QR_DATA = "https://pulsetix.com/download";
const QR_CODE_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encodeURIComponent(QR_DATA)}`;

const AppDownload = () => {
  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 mb-10 mt-12 lg:mt-16">
      <div className="rounded-2xl border border-primary-border bg-sidebar-bg/60 overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8 items-center px-6 sm:px-10 py-10 text-center lg:text-left">
          {/* Copy + features */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-[38%] flex-shrink-0">
            <div className="w-10 h-10 bg-gradient flex items-center justify-center rounded-xl mb-4">
              <Icon name="Activity" size={20} className="text-white" />
            </div>

            <Typography variant="body2" className="uppercase tracking-widest !text-primary font-semibold mb-2">
              All in your pocket
            </Typography>

            <Typography variant="heading2" className="mb-2">
              Take Pulsetix <span className="text-gradient">Everywhere</span>
            </Typography>
            <Typography variant="subtitle" className="mb-6 max-w-xs lg:max-w-none">
              Your events, your tickets, your people. All in your pocket.
            </Typography>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-left w-full">
              {APP_DOWNLOAD_FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start gap-2.5">
                  <div className="w-9 h-9 bg-primary/10 flex items-center justify-center rounded-lg flex-shrink-0">
                    <Icon name={feature.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <Typography variant="body" className="!text-sm font-semibold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="!text-xs">
                      {feature.desc}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone preview */}
          <div className="flex justify-center flex-shrink-0">
            <Image
              src={appPreview}
              alt="Pulsetix app preview"
              // width={420}
              // height={530}
              className="w-44 sm:w-54 h-full select-none pointer-events-none"
              priority
            />
          </div>

          {/* QR code + store badges */}
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <div className="w-28 h-28 rounded-2xl bg-white flex items-center justify-center p-2.5">
              <img
                src={QR_CODE_SRC}
                alt="Scan to download the Pulsetix app"
                className="w-full h-full"
              />
            </div>
            <Typography variant="body2">Scan to Download</Typography>

            <div className="flex flex-row gap-2.5">
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
        </div>
      </div>
    </section>
  );
};

export default AppDownload;