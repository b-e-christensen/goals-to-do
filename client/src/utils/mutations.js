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

export const UPDATE_GOAL = gql`
  mutation UpdateGoal($id: String!, $name: String!, $completeByDate: String!, $completed: Boolean!, $priority: String!) {
    updateGoal(_id: $id, name: $name, completeByDate: $completeByDate, completed: $completed, priority: $priority) {
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

export const UPDATE_STEP = gql`
  mutation updateStep($id: String!, $name: String!, $completed: Boolean!) {
    updateStep(_id: $id, name: $name, completed: $completed) {
      name
  }
}
`;

export const REMOVE_STEP = gql`
  mutation removeStep($id: String!, $goalId: String!) {
    removeStep(_id: $id, goalId: $goalId) {
      _id
    }
  }
`;