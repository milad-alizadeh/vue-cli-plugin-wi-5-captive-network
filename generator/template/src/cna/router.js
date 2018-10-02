import Vue from 'vue'
import Router from 'vue-router'
import Fallback from './components/Fallback'
import Splash from './components/Splash'
import CloseCna from './components/CloseCna'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Fallback',
      path: '/fallback',
      component: Fallback
    },
    {
      name: 'Captive',
      path: '*',
      component: Splash
    },
    {
      name: 'CloseCna',
      path: '/close-cna',
      component: CloseCna
    }
  ]
})
