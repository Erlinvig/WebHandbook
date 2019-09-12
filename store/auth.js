import queryAuth from './query/auth'

export const state = () => ({

});

export const actions = {
  async signup({}, payload) {
    const query = queryAuth.signup(payload);

    const result = await this.$axios.$post('/graphql?', {
      query: query
    });

    if (result.errors[0].message === 'Логин занят!') {
      return {error: result.errors[0].message}
    }
  }
};
