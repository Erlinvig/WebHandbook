const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  chapterID: {
    type: Schema.Types.ObjectId,
    ref: 'Chapter'
  }
});

module.exports = mongoose.model('Page', pageSchema);
