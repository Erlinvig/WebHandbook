const Technology = require('../models/technologies');

module.exports = {
  technologies: async () => {
    try {
      return await Technology.find();
    } catch (e) {
      throw e
    }
  },
  createTechnology: async args => {
    const technology = new Technology({
      title: args.technologyInput.title
    });

    try {
      await technology.save();
      return technology
    } catch (e) {
      throw e
    }
  }
};
