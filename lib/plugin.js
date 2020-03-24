import Vue from 'vue'
import Breaky from '@teamnovu/vue-breaky-core'
import { theme } from '~tailwind.config'

const BreakyCtor = Vue.extend(Breaky)

// Nuxt module options are added in here
const options = <%= JSON.stringify(options, null, 2) %>;

export default async function () {
  const instance = new BreakyCtor({
    propsData: {
      breakpoints: theme.screens,
      startingPosition: options.position,
      colorScheme: options.colorScheme
    },
  }).$mount()
  document.querySelector('body').appendChild(instance.$el)
}
