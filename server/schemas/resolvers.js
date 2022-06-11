const { AuthenticationError } = require('apollo-server-express');
const { User, Goal, Todo, Step, ProjectBoard, Task } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    get: async () => {
      return await User.find({}).populate('todos').populate('goals').populate({ path: 'goals', populate: 'steps' })
    },
    getUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('todos').populate('goals').populate({ path: 'goals', populate: 'steps' }).populate('projects').populate({ path: 'projects', populate: 'collaborators' })
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    getSingleProject: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id })
        const project = await ProjectBoard.findOne({ _id }).populate('tasks')
        if (!project.collaborators.filter(e => e.email === user.email)) {
          window.location.href = "/"
        }
        return project
      }
      throw new AuthenticationError('You need to be logged in!')
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
      if (context.user) {
        const todo = await Todo.create({ name, priority })

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { todos: todo._id } })

        return todo
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addGoal: async (parent, { name, completeByDate, priority }, context) => {
      if (context.user) {
        const goal = await Goal.create({ name, completeByDate, priority })

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { goals: goal._id } })

        return goal
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addStep: async (parent, { goalId, name }, context) => {
      if (context.user) {
        const step = await Step.create({ name })

        await Goal.findOneAndUpdate(
          { _id: goalId },
          { $addToSet: { steps: step._id } })

        return step
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateUser: async (parent, { username, email, password }, context) => {
      if (context.user) {
        const saltRounds = 10;
        const newPass = await bcrypt.hash(password, saltRounds);
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { username, email, password: newPass },
          { runValidators: true, new: true }
        )
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateTodo: async (parent, { _id, name, completed, priority }, context) => {
      if (context.user) {
        return await Todo.findOneAndUpdate(
          { _id },
          { name, completed, priority },
          { runValidators: true, new: true })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateGoal: async (parent, { _id, name, completeByDate, completed, priority }, context) => {
      if (context.user) {
        return await Goal.findOneAndUpdate(
          { _id },
          { name, completeByDate, completed, priority },
          { runValidators: true, new: true })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateStep: async (parent, { _id, name, completed }, context) => {
      if (context.user) {
        return await Step.findOneAndUpdate(
          { _id },
          { name, completed },
          { runValidators: true, new: true })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeTodo: async (parent, { _id }, context) => {
      if (context.user) {
        const todo = await Todo.findOneAndDelete({ _id })

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { todos: todo._id } })

        return todo
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeGoal: async (parent, { _id }, context) => {
      if (context.user) {
        const goal = await Goal.findOneAndDelete({ _id })

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { goals: goal._id } })

        return goal
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeStep: async (parent, { _id, goalId }, context) => {
      if (context.user) {
        const step = await Step.findOneAndDelete({ _id })

        await Goal.findOneAndUpdate(
          { _id: goalId },
          { $pull: { steps: step._id } })

        return step
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addCollaborator: async (parent, { _id, email }, context) => {
      if (context.user) {
        const user = await User.findOne({ email })
        if (!user){
          throw new AuthenticationError('No user with that email exists.')
        }
        const newCollaborator = await User.findOneAndUpdate(
          { email },
          { $addToSet: { projects: _id } },
          { runValidators: true, new: true })

        const board = await ProjectBoard.findOneAndUpdate(
          { _id },
          { $push: { collaborators: { email: newCollaborator.email, name: newCollaborator.username } } },
          { runValidators: true, new: true })
      } 
      throw new AuthenticationError('You need to be logged in!');
    },
    addTask: async (parent, { name, assignees, projectId, priority }, context) => {
      if (context.user) {
      const user = await User.findOne({ _id: context.user._id })
      const task = await Task.create({ name, assignees, priority, creator: user.username })
      await ProjectBoard.findOneAndUpdate(
        { _id: projectId },
        { $addToSet: { tasks: task._id } })

      return task
    }
    throw new AuthenticationError('You need to be logged in!');
    },
    addProject: async (parent, { name }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id })

        const board = await ProjectBoard.create({ name, collaborators: { email: user.email, name: user.username } })

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { projects: board._id } },
          { runValidators: true, new: true })

        return board
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
