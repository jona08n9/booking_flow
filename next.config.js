/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
const config = {
  development: {
    apiUrl: "http://localhost:8080",
  },
  production: {
    apiUrl: "https://glitch.com/scratched-bronze-lingonberry",
  },
};

export default config;
