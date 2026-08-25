"use client";

import { useEffect, useState } from "react";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import { isEmbeddableVideo, parseMediaUrl } from "@/lib/media";

const EventMedia = ({ gallery = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const mediaItems = gallery.map(parseMediaUrl).filter((item) => item.src);

  if (!mediaItems.length) return null;

  const visible = mediaItems.slice(0, 4);
  const remainingCount = mediaItems.length - visible.length;

  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((i) => (i - 1 + mediaItems.length) % mediaItems.length);
  const next = () => setOpenIndex((i) => (i + 1) % mediaItems.length);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, mediaItems.length]);

  const renderPreview = (media) => {
    if (media.kind === "youtube" && media.thumbnail) {
      return (
        <img
          src={media.thumbnail}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 bg-black"
        />
      );
    }

    if (media.kind === "youtube" || media.kind === "vimeo") {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-primary/40 transition-transform group-hover:scale-105" />
      );
    }

    if (media.kind === "video") {
      return (
        <video
          src={media.src}
          preload="metadata"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 bg-black"
        />
      );
    }

    return (
      <img
        src={media.src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
      />
    );
  };

  const renderLightbox = (media) => {
    if (media.kind === "youtube" || media.kind === "vimeo") {
      return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            key={media.embedUrl}
            src={media.embedUrl}
            title="Event promo video"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    }

    if (media.kind === "video") {
      return (
        <video
          key={media.src}
          src={media.src}
          controls
          autoPlay
          playsInline
          className="max-h-[80vh] w-full rounded-xl bg-black"
        />
      );
    }

    return (
      <img
        src={media.src}
        alt=""
        className="max-h-[80vh] w-full object-contain rounded-xl"
      />
    );
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-5 rounded-full bg-primary" />
        <Typography variant="sectionTitle">Event Media</Typography>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {visible.map((media, i) => {
          const isLast = i === visible.length - 1;
          const showPlayOverlay = isEmbeddableVideo(media) && !(isLast && remainingCount > 0);

          return (
            <button
              type="button"
              key={`${media.src}-${i}`}
              onClick={() => setOpenIndex(i)}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-primary-border cursor-pointer group"
            >
              {renderPreview(media)}

              {showPlayOverlay && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-2xl bg-white/90 flex items-center justify-center">
                    <Icon
                      name="Play"
                      width={15}
                      height={15}
                      className="text-black"
                    />
                  </div>
                </div>
              )}

              {isLast && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    +{remainingCount}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <Icon name="X" width={18} height={18} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className="absolute left-3 sm:left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <Icon name="ChevronLeft" width={20} height={20} />
          </button>

          <div
            className="max-w-4xl w-full flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {renderLightbox(mediaItems[openIndex])}
            <span className="text-sm text-white/70">
              {openIndex + 1} / {mediaItems.length}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className="absolute right-3 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <Icon name="ChevronRight" width={20} height={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EventMedia;
