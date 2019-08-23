export const state = () => ({
  widthWindow: null,
  coefficientAdaptive: null
});

export const mutations = {
  setOptions(state, payload) {
    state.widthWindow = payload.widthWindow;

    if (payload.widthWindow < 320) {
      state.coefficientAdaptive = 1;
    } else if (payload.widthWindow >= 320 && payload.widthWindow < 480) {
      state.coefficientAdaptive = 2;
    } else if (payload.widthWindow >= 480 && payload.widthWindow < 768) {
      state.coefficientAdaptive = 3;
    } else if (payload.widthWindow >= 768 && payload.widthWindow < 991) {
      state.coefficientAdaptive = 4;
    } else if (payload.widthWindow >= 992 && payload.widthWindow < 1280) {
      state.coefficientAdaptive = 5;
    } else if (payload.widthWindow >= 1280) {
      state.coefficientAdaptive = 6;
    }
  }
};

export const actions = {
  setOptions({commit}, payload) {
    commit('setOptions', payload);
  }
};

export const getters = {
  getWidthWindow: state => state.widthWindow,
  getCoefficientAdaptive: state => state.coefficientAdaptive
};
