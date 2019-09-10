<template lang="pug">
  .container
    .auth-wrapper.mt2
      h1.title.mb1 Регистрация
      span.mb1 Как к Вам обращаться?
      .FI
        input.field.mb1(placeholder="Введите имя")
        input.field.mb1(placeholder="Введите фамилию")
      span.mb1 Как Вас идентифицировать?
      input.field.mb1(placeholder="Введите логин")
      span.mb1 Пароль для защиты аккаунта
      .password
        input.field.mb1(placeholder="Введите пароль" type="password")
        input.field.mb1(placeholder="Повторите пароль" type="password")
      button.signup.mb1
        i.el-icon-unlock
        span Зарегигистрироваться
      nuxt-link.signin(to="signin") Есть аккаунт?
</template>

<style lang="scss" scoped>
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

    .FI, .password {
      display: flex;
      justify-content: space-between;
    }

    .title {
      font-size: 20px;
      text-align: center;
    }
    .field {
      min-width: 48%;
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
    .FI, .password {
      flex-direction: column;
    }
  }
</style>
