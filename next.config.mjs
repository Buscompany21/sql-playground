/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // Remove or set to false if you're not using images
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
    assetPrefix: '/',
    basePath: '',
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                crypto: false,
            };
        }
        return config;
    },
};

export default nextConfig;
