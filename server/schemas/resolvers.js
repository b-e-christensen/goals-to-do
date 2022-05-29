const { AuthenticationError } = require('apollo-server-express');
const { User, Goal, Todo, Step } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    get: async () => {
      return await User.find({}).populate('todos').populate('goals').populate({ path: 'goals', populate: 'steps'})
    },
    getUser: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id }).populate('todos').populate('goals').populate({ path: 'goals', populate: 'steps'})
    },
    // QUERY FOR DEVELOPMENT
    getUserDevelopment: async (parent, { email }, context) => {
      return await User.findOne({ email }).populate('todos').populate('goals').populate({ path: 'goals', populate: 'steps'})
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
    addTodo: async (parent, { name, priority }, context) => {
      const todo = await Todo.create({ name, priority })

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { todos: todo._id }})

      return todo
    },
    addGoal: async (parent, { name, completeByDate, priority}, context) => {
      const goal = await Goal.create({ name, completeByDate, priority })
      
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { goals: goal._id }})

      return goal
    },
    addStep: async (parent, { goalId, name }) => {
      const step = await Step.create({ name })

      await Goal.findOneAndUpdate(
        { _id: goalId },
        { $addToSet: { steps: step._id }})

      return step
    },
    updateTodo: async (parent, { _id, name, completed, priority }) => { 
      return await Todo.findOneAndUpdate(
        { _id },
        { name, completed, priority },
        { runValidators: true, new: true})
    }, 
    updateGoal: async (parent, { _id, name, completeByDate, completed, priority }) => {
      return await Goal.findOneAndUpdate(
        { _id },
        { name, completeByDate, completed, priority },
        { runValidators: true, new: true })
    },
    updateStep: async (parent, { _id, name, completed }) => {
      return await Step.findOneAndUpdate(
      { _id },
      { name, completed },
      { runValidators: true, new: true })
    },
    removeStep: async(parent, { _id, goalId}) => {
      const step = await Step.findOneAndDelete({ _id })

      await Goal.findOneAndUpdate(
        { _id: goalId},
        { $pull: { steps: step._id}})

      return step
    },
    removeTodo: async (parent, { _id }, context) => {
      const todo = await Todo.findOneAndDelete({ _id })

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { todos: todo._id }})

      return todo
    },
    removeGoal: async (parent, { _id }, context) => {
      const goal = await Goal.findOneAndDelete({ _id })

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { goals: goal._id}})

      return goal
    },
    // MUTATIONS FOR DEVELOPMENT (to be able to make certain calls without being logged in)
    removeTodoDevelopment: async (parent, { _id, email }) => {
      const todo = await Todo.findOneAndDelete({ _id })

      await User.findOneAndUpdate(
        { email },
        { $pull: { todos: todo._id }})

      return todo
    },
    removeGoalDevelopment: async (parent, { _id, email }) => {
      const goal = await Goal.findOneAndDelete({ _id })

      await User.findOneAndUpdate(
        { email },
        { $pull: { goals: goal._id}})

      return goal
    },
    addTodoDevelopment: async (parent, { email, name, priority }) => {
      const todo = await Todo.create({ name, priority })

      await User.findOneAndUpdate(
        { email },
        { $addToSet: { todos: todo._id }})

      return todo
    },
    addGoalDevelopment: async (parent, { email, name, completeByDate, priority}) => {
      const goal = await Goal.create({ name, completeByDate, priority })
      
      await User.findOneAndUpdate(
        { email },
        { $addToSet: { goals: goal._id }})

      return goal
    },

  },
};

module.exports = resolvers;
