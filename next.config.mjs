/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // In some Docker/server environments, server-side image optimization
    // cannot reach external hosts reliably. This toggle keeps images visible.
    unoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED === "true",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
