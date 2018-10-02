/**
 * Test internet connection by creating an iframe reference to captive.apple.come
 * @return {Promise}
 */
const hasInternet = () => {
  return new Promise((resolve, reject) => {
    let src = 'http://www.tulchangroup.com/favicon.ico'
    let img = new Image()
    img.src = `${src}?${(new Date()).getTime()}`
    img.onload = () => resolve(true)
    img.onerror = () => reject(new Error('could not be reached'))
  })
}

export default hasInternet
