import queryPage from './queries/page'
import CryptoJS from "crypto-js";

export const state = () => ({
  title: null,
  content: null
});

export const mutations = {
  updateTitle(state, payload) {
    state.title = payload.title
  },
  updateContent(state, payload) {
    state.content = payload.content
  }
};

export const actions = {
  updateTitle({commit}, payload) {
    commit('updateTitle', payload)
  },
  updateContent({commit}, payload) {
    commit('updateContent', payload)
  },
  async getPageByID({}, payload) {
    const query = queryPage.getPageByID(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    let bytes  = CryptoJS.AES.decrypt(result.data.page.content, 'key');
    result.data.page.content = bytes.toString(CryptoJS.enc.Utf8);

    return result.data.page
  }
};

export const getters = {
  getTitle: state => state.title,
  getContent: state => state.content
};
