import Cookie from "cookie";
import queryUser from './queryList/user'

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
  },

  async updatePassword({commit}, payload) {
    const token = getToken();

    const query = queryUser.updatePassword({token, ...payload});

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    let successMessage = "Пароль успешно изменен";

    if (result.data.updatePassword) {
     return {success: successMessage, error: null}
    } else {
     return {success: false, error: result.errors[0].message};
    }
  },

  async markPage({commit}, payload) {
    const token = getToken();

    const query = queryUser.markPage({token, ...payload});

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    const query_pages = queryUser.getUserPages({token});

    const result_pages = await this.$axios.$post('/graphql?', {
      query: query_pages
    });

    commit('auth/updateCurrentPages', {pages: result_pages}, { root: 'auth' })
  },

  async unmarkPage({commit}, payload) {
    const token = getToken();

    const query = queryUser.unmarkPage({token, ...payload});

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    const query_pages = queryUser.getUserPages({token});

    const result_pages = await this.$axios.$post('/graphql?', {
      query: query_pages
    });

   commit('auth/updateCurrentPages', {pages: result_pages.data.getUserByToken.pages}, { root: 'auth' })
  }
};
