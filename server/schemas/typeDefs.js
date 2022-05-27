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
    todoId: ID
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
  get: User
  getTodos: User
  getGoals: User
}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
