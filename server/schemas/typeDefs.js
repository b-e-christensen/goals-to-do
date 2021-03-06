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
    lastViewed: String
  }

  type GroupChat {
    name: String
    email: String
    message: String
    time: String
  }

  input AssigneesInput {
    assignee: String
  }

  type ProjectBoard {
    _id: ID
    name: String
    collaborators: [Collaborators]
    groupChat: [GroupChat]
    tasks: [Task]!
  }

  type Task {
    _id: ID
    name: String
    completed: Boolean
    priority: String
    creator: String
    assignees: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

type Query {
  get: [User]
  getUser: User
  getSingleProject(_id: String!): ProjectBoard
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
    updateTask(taskId: String!, name: String!, assignees: [String], priority: String!, completed: Boolean): Task

    removeTodo(_id: String!): Todo
    removeGoal(_id: String!): Goal
    removeStep(_id: String! goalId: String!): Step
    removeTask(_id: String!, projectId: String!): Task
    removeProject(_id: String!, remove: Boolean!): ProjectBoard

    addCollaborator(email: String!, _id: String!): ProjectBoard
    addTask(name: String!, assignees: [String], projectId: String!, priority: String!): Task
    addProject(name: String!): ProjectBoard

    addChatMessage(_id: String!, message: String!): ProjectBoard
    updateLastViewed(_id: String!, lastViewed: String!, newLastViewed: String!): ProjectBoard
  }
`;

module.exports = typeDefs;
