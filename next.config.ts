/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'klfmasfbi2f0kmeu.public.blob.vercel-storage.com',
        // pathname: '/**', // можно указать если надо ограничить по папкам
      },
    ],
  },
};

export default nextConfig;
