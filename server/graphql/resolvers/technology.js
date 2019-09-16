const Technology = require('../../models/technologies');
const Chapter = require('../../models/chapters');
const Page = require('../../models/pages');

module.exports = {
  technologies: async args => {
    try {
      return await Technology.find(args.technologyInput ? {_id: args.technologyInput._id} : {})
        .populate({
          path: `chapters`,
          populate: {path: 'pages'}
        })
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
  },
  changeTechnologyTitle: async args => {
    const $set = {
      title: args.technologyInput.title
    };

    try {
      return await Technology.findOneAndUpdate({_id: args.technologyInput._id}, $set);
    } catch (e) {
      throw e
    }
  },
  removeTechnology: async args => {
    try {
      await Technology.deleteOne({_id: args.technologyInput._id});

      await Chapter.deleteMany({technologyID: args.technologyInput._id});
      await Page.deleteMany({technologyID: args.technologyInput._id});
    } catch (e) {
      throw e
    }
  }
};
