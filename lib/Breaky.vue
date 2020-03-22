<template>
  <div
    v-show="!TOGGLE_ME_TO_HIDE_BREAKY"
    ref="breaky"
    class="card text-xs fixed flex bg-indigo-500 p-2 text-white z-50 shadow cursor-pointer antialiased font-bold tracking-wide transition-all duration-100"
    :class="{
      'flex-col-reverse': currentPosition.includes('top'),
      'flex-col': currentPosition.includes('bottom'),
    }"
    @click.stop="!noExpand ? (expanded = !expanded) : null"
  >
    <TransitionExpand>
      <div v-show="expanded" class="pt-1 pb-2 relative">
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
      class="current-breakpoint transition duration-300 text-center border-2 border-transparent py-2 px-4 rounded-full flex items-center justify-between"
      :class="{ 'border-opacity-30': !expanded }"
    >
      <!-- Desktop -->
      <svg
        v-show="screenWidth > 1024"
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
        v-show="screenWidth <= 1024"
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
      {{ currentBreakpoint }} - {{ screenWidth }}px
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import interact from 'interactjs'
import TransitionExpand from './TransitionExpand'
import { theme } from '~/tailwind.config'

export default {
  components: {
    TransitionExpand,
  },

  props: {
    startingPosition: {
      type: String,
      default: 'bottomRight',
    },
  },

  data() {
    return {
      TOGGLE_ME_TO_HIDE_BREAKY: false,
      breakpoints: theme.screens,
      expanded: false,
      noExpand: false,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      currentPosition: this.startingPosition,
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
        (key) => this.mappedBreakpoints[key] > this.screenWidth
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

    /**
     * Evaluate the current breakpoint based on the
     * browser screen width
     */
    currentBreakpoint() {
      // check if the screen is smaller than the smallest
      // defined screen in the tailwind config
      if (this.foundBreakpoint === 0) {
        return `smaller than ${this.breakpoints[this.sortedBreakpoints[0]]}`
      }

      // when no breakpoint has been found take the highest
      if (this.foundBreakpoint === -1) {
        return this.sortedBreakpoints[this.sortedBreakpoints.length - 1]
      }

      // set the found breakpoint
      return this.sortedBreakpoints[this.foundBreakpoint - 1]
    },

    /**
     * Get the elements positioning offset
     */
    offset() {
      return {
        x: 32,
        y: 24,
      }
    },

    /**
     * Get snap points based on screen size and offset
     */
    topLeft() {
      return { name: 'topLeft', x: this.offset.x, y: this.offset.y }
    },
    topRight() {
      return {
        name: 'topRight',
        x: this.screenWidth - this.offset.x,
        y: this.offset.y,
      }
    },
    bottomLeft() {
      return {
        name: 'bottomLeft',
        x: this.offset.x,
        y: this.screenHeight - this.offset.y,
      }
    },
    bottomRight() {
      return {
        name: 'bottomRight',
        x: this.screenWidth - this.offset.x,
        y: this.screenHeight - this.offset.y,
      }
    },
    snapPoints() {
      return [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight]
    },
  },

  mounted() {
    this.resizeHandler()

    window.addEventListener('resize', this.resizeHandler)

    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.resizeHandler)
    })

    this.applyStartingPosition()
    this.initInteract()
  },

  methods: {
    /**
     *  Apply the starting position passed through as a prop
     */
    applyStartingPosition() {
      if (typeof this[this.startingPosition] === 'object') {
        // get the elements size
        const w = this.$refs.breaky.clientWidth
        const h = this.$refs.breaky.clientHeight
        // get target coordinates
        const { x, y } = this[this.startingPosition]

        this.updatePosition(this.$refs.breaky, x, y, w, h)
      }
    },

    /**
     *  Update the reactive property of screen width and height
     */
    resizeHandler: throttle(function() {
      this.screenWidth = window.innerWidth
      this.screenHeight = window.innerHeight
    }, 100),

    /**
     *  Update the breaky elements position
     */
    updatePosition(target, x, y, w, h) {
      if (x > this.screenWidth / 2) {
        target.style.left = 'auto'
        target.style.right = this.screenWidth - x - w / 2 + 'px'
      } else {
        target.style.left = x - w / 2 + 'px'
        target.style.right = 'auto'
      }

      if (y > this.screenHeight / 2) {
        target.style.top = 'auto'
        target.style.bottom = this.screenHeight - y - h / 2 + 'px'
      } else {
        target.style.top = y - h / 2 + 'px'
        target.style.bottom = 'auto'
      }
    },

    /**
     *  Get the closest snappoint to a coordinate
     */
    getClosestSnapPoint(x, y) {
      // calculate distance to each snappoint
      const distances = this.snapPoints.map((point) =>
        Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2)
      )

      // get the shortest distance
      const closest = [...distances].sort((a, b) =>
        a > b ? 1 : a < b ? -1 : 0
      )[0]
      // get index of the shortest distance in order to get its coordinates
      const closestIndex = distances.indexOf(closest)

      // get the closest snappoints coordinates
      const closestSnapPoint = this.snapPoints[closestIndex]
      const closestX = closestSnapPoint.x
      const closestY = closestSnapPoint.y
      const closestName = closestSnapPoint.name

      return { x: closestX, y: closestY, name: closestName }
    },

    /**
     *  Initialize the breaky element to be draggable
     */
    initInteract() {
      // get size of breaky element
      const w = this.$refs.breaky.clientWidth
      const h = this.$refs.breaky.clientHeight

      interact(this.$refs.breaky).draggable({
        onstart: (event) => {
          // prevent breaky from expanding and transitioning while dragging
          this.noExpand = true
          event.target.classList.remove('transition-all', 'duration-100')
        },

        onend: (event) => {
          // allow breaky to expand and transition again
          setTimeout(() => (this.noExpand = false), 0)
          event.target.classList.add('transition-all', 'duration-100')

          // get the closest snappoint
          const { x, y, name } = this.getClosestSnapPoint(
            event.pageX,
            event.pageY
          )
          this.currentPosition = name

          // update the breaky elements position
          this.updatePosition(event.target, x, y, w, h)
        },

        onmove: (event) => {
          // update the elements position based on its current size.
          // the size may have changed if the element has been extended before this method is called.
          // this matters if we want the element to be dragged from the center
          this.updatePosition(
            event.target,
            event.pageX,
            event.pageY,
            event.target.clientWidth,
            event.target.clientHeight
          )
        },
      })
    },
  },
}
</script>

<style scoped>
.card {
  min-width: 160px;
  border-radius: 1.75rem;

  touch-action: none;
  user-select: none;
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
