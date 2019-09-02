const { buildSchema } = require('graphql');
const types = require('./types');
const inputs = require('./inputs');

module.exports = buildSchema(`
  ${types}
  ${inputs}
  
  type RootQuery {
      technologies(technologyInput: TechnologyInput): [Technology!]!
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