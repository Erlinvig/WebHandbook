import queryAuth from './queryList/auth'
import Cookie from 'cookie'
import Cookies from 'js-cookie'

export const state = () => ({
  user: null
});

export const mutations = {
  setCurrentUser(state, payload) {
    state.user = payload.user
  },
  clearCurrentUser(state) {
    state.user = null;
  },
  updateFirstName(state, payload) {
    state.user.firstName = payload.firstName
  },
  updateSecondName(state, payload) {
    state.user.secondName = payload.secondName
  },
  updateCurrentPages(state, payload) {
    state.user.pages = payload.pages
  },
};

export const actions = {
  async signin({commit, dispatch}, payload) {
    const query = queryAuth.signin(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    if (result.errors) {
      if (result.errors[0].message === 'Не верный пароль или логин!') {
        return {error: result.errors[0].message}
      }
    } else {
      const token = result.data.signin.token;
      Cookies.set('jwt-token', token);
      const user = await dispatch('getUserByToken', {token});

      commit('setCurrentUser', {user});

      return {
        error: null,
        isUser: true
      }
    }
  },

  async autoSignin({commit, dispatch}) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie;

    const cookies = Cookie.parse(cookieStr || '') || {};
    const token = cookies['jwt-token'];

    if (token) {
      const user = await dispatch('getUserByToken', {token});
      commit('setCurrentUser', {user});
    } else {
      commit('clearCurrentUser');
    }
  },

  async getUserByToken({}, payload) {
    const query = queryAuth.getUserByToken(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    return result.data.getUserByToken
  },

  async signup({commit, dispatch}, payload) {
    const query = queryAuth.signup(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    if (result.errors) {
      if (result.errors[0].message === 'Логин занят!') {
        return {error: result.errors[0].message}
      }
    } else {
      const token = result.data.signup.token;
      Cookies.set('jwt-token', token);
      const user = await dispatch('getUserByToken', {token});

      commit('setCurrentUser', {user});
      return {
        error: null,
        isUser: true
      }
    }
  },
  signout({commit}) {
    Cookies.remove('jwt-token');
    commit('clearCurrentUser');
  }
};

export const getters = {
  currentUser: state => state.user
};
