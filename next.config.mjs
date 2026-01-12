/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
