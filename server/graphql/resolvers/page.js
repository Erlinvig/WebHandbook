const Chapter = require('../../models/chapters');
const Page = require('../../models/pages');

module.exports = {
  page: async args => {
    try {
      return await Page.findOne({_id: args._id})
    }
    catch (e) {
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
