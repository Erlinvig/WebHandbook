module.exports = {
  updateFirstName(payload) {
    return `
    mutation {
      updateFirstName(userInput: {token: "${payload.token}", firstName: "${payload.firstName}"}) {
        _id
        firstName
      }
    }
    `
  },
  updateSecondName(payload) {
    return `
    mutation {
      updateSecondName(userInput: {token: "${payload.token}", secondName: "${payload.secondName}"}) {
        _id
        secondName
      }
    }
    `
  }
};
