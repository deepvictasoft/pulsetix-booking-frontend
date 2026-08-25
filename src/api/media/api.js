import { configEnv } from "@/config/environment";

/** Static media served at GET /uploads/{relativePath} */
export const getMediaServeURL = (filePath) => {
  if (!filePath) return null;
  if (
    filePath.startsWith("http://") ||
    filePath.startsWith("https://") ||
    filePath.startsWith("blob:")
  ) {
    return filePath;
  }

  const host = configEnv.server.hostUrl.replace(/\/$/, "");

  if (filePath.startsWith("/uploads/")) {
    return `${host}${filePath}`;
  }

  return `${host}/uploads/${String(filePath).replace(/^\/+/, "")}`;
};
