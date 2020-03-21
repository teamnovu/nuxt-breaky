import Vue from 'vue'
import Breaky from './Breaky.vue'
const BreakyCtor = Vue.extend(Breaky)

export default async function () {
  const instance = new BreakyCtor().$mount()
  document.querySelector('body').appendChild(instance.$el)
}
