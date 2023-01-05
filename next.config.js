/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uruziga.com",
        port: "",
        pathname: "/pbapi/**",
      },
    ],
  },
};

module.exports = nextConfig;
