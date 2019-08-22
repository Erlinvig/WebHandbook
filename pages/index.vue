<template lang="pug">
  .page
    technologies
    technology-content
</template>

<script>
import technologies from '~/components/main/technologies.vue'
import TechnologyContent from '~/components/main/content.vue'

export default {
  components: {
    technologies,
    TechnologyContent
  }
}
</script>

<style lang="scss" scoped>

</style>
