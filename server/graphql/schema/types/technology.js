module.exports = `
type Technology {
    _id: ID!
    title: String!
    chapters(chapterInput: ChapterInput): [Chapter]
  }
`;
