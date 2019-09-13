<template lang="pug">
  .container

    form.auth-wrapper.mt2(@submit="onSubmit" :model="form" v-if="authState === 'default'")
      .error-server.mb1(v-if="error")
        i.el-icon-warning
        span {{error}}
      h1.title.mb1 Вход в систему
      label.error(for="login-form" v-if="errorLogin") Введите логин!
      input.field.mb1(
        id="login-form"
        placeholder="Введите логин"
        v-model="form.login"
        )
      label.error(for="password-form" v-if="errorPassword") Введите пароль!
      input.field.mb1(
        id="password-form"
        placeholder="Введите пароль"
        type="password"
        v-model="form.password"
        )
      button.signin.mb1(type="submit")
        i.el-icon-unlock
        span Войти
      nuxt-link.signup(to="signup") Нет аккаунта?
</template>

<script>
  import { required } from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        authState: 'default',
        errorServer: null,
        form: {
          login: null,
          password: null
        }
      }
    },
    validations: {
      form: {
        login: {
          required
        },
        password: {
          required
        }
      }
    },
    methods: {
      async onSubmit(e) {
        e.preventDefault();
        this.$v.form.$touch();

        if (!this.$v.form.$error) {
          const formData = {
            login: this.form.login,
            password: this.form.password
          };
          this.authState = 'in process';
          const result = await this.$store.dispatch('auth/signin', formData);

          if (result.error) {
            this.errorServer = result.error;
            this.authState = 'default';
          }

          if (result.isUser) {
            this.errorServer = null;
            this.$router.replace({ path: '/' });
            //this.authState = 'default';
          }
        }
      }
    },
    computed: {
      error() {
        return this.errorServer;
      },
      errorLogin() {
        return this.$v.form.login.$error
      },
      errorPassword() {
        return this.$v.form.password.$error
      }
    }
  }
</script>

<style lang="scss" scoped>
  .auth-wrapper {
    border: 1px solid #cacaca;
    border-radius: 1em;
    margin: 2em auto;
    width: 30%;
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
    .signin {
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
    .signup {
      text-align: center;
      color: blue;
      font-size: 16px;

      &:hover {
        color: darkblue;
        text-decoration: underline;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .auth-wrapper {
      width: 45%;
    }
  }

  @media (max-width: 767px) {
    .auth-wrapper {
      width: 100%;
    }
  }
</style>
