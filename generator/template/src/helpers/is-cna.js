import platform from 'platform'

/**
 * Detect if the current enviornment is in captive network assistant
 * @return {Boolean}
 */
export default () => {
  let ua = platform.ua.toLowerCase()

  if (platform.os.family === 'iOS') {
    if ((ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1) &&
     (ua.indexOf('mozilla/') !== -1) &&
     (ua.indexOf('applewebkit/') !== -1) &&
     (ua.indexOf('mobile/') !== -1) &&
     (ua.indexOf('safari/') === -1)) {
      return true
    }
  } else if (!window.localStorage) {
    return true
  }
}
