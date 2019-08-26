import {temporary} from './temporaryData'

export const state = () => ({
  technologies: temporary
});

export const actions = {
  async getTechnologies({commit, state}) {
    // console.log(state.technologies)

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
  }
};

export const getters = {
  getTechnologies: state => state.technologies
};

