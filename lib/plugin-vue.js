const Breaky = {}

Breaky.install = function(Vue, config) {
  const defaults = {
    enabled: true,
    enableInProd: false,
    colorScheme: 'auto',
    position: 'bottomRight',
  }

  const options = {
    ...defaults,
    ...config,
  }

  if (
    !(
      options.tailwindConfig &&
      options.tailwindConfig.theme &&
      options.tailwindConfig.theme.screens
    )
  ) {
    console.error(
      'breaky is missing configuration "tailwindConfig" or "tailwindConfig.theme.screens" isn\'t available'
    )
    return
  }

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

export default Breaky
