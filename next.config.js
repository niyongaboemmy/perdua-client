/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "universalbridge.rw",
        port: "",
        pathname: "/pbapi/**",
      },
      {
        protocol: "https",
        hostname: "deafactionrda.org",
        port: "",
        pathname: "/pbapi/**",
      },
    ],
  },
};

module.exports = nextConfig;
