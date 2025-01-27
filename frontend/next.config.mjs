/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // Include the backend port
        pathname: "/**", // Allow all paths
      },
    ],
  },
};

export default nextConfig;
