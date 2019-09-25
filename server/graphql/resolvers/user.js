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
        return {
          token: candidate.token,
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

  getUserByToken: async args => {
    const user = await User.findOne({token: args.userInput.token})
      .populate('pages');

    if (user) {
      return user;
    } else {
      throw new Error("Пользователь не найден!")
    }
  },

  signup: async args => {
    const candidate = await User.findOne({login: args.userInput.login});

    if (candidate) {
      throw new Error('Логин занят!')
    } else {
      const salt = bcrypt.genSaltSync(10);

      const token = jwt.sign({
        login: args.userInput.login,
        userId: args.userInput._id
      }, 'q11werty51');

      const user = new User({
        firstName: args.userInput.firstName,
        secondName: args.userInput.secondName,
        login: args.userInput.login,
        password: bcrypt.hashSync(args.userInput.password, salt),
        token
      });

      try {
        await user.save();
        return await user;
      } catch (e) {
        throw e
      }
    }
  },
  updateFirstName: async args => {
    const $set = {
      firstName: args.userInput.firstName
    };

    try {
      await User.findOneAndUpdate({token: args.userInput.token}, $set, {useFindAndModify: false});
      return User.findOne({token: args.userInput.token});
    } catch (e) {
      throw e
    }
  },
  updateSecondName: async args => {
    const $set = {
      secondName: args.userInput.secondName
    };

    try {
      await User.findOneAndUpdate({token: args.userInput.token}, $set, {useFindAndModify: false});
      return User.findOne({token: args.userInput.token});
    } catch (e) {
      throw e
    }
  },
  updatePassword: async args => {
    const user = await User.findOne({token: args.userInput.token});
    let result = null;

    if (user) {
      const isOldPasswordCorrect = bcrypt.compareSync(args.userInput.oldPassword, user.password);

      if (isOldPasswordCorrect) {
        const salt = bcrypt.genSaltSync(10);

        const $set = {
          password: bcrypt.hashSync(args.userInput.updatePassword, salt)
        };

        await User.findOneAndUpdate({token: args.userInput.token}, $set, {useFindAndModify: false});
        result = User.findOne({token: args.userInput.token});
      } else {
        throw new Error("Текущий пароль указан не верно!")
      }
    }
    try {
      return result
    }
    catch (e) {
      throw e
    }
  },
  removeUser: async args => {
    try {
      await User.deleteOne({_id: args.userInput._id});
    } catch (e) {
      throw e
    }
  },
  markPage: async args => {
    const user = await User.findOne({token: args.userInput.token});
    user.pages.push(args.pageInput._id);
    await user.save();
    return user;
  },
  unmarkPage: async args => {
    const user = await User.findOne({token: args.userInput.token});
    user.pages = user.pages.filter(pageID => pageID.toString() !== args.pageInput._id.toString());
    await user.save();
    return user;
  }
};
