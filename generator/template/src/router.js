import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "web-app" */'./WebApp')
    },
    {
      path: '/cna',
      component: () => import(/* webpackChunkName: "cna-app" */'./CnaApp'),
      children: [
        {
          name: 'VSplashPage',
          path: '/',
          component: () => import(/* webpackChunkName: "cna-app" */'./components/pages/VSplashPage')
        },
        {
          name: 'VFallbackPage',
          path: '/fallback',
          component: () => import(/* webpackChunkName: "cna-app" */'./components/pages/VFallbackPage')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
