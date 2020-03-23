<template>
  <Breaky :breakpoints="breakpoints" v-bind="$attrs" />
</template>

<script>
import Breaky from './Breaky'
import { theme } from '~tailwind.config'

export default {
  components: {
    Breaky,
  },

  data() {
    return {
      breakpoints: theme.screens,
    }
  },
}
</script>
