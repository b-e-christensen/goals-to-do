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
    todoName: String,
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
    stepId: ID
    stepName: String
  }

  type Auth {
    token: ID!
    user: User
  }

type Query {
  get: [User]
  # ---- development query -----
  getUserDevelopment(email: String!): User
  getUser: User
}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTodo(todoName: String!, completed: Boolean, priority: String!): User
    # ---- development mutation -----
    addTodoDevelopment(email: String!, todoName: String!, priority: String!): User
    # ---- development mutation -----
    addGoalDevelopment(email: String!, name: String!, completeByDate: String!, priority: String!): Goal
  }
`;

module.exports = typeDefs;
