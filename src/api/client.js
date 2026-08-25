import { configEnv } from "@/config/environment";

const { baseUrl, accessToken } = configEnv.server;

export class ApiError extends Error {
  constructor(message, statusCode = 500, data = null) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

export async function apiFetch(path, options = {}) {
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
