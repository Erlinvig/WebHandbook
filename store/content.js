import queryContent from './query/content'

export const state = () => ({
  activeTechnologyID: null,
  currentTechnology: null
});

export const mutations = {
  setActiveTechnologyId(state, payload) {
    state.activeTechnologyID = payload.activeTechnologyID
  },
  setCurrentTechnology(state, payload) {
    payload.technology.chapters.forEach((chapter) => {
      chapter.isOpen = false;
    });
    state.currentTechnology = payload.technology;


  },
  openChapter(state, payload) {
    state.currentTechnology.chapters.find(chapter => {
      if (chapter._id === payload.id) {
        chapter.isOpen = true
      }
    });
  },
  closeChapter(state, payload) {
    state.currentTechnology.chapters.find(chapter => {
      if (chapter._id === payload.id) {
        chapter.isOpen = false
      }
    });
  }
};

export const actions = {
  setActiveTechnologyId({commit}, payload) {
    commit('setActiveTechnologyId', payload)
  },
  async getTechnologies({commit, state}) {
    const query = queryContent.getTechnologies();
    const result = await this.$axios.$post('/graphql', {
      query: query
    });
    return result.data.technologies
  },

  async setTechnologyById({commit}, payload) {
    const query = queryContent.getTechnologyById(payload);
    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    commit('setCurrentTechnology', {technology: result.data.technologies[0]});
  },

  async createPage({commit, state, dispatch}, payload) {
    const query = queryContent.createPage(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('setTechnologyById', {id: state.activeTechnologyID})
  },

  async removePage({commit, state, dispatch}, payload) {
    const query = queryContent.removePage(payload);
    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('setTechnologyById', {id: state.activeTechnologyID})
  },

  async createChapter({commit, state, dispatch}, payload) {
    const query = queryContent.createChapter(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('setTechnologyById', {id: state.activeTechnologyID})
  },

  async removeChapter({commit, state, dispatch}, payload) {
    const query = queryContent.removeChapter(payload);
    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('setTechnologyById', {id: state.activeTechnologyID})
  },

  openChapter({commit}, payload) {
    commit('openChapter', payload)
  },

  closeChapter({commit}, payload) {
    commit('closeChapter', payload)
  }
};

export const getters = {
  getActiveTechnologyId: state => state.activeTechnologyID,
  getTechnologies: state => state.activeTechnologyID,
  getCurrentTechnology: state => state.currentTechnology,

  getChapter: state => payload => {
    return state.currentTechnology.chapters.find(chapter => chapter._id === payload.id)
  }
};

