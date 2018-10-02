// eslint-disable-next-line no-unused-vars

module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      "platform": "^1.3.5",
      "axios": "^0.18.0",
      "vue-tel-input": "^2.0.5",
    }
  })

  api.render('./template')
}
