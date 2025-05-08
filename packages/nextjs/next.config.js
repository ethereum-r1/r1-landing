// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export for IPFS
  trailingSlash: true, // Ensures proper linking
  images: {
    unoptimized: true, // Required since IPFS doesn't support Next.js image optimizations
  },
  assetPrefix: './', // Use relative URLs for assets
  basePath: '', // Empty base path for IPFS compatibility
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  experimental: {
    // Only optimize package imports, not CSS (requires extra dependency)
    optimizePackageImports: ['react', '@rainbow-me/rainbowkit'],
  },
  // !NOTE: uncomment rewrites for local dev, comment for prod deployment
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://0000000000.org/:path*',
      },
    ];
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

// IPFS-specific configuration
const isIpfs = process.env.NEXT_PUBLIC_IPFS_BUILD === "true" || true; // Force IPFS build mode

if (isIpfs) {
  // These settings ensure assets are properly linked when deployed to IPFS
  nextConfig.assetPrefix = './';
  nextConfig.basePath = '';
  
  // Add specific configuration for IPFS environment
  nextConfig.env = {
    ...nextConfig.env,
    NEXT_PUBLIC_IPFS_DEPLOYMENT: 'true',
  };
}

module.exports = nextConfig;
