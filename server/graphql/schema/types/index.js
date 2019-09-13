const technologyType = require('./technology');
const chapterType = require('./chapter');
const pageType = require('./page');
const userType = require('./user');

module.exports = `
  ${technologyType}
  ${chapterType}
  ${pageType}
  ${userType}
`;
