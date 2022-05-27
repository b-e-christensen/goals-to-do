const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    get: async () => {
      return await User.find({})
    },
    getTodos: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id }).populate('todos').sort({ priority: -1 })
    },
    getGoals: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id }).populate('goals').populate({
        path: 'goals',
        populate: 'steps'
      }).sort({ completeByDate: -1 })
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
