const Technology = require('../../models/technologies');
const Chapter = require('../../models/chapters');
const Page = require('../../models/pages');

module.exports = {
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
  changeChapterTitle: async args => {
    const $set = {
      title: args.chapterInput.title
    };

    try {
      return await Chapter.findOneAndUpdate({_id: args.chapterInput._id}, $set, {useFindAndModify: false});
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

      await Page.deleteMany({chapterID: args.chapterInput._id});

      await Chapter.deleteOne({_id: args.chapterInput._id});

    } catch (e) {
      throw e
    }
  }
};
