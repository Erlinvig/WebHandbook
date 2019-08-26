const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const technologySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  chapters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chapter'
    }
  ]
});

module.exports = mongoose.model('Technology', technologySchema);
