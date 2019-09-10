<template lang="pug">
  .container
    .auth-wrapper.mt2
      h1.title.mb1 Вход в систему
      input.field.mb1(placeholder="Введите логин")
      input.field.mb1(placeholder="Введите пароль" type="password")
      button.signin.mb1
        i.el-icon-unlock
        span Войти
      nuxt-link.signup(to="signup") Нет аккаунта?
</template>

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
