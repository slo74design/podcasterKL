/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        largePageDataBytes: 128 * 100000, // The default threshold of 128kB can be configured in largePageDataBytes
    },
    images: {
        domains: [
            "is1-ssl.mzstatic.com",
            "is2-ssl.mzstatic.com",
            "is3-ssl.mzstatic.com",
            "is4-ssl.mzstatic.com",
            "is5-ssl.mzstatic.com",
        ],
    },
};

module.exports = nextConfig;
