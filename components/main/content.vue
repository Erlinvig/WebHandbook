<template lang="pug">
  .wrapper(v-if="getCurrentTechnology")
    .container(@click="JUST_CLICK")
      chapter(
        v-for="chapter in getCurrentTechnology.chapters"
        :key="chapter._id"
        :chapter="chapter"
      )
      p {{getCurrentTechnology.chapters[0].isOpen}}
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
    methods: {
      JUST_CLICK() {
        console.log('Удалить после того как все заработает')
        this.$store.dispatch('content/openChapter', {id: "5d667a2ffd83f724609b87a5"})
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

</style>
