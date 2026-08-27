/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  allowedDevOrigins: ['xoutzc-ip-103-107-60-156.tunnelmole.net'],
  async rewrites() {
    const serverHost =
      process.env.SERVER_HOST_URL?.replace(/\/$/, "") ??
      process.env.API_BASE_URL?.replace(/\/api\/v1\/?$/, "") ??
      "http://localhost:3000";

    return [
      {
        source: "/uploads/:path*",
        destination: `${serverHost}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
