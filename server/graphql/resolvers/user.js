const Page = require('../../models/pages');
const User = require('../../models/users');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  users() {},
  signin: async args => {},
  signup: async args => {
    const candidate = await User.findOne({login: args.userInput.login});

    if (candidate) {
      return 'Логин занят!'
    } else {
      const salt = bcrypt.genSaltSync(10);

      const user = new User({
        firstName: args.userInput.firstName,
        secondName: args.userInput.secondName,
        login: args.userInput.login,
        password: bcrypt.hashSync(args.userInput.password, salt)
      });

      try {
        user.save();
      } catch (e) {
        throw e
      }
    }
  },
  removeUser: async args => {
    try {
      await User.deleteOne({_id: args.userInput._id});
    } catch (e) {
      throw e
    }
  }
};
