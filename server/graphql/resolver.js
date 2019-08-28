const Technology = require('../models/technologies');
const Chapter = require('../models/chapters');
const Page = require('../models/pages');

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
  removeTechnology: async args => {
    try {
      await Technology.deleteOne({_id: args.technologyInput._id});

      await Chapter.deleteMany({technologyID: args.technologyInput._id});
      await Page.deleteMany({technologyID: args.technologyInput._id});
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

      await Page.deleteMany({chapterID: args.chapterInput._id});

      await Chapter.deleteOne({_id: args.chapterInput._id});

    } catch (e) {
      throw e
    }
  },
  createPage: async args => {
    const page = new Page({
      title: args.pageInput.title,
      chapterID: args.pageInput.chapterID,
      technologyID: null
    });

    try {
      const chapter = await Chapter.findOne({_id: args.pageInput.chapterID});
      chapter.pages.push(page._id);
      page.technologyID = chapter.technologyID;

      await page.save();
      await chapter.save();

      return page;
    } catch (e) {
      throw e
    }
  },
  removePage: async args => {
    const page = await Page.findOne({_id: args.pageInput._id});
    const chapter = await Chapter.findOne({_id: page.chapterID});

    chapter.pages = chapter.pages.filter(pageID => pageID.toString() !== args.pageInput._id);
    chapter.save();

    await Page.deleteOne({_id: args.pageInput._id});
  }
};
