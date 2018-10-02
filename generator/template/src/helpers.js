import platform from 'platform'

/**
 * Detect if the current enviornment is in captive network assistant
 * @return {Boolean}
 */
export const isCna = () => {
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

  // return true
}

/**
 * Remove a query parameter from a given url
 * @param  {String} url
 * @param  {String} key
 * @return {String}
 */
export const removeQueryParam = (key, url = window.location.href) => {
  // prefer to use l.search if you have a location/link object
  let urlparts = url.split('?')
  if (urlparts.length >= 2) {
    let prefix = encodeURIComponent(key) + '='
    let pars = urlparts[1].split(/[&;]/g)

    // reverse iteration as may be destructive
    for (let i = pars.length; i-- > 0;) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1)
      }
    }

    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '')
  }

  return url
}

/**
 * Add a query parameter to current url search and return a string
 * @param {String} key
 * @param {String} value
 * @return {String} combined query parameters
 */
export const addQueryParam = (key, value, url = window.location.search) => {
  key = encodeURI(key)
  value = encodeURI(value)

  let kvp = url.substr(1).split('&')

  let i = kvp.length
  let x
  while (i--) {
    x = kvp[i].split('=')

    if (x[0] === key) {
      x[1] = value
      kvp[i] = x.join('=')
      break
    }
  }

  if (i < 0) {
    kvp[kvp.length] = [key, value].join('=')
  }

  return kvp.join('&')
}

/**
 * Get a query parameter value from a given URL
 * @param  {String} name
 * @param  {String} [url=window.location.href]
 * @return {String}
 */
export const getQueryParameter = (name, url = window.location.href) => {
  name = name.replace(/[[]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

/**
 * Check if a query parameter exists on the current window location
 * @param  {String}  key
 * @param  {String}  [value='']
 * @return {Boolean}
 */
export const hasQueryParam = (key, value = '') => {
  return window.location.search.indexOf(`${key}=${value}`) > -1
}

/**
 * Creates a unique id to be used for DOMs
 * @return {String}
 */
export const uid = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}

/**
 * Only allow digit key presses
 * @param  {Object}  e event object
 * @return {Boolean}   [description]
 */
export const isNumberKey = (e) => {
  let charCode = (e.which) ? e.which : e.keyCode
  if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
    e.preventDefault()
  } else {
    return true
  }
}

/**
 * Limit the length of input
 * @param  {Object}  e event object
 */
export const limitLength = (e, length) => {
  if (e.target.value.length >= length) {
    e.preventDefault()
  }
}

/**
 * Return only digit characters of a given string
 * @param  {String} string
 * @return {String} digits only string
 */
export const onlyDigits = (string) => {
  return string.replace(/[^0-9]+/g, '')
}
