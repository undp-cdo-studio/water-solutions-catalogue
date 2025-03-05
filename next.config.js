/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*", // Apply to all routes
        headers: [
          // {
          //   key: 'Content-Security-Policy',
          //   value: [
          //     // Default sources
          //     "default-src 'self'",
              
          //     // Scripts
          //     "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.undp.org",
              
          //     // Styles
          //     "style-src 'self' 'unsafe-inline'",
              
          //     // Images
          //     "img-src 'self' data: blob: https:",
              
          //     // Fonts
          //     "font-src 'self'",
              
          //     // Connect (for Supabase)
          //     `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL} https://*.supabase.co https://*.undp.org`,
              
          //     // Frame configuration for UNDP
          //     "frame-src 'self' *.undp.org open.undp.org",
          //     "frame-ancestors 'self'",
              
          //     // Media
          //     "media-src 'self'",
              
          //     // Object and download support
          //     "object-src 'self'",
              
          //   ].join('; ')
          // },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_SUPABASE_URL || "", // Using environment variable instead of hardcoded value
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Prevent MIME sniffing
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN' // Changed from DENY to allow your app to be framed by itself
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block", // Enable XSS filtering
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // {
          //   key: 'Permissions-Policy',
          //   value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          // }
        ],
      },
    ];
  },
};

module.exports = nextConfig;