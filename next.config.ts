import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.html": {
          loaders: ["html-loader"],
          as: "*.js",
        },
      },
    },
  },
  // Tambahkan opsi konfigurasi lain di sini jika perlu
};

export default nextConfig;
