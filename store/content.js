import {temporary} from './temporaryData'

export const state = () => ({
  technologies: temporary,
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
    const result = await this.$axios.$post('/graphql', {
      query: `
        query {
          technologies {
            _id
            title
          }
        }
      `
    });
    return result.data.technologies
  },

  async setTechnologyById({commit}, payload) {
    const query = `
        query {
          technologies(technologyInput: {_id: "${payload.id}"}) {
            _id
            title
            chapters {
              _id
              title
              pages {
                _id
                title
              }
            }
          }
        }
      `;
    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    commit('setCurrentTechnology', {technology: result.data.technologies[0]});
  },
  async createPage({commit, state, dispatch}, payload) {
    const query = `
      mutation {
        createPage(pageInput: {title: "${payload.title}", chapterID: "${payload.chapterID}" }) {
          _id
          chapterID
          technologyID
        }
      }
    `;

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('setTechnologyById', {id: state.activeTechnologyID})
  },

  async removePage({commit, state, dispatch}, payload) {
    const query = `
      mutation {
        removePage(pageInput: {_id: "${payload._id}" }) {
          _id
        }
      }
    `;
    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('setTechnologyById', {id: state.activeTechnologyID})
  },

  async createChapter({commit, state, dispatch}, payload) {
    const query = `
      mutation {
        createChapter(chapterInput: {title: "${payload.title}", technologyID: "${payload.technologyID}" }) {
          _id
        }
      }
    `;

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('setTechnologyById', {id: state.activeTechnologyID})
  },

  async removeChapter({commit, state, dispatch}, payload) {
    const query = `
      mutation {
        removeChapter(chapterInput: {_id: "${payload._id}" }) {
          _id
        }
      }
    `;
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

