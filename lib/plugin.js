import Vue from 'vue'
import Breaky from './Breaky.vue'

const BreakyCtor = Vue.extend(Breaky)

// Nuxt module options are composed in here
const options = <%= JSON.stringify(options, null, 2) %>;

export default async function () {
  const instance = new BreakyCtor({
    propsData: {
      startingPosition: options.position,
    },
  }).$mount()
  document.querySelector('body').appendChild(instance.$el)
}
