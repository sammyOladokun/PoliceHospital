/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,

  // Emits `.next/standalone` with a self-contained `server.js` and only the
  // node_modules actually needed at runtime. This is what gets copied to the
  // hospital's on-premise server, which has no npm registry access.
  //   Build:  npm run build
  //   Run:    node .next/standalone/server.js
  output: "standalone",

  // The portal sits behind the hospital's reverse proxy, so it must not leak
  // stack details or advertise the framework.
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      },
      {
        // Anything under the portal renders patient data — never let a proxy,
        // browser, or shared clinic workstation cache it.
        source: "/dashboard/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, no-cache, must-revalidate, private" }]
      }
    ];
  }
};

export default nextConfig;
