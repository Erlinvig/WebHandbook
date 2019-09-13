module.exports = {
  signup(payload) {
    return `
    mutation {
      signup(userInput: 
      {firstName: "${payload.firstName}", 
      secondName: "${payload.secondName}", 
      login: "${payload.login}", 
      password: "${payload.password}"}) {
        token
      }
    }
    `
  },
  getUserByToken(payload) {
    return `
    query {
      getUserByToken(userInput: {token: "${payload.token}"}) {
        _id
        firstName
        secondName
        login
        status
      }
    }`
  },
  signin(payload) {
    return `
    mutation {
      signin(userInput: 
      {
        login: "${payload.login}", 
        password: "${payload.password}"}) {
        token
      }
    }
    `
  }
};

