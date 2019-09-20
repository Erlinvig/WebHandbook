module.exports = {
  getPageByID(payload) {
    return `
    query {
      page(_id: "${payload._id}") {
        _id
        title
        content
      }
    }`
  },
};
