import {temporary} from './temporaryData'
const axios = require("axios");

export const state = () => ({
  technologies: temporary
});

export const actions = {
  async getTechnologies({commit, state}) {
    // console.log(state.technologies)
    return await state.technologies
  }
};

export const getters = {
  getTechnologies: state => state.technologies
};

