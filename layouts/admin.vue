<template lang="pug">
  .app
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
    }
    &__content {
      position: absolute;
      left: 200px;
      margin: 1em;
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
        margin: 1em;
      }
    }
  }
</style>
