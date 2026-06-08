import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [],
  turbopack: {
    resolveAlias: {
      "bun:sqlite": false,
    },
  },
  output: 'standalone',
  // Preserve any existing settings your project needs
  // (e.g., images domains, redirects, etc.)
  // If you had custom settings before, add them back below.
};

export default nextConfig;
