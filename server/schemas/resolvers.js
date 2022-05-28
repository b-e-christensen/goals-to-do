const { AuthenticationError } = require('apollo-server-express');
const { User, Goal } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    get: async () => {
      return await User.find({}).populate('todos').populate('goals').populate({ path: 'goals', populate: 'steps'})
    },
    getUserDevelopment: async (parent, { email }, context) => {
      return await User.findOne({ email }).populate('todos').populate('goals').populate({ path: 'goals', populate: 'steps'})
    },
    getUser: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id }).populate('todos').populate('goals').populate({ path: 'goals', populate: 'steps'})
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
    addTodo: async (parent, { todoName, priority }, context) => {
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { todos: { todoName, priority }}},
        { new: true, runValidators: true, }
        )
    },
    addTodoDevelopment: async (parent, { email, todoName, priority }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $addToSet: { todos: { todoName, priority }}},
        { new: true, runValidators: true, }
        )
      return updatedUser
    },
    addGoalDevelopment: async (parent, { email, name, completeByDate, priority}, context) => {
      const goal = await Goal.create({ name, completeByDate, priority })
      
      await User.findOneAndUpdate(
        { email },
        { $addToSet: { goals: goal._id }})

      return goal
    }
  },
};

module.exports = resolvers;
