<template lang="pug">
  .wrapper
    .container
      .navigation
        ul
          li
            nuxt-link.navigation__link(to="/") Главная
        ul
          li
            nuxt-link.navigation__link.navigation__link--right(to="/") Вход
</template>

<script>

</script>

<style lang="scss" scoped>
  .wrapper {
    z-index: 100;
    height: 62px;
    background-color: #170c2b;
    padding: 20px 0;

    .navigation {
      display: flex;
      justify-content: space-between;
      ul:first-child {
        display: flex;
        justify-content: flex-start;
      }
      &__link {
        color: white;
        font-size: 20px;
        font-weight: 500;
        margin-right: 1.5em;
        &--right {
          margin-right: 0;
        }
      }

    }
  }
</style>

