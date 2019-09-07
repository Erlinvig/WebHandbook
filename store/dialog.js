export const state = () => ({
  isOpen: false,
  payload: null
});

export const mutations = {
  open(state, payload) {
    state.isOpen = true;
    state.payload = payload;
  },
  close(state) {
    state.isOpen = false
  }
};

export const actions = {
  open({commit}, payload) {
    commit('open', payload);
  },
  close({commit}) {
    commit('close');
  },
};

export const getters = {
  getStateOpening: state => state.isOpen,
  getPayload: state => state.payload
};
