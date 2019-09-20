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
  }
};

export const getters = {
  getTitle: state => state.title,
  getContent: state => state.content
};
