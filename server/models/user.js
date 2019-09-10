const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  secondName: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Page',
      state: {
        type: String,
        default: 'None'
      }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);