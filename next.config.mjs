/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    domains: [process.env.NEXT_PUBLIC_BLOB_HOSTNAME],
  },
};

export default nextConfig;
