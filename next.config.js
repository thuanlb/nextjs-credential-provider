/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: (process.env.IMAGE_DOMAINS ?? "").split(","),
    },
};

module.exports = nextConfig;