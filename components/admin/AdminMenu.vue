<template lang="pug">
  .wrapper-menu
    ul.admin-menu
      li.admin-menu__title
        span Панель администратора
      li
        nuxt-link.admin-menu__link(
          to="/admin/content" 
          :class="{'admin-menu__link--active': isRouteActive('admin-content')}"
          )
          i.el-icon-document.admin-menu__link__icon
          span.admin-menu__link__name Контент
      li(v-if="false")
        nuxt-link.admin-menu__link(
          to="/admin/users"
          :class="{'admin-menu__link--active': isRouteActive('admin-users')}"
          )
          i.el-icon-user-solid.admin-menu__link__icon
          span.admin-menu__link__name Пользователи
      li
        nuxt-link.admin-menu__link(
          to="../signout"
        )
          i.el-icon-switch-button.admin-menu__link__icon
          span.admin-menu__link__name Выход
</template>

<script>
  export default {
    methods: {
      isRouteActive(routeName) {
        return this.$route.name === routeName
      }
    }
  }
</script>

<style lang="scss" scoped>
  .admin-menu {
    background-color: #1d1d1d;
    display: flex;
    flex-direction: column;
    height: 100%;
    &__title span {
      display: flex;
      color: #fff;
      justify-content: center;
      padding: 1.5em 0;
      font-size: 18px;
      border-bottom: 1px solid white;
      text-align: center;
    }
    &__link, i {
      color: #fff;
      font-size: 16px;
    }
    &__link {
      padding: 1em;
      display: flex;
      border-bottom: 1px solid white;
      transition: .5s;
      &__icon {
        padding-right: 1em;
      }
      &:hover {
        background-color: #373737;
      }
    }
    &__link--active {
      background-color: #3c3c3c;
    }
  }

  @media (max-width: 767px) {
    .admin-menu {
      &__title,
      &__link__name {
        display: none;
      }
      &__link {
        &__icon {
          padding-right: 0;
        }
      }
    }
  }
</style>
