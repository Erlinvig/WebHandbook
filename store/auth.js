import queryAuth from './query/auth'

export const state = () => ({

});

export const actions = {
  async signup({}, payload) {
    const query = queryAuth.signup(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    console.log(result)
  }
};
