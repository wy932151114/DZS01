/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['echarts', 'echarts-for-react'],
  async rewrites() {
    return [
      // 代理 /api/* 到 NestJS 后端
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
