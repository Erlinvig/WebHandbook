<template lang="pug">
  .container
    .profile-wrapper
      .profile-wrapper__title
        span Настройки аккаунта
      .profile-wrapper__subtitle
        span Личные данные
      .profile-wrapper__row.row.mt1
        span.row__title Имя:
        span.row__field(
          v-if="firstName.state === stateOption.default"
        ) {{user.firstName}}
        .row__modify(v-if="firstName.state === stateOption.modification || firstName.state === stateOption.loading")
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
        .row__modify(v-if="secondName.state === stateOption.modification || secondName.state === stateOption.loading")
          input(
            v-model="secondName.field"
            placeholder="Новая фамилия"
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

      .profile-wrapper__subtitle.mb1
        span Смена пароля
      .password-error(v-if="password.error")
        i.el-icon-warning-outline
        span {{password.error}}
      .password-success(v-if="password.success")
        i.el-icon-circle-check
        span {{password.success}}
      form(@submit="updatePassword" :model="password")
        .password.mb1.mt1
          input(v-model="password.old" type="password" placeholder="Старый пароль")
          input(v-model="password.update" type="password" placeholder="Новый пароль")
          input(v-model="password.repeat" type="password" placeholder="Повторите пароль")
        .password-save.mb2
          button.password-save__btn
            span(v-if="password.state === stateOption.default") Сохранить
            span.el-icon-loading(v-if="password.state === stateOption.loading")
      .profile-wrapper__subtitle
        span Изученные статьи
      .pages.mb2
        .pages__none.mt2(v-if="user.pages.length === 0")
          span Нет изученных статей
        .pages__item(
          v-for="page in user.pages"
          :key="page._id"
          )
          nuxt-link.pages__item__link(:to="`page/${page._id}`") {{page.title}}
          i.el-icon-error(@click="unmarkPage({id: page._id})")
</template>

<script>
  import { required, minLength, sameAs } from 'vuelidate/lib/validators'

  export default {
    middleware: ['authAccess'],
    data() {
      return {
        stateOption: {
          default: 'default',
          modification: 'modification',
          loading: 'loading',
          success: 'success'
        },
        firstName: {
          field: '',
          state: 'default'
        },
        secondName: {
          field: '',
          state: 'default'
        },
        password: {
          error: null,
          success: null,
          state: 'default',
          old: '',
          update: '',
          repeat: ''
        }
      }
    },
    validations: {
      password: {
        old: {
          required
        },
        update: {
          required,
          minLength: minLength(6)
        },
        repeat: {
          sameAsPassword: sameAs('update')
        }
      }
    },
    methods: {
      unmarkPage(payload) {
        this.$store.dispatch('user/unmarkPage', {pageID: payload.id})
      },
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
      },
      async updatePassword(e) {
        e.preventDefault();
        this.$v.password.$touch();

        if (this.$v.password.old.$error) {
          this.password.error = 'Все поля должны быть заполнены!';
          this.password.success = null;
        }
        else if (this.$v.password.update.$error) {
          this.password.error = 'Пароль должен быть не менее 6 символов!';
          this.password.success = null;
        }
        else if (this.$v.password.repeat.$error) {
         this.password.error = 'Пароли не совпадют!';
          this.password.success = null;
        }

        if (this.password.state === this.stateOption.default && !this.$v.password.$error) {
          this.password.state = this.stateOption.loading;
          const formPasswords = {
            oldPassword: this.password.old,
            updatePassword: this.password.update
          };

          const result = await this.$store.dispatch('user/updatePassword', formPasswords);

          this.password.error = result.error;
          this.password.success = result.success;
          this.password.state = this.stateOption.default;

          if (this.password.success) {
            this.password.old = '';
            this.password.update = '';
            this.password.repeat = '';
          }
        }
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
    background-color: #fff;
    border-radius: .5em;
    width: 70%;

    &__title {
      display: flex;
      justify-content: center;
      padding: 1em;
      span {
        font-size: 20px;
        font-weight: 700;
      }
    }

    &__subtitle {
      padding: 1em 1.5em;
      background: #fafbfc;
      border-bottom: 1px solid #d4d9e8;
      border-top: 1px solid #d4d9e8;
      span {
        font-size: 18px;
      }
    }

    .row {
      padding: .35em 1.5em;
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
        display: flex;
        justify-content: center;
      }
    }

    .password {
      padding: 0 1.5em;
      display: flex;
      justify-content: space-between;

      input {
        width: 30%;
        font-size: 15px;
        padding: .4em .6em;
        border: 1px solid gainsboro;
      }
    }
    .password-save {
      padding: 0 1.5em;
      display: flex;
      justify-content: center;

      &__btn {
        width: 30%;
      }
    }

    .password-error {
      border: 1px solid #ff8675;
      margin: 0 1.5em;
      background-color: #ffe2d6;
      padding: .5em;
      display: flex;
      align-items: center;

      i {
        font-size: 25px;
        color: #7f0000;
        margin-right: .5em;
      }
      span {
        color: #7f0000;
      }
    }
    .password-success {
      border: 1px solid #a7ffab;
      margin: 0 1.5em;
      background-color: #deffdf;
      padding: .5em;
      display: flex;
      align-items: center;

      i {
        font-size: 25px;
        color: #009200;
        margin-right: .5em;
      }
      span {
        color: #009200;
      }
    }

    button {
      cursor: pointer;
      border: 1px solid #c8cddb;
      padding: .5em 1em;
      border-radius: 1em;
      transition: .5s;
      &:hover {
        background-color: #dffffd;
      }
    }
  }

  .pages {
    display: flex;
    flex-direction: column;

    &__none {
      display: flex;
      justify-content: center;
    }

    &__item {
      padding: .65em 1.5em;
      border-bottom: 1px solid #dbdbdb;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__link {
        max-width: 80%;
      }

      .el-icon-error {
        cursor: pointer;
        font-size: 20px;
        color: #9c0000;
        transition: .5s;

        &:hover {
          color: red;
        }
      }
    }
  }



  @media (max-width: 991px) {
    .profile-wrapper {
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    .profile-wrapper {
      .row {
        &__title { display: none; }
        &__field { margin: 0; }
        &__field, &__modify {
          width: 55%;
        }
        button { width: 40%; }
      }

      .password {
        margin: 0;
        flex-direction: column;

        input {
          width: 100%;
          margin: .5em 0;
        }
      }
      .password-save {
        margin-top: 1em;
        button {
          width: 100%;
        }
      }
      .password-error, .password-success {
        margin-bottom: .5em;
      }
    }
  }
</style>
