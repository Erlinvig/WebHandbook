import queryContent from './queryList/content'
import CryptoJS from 'crypto-js'

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

      chapter.pages.forEach(page => {
        page.isMarked = false;
      });
    });

    state.currentTechnology = payload.technology;
  },
  clearCurrentTechnology(state) {
    state.currentTechnology = null
  },
  markPages(state) {
    const user = this.getters['auth/currentUser'];
    if (user) {
      const userPages = user.pages;

      let checkInUserPages = function(id) {
        let search = userPages.find(item => item._id === id);
        return !!search;
      };

      state.currentTechnology.chapters.forEach((chapter) => {
        chapter.pages.forEach(page => {
          page.isMarked = checkInUserPages(page._id);
        });
      });
    }
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

  async setTechnologyById({commit, dispatch}, payload) {
    const query = queryContent.getTechnologyById(payload);
    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    commit('setCurrentTechnology', {technology: result.data.technologies[0]});
    await commit('markPages');
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

  clearCurrentTechnology({commit}) {
    commit('clearCurrentTechnology')
  },

  async createPage({commit, state, dispatch}, payload) {
    payload.content = CryptoJS.AES.encrypt(payload.content, 'key').toString();
    const query = queryContent.createPage(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('setTechnologyById', {id: state.activeTechnologyID})
  },

  async updatePage({commit, state, dispatch}, payload) {
    payload.content = CryptoJS.AES.encrypt(payload.content, 'key').toString();
    const query = queryContent.updatePage(payload);

    await this.$axios.$post('/graphql?', {
      query: query
    });
  },

  async removePage({commit, state, dispatch}, payload) {
    const query = queryContent.removePage(payload);
    const result = await this.$axios.$post('/graphql?', {
      query: query
    });
    await dispatch('setTechnologyById', {id: state.activeTechnologyID})
  },

  markPages({commit}) {
    commit('markPages')
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
  },

  guestNotification({commit, dispatch, getters}, payload) {
    if (payload.user.status === 'guest') {
      dispatch('dialog/open', {
        type: 'notification',
        message: 'Действие невозможно, так как вы находитесь в гостевом режиме!'
      }, { root: 'dialog' });
    }
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

