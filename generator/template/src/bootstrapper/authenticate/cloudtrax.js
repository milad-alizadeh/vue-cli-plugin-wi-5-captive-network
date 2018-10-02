import axios from 'axios'

/**
 * Authenticate user on Cloudtrax Access Point
 * @return {Promise}
 */
export default async () => {
  const authServer = 'http://ap-auth.wi-5.com/uam.php'
  const currenturl = window.location.href
  const params = currenturl.split('?')[1] + '&accept=accept'
  const newUrl = params ? `${authServer}?${params}` : authServer

  // Create Iframe
  let iframe = document.createElement('iframe')
  iframe.style.width = '1px'
  iframe.style.height = '1px'
  iframe.style.border = '0'
  iframe.style.position = 'absolute'
  document.body.prepend(iframe)

  try {
    let response = await axios.get(newUrl)
    let { data } = response

    if (data.status === 'process') {
      iframe.src = data.message
    } else {
      throw new Error(`Status ${data.status}: ${data.message}`)
    }
  } catch (e) {
    throw new Error(e)
  }
}
