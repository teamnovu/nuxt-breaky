# nuxt-breaky

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

<!-- [![Circle CI][circle-ci-src]][circle-ci-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

> Show Tailwind CSS Breakpoints in Nuxtjs

[📖 **Release Notes**](./CHANGELOG.md)

## Intro

[DEMO](https://teamnovu.github.io/nuxt-breaky/)

This package always shows you which one of tailwinds breakpoints is currently active and lets you check the breakpoints without leaving the browser.

The plugin is only added when in development mode and does not influence your production build.

![Screenshot of the breakpoint indicator](./example/assets/img/resize-demo.gif 'Breakpoint indicator')

## Setup

1. Add `nuxt-breaky` as a dev-dependency to your project

```bash
yarn add --dev nuxt-breaky # or npm install --save-dev nuxt-breaky
```

2. Add `nuxt-breaky` to the `buildModules` section of `nuxt.config.js`

> Use the `modules` section if you are using Nuxt older than `v2.9`. [More Info](https://nuxtjs.org/guide/modules/#build-only-modules)

```js
{
  buildModules: [
    // Simple usage
    'nuxt-breaky',

    // With options
    [
      'nuxt-breaky',
      {
        /* module options */
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

## Usage

The breaky module automatically adds the breaky plugin when run in `development` mode.
No need to register or include it anywhere else.

### Configuration

You can add options to the breaky using both the module options and the Nuxt config way.

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

#### Available Options

| Option       | Type    | Default       | Description                                                                    |
| ------------ | ------- | ------------- | ------------------------------------------------------------------------------ |
| `enabled`      | `Boolean` | `true`          | Enable/Disable breaky                                                          |
| `enableInProd` | `Boolean` | `false`         | Enable breaky in production (overrides the enabled option)                     |
| `position`     | `String`  | `'bottomRight'` | Breakys starting position (`'topLeft'`\|`'topRight'`\|`'bottomLeft'`\|`'bottomRight'`) |

## Development

1. Clone this repository
2. Install dependencies using `yarn install`
3. Start development server using `yarn dev`

## License

[MIT License](./LICENSE)

Copyright (c) Natthakit Khamso

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-breaky/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-breaky
[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-breaky.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-breaky
[circle-ci-src]: https://img.shields.io/circleci/project/github/teamnovu/nuxt-breaky.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/teamnovu/nuxt-breaky
[codecov-src]: https://img.shields.io/codecov/c/github/teamnovu/nuxt-breaky.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/teamnovu/nuxt-breaky
[license-src]: https://img.shields.io/npm/l/nuxt-breaky.svg?style=flat-square
[license-href]: https://npmjs.com/package/nuxt-breaky
