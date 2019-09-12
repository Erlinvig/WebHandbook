import queryAuth from './queries/auth'
import Cookie from 'cookie'
import Cookies from 'js-cookie'

export const state = () => ({
  user: null
});

export const mutations = {
  setCurrentUser(state, payload) {
    state.user = payload
  },
  clearToken(state) {
    state.user = null;
  }
};

export const actions = {
  async signin({commit}, payload) {
    const query = queryAuth.signin(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    if (result.errors) {
      if (result.errors[0].message === 'Не верный пароль или логин!') {
        return {error: result.errors[0].message}
      }
    } else {
      const user = result.data.signin;
      Cookies.set('jwt-token', user);
      commit('setCurrentUser', user);

      return {error: null}
    }
  },

  async signup({}, payload) {
    const query = queryAuth.signup(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    if (result.errors) {
      if (result.errors[0].message === 'Логин занят!') {
        return {error: result.errors[0].message}
      }
    } else {
      return {error: null}
    }
  }
};
