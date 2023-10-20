/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: false,
    compiler: {
        styledComponents: true
    },
    images: {
        unoptimized: true
    }
}

module.exports = nextConfig
