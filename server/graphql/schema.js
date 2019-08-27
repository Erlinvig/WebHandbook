const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Chapter {
    _id: ID!
    title: String!
  }
  type Technology {
    _id: ID!
    title: String!
    chapters: [Chapter!]
  }
  input TechnologyInput {
    _id: String
    title: String
  }
  type RootQuery {
      technologies: [Technology!]!
  }
  type RootMutation {
    createTechnology(technologyInput: TechnologyInput): Technology
    removeTechnology(technologyInput: TechnologyInput): Technology
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
