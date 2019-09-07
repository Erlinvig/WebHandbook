export const state = () => ({
  isOpen: false,
  isShow: false,
  payload: null
});

export const mutations = {
  open(state, payload) {
    state.isOpen = true;
    state.payload = payload;
  },
  show(state) {
    state.isShow = true;
  },
  close(state) {
    state.isOpen = false;
    state.isShow = false;
  },
  hide(state) {
    state.isShow = false;
  }
};

export const actions = {
  open({commit}, payload) {
    commit('open', payload);
    setTimeout(()=> {
      commit('show');
    }, 0)
  },
  close({commit}) {
    commit('hide');
    setTimeout(()=> {
      commit('close')
    }, 350);
  },
};

export const getters = {
  getStateOpening: state => state.isOpen,
  getStateShow: state => state.isShow,
  getPayload: state => state.payload
};
