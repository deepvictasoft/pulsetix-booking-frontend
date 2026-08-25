import { configEnv } from "@/config/environment";
import { ApiError } from "@/api/client";

const { baseUrl } = configEnv.server;

export async function buyerApiFetch(path, accessToken, options = {}) {
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    cache: options.cache ?? "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      json?.message ?? "Something went wrong. Please try again.",
      res.status,
      json?.data ?? null,
    );
  }

  return json;
}
