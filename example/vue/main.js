import Vue from 'vue'
import '../assets/css/tailwind.css'
import resolveConfig from 'tailwindcss/resolveConfig'
import Breaky from '../../lib/plugin-vue'
import twd from '../tailwind.config'
import App from './App.vue'

Vue.use(Breaky, {
  tailwindConfig: resolveConfig(twd),
  enabled: true,
  enableInProd: process.env.DEPLOY_ENV === 'GH_PAGES',
  position: 'bottomRight',
  colorScheme: 'auto',
})

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
