const technologyType = require('./technology');
const chapterType = require('./chapter');
const pageType = require('./page');
const userType = require('./user');
const authData = require('./authData');

module.exports = `
  ${technologyType}
  ${chapterType}
  ${pageType}
  ${userType}
  ${authData}
`;
