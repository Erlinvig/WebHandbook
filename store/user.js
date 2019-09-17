import Cookie from "cookie";
import queryUser from './queries/user'

function getToken() {
  const cookieStr = process.browser
    ? document.cookie
    : this.app.context.req.headers.cookie;

  const cookies = Cookie.parse(cookieStr || '') || {};

  return cookies['jwt-token'];
}

export const actions = {
  async updateFirstName({commit, dispatch}, payload) {
    const token = getToken();

    const query = queryUser.updateFirstName({token, ...payload});

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    commit('auth/updateFirstName', {firstName: result.data.updateFirstName.firstName}, { root: 'auth' });
  },

  async updateSecondName({commit, dispatch}, payload) {
    const token = getToken();

    const query = queryUser.updateSecondName({token, ...payload});

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    commit('auth/updateSecondName', {secondName: result.data.updateSecondName.secondName}, { root: 'auth' });
  }
};
