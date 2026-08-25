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
