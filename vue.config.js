const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  lintOnSave:false,
  //该配置文件是跟webpack.config.js一样的 只不过vue把webpack的配置文件进行了封装
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' }, 
      },
    },
  },
})
