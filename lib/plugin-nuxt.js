import Vue from 'vue'
import Breaky from './components/BreakyNuxt.vue'

const BreakyCtor = Vue.extend(Breaky)

// Nuxt module options are composed in here
const options = <%= JSON.stringify(options, null, 2) %>;

export default async function () {
  const instance = new BreakyCtor({
    propsData: {
      startingPosition: options.position,
      colorScheme: options.colorScheme
    },
  }).$mount()
  document.querySelector('body').appendChild(instance.$el)
}
