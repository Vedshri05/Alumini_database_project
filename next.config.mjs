/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Note: Turbopack is enabled by default in Next.js 16.0.10
  // If experiencing issues, the cache clear (rm .next) usually resolves it
  // Alternative: Use environment variable to disable
  // NEXT_SKIP_ENV_VALIDATION=true npm run dev
};

export default nextConfig;
