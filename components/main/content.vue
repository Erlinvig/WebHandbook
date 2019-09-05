<template lang="pug">
  .wrapper-content(v-if="getCurrentTechnology")
    .container
      chapter(
        v-for="chapter in getCurrentTechnology.chapters"
        :key="chapter._id"
        :chapter="chapter"
      )
</template>

<script>
  import chapter from './chapter'

  export default {
    components: {
      chapter
    },
    data() {
      return {
        technologyID: null,
        technology: {}
      }
    },
    computed: {
      getCurrentTechnology() {
        return this.$store.getters['content/getCurrentTechnology'];
      }
    },
  }
</script>

<style lang="scss" scoped>
  .wrapper-content {
    margin: 1em 0;
  }
</style>
