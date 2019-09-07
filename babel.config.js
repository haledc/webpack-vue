module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '67',
          ie: '11'
        },
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import']
}
