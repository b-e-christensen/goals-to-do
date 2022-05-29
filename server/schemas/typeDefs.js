const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    goals: [Goal]
    todos: [Todo]!
  }

  type Todo {
    _id: ID
    name: String,
    completed: Boolean
    priority: String
  }

  type Goal {
    _id: ID
    name: String
    completeByDate: String
    completed: Boolean
    priority: String
    steps: [Step]!
  }

  type Step {
    _id: ID
    name: String
    completed: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

type Query {
  get: [User]
  getUser: User
  # ---- development query -----
  getUserDevelopment(email: String!): User
}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTodo(name: String!, priority: String!): Todo
    addGoal(name: String!, completeByDate: String!, priority: String!): Goal
    addStep(goalId: String!, name: String!): Step
    updateTodo(_id: String!, name: String!, completed: Boolean!, priority: String!): Todo
    updateGoal(_id: String!, name: String!, completeByDate: String!, completed: Boolean!, priority: String!): Goal
    updateStep(_id: String!, name: String!, completed: Boolean!): Step
    removeStep(_id: String! goalId: String!): Step
    removeTodo(_id: String!): Todo
    removeGoal(_id: String!): Goal
    # MUTATIONS FOR DEVELOPMENT (to be able to make certain calls without being logged in)
    removeTodoDevelopment(_id: String!, email: String!): Todo
    removeGoalDevelopment(_id: String!, email: String!): Goal
    addTodoDevelopment(email: String!, name: String!, priority: String!): Todo
    addGoalDevelopment(email: String!, name: String!, completeByDate: String!, priority: String!): Goal
  }
`;

module.exports = typeDefs;
