import Breaky from './components/Breaky.vue'

const Plugin = {}

Plugin.install = function(Vue, config) {
  const BreakyCtor = Vue.extend(Breaky)

  const instance = new BreakyCtor({
    propsData: {
      breakpoints: config.tailwindConfig.theme.screens,
      startingPosition: config.position,
      colorScheme: config.colorScheme,
    },
  }).$mount()
  document.querySelector('body').appendChild(instance.$el)
}

export default Plugin
