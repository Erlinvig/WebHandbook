module.exports = `
type Page {
    _id: ID!
    firstName: String!
    secondName: String!
    login: String!
    password: String
    pages: [Page!]!
`;
