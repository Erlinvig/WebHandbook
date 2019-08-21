<template lang="pug">
  .wrapper
    .container
      .navigation
        ul
          li
            nuxt-link.navigation__link(to="/") Главная
        ul
          li
            nuxt-link.navigation__link(to="/") Вход
</template>

<script>

</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: #170c2b;
    padding: 1.7em;

    .navigation {
      display: flex;
      justify-content: space-between;
      &__link {
        color: white;
        font-size: 22px;
        font-weight: 700;
      }
    }
  }
</style>

