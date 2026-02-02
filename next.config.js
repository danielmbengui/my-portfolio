/** @type {import('next').NextConfig} */
//import { i18n } from './next-i18next.config'
const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  images: {
    domains: ['images.unsplash.com', 'picsum.photos', 'https://unpkg.com/ionicons@5.5.2/dist/', 'academy.dandela.com'],
  },
  reactStrictMode: false,
  webpack: (nextConfig) => {
    nextConfig.resolve.fallback = { 
      //reactStrictMode: true,
      fs: false,
      //timers: false,
      //process: false,
    };

    return nextConfig;
  },
};