/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverActions: true
    }
}

module.exports = nextConfig
// next.config.js

const removeImports = require('next-remove-imports')();
module.exports = removeImports(nextConfig);