const Technology = require('../models/technologies');
const Chapter = require('../models/chapters');

module.exports = {
  technologies: async () => {
    try {
      return  await Technology.find().populate('chapters', '_id title pages');

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
  removeTechnology: async args => {
    try {
      await Technology.deleteOne({_id: args.technologyInput._id});

      await Chapter.deleteMany({technologyID: args.technologyInput._id})
    } catch (e) {
      throw e
    }
  },
  createChapter: async args => {
    const chapter = new Chapter({
      title: args.chapterInput.title,
      technologyID: args.chapterInput.technologyID
    });

    try {
      await chapter.save();

      const technology = await Technology.findOne({_id: args.chapterInput.technologyID});
      technology.chapters.push(chapter._id);

      await technology.save();

      return chapter
    } catch (e) {
      throw e
    }
  },
  removeChapter: async args => {
    try {
      const chapter = await Chapter.findOne({_id: args.chapterInput._id});
      const technology = await Technology.findOne({_id: chapter.technologyID});

      technology.chapters = technology.chapters.filter(chapterID => chapterID.toString() !== args.chapterInput._id);
      technology.save();

      await Chapter.deleteOne({_id: args.chapterInput._id});

    } catch (e) {
      throw e
    }
  }
};
