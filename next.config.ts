import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "static.finnhub.io",
                port: "",
                pathname: "/logo/**",
            },
            {
                protocol: "https",
                hostname: "static2.finnhub.io",
                port: "",
                pathname: "/file/publicdatany/finnhubimage/stock_logo/**",
            },
        ],
    },
};

export default nextConfig;
