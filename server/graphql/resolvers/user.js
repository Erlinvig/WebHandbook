const Page = require('../../models/pages');
const User = require('../../models/users');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = {
  users() {},
  signin: async args => {
    const candidate = await User.findOne({login: args.userInput.login});

    if (await candidate) {
      const isPasswordCorrect = bcrypt.compareSync(args.userInput.password, candidate.password);

      if (isPasswordCorrect) {
        const token = jwt.sign({
          login: candidate.login,
          userId: candidate._id
        }, 'Token');
        return {
          token,
          _id: candidate._id,
          login: candidate.login,
          firstName: candidate.firstName,
          secondName: candidate.secondName
        }
      } else {
        throw new Error('Не верный пароль или логин!');
      }
    } else {
      throw new Error('Не верный пароль или логин!')
    }
  },
  signup: async args => {
    const candidate = await User.findOne({login: args.userInput.login});

    if (candidate) {
      throw new Error('Логин занят!')
    } else {
      const salt = bcrypt.genSaltSync(10);

      const user = new User({
        firstName: args.userInput.firstName,
        secondName: args.userInput.secondName,
        login: args.userInput.login,
        password: bcrypt.hashSync(args.userInput.password, salt)
      });

      try {
        await user.save();
        return await user;
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
