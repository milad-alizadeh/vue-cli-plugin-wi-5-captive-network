// eslint-disable-next-line no-unused-vars
const addLine = (string, match, line) => {
  let lines = string.split(/\r?\n/g).reverse()
  let lastImportIndex = lines.findIndex(line => line.match(match))
  let alreadyAdded = lines.find(line => line.indexOf(line) > -1)

  if (!alreadyAdded) {
    lines[lastImportIndex] += `\n${line}`
    return lines.reverse().join('\n')
  }

  return string
}

module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      'ua-parser-js': '^0.7.19',
      'axios': '^0.18.0'
    }
  })

  api.render('./template')

  api.postProcessFiles(files => {
    const app = files['src/App.vue']

    if (app) {
      const content = addLine(app, /^import/, `import bootstrapper from './bootstrapper'
import isCna from '@/helpers/is-cna'`)


      const content2 = addLine(content, /^export default {/, `  data () {
    return {
      connectionTested: false
    }
  },`)

      const content3 = addLine(content2, /mounted/, '    this.testConnection()')
      const content4 = addLine(content3, /methods/, `    async testConnection () {
      let router = this.$router

      try {
        await bootstrapper.hasInternet()
        if (isCna()) {
          router.push('/cna')
        } else {
          router.push('/')
        }

        this.connectionTested = true
      } catch (e) {
        router.push('/cna')
        this.connectionTested = true
      }
    },`)

      const content5 = content4.replace(/<template>[^]*?<\/template>/, `<template>
  <div id="app">
    <template v-if="connectionTested">
      <router-view></router-view>
    </template>
  </div>
</template>`)

      files['src/App.vue'] = content5
    }
  })
}
