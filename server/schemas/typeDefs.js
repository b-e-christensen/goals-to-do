const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    goals: [Goal]!
    todos: [Todo]!
    projects: [ProjectBoard]!
  }

  type Todo {
    _id: ID
    name: String
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

  type Collaborators {
    name: String
    email: String
  }

  input AssigneesInput {
    assignee: String
  }

  type ProjectBoard {
    _id: ID
    name: String
    collaborators: [Collaborators]
    tasks: [Task]!
  }

  type Task {
    _id: ID
    name: String
    completed: Boolean
    priority: String
    creator: String
    asignees: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

type Query {
  get: [User]
  getUser: User
  getSingleProject(_id: String!): ProjectBoard
  # ---- development query -----
  getUserDevelopment(email: String!): User
  getBoardDevelopment(_id: String): ProjectBoard
}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTodo(name: String!, priority: String!): Todo
    addGoal(name: String!, completeByDate: String!, priority: String!): Goal
    addStep(goalId: String!, name: String!): Step
    
    updateUser(username: String!, email: String!, password: String!): User
    updateTodo(_id: String!, name: String!, completed: Boolean!, priority: String!): Todo
    updateGoal(_id: String!, name: String!, completeByDate: String!, completed: Boolean!, priority: String!): Goal
    updateStep(_id: String!, name: String!, completed: Boolean!): Step

    removeTodo(_id: String!): Todo
    removeGoal(_id: String!): Goal
    removeStep(_id: String! goalId: String!): Step

    addCollaborator(email: String!, _id: String!): ProjectBoard
    addTask(name: String!, assignees: [String], projectId: String!, priority: String!): Task

    # MUTATIONS FOR DEVELOPMENT (to be able to make certain calls without being logged in)
    createProjectBoardDevelopment(userId: String!, name: String!): ProjectBoard
    
    createTaskDevelopment(boardId: String!, userId: String!, name: String!, priority: String!): Task




    removeTodoDevelopment(_id: String!, email: String!): Todo
    removeGoalDevelopment(_id: String!, email: String!): Goal
    addTodoDevelopment(email: String!, name: String!, priority: String!): Todo
    addGoalDevelopment(email: String!, name: String!, completeByDate: String!, priority: String!): Goal
    updateUserDevelopment(oldEmail: String!, username: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
