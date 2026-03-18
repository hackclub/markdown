const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@hackclub/markdown'],
  turbopack: {
    root: path.resolve(__dirname, '..')
  }
}
