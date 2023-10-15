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
          _id
          createdOn
          responseText
          username
        }
      }
    }
  }
  `;

  export const QUERY_CHAT = gql`
  query chat {
    chat {
      _id
      createdOn
      responses {
        responseText
        username
        createdOn
      }
    }
    }
  `;