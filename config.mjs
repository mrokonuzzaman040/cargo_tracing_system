const nextConfig = {
    // Add valid Next.js configurations here
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [ 'example.com' ],
    },
    async redirects() {
        return [
            {
                source: '/old-path',
                destination: '/new-path',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
