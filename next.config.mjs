/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        EMAIL_HOST: process.env.EMAIL_HOST,
        EMAIL_PORT: process.env.EMAIL_PORT,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS,
    },
    images: {
        domains: [ 'img.daisyui.com' ],
    },
    reactStrictMode: true,
    source: '/api/:path*',
    destination: '/404',
    permanent: false,
};

export default nextConfig;