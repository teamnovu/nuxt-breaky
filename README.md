# nuxt-breaky

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]

<!-- [![npm downloads][npm-downloads-src]][npm-downloads-href] -->
<!-- [![Circle CI][circle-ci-src]][circle-ci-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

> Show Tailwind CSS Breakpoints in Nuxtjs when using the [tailwindcss-module](https://github.com/nuxt-community/tailwindcss-module)

<!-- [📖 **Release Notes**](./CHANGELOG.md) -->

## Intro

[DEMO](https://teamnovu.github.io/nuxt-breaky/)

breaky helps you create your responsive designs faster. It extends the awesome [tailwindcss-module](https://github.com/nuxt-community/tailwindcss-module). breaky reads your defined breakpoints within your tailwind config and shows the currently active breakpoint based on your browser window width.

The plugin will only be loaded during development mode and does not interfere with your production build.

![Demo GIF of window resizing](./example/assets/img/resizing.gif 'Resizing Browser Window')
![Demo GIF of dragging](./example/assets/img/dragging.gif 'Dragging Card to Corners')
![Demo GIF of toggling dark mode](./example/assets/img/toggle-dark-mode.gif 'Toggling between Dark and Light Mode')

## Requirements

Make sure `tailwindcss-module: ^1.4.0` (or higher) is installed.

## Setup

### Nuxt

1. Add `nuxt-breaky` as a dev-dependency to your project

```bash
yarn add nuxt-breaky --dev

# or npm install nuxt-breaky --save-dev
```

2. Add `nuxt-breaky` to the `buildModules` section of `nuxt.config.js`

NOTE: Use the `modules` section if you are using Nuxt older than `v2.9`. [More Info](https://nuxtjs.org/guide/modules/#build-only-modules)

```js
{
  buildModules: [
    // Simple usage
    'nuxt-breaky',

    // With options
    [
      'nuxt-breaky',
      {
        enabled: true,
        enableInProd: false,
        colorScheme: 'auto',
        position: 'bottomRight'
      }
    ]
  ]
}
```

3. Add `exposeConfig: true` to the `tailwindcss` section of `nuxt.config.js`

```js
{
  tailwindcss: {
    exposeConfig: true
  }
}
```

NOTE: Please be aware this adds ~19.5KB (~3.5KB) to the client bundle size when you are in development mode. [More Info](https://github.com/nuxt-community/tailwindcss-module#referencing-in-javascript)

### Vue

1. Add `nuxt-breaky` as a dev-dependency to your project

```bash
yarn add nuxt-breaky --dev

# or npm install nuxt-breaky --save-dev
```

2. Add the following code to your `main.js`

```js
import resolveConfig from 'tailwindcss/resolveConfig' // used to merge tailwindcss default config with your custom config
import Breaky from 'nuxt-breaky/lib/plugin-vue'

Vue.use(Breaky, {
  tailwindConfig: resolveConfig(require('./tailwind.config')), // Required

  // Additional options
  enabled: true,
  enableInProd: process.env.DEPLOY_ENV === 'GH_PAGES',
  position: 'bottomRight',
  colorScheme: 'auto',
})
```

NOTE: Please be aware this adds ~19.5KB (~3.5KB) to the bundle size when you are in development mode.

## Usage

The breaky module automatically adds the breaky plugin when in `development` mode.
No need to register or include it anywhere else.

### Configuration

#### Nuxt

You can pass options to the breaky using both the module options and the Nuxt config way.

```js
{
  buildModules: {
    ['nuxt-breaky', { /* module options */ }]
  },

  breaky: {
    /* module options */
  }
}
```

#### Vue

```js
Vue.use(Breaky, {
  /* plugin options */
})
```

#### Available Options

| Option         | Type      | Default         | Options                                                          | Description                                                                                                                                                                                                                   |
| -------------- | --------- | --------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`      | `Boolean` | `true`          | `true` \| `false`                                                | Enable/Disable breaky                                                                                                                                                                                                         |
| `enableInProd` | `Boolean` | `false`         | `true` \| `false`                                                | Enable breaky in production (overrides the enabled option; Please be aware this adds ~19.5KB (~3.5KB) to the client bundle size. [More Info](https://github.com/nuxt-community/tailwindcss-module#referencing-in-javascript)) |
| `colorScheme`  | `String`  | `auto`          | `'auto'` \| `'light'` \| `'dark'`                                | Switch between different color schemes                                                                                                                                                                                        |
| `position`     | `String`  | `'bottomRight'` | `'topLeft'` \| `'topRight'` \| `'bottomLeft'` \| `'bottomRight'` | Breakys starting position                                                                                                                                                                                                     |

## Development

1. Clone this repository
2. Install dependencies using `yarn install`
3. Start development server using `yarn dev`

### Release

1. `yarn release:patch` (`minor` or `major`)
2. `npm publish`

## License

[MIT License](./LICENSE)

Copyright (c) teamnovu

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-breaky/latest.svg?style=flat-square
[npm-version-href]: https://github.com/teamnovu/nuxt-breaky/releases
[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-breaky.svg?style=flat-square
[npm-downloads-href]: https://github.com/teamnovu/nuxt-breaky/releases
[circle-ci-src]: https://img.shields.io/circleci/project/github/teamnovu/nuxt-breaky.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/teamnovu/nuxt-breaky
[codecov-src]: https://img.shields.io/codecov/c/github/teamnovu/nuxt-breaky.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/teamnovu/nuxt-breaky
[license-src]: https://img.shields.io/npm/l/nuxt-breaky.svg?style=flat-square
[license-href]: https://github.com/teamnovu/nuxt-breaky/blob/master/LICENSE
