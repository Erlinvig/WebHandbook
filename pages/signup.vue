<template lang="pug">
  .container
    form.auth-wrapper.mt2(:model="form" @submit="onSubmit")
      .error-server.mb1(v-if="error")
        i.el-icon-warning
        span {{error}}
      h1.title.mb1 Регистрация
      span.mb1 Как к Вам обращаться?
      .FI-box
        .FI-box__first-name(:class="{mt23px: errorFirstNameMarginTop}")
          label.error(
            for="firstName"
            v-if="errorFirstName"
            ) Введите Ваше имя!
          input.field.mb1(
            placeholder="Введите имя"
            id="firstName"
            v-model="form.firstName"
            )

        .FI-box__second-name(:class="{mt23px: errorSecondNameMarginTop}")
          label.error(
            for="secondName"
            v-if="errorSecondName"
            ) Введите Вашу фамилию!
          input.field.mb1(
            placeholder="Введите фамилию"
            id="secondName"
            v-model="form.secondName"
            )

      span.mb1 Как Вас идентифицировать?
      label.error(
        for="login-form"
        v-if="errorLogin"
      ) Введите логин!
      input.field.mb1(
        placeholder="Введите логин"
        id="login-form"
        v-model="form.login"
        )

      span.mb1 Пароль для защиты аккаунта
      .password-box
        .password-box__password(:class="{mt23px: errorPasswordMarginTop}")
          label.error(
            for="password-form"
            v-if="errorPassword"
          ) Введите пароль!
          input.field.mb1(
            placeholder="Введите пароль"
            type="password"
            id="password-form"
            v-model="form.password"
          )

        .password-box__repeat-password(:class="{mt23px: errorRepeatPasswordMarginTop}")
          label.error(
            for="password-repeat"
            v-if="errorRepeatPassword"
          ) Пароли не совпадают!
          input.field.mb1(
            placeholder="Повторите пароль"
            type="password"
            id="password-repeat"
            v-model="form.repeatPassword"
          )

      button.signup.mb1
        i.el-icon-unlock
        span Зарегигистрироваться
      nuxt-link.signin(to="signin") Есть аккаунт?
</template>

<script>
  import { required, minLength, sameAs } from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        errorServer: null,
        form: {
          firstName: null,
          secondName: null,
          login: null,
          password: null,
          repeatPassword: null
        }
      }
    },
    validations: {
      form: {
        firstName: {
          required
        },
        secondName: {
          required
        },
        login: {
          required
        },
        password: {
          required,
          minLength: minLength(6)
        },
        repeatPassword: {
          sameAsPassword: sameAs('password')
        }
      }
    },
    methods: {
      async onSubmit(e) {
        e.preventDefault();
        this.$v.form.$touch();

        if (!this.$v.form.$error) {
          const formData = {
            firstName: this.form.firstName,
            secondName: this.form.secondName,
            login: this.form.login,
            password: this.form.password
          };

          const result = await this.$store.dispatch('auth/signup', formData);

          if (result.error) {
            this.errorServer = result.error;
          }
        }
      }
    },
    computed: {
      error() {
        return this.errorServer;
      },
      errorFirstName() {
        return this.$v.form.firstName.$error
      },
      errorSecondName() {
        return this.$v.form.secondName.$error
      },
      errorLogin() {
        return this.$v.form.login.$error
      },
      errorPassword() {
        return this.$v.form.password.$error
      },
      errorRepeatPassword() {
        return this.$v.form.repeatPassword.$error
      },
      errorPasswordMarginTop() {
        return !!(this.$v.form.repeatPassword.$error && this.$v.form.password.$error === false);
      },
      errorRepeatPasswordMarginTop() {
        return  !!(this.$v.form.password.$error && this.$v.form.repeatPassword.$error === false);
      },
      errorFirstNameMarginTop() {
        return !!(this.$v.form.secondName.$error && this.$v.form.firstName.$error === false);
      },
      errorSecondNameMarginTop() {
        return  !!(this.$v.form.firstName.$error && this.$v.form.secondName.$error === false);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .mt23px {
    margin-top: 23px;
  }
  .auth-wrapper {
    border: 1px solid #cacaca;
    border-radius: 1em;
    margin: 2em auto;
    width: 50%;
    background-color: #fff;
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .error {
      color: red;
      margin-bottom: .5em;
    }

    .error-server {
      text-align: center;
      border-bottom: 1px solid #b93434;
      padding: .5em;
      background: #fdf5b6;
      i, span {
        font-size: 18px;
        color: #b93434;
      }
      span {
        font-weight: 600;
      }
      i {
        margin-right: .5em;
      }
    }

    .FI-box, .password-box {
      display: flex;
      justify-content: space-between;

      &__first-name, &__second-name, &__password, &__repeat-password {
        display: flex;
        flex-direction: column;
        min-width: 48%;
        .fiend {
          min-width: 100%;
        }
      }
    }

    .title {
      font-size: 20px;
      text-align: center;
    }
    .field {
      border: 1px solid #cacaca;
      border-radius: 5px;
      padding: .6em;
      font-size: 16px;
      &:focus {
        color: darkblue;
      }
    }
    .signup {
      cursor: pointer;
      background-color: #030053;
      border-radius: .5em;

      color: white;
      padding: 1em;
      i, span {
        font-size: 18px;
      }
      i {
        margin-right: .5em;
      }
    }
    .signin {
      text-align: center;
      color: blue;
      font-size: 16px;

      &:hover {
        color: darkblue;
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 991px) {
    .auth-wrapper {
      width: 100%;
    }
  }

  @media (max-width: 479px) {
    .FI-box, .password-box {
      flex-direction: column;
    }
  }
</style>
