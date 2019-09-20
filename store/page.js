import queryPage from './queries/page'

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

    return result.data.page
  }
};

export const getters = {
  getTitle: state => state.title,
  getContent: state => state.content
};
