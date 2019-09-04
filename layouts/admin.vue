<template lang="pug">
  .app
    navigation
    .wrapper-admin-layout
      admin-menu
      nuxt
</template>

<script>
  import navigation from '../components/navigation'
  import AdminMenu from '../components/admin/AdminMenu'
  export default {
    components: {
      navigation,
      AdminMenu
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper-admin-layout {
    display: flex;
    justify-content: flex-start;
  }
</style>
