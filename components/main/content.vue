<template lang="pug">
  .wrapper(v-if="getTechnologyById")
    .container
      chapter(
        v-for="chapter in getTechnologyById.chapters"
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
      getTechnologyById() {
        return this.$store.getters['content/getCurrentTechnology'];
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
