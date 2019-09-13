module.exports = `
type User {
  _id: ID!
  firstName: String
  secondName: String
  login: String
  password: String
  status: String
  token: String
  pages: [Page]
}
`;
