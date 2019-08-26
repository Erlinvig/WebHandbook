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
  ]
});

module.exports = mongoose.model('Chapter', chapterSchema);
