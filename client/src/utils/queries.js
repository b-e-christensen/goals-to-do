import { gql } from '@apollo/client';

export const GET_USER_ALL = gql`
query Query {
    getUser {
      username
      email
      goals {
        name
        completeByDate
        completed
        priority
        _id
        steps {
          _id
          name
          completed
        }
      }
      todos {
        name
        completed
        priority
        _id
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetUser {
  getUser {
    projects {
      name
      _id
      collaborators {
        name
        email
      }
      tasks {
        name
        completed
        priority
        creator
        asignees
        _id
      }
    }
  }
}
`

export const GET_SINGLE_PROJECT = gql`
query GetSingleProject($id: String!) {
  getSingleProject(_id: $id) {
    _id
    name
    collaborators {
      name
      email
    }
    tasks {
      _id
      name
      completed
      priority
      creator
      asignees
    }
  }
}
`