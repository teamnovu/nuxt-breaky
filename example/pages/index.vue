<template>
  <div
    class="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
    :style="randomUnsplashImage"
  >
    <h1 class="text-white font-bold text-5xl">
      breaky
    </h1>
  </div>
</template>

<script>
export default {
  computed: {
    randomUnsplashImage() {
      return {
        backgroundImage: 'url(https://source.unsplash.com/random/1600x900)',
      }
    },
  },
}
</script>
