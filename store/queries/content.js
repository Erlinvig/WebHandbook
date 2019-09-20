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
  changeTechnologyTitle(payload) {
    return `
    mutation {
      changeTechnologyTitle(technologyInput: {_id: "${payload._id}", title: "${payload.title}"}) {
        _id
        title
      }
    }
    `
  },
  removeTechnology(payload) {
    return `
      mutation {
        removeTechnology(technologyInput: {_id: "${payload._id}"}) {
          _id
        }
      }
    `
  },
  createPage(payload) {
    return `
      mutation {
        createPage(pageInput: {title: "${payload.title}", chapterID: "${payload.chapterID}", content: "${payload.content}" }) {
          _id
          chapterID
          technologyID
          content
        }
      }
    `
  },
  updatePage(payload) {
    return `
    mutation {
      updatePage(pageInput: {_id: "${payload._id}", title: "${payload.title}", content: "${payload.content}"}) {
        _id
        title
        content
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
