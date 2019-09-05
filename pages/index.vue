<template lang="pug">
  .page
    technologies-panel(v-if="technologies" :payload="{technologies, location: 'main'}")
    technology-content
</template>

<script>
import TechnologiesPanel from '~/components/shared/technologies.vue'
import TechnologyContent from '~/components/main/content.vue'

export default {
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
  },
  data() {
    return {
      technologies: null,
      technologyID: null,
      technology: null
    }
  },
  computed: {
    getCurrentTechnology() {
      this.technology = this.$store.getters['content/getCurrentTechnology']
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
