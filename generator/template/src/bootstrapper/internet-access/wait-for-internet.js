import hasInternet from './has-internet'
/**
 * Wait for internet connection to get granted and timeout if it doesn't after 15 seconds
 * @return {Promise}
 */
const waitForInternet = (timeout = 15000) => {
  let startTime = (new Date()).getTime()

  return new Promise((resolve, reject) => {
    let interval = setInterval(async () => {
      let now = new Date()
      let dif = Math.floor(now.getTime() - startTime)

      if (dif >= timeout) {
        clearInterval(interval)
        reject(new Error(`internet access could not be granted after ${timeout / 1000}s`))
      }

      try {
        await hasInternet()
        clearInterval(interval)
        resolve(true)
      } catch (e) {
        throw new Error(e)
      }
    }, 1000)
  })
}

export default waitForInternet
