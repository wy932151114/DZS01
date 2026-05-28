/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['echarts', 'echarts-for-react'],
  // 不重写API，前端直接通过axios调用NestJS
  // rewrites 仅用于SSR场景
};

module.exports = nextConfig;
