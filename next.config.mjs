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
};

export default nextConfig;
