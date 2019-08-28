const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Page {
    _id: ID!
    title: String!
    content: String!
  }
  type Chapter {
    _id: ID!
    title: String!
    technologyID: String!
    pages: [Page]
  }
  type Technology {
    _id: ID!
    title: String!
    chapters: [Chapter]
  }
  input TechnologyInput {
    _id: String
    title: String
  }
  input ChapterInput {
    _id: String
    title: String
    technologyID: String
  }
  input PageInput {
    _id: String
    title: String
    chapterID: String
  }
  type RootQuery {
      technologies: [Technology!]!
  }
  type RootMutation {
    createTechnology(technologyInput: TechnologyInput): Technology
    removeTechnology(technologyInput: TechnologyInput): Technology
    
    createChapter(chapterInput: ChapterInput): Chapter
    removeChapter(chapterInput: ChapterInput): Chapter
    
    createPage(pageInput: PageInput): Page
    removePage(pageInput: PageInput): Page
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
