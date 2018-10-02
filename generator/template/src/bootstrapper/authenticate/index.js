import cloudtrax from './cloudtrax'

export default (type) => {
  switch (type) {
    case 'cloudtrax':
      cloudtrax()
  }
}
