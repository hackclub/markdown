module.exports = {
  presets: [['@babel/preset-env', { useBuiltIns: 'usage' }]],
  plugins: ['@babel/plugin-transform-async-to-generator']
}
