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
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'user'
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
