import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

let appContainer = document.querySelector('#app')
let userData

if (appContainer.hasAttribute('data-userdata')) {
  userData = JSON.parse(appContainer.getAttribute('data-userdata'))
}

new Vue({
  router,
  store,
  components: { App },
  template: '<App :userData="userData" />',
  data () {
    return {
      userData
    }
  }
}).$mount('#app')
