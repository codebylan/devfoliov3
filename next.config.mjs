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
  // Désactiver Turbopack temporairement pour résoudre les problèmes d'imports
  experimental: {
    turbo: false,
  },
};

export default nextConfig;
