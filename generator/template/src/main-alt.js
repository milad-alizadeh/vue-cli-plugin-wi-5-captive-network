import bootstrapper from './bootstrapper'
import { isCna } from '@/helpers'

(async () => {
  try {
    await bootstrapper.hasInternet()
    if (isCna()) {
      import('./cna/main')
    } else {
      import('./web-app')
    }
  } catch (e) {
    import('./cna/main')
  }
})()
