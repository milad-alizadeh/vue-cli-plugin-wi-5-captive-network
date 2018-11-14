const UAParser = require('ua-parser-js')

/**
 * Detect if the current enviornment is in captive network assistant
 * @return {Boolean}
 */
export default (ua = '') => {
  ua = ua.toLowerCase()
  const parser = new UAParser(ua)
  const platform = parser.getResult()

  if (platform.os.name === 'iOS') {
    if ((ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1) &&
     (ua.indexOf('mozilla/') !== -1) &&
     (ua.indexOf('applewebkit/') !== -1) &&
     (ua.indexOf('mobile/') !== -1) &&
     (ua.indexOf('safari/') === -1)) {
      return true
    }
  } else if (window && !window.localStorage) {
    return true
  }

  return false
}
