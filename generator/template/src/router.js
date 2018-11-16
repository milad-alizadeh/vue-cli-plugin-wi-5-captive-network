import Vue from 'vue'
import Router from 'vue-router'
import VSplashPage from 'pages/VSplashPage'
import VFallbackPage from 'pages/VFallbackPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'SplashPage',
      path: '/',
      component: VSplashPage
    },
    {
      name: 'FallbackPage',
      path: '/fallback',
      component: VFallbackPage
    }
  ]
})
