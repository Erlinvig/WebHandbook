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
        )
          span(v-if="firstName.state === stateOption.default") Изменить
          span(v-if="firstName.state === stateOption.modification") Сохранить
          span.el-icon-loading(v-if="firstName.state === stateOption.loading")

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
        )
          span(v-if="secondName.state === stateOption.default") Изменить
          span(v-if="secondName.state === stateOption.modification") Сохранить
          span.el-icon-loading(v-if="secondName.state === stateOption.loading")
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
      async modifyFirstName() {
        if (this.firstName.state === this.stateOption.default){
          this.firstName.field = this.user.firstName;
          this.firstName.state = this.stateOption.modification
        }
        else if (this.firstName.state === this.stateOption.modification) {
          this.firstName.state = this.stateOption.loading;
          await this.updateFirstName();
          this.firstName.state = this.stateOption.default;
        }
      },
      async updateFirstName() {
        if (this.firstName.field) {
          await this.$store.dispatch('user/updateFirstName', {firstName: this.firstName.field});
        }
      },
      closeModifyFirstName() {
        this.firstName.state = this.stateOption.default
      },

      async modifySecondName() {
        if (this.secondName.state === this.stateOption.default){
          this.secondName.field = this.user.secondName;
          this.secondName.state = this.stateOption.modification
        }
        else if (this.secondName.state === this.stateOption.modification) {
          this.secondName.state = this.stateOption.loading;
          await this.updateSecondName();
          this.secondName.state = this.stateOption.default;
        }
      },
      async updateSecondName() {
        if (this.secondName.field) {
          await this.$store.dispatch('user/updateSecondName', {secondName: this.secondName.field});
        }
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
    margin: 2em auto;
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
          font-size: 15px;
          padding: .4em .6em;
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
