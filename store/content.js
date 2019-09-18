import queryContent from './querys/content'

export const state = () => ({
  activeTechnologyID: null,
  currentTechnology: null,
  technologyList: null
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
  setTechnologyList(state, payload) {
    state.technologyList = payload.technologyList
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
    commit('setTechnologyList', {technologyList: result.data.technologies});
    //return result.data.technologies
  },

  async setTechnologyById({commit}, payload) {
    const query = queryContent.getTechnologyById(payload);
    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    commit('setCurrentTechnology', {technology: result.data.technologies[0]});
  },

  async createTechnology({commit, dispatch}, payload) {
    const query = queryContent.createTechnology(payload);

    await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('getTechnologies');
  },

  async changeTechnologyTitle({commit, dispatch}, payload) {
    const query = queryContent.changeTechnologyTitle(payload);

    await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('getTechnologies');
  },

  async removeTechnology({commit, dispatch}, payload) {
    const query = queryContent.removeTechnology(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('getTechnologies');
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
  getTechnologyList: state => state.technologyList,

  getChapter: state => payload => {
    return state.currentTechnology.chapters.find(chapter => chapter._id === payload.id)
  }
};

