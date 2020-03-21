<template>
  <div
    v-show="!TOGGLE_ME_TO_HIDE_BREAKY"
    class="card text-xs fixed bottom-0 right-0 mb-6 mr-8 bg-indigo-500 p-2 text-white z-50 shadow cursor-pointer antialiased font-bold tracking-wide"
    @click.stop="expanded = !expanded"
  >
    <TransitionExpand>
      <div v-show="expanded" class="pt-4 pb-2 relative">
        <!-- Selected Panel -->
        <span
          v-show="foundBreakpoint !== 0"
          class="absolute h-selected w-full bg-selected rounded-lg ease-out transition-transform duration-200"
          :style="{ transform: `translateY(calc(100% * ${selected}))` }"
        />
        <!-- END Selected Panel -->
        <ul class="relative">
          <li
            v-for="(bp, name, index) in breakpoints"
            :key="index"
            class="flex justify-between py-2 px-4"
            :class="{ 'opacity-50': selected !== index }"
          >
            <span>{{ name }} </span>
            <span class="ml-5">{{ bp }}</span>
          </li>
        </ul>
      </div>
    </TransitionExpand>

    <div
      class="transition duration-300 text-center border-2 border-transparent py-2 px-4 rounded-full flex items-center"
      :class="{ 'border-opacity-30': !expanded }"
    >
      <!-- Desktop -->
      <svg
        v-show="currentScreenWidth > 768"
        aria-hidden="true"
        focusable="false"
        data-icon="desktop"
        class="h-4 mr-3"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path
          fill="rgba(255,255,255, 0.3)"
          d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z"
        />
      </svg>
      <!-- END Desktop -->
      <!-- Mobile -->
      <svg
        v-show="currentScreenWidth <= 768"
        aria-hidden="true"
        focusable="false"
        data-icon="mobile-alt"
        class="h-4 mr-3"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          fill="rgba(255,255,255, 0.3)"
          d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"
        />
      </svg>
      <!-- END Mobile -->
      {{ currentBreakpoint }} - {{ currentScreenWidth }}px
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import TransitionExpand from './TransitionExpand'
import { theme } from '~/tailwind.config'

export default {
  components: {
    TransitionExpand,
  },

  props: {
    position: {
      type: String,
      default: 'bottom-right',
    },
  },

  data() {
    return {
      TOGGLE_ME_TO_HIDE_BREAKY: false,
      breakpoints: theme.screens,
      currentScreenWidth: window.innerWidth,
      currentBreakpoint: '',
      expanded: false,
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
        if (this.mappedBreakpoints[a] < this.mappedBreakpoints[b]) {
          return -1
        }
        if (this.mappedBreakpoints[a] > this.mappedBreakpoints[b]) {
          return 1
        }
        return 0
      })
    },

    /**
     * Get the index of the current breakpoint based on the screen width
     */
    foundBreakpoint() {
      return this.sortedBreakpoints.findIndex(
        (key) => this.mappedBreakpoints[key] >= this.currentScreenWidth
      )
    },

    /**
     * Get the index of the current active breakpoint
     */
    selected() {
      return this.sortedBreakpoints.findIndex(
        (bp) => bp === this.currentBreakpoint
      )
    },
  },

  mounted() {
    this.resizeHandler()

    window.addEventListener('resize', this.resizeHandler)

    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.resizeHandler)
    })
  },

  methods: {
    /**
     *  Evaluate the current breakpoint based on the
     *  browser screen width
     */
    resizeHandler: throttle(function() {
      this.currentScreenWidth = window.innerWidth

      // check if the screen is smaller than the smallest
      // defined screen in the tailwind config
      if (this.foundBreakpoint === 0) {
        return (this.currentBreakpoint = `smaller than ${
          this.breakpoints[this.sortedBreakpoints[0]]
        }`)
      }

      // when no breakpoint has been found take the highest
      if (this.foundBreakpoint === -1) {
        return (this.currentBreakpoint = this.sortedBreakpoints[
          this.sortedBreakpoints.length - 1
        ])
      }

      // set the found breakpoint
      this.currentBreakpoint = this.sortedBreakpoints[this.foundBreakpoint - 1]
    }, 100),
  },
}
</script>

<style scoped>
.card {
  border-radius: 1.75rem;
}

.border-opacity-30 {
  border-color: rgba(255, 255, 255, 0.3);
}

.h-selected {
  height: 34px;
}

.bg-selected {
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
