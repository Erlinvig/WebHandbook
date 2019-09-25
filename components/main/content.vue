<template lang="pug">
  .wrapper-content(v-if="getCurrentTechnology")
    .container
      chapter(
        v-for="chapter in getCurrentTechnology.chapters"
        :key="chapter._id"
        :chapter="chapter"
      )
      .chapters-none(v-if="getCurrentTechnology.chapters.length === 0")
        span На данный момент здесь ничего нет
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

    .chapters-none {
      display: flex;
      justify-content: center;
      margin: 1em;

      span {
        text-align: center;
      }
    }
  }
</style>
