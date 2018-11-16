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
      'platform': '^1.3.5',
      'axios': '^0.18.0'
    }
  })

  api.render('./template')
  api.postProcessFiles(files => {
    const app = files['src/App.vue']
    const content = app.replace(/<template>[^]*?<\/template>/, `<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>`)

    files['src/App.vue'] = content
  })
}
