<template>
  <div>
    <iframe
      src="https://tailwindcss.com/"
      class="absolute inset-0 w-full h-full"
      frameborder="0"
    ></iframe>
    <Breaky />
  </div>
</template>

<script>
import Breaky from '~/components/Breaky'
export default {
  components: {
    Breaky,
  },
}
</script>

<style lang="scss" scoped></style>
