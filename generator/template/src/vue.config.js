module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/scss/settings.scss";'
      }
    }
  }
}
