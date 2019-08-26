const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Technology {
    _id: ID!
    title: String!
  }
  input TechnologyInput {
    title: String!
  }
  type RootQuery {
      technologies: [Technology!]!
  }
  type RootMutation {
    createTechnology(technologyInput: TechnologyInput): Technology
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
