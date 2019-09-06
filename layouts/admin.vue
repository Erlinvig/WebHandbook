<template lang="pug">
  .app
    dialog-window.dialog
    .admin-layout
      admin-menu.admin-layout__menu
      .admin-layout__wrapper
        nuxt.admin-layout__wrapper__content
</template>

<script>
  import navigation from '../components/navigation'
  import AdminMenu from '../components/admin/AdminMenu'
  import DialogWindow from '../components/shared/DialogWindow'

  export default {
    components: {
      navigation,
      AdminMenu,
      DialogWindow
    },
    data() {
      return {
        windowWidth: null
      }
    },
    methods: {
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
        this.$store.dispatch('adaptive/setOptions', {widthWindow: document.documentElement.clientWidth})
      }
    },
    mounted() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    }
  }
</script>

<style lang="scss" scoped>
  .app {
    .dialog {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      position: fixed;
      z-index: 200;
    }
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
    &__wrapper {
      position: absolute;
      width: calc(100% - 200px - 4em);
      left: 200px;
      margin: 0 2em;

      &__content {
        max-width: 100%;
      }
    }
  }

  @media (max-width: 767px) {
    .admin-layout {
      &__menu {
        width: 50px;
      }
      &__wrapper {
        position: absolute;
        width: calc(100% - 50px - 2em);
        left: 50px;
        margin: 0 1em;
      }
    }
  }
</style>
