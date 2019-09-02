module.exports = `
type Chapter {
    _id: ID!
    title: String!
    technologyID: String!
    pages: [Page]
  }
`;
