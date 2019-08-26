const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Test {
    title: String!
  }
  type TestInput {
    title: String!
  }
  type RootQuery {
      test: [Test!]
  }
    
  type RootMutation {
    createTest(testInput: TestInput): Test
  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
    
`);
