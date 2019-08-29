<template lang="pug">
  .wrapper
    .container
      chapter(
        v-for="chapter in technology.chapters"
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
    async mounted() {

      this.technology = await this.$store.dispatch('content/getTechnologyById', {id: "5d6679eafd83f724609b87a4"});
      // console.log(this.$route.query.technologyID);
      // const technologyID = .technologyID;
    },
    data() {
      return {
        technology: {}
      }
    },
    computed: {
      getTechnologyById() {

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
