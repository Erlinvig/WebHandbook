<template lang="pug">
  .wrapper-content
    technologies-panel(v-if="technologies" :payload="{technologies, location: 'admin'}")
</template>

<script>
  import TechnologiesPanel from '~/components/shared/technologies.vue';

  export default {
    layout: 'admin',
    components: {
      TechnologiesPanel
    },
    async mounted() {
      this.technologies = await this.$store.dispatch('content/getTechnologies');
      if (!this.$route.query.technologyID) {
        this.$store.dispatch('content/setActiveTechnologyId', {activeTechnologyID: this.technologies[0]._id});
        this.$router.push({query: {technologyID: this.technologies[0]._id}});
        this.technologyID = this.technologies[0]._id
      } else {
        this.$store.dispatch('content/setActiveTechnologyId', {activeTechnologyID: this.$route.query.technologyID});
        this.technologyID = this.$route.query.technologyID
      }
      await this.$store.dispatch('content/setTechnologyById', {id: this.technologyID});
    },
    data() {
      return {
        technologies: null,
        technologyID: null,
        technology: null
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
