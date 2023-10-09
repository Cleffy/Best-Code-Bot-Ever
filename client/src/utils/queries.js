import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User {
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
  query Chat {
    chat {
      _id
      responses {
        responseText
        username
        createdOn
      }
      createdOn
    }
    }
  `;