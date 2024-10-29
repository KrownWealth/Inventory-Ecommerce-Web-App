/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        fs: false,
      };
    }
    config.externals = [...config.externals, "bcrypt"];

    return config;
  },
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
  },
};

export default nextConfig;
