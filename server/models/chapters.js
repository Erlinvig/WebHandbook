const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  pages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Page'
    }
  ],
  technologyID: {
    type: Schema.Types.ObjectId,
    ref: 'Technology'
  }
});

module.exports = mongoose.model('Chapter', chapterSchema);
