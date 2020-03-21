import Vue from 'vue'
import Breaky from '../components/Breaky'
const BreakyCtor = Vue.extend(Breaky)

const BreakyPlugin = {
  install(Vue, options) {
    const instance = new BreakyCtor().$mount()
    document.querySelector('body').appendChild(instance.$el)
  },
}

Vue.use(BreakyPlugin)

export default BreakyPlugin
