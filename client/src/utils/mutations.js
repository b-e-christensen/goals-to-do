import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String!, $email: String!, $password: String!) {
  updateUser(username: $username, email: $email, password: $password) {
    _id
    username
    email
  }
}
`;

export const ADD_GOAL = gql`
mutation Mutation($name: String!, $completeByDate: String!, $priority: String!) {
  addGoal(name: $name, completeByDate: $completeByDate, priority: $priority) {
    name
    completeByDate
    priority
  }
}
`;

export const UPDATE_GOAL = gql`
  mutation updateGoal($_id: String!, $name: String!, $completeByDate: String!, $completed: Boolean!, $priority: String!) {
    updateGoal(_id: $_id, name: $name, completeByDate: $completeByDate, completed: $completed, priority: $priority) {
      name
    }
  }
`;

export const REMOVE_GOAL = gql`
  mutation removeGoal($_id: String!) {
    removeGoal(_id: $_id) {
      _id
      name
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodo($name: String!, $priority: String!) {
    addTodo(name: $name, priority: $priority) {
        name

    }
  }
`;


export const UPDATE_TODO = gql`
  mutation updateTodo($_id: String!, $name: String!, $completed: Boolean!, $priority: String!) {
    updateTodo(_id: $_id, name: $name, completed: $completed, priority: $priority) {
        name
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation removeTodo($_id: String!) {
    removeTodo(_id: $_id) {
        name
    }
  }
`;

export const ADD_STEP = gql`
mutation AddStep($goalId: String!, $name: String!) {
  addStep(goalId: $goalId, name: $name) {
    name
  }
}
`;

export const UPDATE_STEP = gql`
  mutation updateStep($_id: String!, $name: String!, $completed: Boolean!) {
    updateStep(_id: $_id, name: $name, completed: $completed) {
      name
  }
}
`;

export const REMOVE_STEP = gql`
  mutation removeStep($_id: String!, $goalId: String!) {
    removeStep(_id: $_id, goalId: $goalId) {
      _id
    }
  }
`;

export const ADD_COLLABORATOR = gql`
  mutation addCollaborator($email: String!, $id: String!) {
  addCollaborator(email: $email, _id: $id) {
    name
    _id
  }
}
`;

export const ADD_TASK = gql`
  mutation addTask($name: String!, $projectId: String!, $priority: String!, $assignees: [String]) {
    addTask(name: $name, projectId: $projectId, priority: $priority, assignees: $assignees) {
      _id
      name
      creator
      assignees
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($name: String!) {
  addProject(name: $name) {
    _id
    name
  }
}
`