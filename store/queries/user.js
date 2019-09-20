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
  },
  updatePassword(payload) {
    return `
    mutation {
      updatePassword(userInput: { token: "${payload.token}", oldPassword: "${payload.oldPassword}", updatePassword: "${payload.updatePassword}" }) {
        _id
      }
    }
    `
  },
};
