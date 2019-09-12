module.exports = {
  signup(payload) {
    return `
    mutation {
      signup(userInput: 
      {firstName: "${payload.firstName}", 
      secondName: "${payload.secondName}", 
      login: "${payload.login}", 
      password: "${payload.password}"}) {
        _id
      }
    }
    `
  }
};
