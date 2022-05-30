import { gql } from '@apollo/client';

export const GET_USER_ALL = gql`
query Query {
    getUser {
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
