// eslint-disable-next-line no-unused-vars

module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      'platform': '^1.3.5',
      'axios': '^0.18.0'
    },
    vue: {
      chainWebpack: (config) => {
        config.plugins.delete('prefetch')
      }
    }
  })

  api.render('./template')

  api.postProcessFiles(files => {
    if (files['src/main.js']) {
      files['src/main.js'] = `import bootstrapper from './bootstrapper'
import isCna from '@/helpers/is-cna'

(async () => {
  try {
    await bootstrapper.hasInternet()
    if (isCna()) {
      import('./cna/main')
    } else {
      import('./web-app')
    }
  } catch (e) {
    import('./cna/main')
  }
})()
`
    }
  })
}
