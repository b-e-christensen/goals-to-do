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
    email
    projects {
      name
      _id
      collaborators {
        name
        email
        lastViewed
      }
      groupChat {
      name
    }
      tasks {
        name
        completed
        priority
        creator
        assignees
        _id
      }
    }
  }
}
`;

export const GET_SINGLE_PROJECT = gql`
query GetSingleProject($id: String!) {
  getSingleProject(_id: $id) {
    _id
    name
    collaborators {
      name
      email
      lastViewed
    }
    groupChat {
      name
      message
      time
      email
    }
    tasks {
      _id
      name
      completed
      priority
      creator
      assignees
    }
  }
}
`

export const GET_USER_EMAIL = gql`
  query getEmail {
  getUser {
    email
  }
}
`;