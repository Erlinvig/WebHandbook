<template lang="pug">
  .app
    navigation
    nuxt
</template>

<script>
  import navigation from '../components/navigation'
  export default {
    components: {
      navigation
    },
    data() {
      return {
        windowWidth: null
      }
    },
    methods: {
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
        this.$store.dispatch('adaptive/setOptions', {widthWindow: document.documentElement.clientWidth})
      }
    },
    async mounted() {
      await this.$store.dispatch('auth/autoSignin');

      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    }
  }
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
