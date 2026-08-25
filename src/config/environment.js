export const configEnv = {
  server: {
    baseUrl: process.env.API_BASE_URL ?? "http://localhost:3000/api/v1",
    accessToken: process.env.API_ACCESS_TOKEN ?? "",
    hostUrl:
      process.env.SERVER_HOST_URL?.replace(/\/$/, "") ??
      process.env.API_BASE_URL?.replace(/\/api\/v1\/?$/, "") ??
      "http://localhost:3000",
  },
};
