/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "laravel-blog-backend.test",
        hostname: "developer.iamstillalive.co",
      },
      {
        protocol:"https",
        hostname:"cdn-icons-png.flaticon.com"
      }
    ],
  },
};

export default nextConfig;
