const technology = require('./technology');
const chapter = require('./chapter');
const page = require('./page');
const user = require('./user');

module.exports = {
  ...technology,
  ...chapter,
  ...page,
  ...user
};
