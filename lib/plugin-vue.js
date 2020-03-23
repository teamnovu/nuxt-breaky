const Plugin = {}

Plugin.install = function(Vue, options) {
  if (
    options.enableInProd ||
    (process.env.NODE_ENV === 'development' && options.enabled)
  ) {
    const BreakyCtor = Vue.extend(require('./components/Breaky.vue').default)

    const instance = new BreakyCtor({
      propsData: {
        breakpoints: options.tailwindConfig.theme.screens,
        startingPosition: options.position,
        colorScheme: options.colorScheme,
      },
    }).$mount()
    document.querySelector('body').appendChild(instance.$el)
  }
}

export default Plugin
