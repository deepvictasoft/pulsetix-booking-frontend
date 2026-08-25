const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?(?:.*&)?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([\w-]{11})/i,
  /^([\w-]{11})$/,
];

const VIMEO_PATTERN = /vimeo\.com\/(?:video\/)?(\d+)/i;

export function getYoutubeId(url) {
  if (!url) return null;

  for (const pattern of YOUTUBE_PATTERNS) {
    const match = String(url).match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export function getVimeoId(url) {
  if (!url) return null;
  const match = String(url).match(VIMEO_PATTERN);
  return match?.[1] ?? null;
}

export function isDirectVideoUrl(url) {
  if (!url) return false;
  const src = String(url).replace(/^video:/, "");
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(src);
}

export function parseMediaUrl(raw) {
  const src = String(raw ?? "").trim();

  if (!src) {
    return { kind: "image", src: "", thumbnail: "" };
  }

  const youtubeId = getYoutubeId(src);
  if (youtubeId) {
    return {
      kind: "youtube",
      src,
      embedUrl: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    };
  }

  const vimeoId = getVimeoId(src);
  if (vimeoId) {
    return {
      kind: "vimeo",
      src,
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1`,
      thumbnail: null,
    };
  }

  if (isDirectVideoUrl(src)) {
    const cleanSrc = src.replace(/^video:/, "");
    return {
      kind: "video",
      src: cleanSrc,
      thumbnail: null,
    };
  }

  return {
    kind: "image",
    src,
    thumbnail: src,
  };
}

export function isEmbeddableVideo(media) {
  return media.kind === "youtube" || media.kind === "vimeo" || media.kind === "video";
}
