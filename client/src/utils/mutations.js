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

//    addTodo(name: $name, priority: $priority) {}

export const ADD_TODO = gql`
  mutation addTodo($name: String!, $priority: String!) {
    addTodo(name: $name, priority: $priority) {
        name

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

export const ADD_STEP = gql`
mutation AddStep($goalId: String!, $name: String!) {
  addStep(goalId: $goalId, name: $name) {
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