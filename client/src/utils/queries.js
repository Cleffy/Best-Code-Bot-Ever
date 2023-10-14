import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user {
    user {
      _id
      username
      email
      history {
        _id
        createdOn
        responses {
          createdOn
          responseText
          username
        }
      }
    }
 }
  `;

  export const QUERY_CHAT = gql`
  query chat($_id: ID) {
    chat(_id: $_id) {
      _id
      createdOn
      username
      responses {
        responseText
        username
        createdOn
      }
    }
    }
  `;