const { buildSchema } = require('graphql');
const types = require('./types');
const inputs = require('./inputs');

module.exports = buildSchema(`
  ${types}
  ${inputs}
  
  type RootQuery {
      page(_id: ID): Page
      technologies(technologyInput: TechnologyInput): [Technology!]!
      users(userInput: UserInput): [User!]!
      getUserByToken(userInput: UserInput): User
  }
  type RootMutation {
    createTechnology(technologyInput: TechnologyInput): Technology
    changeTechnologyTitle(technologyInput: TechnologyInput): Technology
    removeTechnology(technologyInput: TechnologyInput): Technology
    
    createChapter(chapterInput: ChapterInput): Chapter
    changeChapterTitle(chapterInput: ChapterInput): Chapter
    removeChapter(chapterInput: ChapterInput): Chapter
    
    createPage(pageInput: PageInput): Page
    updatePage(pageInput: PageInput): Page
    removePage(pageInput: PageInput): Page
    
    signin(userInput: UserInput): User
    signup(userInput: UserInput): User
    updateFirstName(userInput: UserInput): User
    updateSecondName(userInput: UserInput): User
    updatePassword(userInput: UserInput): User
    removeUser(userInput: UserInput): User
    markPage(userInput: UserInput, pageInput: PageInput): User
    unmarkPage(userInput: UserInput, pageInput: PageInput): User
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
