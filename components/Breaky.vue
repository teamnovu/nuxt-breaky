<template>
  <div class="fixed bottom-0 right-0 mb-4 mr-4">
    <span class="text-xs rounded-lg px-3 py-2 bg-blue-400 text-white z-50">
      {{ currentBreakpoint }}
    </span>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { theme } from '~tailwind.config'

export default {
  data() {
    return {
      breakpoints: theme.screens,
      currentBreakpoint: '',
    }
  },

  computed: {
    /**
     * Convert the breakpoints to integers
     * example: 1024px => 1024
     */
    mappedBreakpoints() {
      const mappedScreens = {}

      Object.keys(this.breakpoints).forEach(
        (key) => (mappedScreens[key] = parseInt(this.breakpoints[key]))
      )

      return mappedScreens
    },

    /**
     * Sort mapped breakpoints based on its values
     */
    sortedBreakpoints() {
      return Object.keys(this.mappedBreakpoints).sort((a, b) => {
        if (this.mappedBreakpoints[a] < this.mappedBreakpoints[b]) return -1
        if (this.mappedBreakpoints[a] > this.mappedBreakpoints[b]) return 1
        return 0
      })
    },
  },

  mounted() {
    this.resizeHandler()

    window.addEventListener('resize', this.resizeHandler)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },

  methods: {
    /**
     *  Evaluate the current breakpoint based on the
     *  browser screen width
     */
    resizeHandler: throttle(function() {
      const screenWidth = window.innerWidth
      const foundBreakpoint = this.sortedBreakpoints.findIndex(
        (key) => this.mappedBreakpoints[key] >= screenWidth
      )

      // check if the screen is smaller than the smallest
      // defined screen in the tailwind config
      if (foundBreakpoint === 0) {
        return (this.currentBreakpoint = `smaller than ${
          this.breakpoints[this.sortedBreakpoints[0]]
        }`)
      }

      // when no breakpoint has been found take the highest
      if (foundBreakpoint === -1) {
        return (this.currentBreakpoint = this.sortedBreakpoints[
          this.sortedBreakpoints.length - 1
        ])
      }

      // set the found breakpoint
      this.currentBreakpoint = this.sortedBreakpoints[foundBreakpoint - 1]
    }, 100),
  },
}
</script>
