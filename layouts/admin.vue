<template lang="pug">
  .app
    navigation.app__navigation
    .admin-layout
      admin-menu.admin-layout__menu
      nuxt.admin-layout__content
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
  .app {
    &__navigation {
      width: 100%;
      position: fixed;
    }
  }
  .admin-layout {
    &__menu {
      position: fixed;
      height: 100%;
      width: 200px;
      margin-top: 62px;
    }
    &__content {
      position: absolute;
      left: 200px;
      top: 62px;
      margin: 2em 3em;
    }
  }

  @media (max-width: 767px) {
    .admin-layout {
      &__menu {
        width: 50px;
      }
      &__content {
        position: absolute;
        left: 50px;
        top: 62px;
        margin: 1em;
      }
    }
  }
</style>
