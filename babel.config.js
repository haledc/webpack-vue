module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
        }
        // 使用时自动引入 polyfill
        // useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: [
    // 动态引入 Vue 懒加载组件
    '@babel/plugin-syntax-dynamic-import',
    // 打包库
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
        helpers: true,
        regenerator: true,
        useESModules: false
      }
    ]
  ]
}
