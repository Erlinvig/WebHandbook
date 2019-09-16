module.exports = {
  getTechnologies() {
    return `
        query {
          technologies {
            _id
            title
          }
        }
      `
  },
  getTechnologyById(payload) {
    return `
        query {
          technologies(technologyInput: {_id: "${payload.id}"}) {
            _id
            title
            chapters {
              _id
              title
              pages {
                _id
                title
              }
            }
          }
        }
      `
  },
  createTechnology(payload) {
    return `
    mutation {
      createTechnology(technologyInput: {title: "${payload.title}"}) {
        _id
      }
    }
    `
  },
  createPage(payload) {
    return `
      mutation {
        createPage(pageInput: {title: "${payload.title}", chapterID: "${payload.chapterID}" }) {
          _id
          chapterID
          technologyID
        }
      }
    `
  },
  removePage(payload) {
    return `
      mutation {
        removePage(pageInput: {_id: "${payload._id}" }) {
          _id
        }
      }
    `
  },
  createChapter(payload) {
    return `
      mutation {
        createChapter(chapterInput: {title: "${payload.title}", technologyID: "${payload.technologyID}" }) {
          _id
        }
      }
    `
  },
  removeChapter(payload) {
    return `
      mutation {
        removeChapter(chapterInput: {_id: "${payload._id}" }) {
          _id
        }
      }
    `
  }
};
