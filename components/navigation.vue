<template lang="pug">
  .wrapper
    .container
      .navigation
        ul
          li
            nuxt-link.navigation__link(to="/") Главная
        ul
          li
            nuxt-link.navigation__link.navigation__link--right(to="/signin" v-if="!currentUser") Вход
            .profile(v-if="currentUser")
              button.navigation__link.navigation__link--right(
                @click="isProfile = !isProfile"
                @focus="onFocusProfile"
                @blur="onBlurProfile"
                :class="{'focus': isProfile}"
                ) {{fullName}}
              transition(name="fade" style="z-index: 999999")
               .profile__options(v-if="isProfile && isFocusesFullname")
                 nuxt-link.profile__options__link(to="/profile")
                   i.el-icon-user-solid
                   span Профиль
                 nuxt-link.profile__options__link(to="/signout")
                   i.el-icon-switch-button
                   span Выход
</template>

<script>
  export default {
    data() {
      return {
        isProfile: false,
        isFocusesFullname: false
      }
    },
    methods: {
      onFocusProfile() {
        this.isFocusesFullname = true;
      },
      onBlurProfile() {
        this.isFocusesFullname = false;
        this.isProfile = false;
      }
    },
    computed: {
      currentUser() {
        return this.$store.getters['auth/currentUser']
      },
      fullName() {
        return `${this.currentUser.firstName} ${this.currentUser.secondName}`
      }
    }
  }
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
        cursor: pointer;
        color: white;
        font-size: 20px;
        font-weight: 500;
        margin-right: 1.5em;
        &--right {
          margin-right: 0;
        }
        &:hover {
          color: #c2c0f3;
        }
      }
      .profile {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        &__options {
          width: 100%;
          z-index: 400;
          display: flex;
          flex-direction: column;
          margin-top: 24px;
          background: white;
          padding: .5em;
          border-radius: .5em;
          border: 1px solid #cecece;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          &__link {
            padding: .5em;
            span, i {
              font-size: 16px;
            }
            i {
              margin-right: .5em;
            }

            &:hover {
              background-color: #ececec;
            }

          }
        }
      }
    }
  }
  .focus {
    color: #c2c0f3 !important;
  }
  .fade-enter-active {
    animation: fade .35s;
  }
  .fade-leave-active {
    animation: fade .35s reverse;
  }

  @keyframes fade {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>

