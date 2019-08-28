import {temporary} from './temporaryData'

export const state = () => ({
  technologies: temporary
});

export const actions = {
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

  async getTechnologyById({}, payload) {
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
    return result.data.technologies[0]
  }
};

export const getters = {
  getTechnologies: state => state.technologies
};

