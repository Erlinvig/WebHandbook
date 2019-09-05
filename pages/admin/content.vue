<template lang="pug">
  .wrapper-content
    technologies-panel(v-if="technologies" :payload="{technologies, location: 'admin'}")
    technology-content(v-if="technology")
</template>

<script>
  import TechnologiesPanel from '~/components/shared/technologies.vue';
  import TechnologyContent from '~/components/admin/content/ContentTable';

  export default {
    layout: 'admin',
    components: {
      TechnologiesPanel,
      TechnologyContent
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
      this.technology = await this.$store.getters['content/getCurrentTechnology'];
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
