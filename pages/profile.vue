<template lang="pug">
  .container
    .profile-wrapper
      .profile-wrapper__title.mb1
        span Настройки аккаунта
      .profile-wrapper__row.row
        span.row__title Имя:
        span.row__field(
          v-if="firstName.state === stateOption.default"
        ) {{user.firstName}}
        .row__modify(v-if="firstName.state === stateOption.modification")
          input(
            v-model="firstName.field"
            placeholder="Новое имя"
            )
          i.el-icon-circle-close(
            @click="closeModifyFirstName"
          )
        button.row__btn(
          @click="modifyFirstName"
        ) Изменить
      .profile-wrapper__row.row.mb1
        span.row__title Фамилия:
        span.row__field(
          v-if="secondName.state === stateOption.default"
        ) {{user.secondName}}
        .row__modify(v-if="secondName.state === stateOption.modification")
          input(
            v-model="secondName.field"
            placeholder="Новое имя"
          )
          i.el-icon-circle-close(
            @click="closeModifySecondName"
          )
        button.row__btn(
          @click="modifySecondName"
        ) Изменить

</template>

<script>
  export default {
    data() {
      return {
        stateOption: {
          default: 'default',
          modification: 'modification',
          loading: 'loading'
        },
        firstName: {
          field: '',
          state: 'default'
        },
        secondName: {
          field: '',
          state: 'default'
        }
      }
    },
    methods: {
      modifyFirstName() {
        this.firstName.field = this.user.firstName;
        this.firstName.state = this.stateOption.modification
      },
      closeModifyFirstName() {
        this.firstName.state = this.stateOption.default
      },
      modifySecondName() {
        this.secondName.field = this.user.secondName;
        this.secondName.state = this.stateOption.modification
      },
      closeModifySecondName() {
        this.secondName.state = this.stateOption.default
      }
    },
    computed: {
      user() {
        return this.$store.getters['auth/currentUser']
      }
    }
  }
</script>

<style lang="scss" scoped>
  .profile-wrapper {
    display: flex;
    flex-direction: column;
    margin: 1em auto;
    padding: 0 1em;
    background-color: #fff;
    border-radius: .5em;
    width: 70%;

    &__title {
      display: flex;
      justify-content: center;
      padding: 1em;
      border-bottom: 1px solid #d4d9e8;
      span {
        font-size: 20px;
        font-weight: 700;
      }
    }

    .row {
      padding: .5em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__title {
        width: 20%;
        font-size: 18px;
      }
      &__field {
        margin-left: 5em;
      }
      &__field, &__modify {
        font-size: 18px;
        width: 35%;
        display: flex;
        align-items: center;

        input {
          width: 80%;
          font-size: 18px;
          padding: .5em;
          border: 1px solid gainsboro;
        }
        i {
          font-size: 26px;
          margin-left: .5em;
          text-align: center;
          cursor: pointer;
          transition: .35s;
          &:hover {
            color: #7f0000;
          }
        }
      }
      &__btn {
        width: 20%;
        cursor: pointer;
        border: 1px solid #c8cddb;
        padding: .5em 1em;
        border-radius: 1em;
        transition: .5s;
      }
    }
  }
</style>
